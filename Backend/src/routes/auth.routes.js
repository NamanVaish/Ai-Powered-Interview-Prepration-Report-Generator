const express = require("express");
const authController = require("../controllers/auth.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

const authRouter = express.Router();

authRouter.post("/register", authController.registerUserController);

authRouter.post("/login", authController.loginUserController);

authRouter.get("/refreshToken", authController.refreshToken);

authRouter.get("/logout", authController.logoutUserController);

authRouter.get("/logout-all", authController.logoutAllController);

authRouter.get(
    "/get-me",
    authMiddleware.authUser,
    authController.getMeController
);

module.exports = authRouter;
