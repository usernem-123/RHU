import { usePage } from "@inertiajs/react";
import Layout from '../components/Layout';

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <Layout>
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
        </Layout>
    );
}