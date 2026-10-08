import { useState } from 'react';
import { Check, Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import AppNavbar from '../components/AppNavbar';

const inputClassName = 'w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20';

export default function Settings() {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: localStorage.getItem('userName') || '',
        email: localStorage.getItem('userEmail') || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPasswords, setShowPasswords] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setMessage('');
        setError('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { fullName, email, currentPassword, newPassword, confirmPassword } = formData;

        if (!fullName.trim() || !email.trim()) {
            setError('Name and email are required.');
            return;
        }

        if (newPassword || confirmPassword || currentPassword) {
            const storedPassword = localStorage.getItem('userPassword');
            if (storedPassword && currentPassword !== storedPassword) {
                setError('Your current password is incorrect.');
                return;
            }
            if (newPassword.length < 6) {
                setError('New password must be at least 6 characters long.');
                return;
            }
            if (newPassword !== confirmPassword) {
                setError('New passwords do not match.');
                return;
            }
            localStorage.setItem('userPassword', newPassword);
        }

        localStorage.setItem('userName', fullName.trim());
        localStorage.setItem('userEmail', email.trim());
        setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
        setMessage('Your account details have been updated.');
    };

    return (
        <div className="flex min-h-screen bg-slate-50/50 font-sans">
            <Sidebar isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={() => setIsMobileMenuOpen(false)} />
            <main className="flex-1 flex flex-col h-screen min-h-0 overflow-hidden">
                <AppNavbar title="Settings" breadcrumbs={[{ label: 'Settings', to: '/settings' }]} onMenuClick={() => setIsMobileMenuOpen(true)} />

                <div className="flex-1 min-h-0 overflow-y-auto px-4 py-5 sm:px-6 sm:py-8 lg:px-10 custom-scrollbar">
                    <div className="mx-auto w-full max-w-3xl">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-slate-800">Account Settings</h1>
                            <p className="mt-1 text-sm text-slate-500">Manage your personal information and password.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                                <h2 className="mb-5 text-lg font-semibold text-slate-800">Personal information</h2>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <label className="block">
                                        <span className="mb-1.5 block text-xs font-semibold text-slate-700">Full name</span>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                            <input className={`${inputClassName} pl-10`} name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your full name" />
                                        </div>
                                    </label>
                                    <label className="block">
                                        <span className="mb-1.5 block text-xs font-semibold text-slate-700">Email address</span>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                            <input className={`${inputClassName} pl-10`} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" />
                                        </div>
                                    </label>
                                </div>
                            </section>

                            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                                <div className="mb-5">
                                    <h2 className="text-lg font-semibold text-slate-800">Change password</h2>
                                    <p className="mt-1 text-xs text-slate-500">Leave these fields blank if you do not want to change your password.</p>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-3">
                                    {[
                                        ['currentPassword', 'Current password'],
                                        ['newPassword', 'New password'],
                                        ['confirmPassword', 'Confirm new password']
                                    ].map(([name, label]) => (
                                        <label className="block" key={name}>
                                            <span className="mb-1.5 block text-xs font-semibold text-slate-700">{label}</span>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                <input className={`${inputClassName} pr-10 pl-10`} type={showPasswords ? 'text' : 'password'} name={name} value={formData[name]} onChange={handleChange} placeholder="••••••••" />
                                                <button type="button" onClick={() => setShowPasswords(prev => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" aria-label={showPasswords ? 'Hide passwords' : 'Show passwords'}>
                                                    {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </button>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </section>

                            {(error || message) && (
                                <div className={`rounded-lg border p-3 text-sm ${error ? 'border-red-100 bg-red-50 text-red-600' : 'border-emerald-100 bg-emerald-50 text-emerald-700'}`}>
                                    {error || message}
                                </div>
                            )}

                            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <button type="button" onClick={() => navigate('/dashboard')} className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100">Cancel</button>
                                <button type="submit" className="flex items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-500">
                                    <Check className="h-4 w-4" /> Save changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}