import { useState } from "react";
import { useInterview } from "../hooks/useInterview.js";

export default function Interview() {
    const [activeSection, setActiveSection] = useState("technical");
    const [openTechnical, setOpenTechnical] = useState({});
    const [openBehavioral, setOpenBehavioral] = useState({});

    const severityStyles = {
        low: "bg-emerald-50 text-emerald-600 border-emerald-200",
        medium: "bg-amber-50 text-amber-600 border-amber-200",
        high: "bg-red-50 text-red-600 border-red-200"
    };

    const navItems = [
        { key: "technical", label: "Technical questions" },
        { key: "behavioral", label: "Behavioral questions" },
        { key: "roadmap", label: "Road map" }
    ];

    const toggleTechnical = i =>
        setOpenTechnical(prev => ({ ...prev, [i]: !prev[i] }));
    const toggleBehavioral = i =>
        setOpenBehavioral(prev => ({ ...prev, [i]: !prev[i] }));

    const renderQuestionCard = (q, i, isOpen, onToggle) => (
        <div
            key={i}
            className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:border-indigo-200 transition-colors duration-300"
        >
            <button
                type="button"
                onClick={() => onToggle(i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
            >
                <p className="text-slate-800 font-semibold leading-relaxed">
                    {q.question}
                </p>
                <svg
                    className={`w-5 h-5 text-indigo-500 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            <div
                className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="overflow-hidden">
                    <div className="flex flex-col gap-3 px-5 pb-5">
                        <div className="flex items-start gap-2">
                            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1 shrink-0">
                                Why
                            </span>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                {q.intention}
                            </p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 shrink-0">
                                Ideal answer
                            </span>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {q.answer}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const { report, loading } = useInterview();
if (loading || !report) {
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
        <div className="min-h-screen w-full bg-slate-100 relative overflow-hidden py-10 px-4">
            <div className="absolute w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl -top-24 -left-20 animate-pulse pointer-events-none"></div>
            <div className="absolute w-[28rem] h-[28rem] bg-blue-400/20 rounded-full blur-3xl -bottom-24 -right-20 animate-pulse pointer-events-none"></div>

            <div className="relative max-w-6xl mx-auto bg-white rounded-[30px] shadow-[0_5px_15px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col lg:flex-row min-h-[80vh]">
                {/* Left Sidebar: Nav */}
                <div className="w-full lg:w-1/5 bg-gradient-to-b from-indigo-500 to-blue-500 text-white flex flex-col gap-2 p-6 lg:rounded-tr-[60px] lg:rounded-br-[60px]">
                    <h2 className="text-lg font-bold mb-4 tracking-wide">
                        Interview Report
                    </h2>
                    {navItems.map(item => (
                        <button
                            key={item.key}
                            onClick={() => setActiveSection(item.key)}
                            className={`text-left px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 ${
                                activeSection === item.key
                                    ? "bg-white text-indigo-600 shadow-md"
                                    : "text-indigo-100 hover:bg-white/15"
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Center: Main Content */}
                <div className="w-full lg:w-3/5 p-6 sm:p-8 flex flex-col gap-4 border-x border-slate-100">
                    {activeSection === "technical" && (
                        <>
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">
                                Technical questions
                            </h2>
                            {report.technicalQuestions.map((q, i) =>
                                renderQuestionCard(
                                    q,
                                    i,
                                    !!openTechnical[i],
                                    toggleTechnical
                                )
                            )}
                        </>
                    )}

                    {activeSection === "behavioral" && (
                        <>
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">
                                Behavioral questions
                            </h2>
                            {report.behavioralQuestions.map((q, i) =>
                                renderQuestionCard(
                                    q,
                                    i,
                                    !!openBehavioral[i],
                                    toggleBehavioral
                                )
                            )}
                        </>
                    )}

                    {activeSection === "roadmap" && (
                        <>
                            <h2 className="text-2xl font-bold text-slate-800">
                                Road map
                            </h2>
                            {report.preparationPlan.map((d, i) => (
                                <div
                                    key={i}
                                    className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-3 hover:border-indigo-200 transition-colors duration-300"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-sm font-bold flex items-center justify-center shrink-0">
                                            {d.day}
                                        </span>
                                        <p className="text-slate-800 font-semibold">
                                            {d.focus}
                                        </p>
                                    </div>
                                    <ul className="flex flex-col gap-2 pl-12">
                                        {d.tasks.map((task, j) => (
                                            <li
                                                key={j}
                                                className="text-slate-600 text-sm leading-relaxed list-disc"
                                            >
                                                {task}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                {/* Right: Skill Gaps + Match Score */}
                <div className="w-full lg:w-1/5 p-6 flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-2 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-2xl p-5">
                        <span className="text-xs font-semibold text-indigo-500 tracking-wide">
                            Match score
                        </span>
                        <span className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                            {report.matchScore}%
                        </span>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-bold text-slate-700 tracking-wide">
                            Skill gaps
                        </h3>
                        {report.skillGap.map((s, i) => (
                            <div
                                key={i}
                                className={`flex items-center justify-between gap-2 border rounded-xl px-3 py-2 text-xs font-semibold ${
                                    severityStyles[s.severity]
                                }`}
                            >
                                <span className="truncate">{s.skill}</span>
                                <span className="uppercase text-[10px] shrink-0">
                                    {s.severity}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
