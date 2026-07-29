import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function Login() {
    const navigate = useNavigate();

    const { loading, handleLogin } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        await handleLogin({ email, password });
        navigate("/");
    };

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-slate-100 overflow-hidden">
                <div className="absolute w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl -top-24 -left-20 animate-pulse"></div>

                <div className="absolute w-[28rem] h-[28rem] bg-blue-400/20 rounded-full blur-3xl -bottom-24 -right-20 animate-pulse"></div>

                <div className="relative flex flex-col items-center gap-8 bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl px-14 py-12 border border-white">
                    <div className="relative w-28 h-28">
                        <div className="absolute inset-0 rounded-full border-[6px] border-indigo-200"></div>

                        <div className="absolute inset-0 rounded-full border-[6px] border-transparent border-t-indigo-600 border-r-blue-500 animate-spin"></div>

                        <div className="absolute inset-3 rounded-full border-[5px] border-transparent border-b-indigo-500 border-l-blue-400 animate-spin [animation-direction:reverse] [animation-duration:1.2s]"></div>

                        <div className="absolute inset-8 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full animate-pulse"></div>
                    </div>

                    <div className="text-center">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                            Signing You In
                        </h2>

                        <p className="text-slate-500 text-lg mt-2">
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
        <div className="h-screen w-full flex items-center justify-center bg-slate-100 px-4 py-10">
            <div className="relative w-[80%] min-h-[80%] bg-white rounded-[30px] shadow-[0_5px_15px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col sm:flex-row">
                <div className="w-full sm:w-1/2 flex items-center justify-center order-2 sm:order-1">
                    <form
                        className="flex flex-col items-center justify-center h-full w-full px-8 sm:px-10 text-center py-10 sm:py-0 gap-8"
                        onSubmit={handleSubmit}
                    >
                        <h1 className="text-6xl font-bold text-slate-800">
                            Sign In
                        </h1>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={e => {
                                setEmail(e.target.value);
                            }}
                            className="w-1/2 h-16 bg-slate-100 border-none rounded-[5px] px-4 py-3 my-2 text-2xl text-slate-800 outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={e => {
                                setPassword(e.target.value);
                            }}
                            className="w-1/2 h-16 bg-slate-100 border-none rounded-[5px] px-4 py-3 my-2 text-2xl text-slate-800 outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                        <button
                            type="submit"
                            className=" rounded-[15px] border border-indigo-500 bg-indigo-500 text-center text-white text-2xl font-semibold tracking-wider hover:bg-indigo-600 active:scale-95 transition w-1/3 h-12"
                        >
                            Sign In
                        </button>
                    </form>
                </div>

                <div className="w-full sm:w-1/2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white flex flex-col items-center justify-center text-center sm:py-0 order-1  rounded-tl-[200px] rounded-bl-[200px] gap-6">
                    <h1 className="text-8xl font-bold mb-3">Hello, Friend!</h1>
                    <p className="text-3xl font-semibold text-indigo-100 mb-6 leading-relaxed">
                        Create an account and let AI help you <br />
                        craft a standout resume.
                    </p>
                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                        className=" w-1/5 py-2 rounded-lg border border-white bg-transparent text-white text-2xl  tracking-wider hover:bg-white active:scale-95"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}
