import React, { useState } from 'react';
import { 
    ExternalLink, 
    Sparkles, 
    ArrowUpRight,
    Smartphone,
    Bot,
    Utensils,
    BookOpen,
    GraduationCap,
    Store,
    Code2,
    Layers,
    Cpu,
    ArrowRight
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export interface ProjectItem {
    id: number;
    slug: string;
    title: string;
    category: string;
    description: string;
    long_description?: string | null;
    tech_stack: string[];
    github_url?: string | null;
    live_url?: string | null;
    icon_name?: string | null;
    gradient?: string | null;
    is_featured: boolean;
    sort_order: number;
}

interface ProjectsSectionProps {
    projects?: ProjectItem[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects = [] }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

    // Dynamic icon resolver
    const getProjectIcon = (name?: string | null) => {
        switch (name) {
            case 'Bot':
                return Bot;
            case 'Utensils':
                return Utensils;
            case 'BookOpen':
                return BookOpen;
            case 'GraduationCap':
                return GraduationCap;
            case 'Store':
                return Store;
            case 'Cpu':
                return Cpu;
            case 'Layers':
                return Layers;
            case 'Smartphone':
            default:
                return Smartphone;
        }
    };

    // Calculate dynamic categories from available projects
    const allCategories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

    const MAX_PROJECTS = 9;

    const filteredProjects = (selectedCategory === 'All'
        ? projects
        : projects.filter((p) => p.category === selectedCategory)
    ).slice(0, MAX_PROJECTS);

    return (
        <section id="projects" className="py-28 relative overflow-hidden seedance-mesh">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 right-0 w-[550px] h-[550px] glow-orb-coral blur-[160px] pointer-events-none -z-10" />
            <div className="absolute bottom-10 left-0 w-[500px] h-[500px] glow-orb-cyan blur-[160px] pointer-events-none -z-10" />

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#38bdf8] mb-4 backdrop-blur-md shadow-inner">
                        <span>SELECTED WORK</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight font-heading">
                        Featured <span className="text-gradient-seedance">Projects</span>
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed font-sans font-light">
                        Real projects with real users — these are the ones I'm proudest of.
                    </p>
                    <div className="w-20 h-1 bg-gradient-to-r from-[#2563eb] via-[#0ea5e9] to-[#38bdf8] rounded-full mt-5"></div>
                </div>

                {/* Filter Category Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
                    {allCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                                selectedCategory === cat
                                    ? 'bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#0ea5e9] text-white keep-white shadow-xl shadow-[#2563eb]/25 border border-white/20 scale-105'
                                    : 'text-gray-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/5'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                {filteredProjects.length === 0 ? (
                    <div className="seedance-card p-16 rounded-3xl text-center border border-white/10 max-w-lg mx-auto">
                        <Code2 className="w-14 h-14 text-gray-500 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-gray-300 font-heading">No projects in this category</h4>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => {
                            const Icon = getProjectIcon(project.icon_name);
                            const gradient = project.gradient || 'from-[#2563eb] to-[#0ea5e9]';

                            return (
                                <div
                                    key={project.id}
                                    className="seedance-card rounded-3xl p-7 border border-white/10 flex flex-col justify-between group relative overflow-hidden"
                                >
                                    {/* Top Ambient Glow Spot */}
                                    <div
                                        className={`absolute -top-14 -right-14 w-40 h-40 bg-gradient-to-br ${gradient} opacity-20 rounded-full blur-2xl group-hover:opacity-40 transition-opacity`}
                                    />

                                    <div>
                                        {/* Card Header: Icon & Category */}
                                        <div className="flex items-center justify-between mb-5">
                                            <div
                                                className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${gradient} p-0.5 flex items-center justify-center shadow-xl shadow-black/50 group-hover:scale-105 transition-transform duration-300`}
                                            >
                                                <div className="w-full h-full bg-[#0e0c16] rounded-[14px] flex items-center justify-center text-white keep-white">
                                                    <Icon className="w-6 h-6 text-white keep-white" />
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {project.is_featured && (
                                                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#2563eb]/15 text-[#3b82f6] border border-[#2563eb]/30">
                                                        FEATURED
                                                    </span>
                                                )}
                                                <span className="text-[11px] font-mono text-gray-400 px-2.5 py-0.5 rounded-md bg-white/[0.04]">
                                                    {project.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Title & Description */}
                                        <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-[#3b82f6] transition-colors font-heading leading-snug">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-6 font-sans font-light">
                                            {project.description}
                                        </p>

                                        {/* Tech Tags */}
                                        <div className="flex flex-wrap gap-1.5 mb-6">
                                            {project.tech_stack?.map((t) => (
                                                <span
                                                    key={t}
                                                    className="text-[11px] font-mono text-gray-300 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/5"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Footer Links */}
                                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                        {project.github_url ? (
                                            <a
                                                href={project.github_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
                                            >
                                                <FaGithub className="w-4 h-4" />
                                                <span>Source Code</span>
                                            </a>
                                        ) : (
                                            <span className="text-xs text-gray-500 font-mono">Internal / Private</span>
                                        )}

                                        <button
                                            onClick={() => setSelectedProject(project)}
                                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3b82f6] hover:text-white transition-colors cursor-pointer group/btn"
                                        >
                                            <span>Deep Dive</span>
                                            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Project Detail Modal */}
            {selectedProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
                    <div className="seedance-card w-full max-w-2xl rounded-3xl p-7 sm:p-9 border border-white/20 bg-[#0d0c15] shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-5 right-5 text-gray-400 hover:text-white w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center transition-colors cursor-pointer"
                        >
                            ✕
                        </button>

                        <div className="flex items-center gap-3 mb-5">
                            <span className="text-xs font-mono px-3.5 py-1 rounded-full bg-white/10 text-white border border-white/10">
                                {selectedProject.category}
                            </span>
                            {selectedProject.is_featured && (
                                <span className="text-xs font-mono px-3.5 py-1 rounded-full bg-[#2563eb]/20 text-[#3b82f6] border border-[#2563eb]/30">
                                    ★ Featured Project
                                </span>
                            )}
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-heading">
                            {selectedProject.title}
                        </h3>

                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-7 font-sans font-light">
                            {selectedProject.long_description || selectedProject.description}
                        </p>

                        <div className="mb-7">
                            <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">Architectural Stacks</div>
                            <div className="flex flex-wrap gap-2">
                                {selectedProject.tech_stack?.map((t) => (
                                    <span
                                        key={t}
                                        className="text-xs font-mono text-white bg-white/[0.06] px-3.5 py-1.5 rounded-xl border border-white/10"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                            {selectedProject.github_url && (
                                <a
                                    href={selectedProject.github_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-3.5 rounded-2xl text-center text-sm font-semibold bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white transition-all flex items-center justify-center gap-2"
                                >
                                    <FaGithub className="w-4 h-4" />
                                    <span>Inspect Repository</span>
                                </a>
                            )}
                            {selectedProject.live_url && (
                                <a
                                    href={selectedProject.live_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-3.5 rounded-2xl text-center text-sm font-semibold bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 transition-all flex items-center justify-center gap-2"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    <span>Live Preview</span>
                                </a>
                            )}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="px-7 py-3.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] text-white keep-white hover:opacity-90 transition-all cursor-pointer"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
