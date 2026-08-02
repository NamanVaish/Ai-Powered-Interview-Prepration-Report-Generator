import {
    generateInterviewReport,
    getInterviewReportById,
    getAllInterviewReports
} from "../services/interview.api.js";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { InterviewContext } from "../interview.context.jsx";

export const useInterview = () => {
    const context = useContext(InterviewContext);
    const { interviewId } = useParams();

    if (!context) {
        throw new Error("useInterview must be in InterviewProvider");
    }

    const { loading, setLoading, report, setReport, reports, setReports } =
        context;

    const generateReport = async ({
        jobDescription,
        selfDescription,
        resumeFile
    }) => {
        setLoading(true);
        try {
            const response = await generateInterviewReport({
                jobDescription,
                selfDescription,
                resumeFile
            });
            setReport(response.interviewReport);
            return response.interviewReport;
        } catch (err) {
            console.log(err);
            setReport(null);
        } finally {
            setLoading(false);
        }
    };

    const getReportById = async interviewId => {
        setLoading(true);
        try {
            const response = await getInterviewReportById(interviewId);
            setReport(response.interviewReport);
            return response.interviewReport;
        } catch (err) {
            console.log(err);
            setReport(null);
        } finally {
            setLoading(false);
        }
    };

    const getReports = async () => {
        setLoading(true);
        try {
            const response = await getAllInterviewReports();
            setReports(response.interviewReports);
            return response.interviewReports;
        } catch (err) {
            console.log(err);
            setReports([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId);
        } else {
            getReports();
        }
    }, [interviewId]);

    return {
        loading,
        report,
        reports,
        generateReport,
        getReportById,
        getReports
    };
};
