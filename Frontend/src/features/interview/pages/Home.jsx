import { useState,useRef } from "react";
import {useInterview} from "../hooks/useInterview.js"
import {useNavigate} from "react-router-dom"

export default function Home() {

const {loading,generateReport} = useInterview()
const [jobDescription, setJobDescription] = useState("")
const [selfDescription, setSelfDescription] = useState("")
const resumeInputRef = useRef()
const navigate = useNavigate()

const handleGenerateReport = async () => {
const resumeFile = resumeInputRef.current.files[0]
const report = await generateReport({jobDescription,selfDescription,resumeFile})
console.log(report)
navigate(`/interview:${report._id}`)
}

if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-slate-100 overflow-hidden px-4">
                <div className="absolute w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl -top-24 -left-20 animate-pulse"></div>

                <div className="absolute w-[28rem] h-[28rem] bg-blue-400/20 rounded-full blur-3xl -bottom-24 -right-20 animate-pulse"></div>

                <div className="relative flex flex-col items-center gap-6 sm:gap-8 bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl px-8 sm:px-14 py-10 sm:py-12 border border-white w-full max-w-sm sm:w-auto">
                    <div className="relative w-20 h-20 sm:w-28 sm:h-28">
                        <div className="absolute inset-0 rounded-full border-[6px] border-indigo-200"></div>

                        <div className="absolute inset-0 rounded-full border-[6px] border-transparent border-t-indigo-600 border-r-blue-500 animate-spin"></div>

                        <div className="absolute inset-3 rounded-full border-[5px] border-transparent border-b-indigo-500 border-l-blue-400 animate-spin [animation-direction:reverse] [animation-duration:1.2s]"></div>

                        <div className="absolute inset-8 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full animate-pulse"></div>
                    </div>

                    <div className="text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                            Signing You In
                        </h2>

                        <p className="text-slate-500 text-base sm:text-lg mt-2">
                            Please wait while we verify your credentials...
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <span className="w-3 h-3 rounded-full bg-indigo-500 animate-bounce"></span>
                        <span className="w-3 h-3 rounded-full bg-indigo-500 animate-bounce delay-150"></span>
                        <span className="w-3 h-3 rounded-full bg-blue-500 animate-bounce delay-300"></span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-slate-100 relative overflow-hidden py-16 px-4">
            <div className="absolute w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl -top-24 -left-20 animate-pulse pointer-events-none"></div>
            <div className="absolute w-[28rem] h-[28rem] bg-blue-400/20 rounded-full blur-3xl -bottom-24 -right-20 animate-pulse pointer-events-none"></div>

            <div className="relative max-w-3xl mx-auto flex flex-col items-center gap-3 text-center mb-10">
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-800">
                    Create Your Custom{" "}
                    <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                        Interview Plan
                    </span>
                </h1>
                <p className="text-slate-500 text-lg max-w-xl">
                    Let our AI analyze the job requirements and your unique
                    profile to build a winning strategy.
                </p>
            </div>

            <div className="relative max-w-5xl mx-auto bg-white rounded-[30px] shadow-[0_5px_15px_rgba(0,0,0,0.35)] overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    {/* Left: Target Job Description */}
                    <div className="w-full lg:w-1/2 p-8 flex flex-col gap-4 lg:border-r border-slate-100">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <svg
                                    className="w-5 h-5 text-indigo-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M20 7h-3V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2H4a1 1 0 00-1 1v10a2 2 0 002 2h14a2 2 0 002-2V8a1 1 0 00-1-1zM9 5h6v2H9V5z"
                                    />
                                </svg>
                                <h2 className="text-lg font-bold text-slate-800">
                                    Target Job Description
                                </h2>
                            </div>
                            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1">
                                REQUIRED
                            </span>
                        </div>

                        <textarea onChange={(e) => {setJobDescription(e.target.value)}} 
                            name="jobDecription"
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                            maxLength={5000}
                            className="w-full h-64 lg:h-[22rem] bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-700 outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white transition-all duration-300 resize-none placeholder:text-slate-400"
                        />
                        <span className="text-xs text-slate-400 self-end">
                            0 / 5000 chars
                        </span>
                    </div>

                    {/* Right: Your Profile */}
                    <div className="w-full lg:w-1/2 p-8 flex flex-col gap-5 bg-slate-50/60">
                        <div className="flex items-center gap-2">
                            <svg
                                className="w-5 h-5 text-indigo-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            <h2 className="text-lg font-bold text-slate-800">
                                Your Profile
                            </h2>
                        </div>

                        {/* Upload Resume */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-semibold text-slate-600">
                                    Upload Resume
                                </label>
                                <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-full px-2 py-0.5">
                                    BEST RESULTS
                                </span>
                            </div>

                            <label
                                htmlFor="resume-upload"
                                className="w-full flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-indigo-300 bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 hover:border-indigo-400 px-4 py-8 cursor-pointer transition-all duration-300"
                            >
                                <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 text-indigo-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M12 12v9m0-9l-3 3m3-3l3 3"
                                        />
                                    </svg>
                                </div>
                                <span className="text-slate-700 text-sm font-semibold">
                                    Click to upload or drag & drop
                                </span>
                                <span className="text-slate-400 text-xs">
                                    PDF or DOCX (Max 5MB)
                                </span>
                                <input ref={resumeInputRef} 
                                    id="resume-upload"
                                    type="file"
                                    name="resume"
                                    accept=".pdf"
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="flex-1 h-px bg-slate-200"></span>
                            <span className="text-xs font-semibold text-slate-400">
                                OR
                            </span>
                            <span className="flex-1 h-px bg-slate-200"></span>
                        </div>

                        {/* Quick Self-Description */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-600">
                                Quick Self-Description
                            </label>
                            <textarea onChange={(e) => {setSelfDescription(e.target.value)}}
                                name="selfDescription"
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                                className="w-full h-28 bg-white border border-indigo-200 rounded-2xl px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-300 resize-none placeholder:text-slate-400"
                            />
                        </div>

                        {/* Info banner */}
                        <div className="flex items-start gap-2 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3">
                            <svg
                                className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <p className="text-sm text-indigo-700">
                                Either a{" "}
                                <span className="font-semibold">Resume</span> or
                                a{" "}
                                <span className="font-semibold">
                                    Self Description
                                </span>{" "}
                                is required to generate a personalized plan.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-8 py-5 border-t border-slate-100 bg-white">
                    <span className="text-sm text-slate-400">
                        AI-Powered Strategy Generation • Approx 30s
                    </span>
                    <button onClick={handleGenerateReport}
                        type="button" 
                        className="group relative rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-base font-semibold tracking-wide px-6 py-3 hover:shadow-lg hover:shadow-indigo-500/40 active:scale-95 transition-all duration-200 flex items-center gap-2 overflow-hidden"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <svg
                            className="w-4 h-4 relative"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.446a1 1 0 00-.363 1.118l1.287 3.957c.3.922-.755 1.688-1.538 1.118l-3.368-2.446a1 1 0 00-1.176 0l-3.368 2.446c-.783.57-1.838-.196-1.538-1.118l1.287-3.957a1 1 0 00-.363-1.118L2.063 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.958z" />
                        </svg>
                        <span className="relative">
                            Generate My Interview Strategy
                        </span>
                    </button>
                </div>
            </div>

            <div className="relative flex items-center justify-center gap-6 mt-8 text-sm text-slate-400">
                <span className="hover:text-indigo-500 cursor-pointer transition-colors">
                    Privacy Policy
                </span>
                <span className="hover:text-indigo-500 cursor-pointer transition-colors">
                    Terms of Service
                </span>
                <span className="hover:text-indigo-500 cursor-pointer transition-colors">
                    Help Center
                </span>
            </div>
        </div>
    );
}
