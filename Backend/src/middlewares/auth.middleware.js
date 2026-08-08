const jwt = require("jsonwebtoken");
const sessionModel = require("../models/session.model.js");

const authUser = async (req, res, next) => {
    
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "token not provided"
            });
        }

        const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token });

        if (isTokenBlacklisted) {
            return res.status(401).json({
                message: "token is invalid"
            });
        }
        
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Access token missing"
            });
        }

        const accessToken = authHeader.split(" ")[1];

        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

        const session = await sessionModel.findById(decoded.sessionId);

        if (!session || session.revoked) {
            return res.status(401).json({
                message: "Session expired"
            });
        }

        req.user = {
            id: decoded.id,
            username: decoded.username,
            sessionId: decoded.sessionId
        };

        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid access token"
        });
    }
};

module.exports = {
    authUser
};
