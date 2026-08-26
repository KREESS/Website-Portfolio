import React, { useEffect, useRef, useState } from 'react';

interface Milestone {
    id: number;
    year: string;
    title: string;
    role: string;
    organization: string;
    location?: string;
    description: string;
    highlights: string[];
    tech_stack: string[];
}

const MILESTONES: Milestone[] = [
    {
        id: 1,
        year: '2020 — 2021',
        title: 'The Journey Begins',
        role: 'Open Source Developer',
        organization: 'Developer Community',
        location: 'Remote',
        description: 'Started the coding journey from the ground up — mastering modern JavaScript, algorithms, and clean fundamentals through open-source contributions.',
        highlights: [
            'Authored 20+ public repositories on GitHub (@KREESS)',
            'Mastered ES6+, TypeScript typing, and responsive CSS systems',
        ],
        tech_stack: ['JavaScript', 'TypeScript', 'Git', 'Linux'],
    },
    {
        id: 2,
        year: '2021 — 2022',
        title: 'First Production Applications',
        role: 'Web Developer',
        organization: 'Client Projects',
        location: 'Indonesia',
        description: 'Shipped first real-world systems: a restaurant ordering & smart queue platform and the Insulmart e-commerce store, end to end.',
        highlights: [
            'Restaurant Ordering & Queue System with live kitchen tickets',
            'Insulmart E-Commerce with cart, invoices & admin inventory',
        ],
        tech_stack: ['PHP Native', 'Laravel', 'MySQL', 'Alpine.js'],
    },
    {
        id: 3,
        year: '2022 — 2023',
        title: 'Enterprise Laravel Systems',
        role: 'Full-Stack Engineer',
        organization: 'Academic & Commercial Systems',
        location: 'Indonesia',
        description: 'Built mission-critical platforms: the UTBK exam simulator with automated IRT scoring and the SIOBE accreditation monitoring engine.',
        highlights: [
            'UTBK Tryout System — timed modules & auto-scoring analytics',
            'SIOBE — curriculum outcome rubrics & accreditation PDF reports',
        ],
        tech_stack: ['Laravel', 'MySQL', 'Chart.js', 'Tailwind CSS'],
    },
    {
        id: 4,
        year: '2023 — 2024',
        title: 'Deep Learning Era',
        role: 'AI Engineer',
        organization: 'Independent Research',
        location: 'Bekasi, ID',
        description: 'Entered computer vision: engineered SmartSkin (Flutter + FastAPI) and a CNN acne severity classifier reaching 94%+ validation accuracy.',
        highlights: [
            'SmartSkin — real-time facial analysis mobile app',
            'CNN pipeline with OpenCV preprocessing & augmentation',
        ],
        tech_stack: ['Python', 'TensorFlow', 'FastAPI', 'Flutter'],
    },
    {
        id: 5,
        year: '2026',
        title: 'Thesis — Stock Recommendation System',
        role: 'Undergraduate Thesis',
        organization: 'Random Forest × Web',
        location: 'Indonesia',
        description: 'Skripsi project: a web-based stock recommendation system using the Random Forest algorithm to classify Buy / Hold / Sell signals and support data-driven investment decisions.',
        highlights: [
            'Engineered technical features from historical stock data (MA, RSI, MACD, volatility)',
            'Trained & evaluated Random Forest classifier with accuracy, precision & recall reports',
            'Delivered an interactive web dashboard presenting model-driven recommendations',
        ],
        tech_stack: ['Laravel', 'Python', 'Scikit-Learn', 'Random Forest', 'MySQL', 'Chart.js'],
    },
    {
        id: 6,
        year: 'Present',
        title: 'PT Tali Rejeki — Fullstack Developer',
        role: 'Current Position',
        organization: 'PT Tali Rejeki',
        location: 'Indonesia',
        description: 'Currently crafting production systems at PT Tali Rejeki — building and maintaining full-stack web applications from architecture to deployment.',
        highlights: [
            'Developing internal & client-facing web platforms',
            'Owning features end to end: API, database & frontend',
        ],
        tech_stack: ['Laravel', 'React', 'MySQL', 'REST API'],
    },
];

