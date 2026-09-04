import React from 'react';
import { MapPin, Sparkles, GraduationCap, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
    return (
        <section id="about" className="py-28 relative overflow-hidden seedance-mesh">
            {/* Background Ambient Glows */}
            <div className="absolute top-1/2 left-0 w-96 h-96 glow-orb-coral blur-[140px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-0 w-96 h-96 glow-orb-purple blur-[140px] pointer-events-none -z-10" />

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="flex flex-col items-center text-center mb-20">
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight font-heading">
                        About <span className="text-gradient-seedance">Me</span>
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base max-w-xl mt-4 leading-relaxed font-sans">
                        Full-stack developer from Indonesia who loves clean code, useful features, and fast, friendly products.
                    </p>
                    <div className="w-20 h-1 bg-gradient-to-r from-[#2563eb] via-[#0ea5e9] to-[#38bdf8] rounded-full mt-5"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                    
                    {/* Left Column: Clean Portrait */}
                    <div className="lg:col-span-5 flex flex-col items-center justify-between">

                        <div className="w-full relative group max-w-md flex justify-center">
                            {/* Ambient aura behind the figure */}
                            <div
                                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[320px] h-[360px] blur-3xl pointer-events-none"
                                style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.28) 0%, rgba(14,165,233,0.12) 45%, transparent 70%)' }}
                            />
                            {/* Floor light */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-52 h-6 rounded-[100%] bg-[#38bdf8]/25 blur-lg pointer-events-none" />

                            <img
                                src="/img/formal1.png"
                                alt="Aditya Putra Sholahuddin"
                                className="relative z-10 w-full max-w-sm h-auto select-none group-hover:scale-[1.02] transition-transform duration-[1200ms] ease-out"
                                style={{ filter: 'drop-shadow(0 24px 32px rgba(0,0,0,0.45))' }}
                            />
                        </div>

                        {/* Direct Personal Highlight Badge */}
                        <div className="w-full mt-6 seedance-card p-5 rounded-2xl border border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-3.5">
                                <div>
                                    <div className="text-xs font-mono text-gray-400">Education</div>
                                    <div className="text-sm font-bold text-white font-heading">
                                        Software Engineering Graduate
                                    </div>
                                </div>
                            </div>
                            <span className="text-xs font-mono text-[#38bdf8] bg-[#38bdf8]/10 px-2.5 py-1 rounded-lg border border-[#38bdf8]/20">
                                Distinction
                            </span>
                        </div>
                    </div>

                    {/* Right Column: Editorial Biography & Deep Expertise Highlights */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                        
                        {/* Main Editorial Card */}
                        <div className="seedance-card p-8 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                            
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3 font-heading">
                                What I Do
                            </h3>

                            <p className="text-gray-300 leading-relaxed mb-5 text-sm sm:text-base font-sans font-light">
                                Hi! I'm <strong className="text-white font-semibold">Aditya Putra Sholahuddin</strong>, known online as <strong className="text-[#3b82f6] font-mono">Kreess</strong>. I turn ideas into real products — websites, mobile apps, and smart tools people actually use.
                            </p>

                            <p className="text-gray-300 leading-relaxed mb-6 text-sm sm:text-base font-sans font-light">
                                On the web I work with <span className="text-white font-semibold">Laravel 12, React, Inertia.js, and TypeScript</span>; on mobile with <span className="text-white font-semibold">Flutter & Dart</span>; and for AI I train <span className="text-white font-semibold">CNN models in TensorFlow/Keras</span> for computer vision tasks.
                            </p>

                            {/* Passions & Engineering Tenets */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col justify-between hover:border-white/15 transition-all">
                                    <div className="text-xs font-bold text-white font-heading">AI & Deep Learning</div>
                                    <div className="text-xs text-gray-400 mt-1 font-sans">CNN models that can see and understand images</div>
                                </div>

                                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col justify-between hover:border-white/15 transition-all">
                                    <div className="text-xs font-bold text-white font-heading">Clean Architecture</div>
                                    <div className="text-xs text-gray-400 mt-1 font-sans">Solid APIs, secure databases, and tidy frontend code</div>
                                </div>
                            </div>
                        </div>

                        {/* Metric Highlights (Seedance Stat Counter) */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="seedance-card p-5 rounded-2xl text-center border border-white/10 group">
                                <div className="text-3xl sm:text-4xl font-extrabold text-gradient-seedance font-heading group-hover:scale-105 transition-transform">
                                    20+
                                </div>
                                <div className="text-[11px] sm:text-xs text-gray-400 font-mono mt-1">
                                    Shipped Projects
                                </div>
                            </div>

                            <div className="seedance-card p-5 rounded-2xl text-center border border-white/10 group">
                                <div className="text-3xl sm:text-4xl font-extrabold text-gradient-seedance font-heading group-hover:scale-105 transition-transform">
                                    15+
                                </div>
                                <div className="text-[11px] sm:text-xs text-gray-400 font-mono mt-1">
                                    Mastered Techs
                                </div>
                            </div>

                            <div className="seedance-card p-5 rounded-2xl text-center border border-white/10 group">
                                <div className="text-3xl sm:text-4xl font-extrabold text-gradient-seedance font-heading group-hover:scale-105 transition-transform">
                                    100%
                                </div>
                                <div className="text-[11px] sm:text-xs text-gray-400 font-mono mt-1">
                                    Craft & Polish
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};
