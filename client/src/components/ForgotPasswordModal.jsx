import { useState } from 'react';
import { ArrowLeft, CheckCircle, Lock, Mail, X, Eye, EyeOff } from 'lucide-react';
import moodleLogo from '../assets/moodle-logo.png';

export default function ForgotPasswordModal({ onClose, switchToLogin }) {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState('email');
    const [error, setError] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const handleFindAccount = (event) => {
        event.preventDefault();
        const storedEmail = localStorage.getItem('userEmail');

        if (!email.trim()) {
            setError('Please enter your email address.');
            return;
        }
        if (!storedEmail || storedEmail.toLowerCase() !== email.trim().toLowerCase()) {
            setError('No account was found with that email address.');
            return;
        }

        setError('');
        setStep('password');
    };

    const handleResetPassword = (event) => {
        event.preventDefault();

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        localStorage.setItem('userPassword', newPassword);
        setError('');
        setStep('success');
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-2xl bg-white p-4 shadow-xl sm:p-8">
                <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 transition hover:text-slate-600" aria-label="Close forgot password dialog">
                    <X className="h-5 w-5" />
                </button>

                {step === 'success' ? (
                    <div className="flex flex-col items-center py-6 text-center">
                        <CheckCircle className="mb-5 h-14 w-14 text-teal-500" />
                        <h2 className="text-2xl font-semibold text-slate-800">Password updated</h2>
                        <p className="mt-2 mb-7 text-sm text-slate-500">You can now log in with your new password.</p>
                        <button onClick={switchToLogin} className="w-full rounded-lg bg-blue-500 py-2.5 font-medium text-white transition hover:bg-blue-600">
                            Return to Login
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 flex justify-center">
                            <img src={moodleLogo} alt="Moodle" className="h-auto w-36 object-contain" />
                        </div>
                        <h2 className="text-center text-2xl font-semibold text-slate-800">
                            {step === 'email' ? 'Forgot password?' : 'Create a new password'}
                        </h2>
                        <p className="mb-6 mt-2 text-center text-sm text-slate-500">
                            {step === 'email' ? 'Enter your account email to continue.' : `Set a new password for ${email.trim()}.`}
                        </p>

                        {error && <div className="mb-4 rounded-lg border border-red-100 bg-red-50 p-3 text-center text-sm text-red-600">{error}</div>}

                        {step === 'email' ? (
                            <form onSubmit={handleFindAccount} className="space-y-4">
                                <label className="block">
                                    <span className="mb-1.5 block text-xs font-semibold text-slate-700">Email address</span>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <input autoFocus type="email" value={email} onChange={(event) => { setEmail(event.target.value); setError(''); }} placeholder="name@example.com" className="w-full rounded-lg border border-slate-200 px-4 py-2.5 pl-10 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20" />
                                    </div>
                                </label>
                                <button type="submit" className="w-full rounded-lg bg-blue-500 py-2.5 font-medium text-white transition hover:bg-blue-600">Continue</button>
                            </form>
                        ) : (
                            <form onSubmit={handleResetPassword} className="space-y-4">
                                <label className="block">
                                    <span className="mb-1.5 block text-xs font-semibold text-slate-700">New password</span>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <input 
                                            autoFocus 
                                            type={showPassword ? "text" : "password"}  
                                            value={newPassword} 
                                            onChange={(event) => { setNewPassword(event.target.value); setError(''); }} 
                                            placeholder="At least 6 characters" 
                                            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 pl-10 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20" 
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </label>
                                <label className="block">
                                    <span className="mb-1.5 block text-xs font-semibold text-slate-700">Confirm new password</span>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <input 
                                            type={showPassword ? "text" : "password"} 
                                            value={confirmPassword} 
                                            onChange={(event) => { setConfirmPassword(event.target.value); setError(''); }} 
                                            placeholder="Repeat your password" 
                                            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 pl-10 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20" 
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </label>
                                <button type="submit" className="w-full rounded-lg bg-blue-500 py-2.5 font-medium text-white transition hover:bg-blue-600">Update password</button>
                            </form>
                        )}

                        <button onClick={step === 'email' ? switchToLogin : () => { setStep('email'); setError(''); }} className="mx-auto mt-6 flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-slate-800">
                            <ArrowLeft className="h-4 w-4" /> Back to login
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}