export const CareerSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let ticking = false;

        const compute = () => {
            ticking = false;
            const sec = sectionRef.current;
            if (!sec) return;

            const rect = sec.getBoundingClientRect();
            if (rect.height === 0) return;

            const vh = window.innerHeight || 1;
            const raw = (vh * 0.55 - rect.top) / rect.height;
            setProgress(Math.min(Math.max(raw, 0), 1));
        };

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(compute);
        };

        compute();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        const t = window.setTimeout(compute, 250);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            clearTimeout(t);
        };
    }, []);

    const total = MILESTONES.length;

    return (
        <section
            id="career"
            ref={sectionRef}
            className="py-32 relative overflow-hidden seedance-mesh border-t border-white/5"
        >
            <div className="absolute top-1/4 left-10 w-[550px] h-[550px] glow-orb-coral blur-[170px] pointer-events-none -z-10" />
            <div className="absolute bottom-1/4 right-10 w-[550px] h-[550px] glow-orb-purple blur-[170px] pointer-events-none -z-10" />

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col items-center text-center mb-24">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#2563eb] mb-4 backdrop-blur-md">
                        <span>MY JOURNEY</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight font-heading">
                        Project <span className="text-gradient-seedance">Journey</span>
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed font-sans font-light">
                        Every project is a mile on the road — follow the light as it travels from the first line of code to PT Tali Rejeki.
                    </p>
                    <div className="w-20 h-1 bg-gradient-to-r from-[#2563eb] via-[#0ea5e9] to-[#38bdf8] rounded-full mt-5"></div>
                </div>

                <div className="relative">
                    {/* Track */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 rounded-full bg-white/10 overflow-visible">
                        {/* Filled laser */}
                        <div
                            className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-[#2563eb] via-[#0ea5e9] to-[#38bdf8]"
                            style={{
                                height: `${progress * 100}%`,
                                boxShadow: '0 0 12px rgba(37,99,235,0.7), 0 0 28px rgba(14,165,233,0.45)',
                            }}
                        />
                        {/* Traveling light head */}
                        <div
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                            style={{ top: `${progress * 100}%` }}
                        >
                            <span className="block w-3.5 h-3.5 rounded-full bg-[#bfdbfe] shadow-[0_0_18px_8px_rgba(56,189,248,0.65)]" />
                            <span className="absolute inset-0 rounded-full animate-ping bg-[#38bdf8]/60" />
                        </div>

                        {/* Node dots on the spine */}
                        {MILESTONES.map((item, i) => {
                            const threshold = (i + 0.35) / total;
                            const active = progress >= threshold;
                            return (
                                <span
                                    key={item.id}
                                    className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full transition-all duration-300 ${
                                        active
                                            ? 'bg-[#38bdf8] scale-125 shadow-[0_0_14px_4px_rgba(56,189,248,0.6)]'
                                            : 'bg-gray-500'
                                    }`}
                                    style={{ top: `${((i + 0.35) / total) * 100}%` }}
                                />
                            );
                        })}
                    </div>

                    <div className="space-y-14 md:space-y-20">
                        {MILESTONES.map((item, index) => {
                            const isEven = index % 2 === 0;
                            const active = progress >= (index + 0.35) / total;

                            return (
                                <div
                                    key={item.id}
                                    className={`relative flex flex-col md:flex-row md:items-center ${
                                        isEven ? 'md:flex-row-reverse' : ''
                                    }`}
                                >
                                    <div className="w-full md:w-[calc(50%-40px)] pl-11 md:pl-0">
                                        <div
                                            className={`rounded-3xl border p-7 sm:p-8 transition-all duration-500 relative overflow-hidden ${
                                                active
                                                    ? 'seedance-card border-[#2563eb]/40 shadow-[0_0_36px_rgba(37,99,235,0.18)] opacity-100'
                                                    : 'bg-white/[0.02] border-white/10 opacity-60'
                                            }`}
                                        >
                                            <div
                                                className={`absolute -top-14 ${
                                                    isEven ? '-left-14' : '-right-14'
                                                } w-36 h-36 bg-gradient-to-br from-[#2563eb] to-[#38bdf8] rounded-full blur-3xl transition-opacity duration-500 ${
                                                    active ? 'opacity-25' : 'opacity-0'
                                                }`}
                                            />

                                            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                                <span className="text-xs font-mono font-bold text-white bg-white/[0.06] border border-white/10 px-3 py-1 rounded-lg">
                                                    {item.year}
                                                </span>
                                                <span className="text-[11px] font-mono uppercase tracking-wider text-[#38bdf8] bg-[#38bdf8]/10 px-2.5 py-0.5 rounded-md border border-[#38bdf8]/25">
                                                    {item.role}
                                                </span>
                                            </div>

                                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-heading leading-snug">
                                                {item.title}
                                            </h3>

                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400 font-mono mb-4">
                                                <span>{item.organization}</span>
                                                {item.location && (
                                                    <>
                                                        <span className="text-gray-600">/</span>
                                                        <span>{item.location}</span>
                                                    </>
                                                )}
                                            </div>

                                            <p className="text-gray-300 text-sm leading-relaxed mb-5 font-sans font-light">
                                                {item.description}
                                            </p>

                                            <ul className="space-y-2 mb-5 pt-4 border-t border-white/5">
                                                {item.highlights.map((point, hIdx) => (
                                                    <li key={hIdx} className="flex items-start gap-2.5 text-xs text-gray-300 font-sans font-light">
                                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#3b82f6] shrink-0" />
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="flex flex-wrap gap-1.5">
                                                {item.tech_stack.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="text-[11px] font-mono text-gray-300 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/5"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="hidden md:block md:w-[calc(50%-40px)]" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
