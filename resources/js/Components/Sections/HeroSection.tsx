import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

interface HeroSectionProps {
    onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
            {/* Cinematic Chromatic Backlight Orbs */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] glow-orb-coral blur-[180px] pointer-events-none -z-10 animate-pulse-glow" />
            <div className="absolute top-1/3 -right-20 w-[550px] h-[550px] glow-orb-purple blur-[160px] pointer-events-none -z-10" />
            <div className="absolute bottom-10 -left-20 w-[500px] h-[500px] glow-orb-cyan blur-[160px] pointer-events-none -z-10" />

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left Column: Editorial Typography */}
                    <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full seedance-card border-white/10 mb-8 animate-float shadow-xl backdrop-blur-xl">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3b82f6] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2563eb]"></span>
                            </span>
                            <span className="text-xs font-mono tracking-wide text-gray-200">
                                Available for freelance & full-time opportunities
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 font-heading">
                            <span className="text-gray-400 font-light block text-2xl sm:text-3xl md:text-4xl mb-1 tracking-normal font-sans">
                                Hi, I'm
                            </span>
                            <span className="text-gradient-seedance">
                                Aditya Putra Sholahuddin
                            </span>
                            <span className="block text-2xl sm:text-3xl md:text-4xl font-medium text-gray-400 mt-2 tracking-tight font-sans">
                                Full-Stack Developer <span className="text-[#3b82f6]">&</span> AI Enthusiast
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg md:text-xl text-gray-300 font-normal max-w-2xl mb-8 leading-relaxed font-sans font-light">
                            I build websites, mobile apps, and AI solutions that help people work smarter.
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-10">
                            <span className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-gray-300 backdrop-blur-md">
                                Laravel 12 & React SPA
                            </span>
                            <span className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-gray-300 backdrop-blur-md">
                                CNN Deep Learning (Python)
                            </span>
                            <span className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-gray-300 backdrop-blur-md">
                                Flutter Native Mobile
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                            <button
                                onClick={() => onNavigate('projects')}
                                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold text-white keep-white bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#0ea5e9] hover:opacity-95 active:scale-95 transition-all duration-300 shadow-2xl shadow-[#2563eb]/30 flex items-center justify-center gap-3 group cursor-pointer"
                            >
                                <span>View My Work</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                            </button>

                            <button
                                onClick={() => onNavigate('contact')}
                                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-semibold text-gray-200 seedance-card hover:text-white flex items-center justify-center gap-2.5 cursor-pointer"
                            >
                                <span>Get in Touch</span>
                            </button>
                        </div>

                        <div className="mt-10 flex items-center gap-5 text-gray-400">
                            <span className="text-xs font-mono uppercase tracking-widest text-gray-500">Connect:</span>
                            <a
                                href="https://github.com/KREESS"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                                aria-label="GitHub Profile"
                            >
                                <FaGithub className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/aditya-putra-sholahuddin-717a8921a/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[#38bdf8] transition-colors"
                                aria-label="LinkedIn Profile"
                            >
                                <FaLinkedin className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.instagram.com/xxaditptr_/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[#3b82f6] transition-colors"
                                aria-label="Instagram Profile"
                            >
                                <FaInstagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Floating Cutout Portrait */}
                    <div className="lg:col-span-5 relative flex items-end justify-center pt-12 lg:pt-0">
                        <div className="relative w-full max-w-md lg:max-w-none lg:w-[70%] xl:w-[70%] flex justify-center">

                            {/* Ambient blue aura behind the figure */}
                            <div
                                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[460px] h-[540px] blur-3xl pointer-events-none"
                                style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.30) 0%, rgba(14,165,233,0.14) 45%, transparent 70%)' }}
                            />
                            {/* Floor light under feet */}
                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-72 h-9 rounded-[100%] bg-[#38bdf8]/30 blur-lg pointer-events-none" />

                            {/* Main cutout — full body, never cropped */}
                            <img
                                src="/img/hero.png"
                                alt="Aditya Putra Sholahuddin — Kreess"
                                className="relative z-10 w-full max-w-[400px] sm:max-w-[500px] lg:max-w-none h-auto select-none group-hover:scale-[1.02] transition-transform duration-[1200ms] ease-out"
                                style={{ filter: 'drop-shadow(0 26px 34px rgba(0,0,0,0.45))' }}
                            />

                            {/* Secondary cutout snapshot */}
                            <img
                                src="/img/hero1.png"
                                alt="Aditya — casual snapshot"
                                className="absolute top-6 -right-2 sm:-right-10 w-28 sm:w-32 h-auto rotate-6 z-20 select-none hover:rotate-3 transition-transform duration-500"
                                style={{ filter: 'drop-shadow(0 14px 20px rgba(0,0,0,0.42))' }}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
