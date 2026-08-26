import React, { useState } from 'react';
import { 
    Mail, 
    Globe, 
    Send, 
    Copy, 
    Check, 
    Sparkles, 
    MessageCircle,
    ArrowUpRight,
    Lock
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { ToastContainer, useToast } from '../UI/Toast';

export const ContactSection: React.FC = () => {
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const { toasts, showToast, dismissToast } = useToast();

    const email = 'adityasholahuddin@gmail.com';

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 3000);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
            formData.subject || 'Portfolio Inquiry from ' + formData.name
        )}&body=${encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )}`;
        window.open(mailtoUrl, '_blank');
        showToast('info', 'Membuka aplikasi email Anda dengan draft siap kirim...');
    };

    const socialChannels = [
        {
            name: 'GitHub',
            handle: '@KREESS',
            url: 'https://github.com/KREESS',
            icon: FaGithub,
            color: 'hover:text-white',
        },
        {
            name: 'LinkedIn',
            handle: 'aditya-putra-sholahuddin',
            url: 'https://www.linkedin.com/in/aditya-putra-sholahuddin-717a8921a/',
            icon: FaLinkedin,
            color: 'hover:text-[#38bdf8]',
        },
        {
            name: 'Instagram',
            handle: '@xxaditptr_',
            url: 'https://www.instagram.com/xxaditptr_/',
            icon: FaInstagram,
            color: 'hover:text-[#2563eb]',
        },
        {
            name: 'X (Twitter)',
            handle: '@xxkreess',
            url: 'https://x.com/xxkreess',
            icon: FaXTwitter,
            color: 'hover:text-[#38bdf8]',
        },
    ];

    return (
        <section id="contact" className="py-28 relative overflow-hidden seedance-mesh">
            {/* Toast Notifications (top-right popups) */}
            <ToastContainer toasts={toasts} onDismiss={dismissToast} />

            {/* Background Glow Orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] glow-orb-coral blur-[180px] pointer-events-none -z-10" />

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#10b981] mb-4 backdrop-blur-md shadow-inner">
                        <span>CONTACT</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight font-heading">
                        Let's Build Something <span className="text-gradient-seedance">Great</span>
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed font-sans font-light">
                        Have a project, an idea, or a job opening? My inbox is always open.
                    </p>
                    <div className="w-20 h-1 bg-gradient-to-r from-[#2563eb] via-[#0ea5e9] to-[#38bdf8] rounded-full mt-5"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    
                    {/* Left Column: Direct Links & Socials */}
                    <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                        <div className="seedance-card p-7 sm:p-8 rounded-3xl border border-white/10 space-y-6">
                            <h3 className="text-xl font-bold text-white mb-2 font-heading">Direct Channels</h3>

                            {/* Email Card with Copy button */}
                            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between group">
                                <div className="flex items-center gap-3.5 overflow-hidden">
                                    <div className="w-11 h-11 rounded-2xl bg-[#2563eb]/15 border border-[#2563eb]/30 flex items-center justify-center text-[#3b82f6] shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <div className="text-[11px] font-mono text-gray-400">Direct Inquiries</div>
                                        <div className="text-xs sm:text-sm font-semibold text-white truncate font-mono mt-0.5">
                                            {email}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCopyEmail}
                                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all cursor-pointer shrink-0"
                                    title="Copy Email Address"
                                >
                                    {copiedEmail ? (
                                        <Check className="w-4 h-4 text-[#10b981]" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                </button>
                            </div>

                            {/* Website / Portfolio domain */}
                            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3.5">
                                <div className="w-11 h-11 rounded-2xl bg-[#0ea5e9]/15 border border-[#0ea5e9]/30 flex items-center justify-center text-purple-400 shrink-0">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-[11px] font-mono text-gray-400">Primary Domain</div>
                                    <div className="text-xs sm:text-sm font-semibold text-white font-mono mt-0.5">
                                        kreess.my.id
                                    </div>
                                </div>
                            </div>

                            {/* WhatsApp Direct */}
                            <a
                                href="https://api.whatsapp.com/send?phone=6285156474673&text=Halo%20Aditya,%20saya%20tertarik%20dengan%20portfolio%20Anda"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full p-4 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-between text-emerald-400 transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <MessageCircle className="w-5 h-5" />
                                    <span className="text-sm font-semibold">Direct WhatsApp Chat</span>
                                </div>
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                        </div>

                        {/* Social Channels Grid */}
                        <div className="grid grid-cols-2 gap-3.5">
                            {socialChannels.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <a
                                        key={item.name}
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="seedance-card p-4 rounded-2xl border border-white/10 flex items-center gap-3 group transition-all duration-300 hover:border-white/20"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-gray-300 group-hover:scale-110 transition-transform">
                                            <Icon className={`w-5 h-5 ${item.color}`} />
                                        </div>
                                        <div className="overflow-hidden">
                                            <div className="text-xs font-bold text-white group-hover:text-gray-100 truncate font-heading">
                                                {item.name}
                                            </div>
                                            <div className="text-[10px] text-gray-400 font-mono truncate">
                                                {item.handle}
                                            </div>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column: Send Email Form */}
                    <div className="lg:col-span-7">
                        <div className="seedance-card p-7 sm:p-9 rounded-3xl border border-white/10 shadow-2xl h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2 font-heading">Send a Message</h3>
                                <p className="text-xs text-gray-400 mb-6 font-sans">
                                    Fill this in and it opens your email app with everything ready to send.
                                </p>

                                <form onSubmit={handleFormSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                                Your Full Name
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. John Doe"
                                                value={formData.name}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, name: e.target.value })
                                                }
                                                className="w-full px-4 py-3 input-lux rounded-2xl text-sm transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                placeholder="name@company.com"
                                                value={formData.email}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, email: e.target.value })
                                                }
                                                className="w-full px-4 py-3 input-lux rounded-2xl text-sm transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                            Subject / Topic
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Project inquiry / job opportunity / collaboration"
                                            value={formData.subject}
                                            onChange={(e) =>
                                                setFormData({ ...formData, subject: e.target.value })
                                            }
                                            className="w-full px-4 py-3 input-lux rounded-2xl text-sm transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                            Message & Requirements
                                        </label>
                                        <textarea
                                            rows={4}
                                            required
                                            placeholder="Tell me about your project, timeline, and goals..."
                                            value={formData.message}
                                            onChange={(e) =>
                                                setFormData({ ...formData, message: e.target.value })
                                            }
                                            className="w-full px-4 py-3 input-lux rounded-2xl text-sm transition-all resize-none font-sans"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-4 px-6 rounded-2xl text-sm font-bold text-white keep-white bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#0ea5e9] hover:opacity-95 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5 shadow-xl shadow-[#2563eb]/25 cursor-pointer"
                                    >
                                        <span>Send Message</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
