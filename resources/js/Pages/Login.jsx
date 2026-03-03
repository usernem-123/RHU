import { useState } from "react";
import { router, usePage } from "@inertiajs/react";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { errors } = usePage().props;

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        router.post("/login", { username, password }, {
            onFinish: () => setIsLoading(false),
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden flex">

                {/* LEFT PANEL */}
                <div className="hidden md:flex md:w-5/12 bg-gradient-to-b from-green-800 to-green-600 flex-col justify-between p-8">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <img
                            src="/images/logo.png"
                            alt="RHU Logo"
                            className="w-10 h-10 object-contain brightness-0 invert opacity-90"
                        />
                        <div>
                            <p className="text-white font-semibold text-sm leading-tight">RHU Baroy</p>
                            <p className="text-green-200 text-xs tracking-widest uppercase">Health System</p>
                        </div>
                    </div>

                    {/* Hero */}
                    <div>
                        <h1 className="text-white text-2xl font-bold leading-snug mb-3">
                            Manage community health with ease.
                        </h1>
                        <p className="text-green-200 text-sm leading-relaxed mb-6">
                            Patient records, appointments, and health data — all in one secure place.
                        </p>
                        <div className="flex gap-3">
                            {[["500+", "Patients"], ["24/7", "Access"], ["100%", "Secure"]].map(([num, lbl]) => (
                                <div key={lbl} className="bg-white/10 border border-white/15 rounded-xl px-3 py-2">
                                    <p className="text-white font-bold text-base leading-none">{num}</p>
                                    <p className="text-green-200 text-xs mt-1">{lbl}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <p className="text-green-300/60 text-xs">© 2026 RHU Baroy · All rights reserved</p>
                </div>

                {/* RIGHT PANEL */}
                <div className="flex-1 flex flex-col justify-center px-8 py-10">
                    <div className="mb-7">
                        <h2 className="text-2xl font-bold text-gray-800">Welcome back</h2>
                        <p className="text-gray-500 text-sm mt-1">Sign in to your account to continue</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Username */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                                Username
                            </label>
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    autoComplete="username"
                                    className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border bg-gray-50 transition
                                        focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white
                                        ${errors?.username ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                                />
                            </div>
                            {errors?.username && (
                                <p className="flex items-center gap-1 text-red-500 text-xs mt-1.5">
                                    <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.username}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border bg-gray-50 transition
                                        focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white
                                        ${errors?.password ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                                />
                            </div>
                            {errors?.password && (
                                <p className="flex items-center gap-1 text-red-500 text-xs mt-1.5">
                                    <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Forgot */}
                        <div className="flex justify-end">
                            <a href="#" className="text-xs text-green-600 hover:text-green-800 hover:underline font-medium">
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2.5 bg-green-700 hover:bg-green-800 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition flex items-center justify-center gap-2 shadow-md shadow-green-200"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                    </svg>
                                    Signing in…
                                </>
                            ) : "Sign In"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}