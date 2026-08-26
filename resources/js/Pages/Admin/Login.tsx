import React, { useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { Lock, Mail, ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '../../Components/UI/ThemeToggle';
import { ToastContainer, useToast } from '../../Components/UI/Toast';

export default function AdminLogin() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: true,
    });
    const { toasts, showToast, dismissToast } = useToast();

    // Show login failure as a top-right toast popup
    useEffect(() => {
        if (errors.email) showToast('error', errors.email);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors.email]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            <Head title="Admin Portal — Aditya Putra Sholahuddin" />

            {/* Toast Notifications (top-right popups) */}
            <ToastContainer toasts={toasts} onDismiss={dismissToast} />

            {/* Ambient background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] glow-orb-coral blur-[150px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-[380px] h-[380px] glow-orb-cyan blur-[130px] pointer-events-none" />

            {/* Theme switch */}
            <div className="absolute top-6 right-6 z-20">
                <ThemeToggle />
            </div>

            <div className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-3xl relative z-10 shadow-2xl">
                {/* Back to site */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Portfolio</span>
                </Link>

                <div className="text-center mb-8">
                    <img
                        src="/img/logo-adit.png"
                        alt="Logo"
                        className="h-16 w-auto object-contain mx-auto mb-4"
                    />
                    <h1 className="text-2xl font-bold text-white tracking-tight font-heading">Admin Portal</h1>
                    <p className="text-xs text-gray-400 mt-1.5">
                        Sign in to manage projects, skills, and comments.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                                <Mail className="w-4 h-4" />
                            </div>
                            <input
                                type="email"
                                required
                                autoFocus
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="you@example.com"
                                className="input-lux w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                                <Lock className="w-4 h-4" />
                            </div>
                            <input
                                type="password"
                                required
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Enter your password"
                                className="input-lux w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
                            />
                        </div>
                        {errors.password && (
                            <p className="text-xs text-red-400 mt-1">{errors.password}</p>
                        )}
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer text-gray-300 text-xs pt-1">
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded accent-[#2563eb]"
                        />
                        <span>Remember me</span>
                    </label>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white keep-white bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] hover:opacity-95 transition-all shadow-lg shadow-[#2563eb]/25 mt-2 cursor-pointer disabled:opacity-50"
                    >
                        <span>{processing ? 'Signing in...' : 'Sign In'}</span>
                    </button>
                </form>

                <div className="mt-8 pt-4 border-t border-white/5 text-center">
                    <p className="text-[11px] text-gray-500 font-mono">
                        Protected area &middot; authorized access only
                    </p>
                </div>
            </div>
        </div>
    );
}
