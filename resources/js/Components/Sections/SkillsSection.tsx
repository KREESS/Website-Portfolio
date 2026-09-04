import React, { useState } from 'react';
import {
    Code2,
    Layers,
    Database,
    Wrench,
    CheckCircle2,
    Terminal,
    Cpu,
    Boxes
} from 'lucide-react';

export interface SkillItem {
    id: number;
    name: string;
    category: string;
    level: string;
    badge?: string | null;
    icon?: string | null;
    color?: string | null;
    description?: string | null;
    proficiency: number;
    is_featured: boolean;
    sort_order: number;
}

// Level styling metadata (chip color per mastery level)
const levelMeta: Record<string, string> = {
    'Basic': 'bg-white/[0.06] text-gray-400 border-white/10',
    'Intermediate': 'bg-[#38bdf8]/10 text-[#38bdf8] border-[#38bdf8]/25',
    'Advanced': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
    'Expert': 'bg-amber-500/10 text-amber-400 border-amber-500/25',
};

interface SkillsSectionProps {
    skills?: SkillItem[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills = [] }) => {
    const [activeTab, setActiveTab] = useState<string>('all');

    // Category Metadata for Seedance Style
    const categoryMeta: Record<string, { icon: React.ElementType; color: string; desc: string }> = {
        'Languages': {
            icon: Code2,
            color: '#2563eb',
            desc: 'Foundational syntax & algorithmic engines for high-performance backends and scripts.',
        },
        'Frameworks & Frontend': {
            icon: Layers,
            color: '#0ea5e9',
            desc: 'Modern web architectures, reactive client libraries, and native cross-platform UI engines.',
        },
        'Databases & Storage': {
            icon: Database,
            color: '#38bdf8',
            desc: 'Relational data stores, ACID compliance, query optimizations, and caching layers.',
        },
        'DevOps, AI & Tools': {
            icon: Cpu,
            color: '#10b981',
            desc: 'Deep learning frameworks, containerized deployments, automated pipelines, and developer tooling.',
        },
    };

    // Group skills
    const categoriesMap: Record<string, SkillItem[]> = {};
    skills.forEach((skill) => {
        const cat = skill.category || 'Other';
        if (!categoriesMap[cat]) {
            categoriesMap[cat] = [];
        }
        categoriesMap[cat].push(skill);
    });

    const categoryNames = Object.keys(categoriesMap);
    const displayedCategories = activeTab === 'all'
        ? categoryNames
        : categoryNames.filter((cat) => cat.toLowerCase().includes(activeTab.toLowerCase()));

    return (
        <section id="skills" className="py-28 relative overflow-hidden seedance-mesh">
            {/* Ambient Lighting & Luxury Seedance Glows */}
            <div className="absolute top-1/3 left-0 w-[500px] h-[500px] glow-orb-purple blur-[150px] pointer-events-none -z-10" />
            <div className="absolute bottom-10 right-0 w-[500px] h-[500px] glow-orb-coral blur-[150px] pointer-events-none -z-10" />

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Title Header Moncy/Seedance Luxury Clean Aesthetics */}
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight font-heading">
                        Skills & <span className="text-gradient-seedance">Technologies</span>
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed font-sans font-light">
                        The tools I reach for every day to design, build, and ship products.
                    </p>
                    <div className="w-20 h-1 bg-gradient-to-r from-[#2563eb] via-[#0ea5e9] to-[#38bdf8] rounded-full mt-5"></div>
                </div>

                {/* Filter Category Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${activeTab === 'all'
                                ? 'bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#0ea5e9] text-white keep-white shadow-xl shadow-[#2563eb]/25 border border-white/20 scale-105'
                                : 'text-gray-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/5'
                            }`}
                    >
                        All Capabilities ({skills.length})
                    </button>
                    {categoryNames.map((catName) => {
                        const count = categoriesMap[catName]?.length || 0;
                        const isCurrent = activeTab === catName;
                        return (
                            <button
                                key={catName}
                                onClick={() => setActiveTab(catName)}
                                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${isCurrent
                                        ? 'bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] text-white keep-white shadow-xl shadow-purple-500/25 border border-white/20 scale-105'
                                        : 'text-gray-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/5'
                                    }`}
                            >
                                {catName} ({count})
                            </button>
                        );
                    })}
                </div>

                {/* Skills Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {displayedCategories.map((categoryName) => {
                        const meta = categoryMeta[categoryName] || {
                            icon: Boxes,
                            color: '#0ea5e9',
                            desc: 'Specialized frameworks and modular architecture libraries',
                        };
                        const Icon = meta.icon;
                        const catSkills = categoriesMap[categoryName] || [];

                        return (
                            <div
                                key={categoryName}
                                className="seedance-card p-7 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between group relative overflow-hidden"
                            >
                                {/* Subtle Glow Spot */}
                                <div
                                    className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-20 group-hover:opacity-35 transition-opacity"
                                    style={{ backgroundColor: meta.color }}
                                />

                                <div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div
                                            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 duration-300"
                                            style={{
                                                backgroundColor: `${meta.color}15`,
                                                border: `1px solid ${meta.color}35`,
                                                boxShadow: `0 10px 25px -8px ${meta.color}40`,
                                            }}
                                        >
                                            <Icon className="w-7 h-7" style={{ color: meta.color }} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white font-heading">
                                                {categoryName}
                                            </h3>
                                            <p className="text-xs text-gray-400 font-sans mt-0.5 max-w-sm">
                                                {meta.desc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Skills Cards with Level & Proficiency */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {catSkills.map((skill) => {
                                            const accent = skill.color || meta.color;
                                            const levelClass = levelMeta[skill.level] || levelMeta['Basic'];
                                            return (
                                                <div
                                                    key={skill.id}
                                                    title={skill.description || skill.name}
                                                    className="p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 transition-all duration-200 group/item hover:scale-[1.02]"
                                                >
                                                    {/* Name + Badge */}
                                                    <div className="flex items-center justify-between gap-2">
                                                        <span className="text-gray-100 font-mono text-xs truncate">
                                                            {skill.name}
                                                        </span>
                                                        {skill.badge && (
                                                            <span
                                                                className="text-[10px] px-2 py-0.5 rounded-md font-mono font-semibold shrink-0"
                                                                style={{
                                                                    backgroundColor: `${accent}15`,
                                                                    color: accent,
                                                                    border: `1px solid ${accent}25`,
                                                                }}
                                                            >
                                                                {skill.badge}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Level Chip */}
                                                    <div className="mt-2.5 flex items-center">
                                                        <span
                                                            className={`text-[10px] px-2 py-0.5 rounded-md font-mono font-semibold border ${levelClass}`}
                                                        >
                                                            {skill.level}
                                                        </span>
                                                    </div>

                                                    {/* Proficiency Bar */}
                                                    <div className="mt-2 flex items-center gap-2">
                                                        <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                                                            <div
                                                                className="h-full rounded-full transition-all duration-700 group-hover/item:brightness-125"
                                                                style={{
                                                                    width: `${Math.min(Math.max(skill.proficiency || 0, 0), 100)}%`,
                                                                    backgroundColor: accent,
                                                                    boxShadow: `0 0 8px ${accent}60`,
                                                                }}
                                                            />
                                                        </div>
                                                        <span className="text-[10px] font-mono font-semibold text-gray-300 shrink-0 w-8 text-right">
                                                            {skill.proficiency}%
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500 font-mono">
                                    <span className="flex items-center gap-1.5 text-gray-400">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" /> Enterprise Grade
                                    </span>
                                    <span className="text-gray-400 font-medium">Production Tested</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

