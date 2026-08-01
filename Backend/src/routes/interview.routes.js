const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const interviewController = require("../controllers/interview.controller.js");
const upload = require("../middlewares/file.middleware.js");

const interviewRouter = express.Router();

interviewRouter.post(
    "/",
    upload.single("resume"),
    authMiddleware.authUser,
    interviewController.generateInterviewReportController
);

interviewRouter.get(
    "/report:interviewId",
    authMiddleware.authUser,
    interviewController.getInterviewReportByIdController
);

interviewRouter.get(
    "/",
    authMiddleware.authUser,
    interviewController.getAllInterviewReports
);

module.exports = interviewRouter;
