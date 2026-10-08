import { useState } from 'react';
import Navbar from '../components/Navbar';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import ForgotPasswordModal from '../components/ForgotPasswordModal';
import { ArrowRight, CalendarDays, CheckCircle2, LayoutDashboard, ListTodo } from 'lucide-react';

export default function Landing() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

    const openLogin = () => {
        setIsRegisterOpen(false);
        setIsLoginOpen(true);
        setIsForgotPasswordOpen(false);
    };

    const openRegister = () => {
        setIsLoginOpen(false);
        setIsRegisterOpen(true);
        setIsForgotPasswordOpen(false);
    };

    const openForgotPassword = () => {
        setIsLoginOpen(false);
        setIsForgotPasswordOpen(true);
    };

    const returnToLogin = () => {
        setIsForgotPasswordOpen(false);
        setIsLoginOpen(true);
    };

    const closeModals = () => {
        setIsLoginOpen(false);
        setIsRegisterOpen(false);
        setIsForgotPasswordOpen(false);
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-yellow-50/60 font-sans text-slate-800">
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-pink-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-48 -left-32 h-[28rem] w-[28rem] rounded-full bg-blue-200/30 blur-3xl" />
            <Navbar openLogin={openLogin} openRegister={openRegister} />
            
            <main className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 pb-12 pt-28 sm:px-8 lg:px-10">
                <div className="grid w-full items-center gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
                    <section className="max-w-2xl">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-3.5 py-2 text-xs font-semibold text-teal-700 shadow-sm backdrop-blur">
                            <CheckCircle2 className="h-4 w-4 text-teal-500" />
                            Simple planning for focused teams
                        </div>
                        <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                            Organize your work.
                            <span className="block bg-gradient-to-r from-blue-400 via-rose-400 to-yellow-300 bg-clip-text text-transparent">
                                Get more done.
                            </span>
                        </h1>
                        <p className="mt-6 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
                            Moodle brings projects, tasks, and deadlines together in one calm, focused workspace built for everyday progress.
                        </p>
                        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                            <button
                                onClick={openRegister}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-600 cursor-pointer"
                            >
                                Get started free <ArrowRight className="h-4 w-4" />
                            </button>
                            <button
                                onClick={openLogin}
                                className="rounded-xl border border-slate-200 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 cursor-pointer"
                            >
                                Log in to your workspace
                            </button>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-slate-400">
                            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-blue-500" /> Easy to use</span>
                            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-yellow-500" /> Stay on schedule</span>
                            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-pink-500" /> See progress clearly</span>
                        </div>
                    </section>

                    <section className="relative mx-auto w-full max-w-xl lg:ml-auto">
                        <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-blue-200/50 via-pink-200/40 to-yellow-200/50 blur-2xl" />
                        <div className="relative rounded-2xl border border-slate-200 bg-slate-50/95 p-4 shadow-2xl shadow-slate-300/40 backdrop-blur sm:p-5">
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-xs font-medium text-slate-400">Dashboard</p>
                                    <h2 className="mt-1 text-lg font-bold text-slate-800">Welcome back, User!</h2>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                <div className="rounded-2xl border border-slate-200 bg-white p-4"><p className="text-xs font-medium text-slate-400">Active projects</p><p className="mt-2 text-2xl font-bold text-slate-800">2</p><p className="mt-1 text-[10px] text-slate-400">View details</p></div>
                                <div className="rounded-2xl border border-slate-200 bg-white p-4"><p className="text-xs font-medium text-slate-400">Number of tasks</p><p className="mt-2 text-2xl font-bold text-slate-800">12</p><p className="mt-1 text-[10px] text-slate-400">View details</p></div>
                                <div className="rounded-2xl border border-slate-200 bg-white p-4"><p className="text-xs font-medium text-slate-400">Target completed</p><p className="mt-2 text-2xl font-bold text-pink-500">68%</p><p className="mt-1 text-[10px] text-slate-400">View details</p></div>
                            </div>
                            <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
                                <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
                                    <span className="rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm">Kanban</span>
                                    <span className="px-3 py-1.5 text-xs font-medium text-slate-400">List</span>
                                </div>
                                <div className="flex items-center gap-2 px-2 text-slate-400">
                                    <CalendarDays className="h-4 w-4" />
                                    <span className="text-xs font-medium">Upcoming tasks</span>
                                </div>
                            </div>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                <div className="rounded-xl border border-slate-200 bg-white p-3">
                                    <p className="mb-3 text-xs font-semibold text-slate-700">Not Started</p>
                                    <div className="rounded-lg border border-slate-100 p-3"><div className="h-2.5 w-3/4 rounded-full bg-slate-200" /><div className="mt-2 h-2 w-1/2 rounded-full bg-slate-100" /></div>
                                </div>
                                <div className="rounded-xl border border-slate-200 bg-white p-3">
                                    <p className="mb-3 text-xs font-semibold text-slate-700">In Progress</p>
                                    <div className="rounded-lg border border-slate-100 p-3"><div className="h-2.5 w-2/3 rounded-full bg-slate-200" /><div className="mt-2 h-2 w-1/3 rounded-full bg-slate-100" /></div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {isLoginOpen && (
                <LoginModal onClose={closeModals} switchToRegister={openRegister} switchToForgotPassword={openForgotPassword} />
            )}
            
            {isRegisterOpen && (
                <RegisterModal onClose={closeModals} switchToLogin={openLogin} />
            )}

            {isForgotPasswordOpen && (
                <ForgotPasswordModal onClose={closeModals} switchToLogin={returnToLogin} />
            )}
        </div>
    );
}