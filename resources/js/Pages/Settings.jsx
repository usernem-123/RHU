import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Layout from "../components/Layout";

/* ───────── Section Card ───────── */
function SectionCard({ icon, title, subtitle, children }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                    {icon}
                </div>
                <div>
                    <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
                    <p className="text-xs text-gray-500">{subtitle}</p>
                </div>
            </div>
            <div className="p-5 space-y-4">
                {children}
            </div>
        </div>
    );
}

/* ───────── Field ───────── */
function Field({ label, children }) {
    return (
        <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">{label}</label>
            {children}
        </div>
    );
}

/* ───────── Input ───────── */
function Input({ type = "text", placeholder, value, onChange, disabled }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 disabled:bg-gray-50 disabled:text-gray-400"
        />
    );
}

/* ───────── Toast ───────── */
function Toast({ message, type, onClose }) {
    if (!message) return null;
    const isSuccess = type === "success";
    return (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium transition-all
            ${isSuccess ? "bg-green-600 text-white" : "bg-red-500 text-white"}`}>
            {isSuccess ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            )}
            {message}
            <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">✕</button>
        </div>
    );
}

/* ───────── Main Content ───────── */
function Content({ auth }) {
    const user = auth?.user ?? {};

    // Profile form
    const [profileForm, setProfileForm] = useState({
        name: user.name ?? "",
        username: user.username ?? "",
    });
    const [profileProcessing, setProfileProcessing] = useState(false);

    // Password form
    const [passwordForm, setPasswordForm] = useState({
        current_password: "",
        password: "",
        password_confirmation: "",
    });
    const [passwordProcessing, setPasswordProcessing] = useState(false);

    // Toast
    const [toast, setToast] = useState({ message: "", type: "" });

    const showToast = (message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast({ message: "", type: "" }), 3500);
    };
    const submitProfile = () => {
        setProfileProcessing(true);
        router.put("/settings/profile", profileForm, {
            onFinish: () => setProfileProcessing(false),
            onSuccess: () => showToast("Profile updated successfully."),
            onError: () => showToast("Failed to update profile.", "error"),
        });
    };

    const submitPassword = () => {
        if (passwordForm.password !== passwordForm.password_confirmation) {
            return showToast("Passwords do not match.", "error");
        }
        setPasswordProcessing(true);
        router.put("/settings/password", passwordForm, {
            onFinish: () => setPasswordProcessing(false),
            onSuccess: () => {
                showToast("Password changed successfully.");
                setPasswordForm({ current_password: "", password: "", password_confirmation: "" });
            },
            onError: () => showToast("Failed to change password.", "error"),
        });
    };

    return (
        <div>
            <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "" })} />

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Settings</h1>
                <p className="text-sm text-gray-500 mt-1">Manage your account information and security.</p>
            </div>

            <div className="max-w-2xl space-y-6">

                {/* Profile Section */}
                <SectionCard
                    icon={
                        <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    }
                    title="Profile Information"
                    subtitle="Update your name and username"
                >
                    {/* Avatar preview */}
                    <div className="flex items-center gap-4 pb-2">
                        <div className="w-12 h-12 rounded-full bg-green-200 text-green-800 text-lg font-bold flex items-center justify-center shrink-0 select-none">
                            {profileForm.name?.charAt(0).toUpperCase() || "?"}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700">{profileForm.name || "—"}</p>
                            <p className="text-xs text-gray-400">@{profileForm.username || "—"}</p>
                        </div>
                    </div>

                    <Field label="Full Name">
                        <Input
                            placeholder="Your full name"
                            value={profileForm.name}
                            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        />
                    </Field>

                    <Field label="Username">
                        <Input
                            placeholder="your_username"
                            value={profileForm.username}
                            onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
                        />
                    </Field>

                    <div className="flex justify-end pt-1">
                        <button
                            onClick={submitProfile}
                            disabled={profileProcessing}
                            className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-xl shadow-sm disabled:opacity-60"
                        >
                            {profileProcessing ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </SectionCard>

                {/* Password Section */}
                <SectionCard
                    icon={
                        <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    }
                    title="Change Password"
                    subtitle="Keep your account secure"
                >
                    <Field label="Current Password">
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={passwordForm.current_password}
                            onChange={(e) => setPasswordForm({ ...passwordForm, current_password: e.target.value })}
                        />
                    </Field>

                    <Field label="New Password">
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={passwordForm.password}
                            onChange={(e) => setPasswordForm({ ...passwordForm, password: e.target.value })}
                        />
                    </Field>

                    <Field label="Confirm New Password">
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={passwordForm.password_confirmation}
                            onChange={(e) => setPasswordForm({ ...passwordForm, password_confirmation: e.target.value })}
                        />
                    </Field>

                    <div className="flex justify-end pt-1">
                        <button
                            onClick={submitPassword}
                            disabled={passwordProcessing}
                            className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-xl shadow-sm disabled:opacity-60"
                        >
                            {passwordProcessing ? "Updating..." : "Update Password"}
                        </button>
                    </div>
                </SectionCard>

            </div>
        </div>
    );
}

/* ───────── Page ───────── */
export default function Settings() {
    const { auth } = usePage().props;

    return (
        <Layout>
            <Content auth={auth} />
        </Layout>
    );
}