import React from 'react';
import { ArrowUp, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from '@inertiajs/react';

export const Footer: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="py-14 border-t border-white/10 relative bg-[#040307]">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    
                    {/* Left: Brand info */}
                    <div className="flex items-center gap-3.5">
                        <img
                            src="/img/logo-adit.png"
                            alt="Logo Aditya"
                            className="h-10 w-auto object-contain"
                        />
                        <div className="flex flex-col">
                            <span className="text-sm sm:text-base font-bold text-white tracking-wide font-heading">
                                Aditya Putra Sholahuddin
                            </span>
                            <span className="text-xs text-gray-400 font-mono">
                                @Kreess • Full-Stack & AI Architecture &copy; {new Date().getFullYear()}
                            </span>
                        </div>
                    </div>

                    {/* Center: Social links */}
                    <div className="flex items-center gap-3">
                        <a
                            href="https://github.com/KREESS"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-xl bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all border border-white/5"
                            aria-label="GitHub"
                        >
                            <FaGithub className="w-4 h-4" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/aditya-putra-sholahuddin-717a8921a/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-xl bg-white/[0.03] text-gray-400 hover:text-[#38bdf8] hover:bg-white/[0.08] transition-all border border-white/5"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin className="w-4 h-4" />
                        </a>
                        <a
                            href="https://www.instagram.com/xxaditptr_/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-xl bg-white/[0.03] text-gray-400 hover:text-[#2563eb] hover:bg-white/[0.08] transition-all border border-white/5"
                            aria-label="Instagram"
                        >
                            <FaInstagram className="w-4 h-4" />
                        </a>
                        <a
                            href="https://x.com/xxkreess"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-xl bg-white/[0.03] text-gray-400 hover:text-[#38bdf8] hover:bg-white/[0.08] transition-all border border-white/5"
                            aria-label="X"
                        >
                            <FaXTwitter className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Right: Back to top & admin entry */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/login"
                            className="text-xs font-mono text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1.5"
                        >
                            Admin Console
                        </Link>

                        <button
                            onClick={scrollToTop}
                            className="px-4 py-2.5 rounded-2xl seedance-card border border-white/10 text-gray-300 hover:text-white transition-all cursor-pointer flex items-center gap-2 text-xs font-semibold"
                            title="Back to Top"
                        >
                            <span>Back to top</span>
                            <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};
