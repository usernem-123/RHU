import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import Layout from '../components/Layout';

// ── Helpers ────────────────────────────────────────────────────────────────
function Avatar({ name }) {
    return (
        <div className="w-8 h-8 rounded-full bg-green-200 text-green-800 text-xs font-bold flex items-center justify-center shrink-0">
            {name?.charAt(0).toUpperCase() ?? '?'}
        </div>
    );
}

// Calculates age from a birthday string
function calcAge(birthday) {
    if (!birthday) return '—';
    const today = new Date();
    const birth = new Date(birthday);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

function formatDate(dateStr) {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-PH', {
        year: 'numeric', month: 'short', day: 'numeric',
    });
}

// ── Shared Modal Shell ─────────────────────────────────────────────────────
function Modal({ title, icon, iconColor, iconStroke, onClose, children, wide = false }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div className={`bg-white rounded-2xl shadow-xl w-full ${wide ? 'max-w-lg' : 'max-w-md'} p-6 space-y-5`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className={`p-1.5 ${iconColor} rounded-lg`}>
                            <svg className={`w-4 h-4 ${iconStroke}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {icon}
                            </svg>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

// ── Shared Form Fields ─────────────────────────────────────────────────────
function PatientFields({ form, set }) {
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Full Name</label>
                <input type="text" value={form.name} onChange={set('name')}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
                    placeholder="e.g. Juan Dela Cruz" />
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Gender</label>
                    <select value={form.gender} onChange={set('gender')}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent bg-white">
                        <option value="">Select...</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Birthday {form.birthday && <span className="text-green-600 font-semibold">· Age {calcAge(form.birthday)}</span>}
                    </label>
                    <input type="date" value={form.birthday} onChange={set('birthday')}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent" />
                </div>
            </div>
            <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Contact Number</label>
                <input type="text" value={form.contact_number} onChange={set('contact_number')}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
                    placeholder="e.g. 09XX XXX XXXX" />
            </div>
            <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Address</label>
                <textarea value={form.address} onChange={set('address')} rows={2}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent resize-none"
                    placeholder="Full address" />
            </div>
        </div>
    );
}

// ── Shared Modal Actions ───────────────────────────────────────────────────
function ModalActions({ onClose, onSubmit, processing, submitLabel, submitColor }) {
    return (
        <div className="flex justify-end gap-2 pt-1">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                Cancel
            </button>
            <button onClick={onSubmit} disabled={processing}
                className={`px-4 py-2 text-sm font-medium text-white ${submitColor} disabled:opacity-60 rounded-lg transition-colors`}>
                {processing ? 'Saving...' : submitLabel}
            </button>
        </div>
    );
}

// ── Add Modal ──────────────────────────────────────────────────────────────
function AddModal({ onClose }) {
    const [form, setForm] = useState({ name: '', address: '', gender: '', contact_number: '', birthday: '' });
    const [processing, setProcessing] = useState(false);
    const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

    const handleSubmit = () => {
        if (!form.name) return alert('Name is required.');
        setProcessing(true);
        router.post('/patients', form, {
            onFinish: () => setProcessing(false),
            onSuccess: () => onClose(),
        });
    };

    return (
        <Modal title="Add Patient" iconColor="bg-green-100" iconStroke="text-green-700" onClose={onClose}
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />}>
            <PatientFields form={form} set={set} />
            <ModalActions onClose={onClose} onSubmit={handleSubmit} processing={processing}
                submitLabel="Add Patient" submitColor="bg-green-600 hover:bg-green-700" />
        </Modal>
    );
}

// ── Edit Modal ─────────────────────────────────────────────────────────────
function EditModal({ patient, onClose }) {
    const [form, setForm] = useState({
        name: patient.name ?? '',
        address: patient.address ?? '',
        gender: patient.gender ?? '',
        contact_number: patient.contact_number ?? '',
        birthday: patient.birthday ?? '',
    });
    const [processing, setProcessing] = useState(false);
    const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

    const handleSubmit = () => {
        setProcessing(true);
        router.patch(`/patients/${patient.id}`, form, {
            onFinish: () => setProcessing(false),
            onSuccess: () => onClose(),
        });
    };

    return (
        <Modal title="Edit Patient" iconColor="bg-blue-100" iconStroke="text-blue-700" onClose={onClose}
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />}>
            <PatientFields form={form} set={set} />
            <ModalActions onClose={onClose} onSubmit={handleSubmit} processing={processing}
                submitLabel="Save Changes" submitColor="bg-blue-600 hover:bg-blue-700" />
        </Modal>
    );
}

// ── View Records Modal ─────────────────────────────────────────────────────
function ViewRecordsModal({ patient, onClose }) {
    const records = patient.records ?? [];
    return (
        <Modal title={`${patient.name}'s Records`} iconColor="bg-purple-100" iconStroke="text-purple-700" onClose={onClose} wide
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />}>
            {records.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-10 text-gray-400">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-sm font-medium">No records found</p>
                    <p className="text-xs">This patient has no records yet.</p>
                </div>
            ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                    {records.map((record) => (
                        <div key={record.id} className="p-3 rounded-xl border border-gray-100 bg-gray-50 space-y-1">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {record.type}
                            </span>
                            <p className="text-sm text-gray-600">{record.description}</p>
                        </div>
                    ))}
                </div>
            )}
            <div className="flex justify-end pt-2">
                <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    Close
                </button>
            </div>
        </Modal>
    );
}

