import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Layout from "../components/Layout";

/* ───────── Add Modal ───────── */
function AddModal({ patients, onClose }) {
    const [form, setForm] = useState({
        transaction_id: "",
        type: "",
        payment: "",
        patient_id: "",
    });

    const [processing, setProcessing] = useState(false);

    const submit = () => {
        if (!form.patient_id) return alert("Select patient");

        setProcessing(true);
        router.post("/transactions", form, {
            onFinish: () => setProcessing(false),
            onSuccess: () => onClose(),
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-5">

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-green-100 rounded-lg">
                            <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Add Transaction
                        </h2>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        ✕
                    </button>
                </div>

                <div className="space-y-4">

                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                            Patient
                        </label>
                        <select
                            value={form.patient_id}
                            onChange={(e) => setForm({ ...form, patient_id: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-300"
                        >
                            <option value="">Select patient...</option>
                            {patients.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <input
                        type="text"
                        placeholder="Transaction ID"
                        value={form.transaction_id}
                        onChange={(e) => setForm({ ...form, transaction_id: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-300"
                    />

                    <input
                        type="text"
                        placeholder="Type"
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-300"
                    />

                    <input
                        type="number"
                        placeholder="Payment"
                        value={form.payment}
                        onChange={(e) => setForm({ ...form, payment: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-300"
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm bg-gray-100 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={submit}
                        disabled={processing}
                        className="px-4 py-2 text-sm text-white bg-green-600 hover:bg-green-700 rounded-lg"
                    >
                        {processing ? "Adding..." : "Add Transaction"}
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ───────── Main ───────── */
function Content({ transactions, patients }) {
    const [showAdd, setShowAdd] = useState(false);
    const [search, setSearch] = useState("");

    const filtered = transactions.filter(
        (t) =>
            t.transaction_id?.toLowerCase().includes(search.toLowerCase()) ||
            t.type?.toLowerCase().includes(search.toLowerCase()) ||
            t.patient?.name?.toLowerCase().includes(search.toLowerCase())
    );

    const del = (id) => {
        if (confirm("Delete transaction?")) {
            router.delete(`/transactions/${id}`);
        }
    };

    return (
        <div>

            {showAdd && (
                <AddModal
                    patients={patients}
                    onClose={() => setShowAdd(false)}
                />
            )}

            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        Transactions
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage all transactions.
                    </p>
                </div>

                <button
                    onClick={() => setShowAdd(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-xl shadow-sm"
                >
                    Add Transaction
                </button>
            </div>

            {/* Card */}
            <div className="bg-white rounded-xl shadow-sm border border-green-100">

                <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-300"
                    />

                    <span className="text-xs font-medium text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
                        {filtered.length} transactions
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="bg-green-50 text-left text-xs font-semibold uppercase">
                                <th className="px-6 py-3">#</th>
                                <th className="px-6 py-3">Patient</th>
                                <th className="px-6 py-3">Transaction ID</th>
                                <th className="px-6 py-3">Type</th>
                                <th className="px-6 py-3">Payment</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filtered.map((t, i) => (
                                <tr key={t.id} className="hover:bg-green-50/50">
                                    <td className="px-6 py-4">{i + 1}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-green-200 text-green-800 text-xs font-bold flex items-center justify-center shrink-0">
                                                {t.patient?.name?.charAt(0).toUpperCase() ?? "?"}
                                            </div>

                                            <span className="text-gray-700 font-medium">
                                                {t.patient?.name ?? "—"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{t.transaction_id}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                            {t.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-semibold">
                                        ₱ {Number(t.payment).toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => del(t.id)}
                                            className="px-3 py-1 text-xs bg-red-50 text-red-700 rounded-lg"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

export default function Transactions() {
    const { transactions, patients } = usePage().props;

    return (
        <Layout>
            <Content transactions={transactions} patients={patients} />
        </Layout>
    );
}