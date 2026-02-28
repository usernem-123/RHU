import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

const navItems = [
    { label: "Home", href: "/dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { label: "Transactions", href: "/transactions", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
    { label: "Records", href: "/records", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
    { label: "Settings", href: "/settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
];

export default function Dashboard() {
    const { url, auth } = usePage().props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            {/* ── Navbar ── */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo and brand */}
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <img
                                    src="/images/logo.png"
                                    alt="RHU Logo"
                                    className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
                                />
                            </div>
                            <span className="text-green-800 font-semibold text-lg hidden sm:block">
                                RHU Baroy
                            </span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navItems.map(({ label, href, icon }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2
                                        ${url === href
                                            ? "bg-green-100 text-green-800 shadow-sm"
                                            : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                                        }`}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                                    </svg>
                                    <span>{label}</span>
                                </Link>
                            ))}
                        </div>

                        {/* Right section */}
                        <div className="flex items-center space-x-3">
                            {/* User menu */}
                            <div className="flex items-center space-x-3">
                                
                                
                                {/* User avatar/pill */}
                                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-sm flex items-center space-x-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span className="hidden sm:inline">{auth?.user?.name?.split(' ')[0] ?? "User"}</span>
                                </div>

                                {/* Logout button */}
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                    title="Logout"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </Link>
                            </div>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isMobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden py-3 border-t border-green-100">
                            {navItems.map(({ label, href, icon }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors mb-1
                                        ${url === href
                                            ? "bg-green-100 text-green-800"
                                            : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                                        }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                                    </svg>
                                    <span>{label}</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </nav>

            {/* ── Main Content ── */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 rounded-xl">
                            <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard</h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Welcome back, {auth?.user?.name ?? "User"}! Here's what's happening with your RHU today.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Stats Card 1 */}
                    <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">1,234</h3>
                        <p className="text-sm text-gray-500">Total Patients</p>
                    </div>

                    {/* Stats Card 2 */}
                    <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">Today</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">48</h3>
                        <p className="text-sm text-gray-500">Appointments</p>
                    </div>

                    {/* Stats Card 3 */}
                    <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">156</h3>
                        <p className="text-sm text-gray-500">Pending Records</p>
                    </div>

                    {/* Stats Card 4 */}
                    <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">3</h3>
                        <p className="text-sm text-gray-500">Upcoming Tasks</p>
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center space-x-3 py-3 border-b border-gray-100 last:border-0">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600">New patient record added</p>
                                    <p className="text-xs text-gray-400">5 minutes ago</p>
                                </div>
                                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">New</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}