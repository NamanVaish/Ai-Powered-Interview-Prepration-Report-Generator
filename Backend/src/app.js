const express = require("express");
const authRouter = require("./routes/auth.routes.js");
const interviewRouter = require("./routes/interview.routes.js");

const cors = require("cors");

const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.set("trust proxy", 1);
app.use(cookieParser());
app.use(
    cors({
        origin: "https://ai-powered-interview-prepration-report-9upt.onrender.com",
        credentials: true
    })
);

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;
