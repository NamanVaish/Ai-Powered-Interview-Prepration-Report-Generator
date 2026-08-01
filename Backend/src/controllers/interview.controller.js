const pdfParse = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service.js");
const interviewReportModel = require("../models/interviewReport.model.js");

const generateInterviewReportController = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            message: "Resume PDF is required"
        });
    }

    const parser = new pdfParse.PDFParse(Uint8Array.from(req.file.buffer));

    const resumeContent = await parser.getText();
    const { selfDescription, jobDescription } = req.body;

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    });

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    });

    res.status(201).json({
        message: "Interview report generated successfully",
        interviewReport
    });
};

const getInterviewReportByIdController = async (req, res) => {
    const { interviewId } = req.params;

    const interviewReport = await interviewReportModel.findOne({
        _id: interviewId,
        user: req.user.id
    });

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        });
    }

    res.status(200).json({
        message: "Interview report fetched successfully",
        interviewReport
    });
};

const getAllInterviewReports = async (req, res) => {
    const interviewReports = await interviewReportModel
        .findOne({
            user: req.user.id
        })
        .sort({ createdAt: -1 })
        .select(
            "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGap -preparationPlan"
        );

    res.status(200).json({
        message: "Interview reports fetched successfully",
        interviewReports
    });
};

module.exports = {
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReports
};
