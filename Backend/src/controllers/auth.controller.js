const userModel = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model.js");
const sessionModel = require("../models/session.model.js");

const registerUserController = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username,email and password"
        });
    }
    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    });

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message:
                "Account already exists with this email address or username"
        });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash
    });

    const session = await sessionModel.create({
        user: user._id,
        ip: req.ip,
        userAgent: req.headers["user-agent"]
    });

    const refreshToken = jwt.sign(
        {
            id: user._id,
            username: user.username,
            sessionId: session._id
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    session.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await session.save();

    const accessToken = jwt.sign(
        {
            id: user._id,
            sessionId: session.id,
            username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    );

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        },
        accessToken
    });
};

const loginUserController = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    const session = await sessionModel.create({
        user: user._id,
        ip: req.ip,
        userAgent: req.headers["user-agent"]
    });

    const refreshToken = jwt.sign(
        {
            id: user._id,
            username: user.username,
            sessionId: session._id
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    session.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await session.save();

    const accessToken = jwt.sign(
        {
            id: user._id,
            username: user.username,
            sessionId: session._id
        },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    );

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        message: "User loggedIn successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        },
        accessToken
    });
};

const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({
            message: "Refresh token not found"
        });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    const session = await sessionModel.findById(decoded.sessionId);

    if (!session || session.revoked) {
        return res.status(400).json({
            message: "Invalid refresh token"
        });
    }
    const isValid = await bcrypt.compare(
        refreshToken,
        session.refreshTokenHash
    );

    if (!isValid) {
        return res.status(401).json({
            message: "Invalid refresh token"
        });
    }

    const user = await userModel.findById(decoded.id);

    if (!user) {
        return res.status(401).json({
            message: "user not found"
        });
    }

    const newRefreshToken = jwt.sign(
        {
            id: decoded.id,
            username: user.username,
            sessionId: session._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

    session.refreshTokenHash = await bcrypt.hash(newRefreshToken, 10);
    await session.save();

    const accessToken = jwt.sign(
        {
            id: decoded.id,
            username: user.username,
            sessionId: session._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15m"
        }
    );

    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        message: "Access token refreshed successfully",
        accessToken
    });
};

const getMeController = async (req, res) => {
    const user = await userModel.findById(req.user.id);
    res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
};

const logoutUserController = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(400).json({
            message: "Refresh token not found"
        });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    await sessionModel.findByIdAndUpdate(decoded.sessionId, {
        revoked: true
    });

    res.clearCookie("refreshToken");

    res.status(200).json({
        message: "User logged Out successfully"
    });
};

const logoutAllController = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(400).json({
            message: "Refresh token not found"
        });
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    await sessionModel.updateMany(
        {
            user: decoded.id,
            revoked: false
        },
        { revoked: true }
    );

    res.clearCookie("refreshToken");

    res.status(200).json({
        message: "Logged out from all devices successfully"
    });
};

module.exports = {
    registerUserController,
    loginUserController,
    refreshToken,
    logoutUserController,
    logoutAllController,
    getMeController
};
