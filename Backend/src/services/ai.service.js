const { GoogleGenAI, Type } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const interviewReportSchema = {
    type: Type.OBJECT,
    properties: {
        matchScore: {
            type: Type.NUMBER,
            description:
                "A score between 0 and 100 indicating how well the candidate profile matches"
        },
        technicalQuestions: {
            type: Type.ARRAY,
            description: "Technical questions along with intention and answer",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: {
                        type: Type.STRING,
                        description:
                            "The technical question can be asked in the interview"
                    },
                    intention: {
                        type: Type.STRING,
                        description:
                            "The intention of interviewer behind asking this question"
                    },
                    answer: {
                        type: Type.STRING,
                        description:
                            "How to answer this question, what points to cover, what approach to take etc."
                    }
                },
                required: ["question", "intention", "answer"]
            }
        },
        behavioralQuestions: {
            type: Type.ARRAY,
            description: "Behavioral questions along with intention and answer",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: {
                        type: Type.STRING,
                        description:
                            "The behavioral question can be asked in the interview"
                    },
                    intention: {
                        type: Type.STRING,
                        description:
                            "The intention of interviewer behind asking this question"
                    },
                    answer: {
                        type: Type.STRING,
                        description:
                            "How to answer this question, what points to cover, what approach to take etc."
                    }
                },
                required: ["question", "intention", "answer"]
            }
        },
        skillGap: {
            type: Type.ARRAY,
            description: "List of missing skills",
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: {
                        type: Type.STRING,
                        description: "The skill which the candidate is lacking"
                    },
                    severity: {
                        type: Type.STRING,
                        enum: ["low", "medium", "high"],
                        description:
                            "The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances"
                    }
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: Type.ARRAY,
            description: "Day-wise preparation plan",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: {
                        type: Type.NUMBER,
                        description:
                            "The day number in the preparation plan, starting from 1"
                    },
                    focus: {
                        type: Type.STRING,
                        description:
                            "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."
                    },
                    tasks: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description:
                            "List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc."
                    }
                },
                required: ["day", "focus", "tasks"]
            }
        },
        title: {
            type: Type.STRING,
            description:
                "The title of the job for which the interview report is generated"
        }
    },
    required: [
        "matchScore",
        "technicalQuestions",
        "behavioralQuestions",
        "skillGap",
        "preparationPlan",
        "title"
    ]
};

async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {
    let prompt = `Generate a professional interview report based on the available candidate information.

`;

    if (resume?.trim()) {
        prompt += `Resume:
${resume}

`;
    }

    if (selfDescription?.trim()) {
        prompt += `Self Description:
${selfDescription}

`;
    }

    if (jobDescription?.trim()) {
        prompt += `Job Description:
${jobDescription}

`;
    }

    prompt += `
Instructions:
- If only resume is provided, analyze the resume.
- If only self description is provided, analyze the self description.
- If both are provided, use both.
- Generate:
  1. Match score (0-100)
  2. 5 Technical questions with ideal answers
  3. 5 Behavioral questions with ideal answers
  4. Skill gaps with severity
  5. 7-day preparation plan
  6. Job title
Return ONLY valid JSON matching the provided schema.
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: interviewReportSchema
            }
        });

        const report = JSON.parse(response.text);
        return report;
    } catch (error) {
        console.error("Error generating interview report:", error);
        throw error;
    }
}

module.exports = generateInterviewReport;
