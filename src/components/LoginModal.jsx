import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import moodleLogo from '../assets/moodle-logo.png';

export default function LoginModal({ onClose, switchToRegister, switchToForgotPassword }) {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing again
        if (error) setError('');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields.');
            return;
        }

        const storedEmail = localStorage.getItem('userEmail');
        const storedPassword = localStorage.getItem('userPassword');

        if (storedEmail && storedEmail !== formData.email) {
            setError('No account was found with that email address.');
            return;
        }

        if (storedPassword && storedPassword !== formData.password) {
            setError('The password you entered is incorrect.');
            return;
        }

        if (!localStorage.getItem('userName')) {
            localStorage.setItem('userName', 'User');
        }
        localStorage.setItem('userEmail', formData.email);
        if (!storedPassword) {
            localStorage.setItem('userPassword', formData.password);
        }
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/dashboard');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[calc(100vh-2rem)] overflow-y-auto p-4 sm:p-8 relative animate-in fade-in zoom-in-95 duration-200">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                </button>

                <div className="flex justify-center mb-6">
                    <img
                        src={moodleLogo}
                        alt="Moodle"
                        className="h-auto w-36 object-contain"
                    />
                </div>

                <h2 className="text-2xl font-semibold text-center mb-2">Welcome Back</h2>
                <p className="text-center text-sm text-slate-500 mb-6">Log in to continue to Moodle</p>

                <form className="space-y-4" onSubmit={handleLogin}>
                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg border border-red-100 text-center">
                        {error}
                        </div>
                    )}
                    
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@gmail.com" 
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 text-sm placeholder-slate-400"
                        />
                    </div>
                    
                    <div>
                        <div className="flex justify-between items-center mb-1.5">
                            <label className="block text-xs font-semibold text-slate-700">Password</label>
                            <button type="button" onClick={switchToForgotPassword} className="text-xs text-slate-400 hover:text-blue-500">Forgot?</button>
                        </div>
                        <input 
                            type="password" 
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••" 
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 text-sm placeholder-slate-400"
                        />
                    </div>

                    <button type="submit" className="w-full bg-emerald-400 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg transition-colors mt-2">
                        Log In
                    </button>
                </form>

                <p className="text-center text-sm text-slate-500 mt-6">
                    Don't have an account? <button onClick={switchToRegister} className="text-slate-800 font-semibold hover:underline">Sign Up</button>
                </p>
            </div>
        </div>
    );
}