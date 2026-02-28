import { useState } from "react";
import { router, usePage } from "@inertiajs/react";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { errors } = usePage().props;

    const handleLogin = (e) => {
        e.preventDefault();
        router.post("/login", { username, password });
    };

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row">
            {/* ── LEFT SIDE — Hero Section ── */}
            <div className="lg:flex-1 bg-gradient-to-br from-green-600 via-green-500 to-emerald-400 p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
            
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-40 -mb-40"></div>
                
                {/* Logo - Now properly centered */}
                <div className="relative z-10 flex justify-center"> {/* Changed from lg:justify-start to justify-center */}
                    <div className="p-4">
                        <img
                            src="/images/logo.png"
                            alt="RHU Logo"
                            className="w-48 h-48 lg:w-56 lg:h-56 object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>

                {/* Hero text */}
                <div className="relative z-10 text-white mb-12 lg:mb-0 text-center">
                    <p className="text-lg lg:text-xl text-white/90 max-w-md mx-auto">
                        Access your Rural Health Unit dashboard to manage appointments, records, and more.
                    </p>
                    
                    {/* Stats or features preview */}
                    <div className="mt-8 grid grid-cols-2 gap-4 max-w-sm mx-auto">
                        <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                            <div className="text-2xl font-bold">500+</div>
                            <div className="text-sm text-white/80">Patients</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                            <div className="text-2xl font-bold">24/7</div>
                            <div className="text-sm text-white/80">Support</div>
                        </div>
                    </div>
                </div>

                {/* Bottom info */}
                <div className="relative z-10 text-white/80 text-sm text-center">
                    <p>RHU - Baroy Health Information System</p>
                    <p className="text-white/60 text-xs mt-1">© 2026 All rights reserved</p>
                </div>
            </div>

            {/* ── RIGHT SIDE — Login Form ── */}
            <div className="lg:flex-1 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    {/* Form header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h2>
                        <p className="text-gray-600">Enter your credentials to access your account</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Username */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150"
                                    placeholder="Enter your username"
                                />
                            </div>
                            {errors?.username && (
                                <p className="text-red-600 text-sm mt-1 flex items-center">
                                    <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.username}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150"
                                    placeholder="Enter your password"
                                />
                            </div>
                            {errors?.password && (
                                <p className="text-red-600 text-sm mt-1 flex items-center">
                                    <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Forgot password link */}
                        <div className="flex items-center justify-end">
                            <a href="#" className="text-sm text-green-600 hover:text-green-800 hover:underline transition duration-150">
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}