// ── Main Content ───────────────────────────────────────────────────────────
function Content({ patients }) {
    const [search, setSearch] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingPatient, setEditingPatient] = useState(null);
    const [viewingPatient, setViewingPatient] = useState(null);

    const filtered = patients.filter((p) =>
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.address?.toLowerCase().includes(search.toLowerCase()) ||
        p.contact_number?.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure? This will also delete all associated records.')) {
            router.delete(`/patients/${id}`);
        }
    };

    return (
        <div>
            {/* Modals */}
            {showAddModal && <AddModal onClose={() => setShowAddModal(false)} />}
            {editingPatient && <EditModal patient={editingPatient} onClose={() => setEditingPatient(null)} />}
            {viewingPatient && <ViewRecordsModal patient={viewingPatient} onClose={() => setViewingPatient(null)} />}

            {/* Page Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 rounded-xl">
                            <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Patients</h1>
                            <p className="text-sm text-gray-500 mt-1">Manage and view all registered patients.</p>
                        </div>
                    </div>
                    <button onClick={() => setShowAddModal(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-xl transition-colors shadow-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Patient
                    </button>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-xl shadow-sm border border-green-100">
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-gray-100">
                    <div className="relative w-full sm:w-72">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                        </svg>
                        <input type="text" placeholder="Search by name, address, contact..."
                            value={search} onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent" />
                    </div>
                    <span className="text-xs font-medium text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full whitespace-nowrap">
                        {filtered.length} {filtered.length === 1 ? 'patient' : 'patients'}
                    </span>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="bg-green-50 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                <th className="px-6 py-3">#</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Gender</th>
                                <th className="px-6 py-3">Birthday</th>
                                <th className="px-6 py-3">Age</th>
                                <th className="px-6 py-3">Contact</th>
                                <th className="px-6 py-3">Address</th>
                                <th className="px-6 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filtered.length > 0 ? (
                                filtered.map((patient, index) => (
                                    <tr key={patient.id} className="hover:bg-green-50/50 transition-colors">
                                        <td className="px-6 py-4 text-gray-400 font-medium">{index + 1}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Avatar name={patient.name} />
                                                <span className="font-medium text-gray-800">{patient.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                                ${patient.gender === 'Male' ? 'bg-blue-100 text-blue-800' :
                                                  patient.gender === 'Female' ? 'bg-pink-100 text-pink-800' :
                                                  'bg-gray-100 text-gray-700'}`}>
                                                {patient.gender ?? '—'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{formatDate(patient.birthday)}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                {calcAge(patient.birthday)} yrs
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{patient.contact_number ?? '—'}</td>
                                        <td className="px-6 py-4 text-gray-600 max-w-[180px] truncate">{patient.address ?? '—'}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button onClick={() => setViewingPatient(patient)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    Records
                                                </button>
                                                <button onClick={() => setEditingPatient(patient)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDelete(patient.id)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center gap-2 text-gray-400">
                                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8z" />
                                            </svg>
                                            <p className="text-sm font-medium">No patients found</p>
                                            <p className="text-xs">Try adjusting your search or add a new patient.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default function Patients() {
    const { patients } = usePage().props;
    return (
        <Layout>
            <Content patients={patients} />
        </Layout>
    );
}