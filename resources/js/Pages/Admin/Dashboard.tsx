import React, { useEffect, useState } from 'react';
import { Head, Link, router, usePage, useForm } from '@inertiajs/react';
import { 
    ShieldCheck, 
    LogOut, 
    Trash2, 
    RotateCcw, 
    Search, 
    MessageSquare, 
    Clock, 
    Globe, 
    AlertTriangle,
    ExternalLink,
    FolderGit2,
    Plus,
    Edit,
    Smartphone,
    Bot,
    Utensils,
    BookOpen,
    GraduationCap,
    Store,
    Sparkles,
    Code2,
    Layers,
    Database,
    Wrench,
    LayoutDashboard,
    Cpu,
    Boxes,
    Terminal,
    ChevronRight,
    SlidersHorizontal,
    Activity,
    Users,
    Settings,
    Eye
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { formatDistanceToNow, format } from 'date-fns';
import { ThemeToggle } from '../../Components/UI/ThemeToggle';
import { ToastContainer, useToast } from '../../Components/UI/Toast';
import { ProjectItem } from '../../Components/Sections/ProjectsSection';
import { SkillItem } from '../../Components/Sections/SkillsSection';

interface CommentRecord {
    id: number;
    nickname: string;
    message: string;
    ip_address: string;
    user_agent: string;
    avatar_color: string;
    created_at: string;
    deleted_at?: string | null;
}

interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
    prev_page_url: string | null;
    next_page_url: string | null;
}

interface DashboardProps {
    comments: PaginatedData<CommentRecord>;
    projects: ProjectItem[];
    skills: SkillItem[];
    filters: {
        search?: string;
        tab?: 'overview' | 'skills' | 'projects' | 'comments' | 'deleted';
        skill_category?: string;
    };
    stats: {
        total_active: number;
        total_deleted: number;
        total_today: number;
        total_projects: number;
        total_skills: number;
    };
}

export default function AdminDashboard({ comments, projects, skills, filters, stats }: DashboardProps) {
    const { flash } = usePage<{ flash: { success?: string; error?: string } }>().props;
    const { toasts, showToast, dismissToast } = useToast();
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'projects' | 'comments' | 'deleted'>(filters.tab || 'overview');
    const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>('all');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    
    // Comment Modals
    const [confirmModal, setConfirmModal] = useState<{
        type: 'delete' | 'restore' | 'force';
        comment: CommentRecord;
    } | null>(null);
    const [replyModal, setReplyModal] = useState<CommentRecord | null>(null);
    const [replyMessage, setReplyMessage] = useState('');
    const [replySending, setReplySending] = useState(false);

    const submitAdminReply = () => {
        if (!replyModal || replyMessage.trim().length < 2) return;
        setReplySending(true);
        router.post(
            `/admin/comments/${replyModal.id}/reply`,
            { message: replyMessage.trim() },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setReplyModal(null);
                    setReplyMessage('');
                },
                onFinish: () => setReplySending(false),
            }
        );
    };

    // Project Modals
    const [deleteProjectModal, setDeleteProjectModal] = useState<ProjectItem | null>(null);
    const [projectModalOpen, setProjectModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);

    // Skill Modals
    const [deleteSkillModal, setDeleteSkillModal] = useState<SkillItem | null>(null);
    const [skillModalOpen, setSkillModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);

    // Flash messages as top-right toast popups
    useEffect(() => {
        if (flash?.success) showToast('success', flash.success);
        if (flash?.error) showToast('error', flash.error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flash?.success, flash?.error]);

    // Project Form State
    const { data: projectData, setData: setProjectData, post: postProject, put: putProject, processing: projectProcessing, reset: resetProjectForm, errors: projectErrors } = useForm({
        title: '',
        category: 'Web App',
        description: '',
        long_description: '',
        tech_stack: '',
        github_url: '',
        live_url: '',
        icon_name: 'Smartphone',
        gradient: 'from-[#2563eb] to-[#0ea5e9]',
        is_featured: false,
        sort_order: 0,
    });

    // Skill Form State
    const { data: skillData, setData: setSkillData, post: postSkill, put: putSkill, processing: skillProcessing, reset: resetSkillForm, errors: skillErrors } = useForm({
        name: '',
        category: 'Languages',
        level: 'Intermediate',
        badge: '',
        icon: '',
        color: '#2563eb',
        description: '',
        proficiency: 85,
        is_featured: true,
        sort_order: 0,
    });

    // Handle Project Actions
    const openCreateProjectModal = () => {
        setEditingProject(null);
        resetProjectForm();
        setProjectData({
            title: '',
            category: 'Web App',
            description: '',
            long_description: '',
            tech_stack: '',
            github_url: '',
            live_url: '',
            icon_name: 'Smartphone',
            gradient: 'from-[#2563eb] to-[#0ea5e9]',
            is_featured: false,
            sort_order: (projects.length + 1),
        });
        setProjectModalOpen(true);
    };

    const openEditProjectModal = (proj: ProjectItem) => {
        setEditingProject(proj);
        setProjectData({
            title: proj.title,
            category: proj.category,
            description: proj.description,
            long_description: proj.long_description || '',
            tech_stack: Array.isArray(proj.tech_stack) ? proj.tech_stack.join(', ') : '',
            github_url: proj.github_url || '',
            live_url: proj.live_url || '',
            icon_name: proj.icon_name || 'Smartphone',
            gradient: proj.gradient || 'from-[#2563eb] to-[#0ea5e9]',
            is_featured: Boolean(proj.is_featured),
            sort_order: proj.sort_order || 0,
        });
        setProjectModalOpen(true);
    };

    const handleSaveProject = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingProject) {
            putProject(`/admin/projects/${editingProject.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setProjectModalOpen(false);
                    resetProjectForm();
                },
            });
        } else {
            postProject('/admin/projects', {
                preserveScroll: true,
                onSuccess: () => {
                    setProjectModalOpen(false);
                    resetProjectForm();
                },
            });
        }
    };

    const handleDeleteProject = () => {
        if (!deleteProjectModal) return;
        router.delete(`/admin/projects/${deleteProjectModal.id}`, {
            preserveScroll: true,
            onSuccess: () => setDeleteProjectModal(null),
        });
    };

    // Handle Skill Actions
    const openCreateSkillModal = () => {
        setEditingSkill(null);
        resetSkillForm();
        setSkillData({
            name: '',
            category: 'Languages',
            level: 'Intermediate',
            badge: '',
            icon: '',
            color: '#2563eb',
            description: '',
            proficiency: 85,
            is_featured: true,
            sort_order: (skills.length + 1),
        });
        setSkillModalOpen(true);
    };

    const openEditSkillModal = (skill: SkillItem) => {
        setEditingSkill(skill);
        setSkillData({
            name: skill.name,
            category: skill.category,
            level: skill.level,
            badge: skill.badge || '',
            icon: skill.icon || '',
            color: skill.color || '#2563eb',
            description: skill.description || '',
            proficiency: skill.proficiency || 85,
            is_featured: Boolean(skill.is_featured),
            sort_order: skill.sort_order || 0,
        });
        setSkillModalOpen(true);
    };

    const handleSaveSkill = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingSkill) {
            putSkill(`/admin/skills/${editingSkill.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setSkillModalOpen(false);
                    resetSkillForm();
                },
            });
        } else {
            postSkill('/admin/skills', {
                preserveScroll: true,
                onSuccess: () => {
                    setSkillModalOpen(false);
                    resetSkillForm();
                },
            });
        }
    };

    const handleDeleteSkill = () => {
        if (!deleteSkillModal) return;
        router.delete(`/admin/skills/${deleteSkillModal.id}`, {
            preserveScroll: true,
            onSuccess: () => setDeleteSkillModal(null),
        });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/admin/dashboard',
            { search: searchTerm, tab: activeTab },
            { preserveState: true, replace: true }
        );
    };

    const handleTabChange = (newTab: 'overview' | 'skills' | 'projects' | 'comments' | 'deleted') => {
        setActiveTab(newTab);
        router.get(
            '/admin/dashboard',
            { search: searchTerm, tab: newTab },
            { preserveState: true, replace: true }
        );
    };

    const executeCommentAction = () => {
        if (!confirmModal) return;
        const { type, comment } = confirmModal;

        if (type === 'delete') {
            router.delete(`/admin/comments/${comment.id}`, {
                preserveScroll: true,
                onSuccess: () => setConfirmModal(null),
            });
        } else if (type === 'restore') {
            router.post(`/admin/comments/${comment.id}/restore`, {}, {
                preserveScroll: true,
                onSuccess: () => setConfirmModal(null),
            });
        } else if (type === 'force') {
            router.delete(`/admin/comments/${comment.id}/force`, {
                preserveScroll: true,
                onSuccess: () => setConfirmModal(null),
            });
        }
    };

    const handleLogout = () => {
        router.post('/admin/logout');
    };

    // Filter skills by category in Skills tab
    const filteredSkills = selectedSkillCategory === 'all'
        ? skills
        : skills.filter(s => s.category.toLowerCase() === selectedSkillCategory.toLowerCase());

    const skillCategories = ['all', ...Array.from(new Set(skills.map(s => s.category)))];

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <Head title="Admin Dashboard — Aditya Putra Sholahuddin" />

            {/* Toast Notifications (top-right popups) */}
            <ToastContainer toasts={toasts} onDismiss={dismissToast} />

            {/* SIDEBAR NAVIGATION */}
            <aside className={`w-full md:w-64 bg-[#0d0d12]/95 border-r border-white/10 flex flex-col shrink-0 min-h-screen transition-all duration-300 z-30`}>
                {/* Sidebar Brand Header */}
                <div className="p-5 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src="/img/logo-adit.png"
                            alt="Logo"
                            className="w-10 h-10 object-contain"
                        />
                        <div>
                            <div className="font-bold text-white text-sm flex items-center gap-1.5">
                                KREESS CMS
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            </div>
                            <div className="text-[11px] text-gray-400 font-mono">Portfolio Control</div>
                        </div>
                    </div>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 p-4 space-y-1.5 overflow-y-auto">
                    <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-gray-500 font-semibold">
                        Main Navigation
                    </div>

                    <button
                        onClick={() => handleTabChange('overview')}
                        className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                            activeTab === 'overview'
                                ? 'bg-gradient-to-r from-[#2563eb]/20 to-purple-500/20 text-white border border-[#2563eb]/30 shadow-sm'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <div className="flex items-center gap-2.5">
                            <LayoutDashboard className={`w-4 h-4 ${activeTab === 'overview' ? 'text-[#2563eb]' : 'text-gray-400'}`} />
                            <span>Overview</span>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${activeTab === 'overview' ? 'text-[#2563eb]' : ''}`} />
                    </button>

                    <button
                        onClick={() => handleTabChange('skills')}
                        className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                            activeTab === 'skills'
                                ? 'bg-gradient-to-r from-sky-600/30 to-blue-600/30 text-white border border-sky-500/40 shadow-sm'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <div className="flex items-center gap-2.5">
                            <Boxes className={`w-4 h-4 ${activeTab === 'skills' ? 'text-sky-500' : 'text-gray-400'}`} />
                            <span>Tech Stacks & Skills</span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-600">
                            {stats.total_skills}
                        </span>
                    </button>

                    <button
                        onClick={() => handleTabChange('projects')}
                        className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                            activeTab === 'projects'
                                ? 'bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-white border border-blue-500/40 shadow-sm'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <div className="flex items-center gap-2.5">
                            <FolderGit2 className={`w-4 h-4 ${activeTab === 'projects' ? 'text-blue-400' : 'text-gray-400'}`} />
                            <span>Manage Projects</span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300">
                            {stats.total_projects}
                        </span>
                    </button>

                    <div className="pt-4 px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-gray-500 font-semibold">
                        Guestbook & Moderation
                    </div>

                    <button
                        onClick={() => handleTabChange('comments')}
                        className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                            activeTab === 'comments'
                                ? 'bg-gradient-to-r from-emerald-600/30 to-teal-600/30 text-white border border-emerald-500/40 shadow-sm'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <div className="flex items-center gap-2.5">
                            <MessageSquare className={`w-4 h-4 ${activeTab === 'comments' ? 'text-emerald-400' : 'text-gray-400'}`} />
                            <span>Live Comments</span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300">
                            {stats.total_active}
                        </span>
                    </button>

                    <button
                        onClick={() => handleTabChange('deleted')}
                        className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                            activeTab === 'deleted'
                                ? 'bg-red-600/30 text-white border border-red-500/40 shadow-sm'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <div className="flex items-center gap-2.5">
                            <Trash2 className={`w-4 h-4 ${activeTab === 'deleted' ? 'text-red-400' : 'text-gray-400'}`} />
                            <span>Deleted Archive</span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-red-500/20 text-red-300">
                            {stats.total_deleted}
                        </span>
                    </button>
                </div>

                {/* Sidebar Bottom Profile & External Links */}
                <div className="p-4 border-t border-white/10 space-y-2">
                    <Link
                        href="/"
                        target="_blank"
                        className="w-full px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all flex items-center justify-between"
                    >
                        <span className="flex items-center gap-2">
                            <Eye className="w-3.5 h-3.5 text-[#2563eb]" />
                            <span>View Live Site</span>
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                    </Link>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03]">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-600 flex items-center justify-center text-xs font-bold font-mono">
                                A
                            </div>
                            <div className="truncate">
                                <div className="text-xs font-bold text-white truncate">Aditya P. S.</div>
                                <div className="text-[10px] text-gray-500 truncate">adityasholahuddin@gmail.com</div>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            title="Log Out"
                            className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all cursor-pointer"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                {/* Header Navbar */}
                <header className="h-16 border-b border-white/10 bg-[#0d0d12]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
                    <div className="flex items-center gap-3">
                        <h2 className="text-sm sm:text-base font-bold text-white capitalize flex items-center gap-2">
                            {activeTab === 'overview' && 'Dashboard Overview'}
                            {activeTab === 'skills' && 'Manage Tech Stack & Skills Database'}
                            {activeTab === 'projects' && 'Manage Showcase Projects'}
                            {activeTab === 'comments' && 'Live Comments Moderation'}
                            {activeTab === 'deleted' && 'Soft-Deleted Comments Archive'}
                        </h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <ThemeToggle />

                        {activeTab === 'skills' && (
                            <button
                                onClick={openCreateSkillModal}
                                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#0ea5e9] to-[#0ea5e9] hover:opacity-90 transition-all flex items-center gap-1.5 shadow-md shadow-sky-500/20 cursor-pointer"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add Skill / Tech</span>
                            </button>
                        )}

                        {activeTab === 'projects' && (
                            <button
                                onClick={openCreateProjectModal}
                                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] hover:opacity-90 transition-all flex items-center gap-1.5 shadow-md shadow-[#2563eb]/20 cursor-pointer"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add Project</span>
                            </button>
                        )}
                    </div>
                </header>

                <div className="p-4 sm:p-6 lg:p-8 space-y-6">
                    {/* VIEW 1: OVERVIEW */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* Key Performance Metric Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="glass-panel p-5 rounded-2xl border-white/10 flex items-center justify-between hover:border-white/20 transition-all">
                                    <div>
                                        <div className="text-xs font-mono text-gray-400">Total Tech Skills</div>
                                        <div className="text-2xl font-extrabold text-white mt-1">{stats.total_skills}</div>
                                        <div className="text-[10px] text-sky-500 mt-1 font-mono">Dynamic Database</div>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center border border-sky-500/20">
                                        <Boxes className="w-6 h-6" />
                                    </div>
                                </div>

                                <div className="glass-panel p-5 rounded-2xl border-white/10 flex items-center justify-between hover:border-white/20 transition-all">
                                    <div>
                                        <div className="text-xs font-mono text-gray-400">Portfolio Projects</div>
                                        <div className="text-2xl font-extrabold text-white mt-1">{stats.total_projects}</div>
                                        <div className="text-[10px] text-blue-400 mt-1 font-mono">Published Live</div>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                                        <FolderGit2 className="w-6 h-6" />
                                    </div>
                                </div>

                                <div className="glass-panel p-5 rounded-2xl border-white/10 flex items-center justify-between hover:border-white/20 transition-all">
                                    <div>
                                        <div className="text-xs font-mono text-gray-400">Live Comments</div>
                                        <div className="text-2xl font-extrabold text-white mt-1">{stats.total_active}</div>
                                        <div className="text-[10px] text-emerald-400 mt-1 font-mono">Verified Visitors</div>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                                        <MessageSquare className="w-6 h-6" />
                                    </div>
                                </div>

                                <div className="glass-panel p-5 rounded-2xl border-white/10 flex items-center justify-between hover:border-white/20 transition-all">
                                    <div>
                                        <div className="text-xs font-mono text-gray-400">Spam Blocked</div>
                                        <div className="text-2xl font-extrabold text-white mt-1">{stats.total_deleted}</div>
                                        <div className="text-[10px] text-red-400 mt-1 font-mono">Soft Deleted</div>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center border border-red-500/20">
                                        <Trash2 className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>

                            {/* Quick Overview Split Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Recent Tech Stacks Highlight */}
                                <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                            <Boxes className="w-4 h-4 text-sky-500" />
                                            Latest Technologies Configured
                                        </h3>
                                        <button
                                            onClick={() => handleTabChange('skills')}
                                            className="text-xs text-sky-500 hover:text-sky-600 font-semibold cursor-pointer"
                                        >
                                            Manage All →
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                                        {skills.slice(0, 9).map((s) => (
                                            <div
                                                key={s.id}
                                                className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 flex flex-col justify-between"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color || '#2563eb' }} />
                                                    <span className="text-xs font-bold text-white truncate">{s.name}</span>
                                                </div>
                                                <div className="flex items-center justify-between mt-2 text-[10px] text-gray-400 font-mono">
                                                    <span>{s.category.split(' ')[0]}</span>
                                                    <span className="text-gray-300">{s.level}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent Projects Highlight */}
                                <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                            <FolderGit2 className="w-4 h-4 text-blue-400" />
                                            Active Portfolio Projects
                                        </h3>
                                        <button
                                            onClick={() => handleTabChange('projects')}
                                            className="text-xs text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
                                        >
                                            Manage All →
                                        </button>
                                    </div>

                                    <div className="space-y-2.5">
                                        {projects.slice(0, 4).map((p) => (
                                            <div
                                                key={p.id}
                                                className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between"
                                            >
                                                <div>
                                                    <div className="text-xs font-bold text-white">{p.title}</div>
                                                    <div className="text-[10px] text-gray-400 font-mono">{p.category}</div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {p.is_featured && (
                                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#2563eb]/20 text-[#3b82f6]">
                                                            Featured
                                                        </span>
                                                    )}
                                                    <button
                                                        onClick={() => openEditProjectModal(p)}
                                                        className="p-1.5 rounded-lg text-gray-400 hover:text-white bg-white/5 cursor-pointer"
                                                    >
                                                        <Edit className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* VIEW 2: SKILLS & TECH STACK MANAGEMENT */}
                    {activeTab === 'skills' && (
                        <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                                        <Boxes className="w-5 h-5 text-[#0ea5e9]" />
                                        Technologies & Skills Database
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Data is stored in MySQL and served directly to the dynamic front-end skills section.
                                    </p>
                                </div>

                                {/* Category Filters */}
                                <div className="flex flex-wrap items-center gap-1.5">
                                    {skillCategories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedSkillCategory(cat)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer ${
                                                selectedSkillCategory === cat
                                                    ? 'bg-[#2563eb] text-white shadow-sm'
                                                    : 'bg-white/5 text-gray-400 hover:text-white'
                                            }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Skills Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/10 text-gray-400 font-mono">
                                            <th className="py-3 px-4">Technology / Skill</th>
                                            <th className="py-3 px-4">Category</th>
                                            <th className="py-3 px-4">Level</th>
                                            <th className="py-3 px-4">Badge / Tag</th>
                                            <th className="py-3 px-4">Proficiency</th>
                                            <th className="py-3 px-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {filteredSkills.map((skill) => (
                                            <tr key={skill.id} className="hover:bg-white/[0.02] transition-colors">
                                                <td className="py-3.5 px-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2.5">
                                                        <span
                                                            className="w-3 h-3 rounded-full shrink-0"
                                                            style={{ backgroundColor: skill.color || '#2563eb' }}
                                                        />
                                                        <div>
                                                            <div className="font-bold text-white">{skill.name}</div>
                                                            <div className="text-[10px] text-gray-500 font-mono">Order: #{skill.sort_order}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3.5 px-4 whitespace-nowrap text-gray-300 font-mono text-[11px]">
                                                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">
                                                        {skill.category}
                                                    </span>
                                                </td>
                                                <td className="py-3.5 px-4 whitespace-nowrap">
                                                    <span className="text-xs font-semibold text-white">
                                                        {skill.level}
                                                    </span>
                                                </td>
                                                <td className="py-3.5 px-4 whitespace-nowrap">
                                                    {skill.badge ? (
                                                        <span
                                                            className="text-[10px] px-2 py-0.5 rounded-md font-mono font-semibold"
                                                            style={{
                                                                backgroundColor: `${skill.color || '#2563eb'}20`,
                                                                color: skill.color || '#3b82f6',
                                                            }}
                                                        >
                                                            {skill.badge}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-600 text-[11px] font-mono">—</span>
                                                    )}
                                                </td>
                                                <td className="py-3.5 px-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-20 bg-white/10 rounded-full h-1.5 overflow-hidden">
                                                            <div
                                                                className="h-full rounded-full"
                                                                style={{
                                                                    width: `${skill.proficiency || 80}%`,
                                                                    backgroundColor: skill.color || '#2563eb',
                                                                }}
                                                            />
                                                        </div>
                                                        <span className="font-mono text-[10px] text-gray-400">
                                                            {skill.proficiency || 80}%
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => openEditSkillModal(skill)}
                                                            className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-all inline-flex items-center gap-1 cursor-pointer"
                                                        >
                                                            <Edit className="w-3.5 h-3.5" />
                                                            <span>Edit</span>
                                                        </button>
                                                        <button
                                                            onClick={() => setDeleteSkillModal(skill)}
                                                            className="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all inline-flex items-center gap-1 cursor-pointer"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                            <span>Delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* VIEW 3: PROJECTS MANAGEMENT */}
                    {activeTab === 'projects' && (
                        <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                                        <FolderGit2 className="w-5 h-5 text-blue-400" />
                                        Portfolio Projects Database
                                    </h2>
                                    <p className="text-xs text-gray-400">
                                        Add, edit, reorder, or highlight your showcase projects in real-time.
                                    </p>
                                </div>
                            </div>

                            {/* Projects Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {projects.map((proj) => (
                                    <div
                                        key={proj.id}
                                        className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/5 text-gray-300">
                                                    {proj.category}
                                                </span>
                                                {proj.is_featured && (
                                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#2563eb]/20 text-[#3b82f6]">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="text-base font-bold text-white mb-1.5">{proj.title}</h3>
                                            <p className="text-xs text-gray-400 line-clamp-2 mb-4">{proj.description}</p>

                                            <div className="flex flex-wrap gap-1 mb-4">
                                                {proj.tech_stack?.map((t) => (
                                                    <span
                                                        key={t}
                                                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                {proj.github_url && (
                                                    <a
                                                        href={proj.github_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gray-400 hover:text-white"
                                                        title="GitHub Repo"
                                                    >
                                                        <FaGithub className="w-4 h-4" />
                                                    </a>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => openEditProjectModal(proj)}
                                                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
                                                >
                                                    <Edit className="w-3.5 h-3.5" />
                                                    <span>Edit</span>
                                                </button>
                                                <button
                                                    onClick={() => setDeleteProjectModal(proj)}
                                                    className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* VIEW 4 & 5: COMMENTS (LIVE & DELETED) */}
                    {(activeTab === 'comments' || activeTab === 'deleted') && (
                        <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-4">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <h2 className="text-sm font-bold text-white">
                                    {activeTab === 'comments' ? 'Live Comments Moderation Feed' : 'Soft-Deleted Comments Archive'}
                                </h2>

                                <form onSubmit={handleSearch} className="w-full sm:w-80 flex items-center gap-2">
                                    <div className="relative flex-1">
                                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                        <input
                                            type="text"
                                            placeholder="Search name, message, IP..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-9 pr-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#2563eb]"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                                    >
                                        Search
                                    </button>
                                </form>
                            </div>

                            {/* Comments Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/10 text-gray-400 font-mono">
                                            <th className="py-3 px-4">Author</th>
                                            <th className="py-3 px-4">Message</th>
                                            <th className="py-3 px-4">IP & Browser</th>
                                            <th className="py-3 px-4">Date</th>
                                            <th className="py-3 px-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {comments.data.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="py-12 text-center text-gray-500">
                                                    No comments found.
                                                </td>
                                            </tr>
                                        ) : (
                                            comments.data.map((c) => (
                                                <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                                                    <td className="py-4 px-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-2.5">
                                                            <div
                                                                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                                                                style={{ backgroundColor: c.avatar_color || '#2563eb' }}
                                                            >
                                                                {c.nickname.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-white">
                                                                    {c.nickname}
                                                                </div>
                                                                <div className="text-[10px] text-gray-500 font-mono">
                                                                    #{c.id}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 max-w-md">
                                                        <p className="text-gray-200 line-clamp-3 whitespace-pre-wrap">
                                                            {c.message}
                                                        </p>
                                                    </td>
                                                    <td className="py-4 px-4 whitespace-nowrap font-mono text-[11px] text-gray-400">
                                                        <div className="flex items-center gap-1.5 text-gray-300">
                                                            <Globe className="w-3 h-3 text-[#2563eb]" />
                                                            <span>{c.ip_address || '127.0.0.1'}</span>
                                                        </div>
                                                        <div className="text-[10px] text-gray-500 truncate max-w-[180px]" title={c.user_agent}>
                                                            {c.user_agent || 'Unknown'}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 whitespace-nowrap font-mono text-[11px] text-gray-400">
                                                        <div>{format(new Date(c.created_at), 'dd MMM yyyy HH:mm')}</div>
                                                        <div className="text-[10px] text-gray-500">
                                                            {formatDistanceToNow(new Date(c.created_at), { addSuffix: true })}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 text-right whitespace-nowrap">
                                                        {activeTab === 'comments' ? (
                                                            <div className="flex items-center justify-end gap-2">
                                                                <button
                                                                    onClick={() => {
                                                                        setReplyModal(c);
                                                                        setReplyMessage('');
                                                                    }}
                                                                    className="px-3 py-1.5 rounded-lg bg-[#2563eb]/10 hover:bg-[#2563eb]/20 text-[#3b82f6] border border-[#2563eb]/25 text-xs font-semibold transition-all inline-flex items-center gap-1 cursor-pointer"
                                                                >
                                                                    <MessageSquare className="w-3.5 h-3.5" />
                                                                    <span>Reply</span>
                                                                </button>
                                                                <button
                                                                    onClick={() => setConfirmModal({ type: 'delete', comment: c })}
                                                                    className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold transition-all inline-flex items-center gap-1 cursor-pointer"
                                                                >
                                                                    <Trash2 className="w-3.5 h-3.5" />
                                                                    <span>Delete</span>
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center justify-end gap-2">
                                                                <button
                                                                    onClick={() => setConfirmModal({ type: 'restore', comment: c })}
                                                                    className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-semibold transition-all inline-flex items-center gap-1 cursor-pointer"
                                                                >
                                                                    <RotateCcw className="w-3.5 h-3.5" />
                                                                    <span>Restore</span>
                                                                </button>
                                                                <button
                                                                    onClick={() => setConfirmModal({ type: 'force', comment: c })}
                                                                    className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 text-xs font-semibold transition-all inline-flex items-center gap-1 cursor-pointer"
                                                                >
                                                                    <Trash2 className="w-3.5 h-3.5" />
                                                                    <span>Purge</span>
                                                                </button>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {comments.last_page > 1 && (
                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <div className="text-xs text-gray-400 font-mono">
                                        Page {comments.current_page} of {comments.last_page} ({comments.total} total)
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {comments.prev_page_url && (
                                            <Link
                                                href={comments.prev_page_url}
                                                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white transition-all"
                                            >
                                                Previous
                                            </Link>
                                        )}
                                        {comments.next_page_url && (
                                            <Link
                                                href={comments.next_page_url}
                                                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white transition-all"
                                            >
                                                Next
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>

            {/* CREATE / EDIT SKILL MODAL */}
            {skillModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="glass-panel w-full max-w-xl rounded-3xl p-6 sm:p-8 border-white/20 bg-[#12101a] shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Boxes className="w-5 h-5 text-[#0ea5e9]" />
                                <span>{editingSkill ? 'Edit Tech / Skill' : 'Add Tech / Skill'}</span>
                            </h3>
                            <button
                                onClick={() => setSkillModalOpen(false)}
                                className="text-gray-400 hover:text-white text-lg w-8 h-8 rounded-full bg-white/5 flex items-center justify-center cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSaveSkill} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                        Skill / Technology Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Laravel, React.js, Python"
                                        value={skillData.name}
                                        onChange={(e) => setSkillData('name', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                                    />
                                    {skillErrors.name && (
                                        <p className="text-xs text-red-400 mt-1">{skillErrors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                        Category *
                                    </label>
                                    <select
                                        value={skillData.category}
                                        onChange={(e) => setSkillData('category', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                                    >
                                        <option value="Languages">Languages</option>
                                        <option value="Frameworks & Frontend">Frameworks & Frontend</option>
                                        <option value="Databases & Storage">Databases & Storage</option>
                                        <option value="DevOps, AI & Tools">DevOps, AI & Tools</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                        Mastery Level *
                                    </label>
                                    <select
                                        value={skillData.level}
                                        onChange={(e) => setSkillData('level', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                                    >
                                        <option value="Basic">Basic</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                        <option value="Expert">Expert</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                        Badge Label (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Core, AI/CNN, Mobile"
                                        value={skillData.badge}
                                        onChange={(e) => setSkillData('badge', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                        Accent Color Hex
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="color"
                                            value={skillData.color}
                                            onChange={(e) => setSkillData('color', e.target.value)}
                                            className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer p-0"
                                        />
                                        <input
                                            type="text"
                                            value={skillData.color}
                                            onChange={(e) => setSkillData('color', e.target.value)}
                                            className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white font-mono focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                        Proficiency %
                                    </label>
                                    <input
                                        type="number"
                                        min={1}
                                        max={100}
                                        value={skillData.proficiency}
                                        onChange={(e) => setSkillData('proficiency', parseInt(e.target.value) || 80)}
                                        className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                        Sort Order
                                    </label>
                                    <input
                                        type="number"
                                        value={skillData.sort_order}
                                        onChange={(e) => setSkillData('sort_order', parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                    Brief Notes (Optional)
                                </label>
                                <textarea
                                    rows={2}
                                    placeholder="e.g. Applied in backend REST APIs & microservices..."
                                    value={skillData.description}
                                    onChange={(e) => setSkillData('description', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                                <button
                                    type="button"
                                    onClick={() => setSkillModalOpen(false)}
                                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={skillProcessing}
                                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#0ea5e9] to-[#0ea5e9] hover:opacity-95 transition-all shadow-lg shadow-sky-500/20 cursor-pointer disabled:opacity-50"
                                >
                                    {skillProcessing ? 'Saving...' : editingSkill ? 'Update Tech' : 'Save Tech'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* DELETE SKILL CONFIRMATION MODAL */}
            {deleteSkillModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="glass-panel w-full max-w-md rounded-2xl p-6 border-white/20 bg-[#12101a] shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-white">Delete Skill?</h3>
                                <p className="text-xs text-gray-400">
                                    Are you sure you want to remove "{deleteSkillModal.name}" from your tech stacks?
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3">
                            <button
                                onClick={() => setDeleteSkillModal(null)}
                                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteSkill}
                                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-500 transition-all cursor-pointer"
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* CREATE / EDIT PROJECT MODAL */}
            {projectModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 sm:p-8 border-white/20 bg-[#12101a] shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-[#2563eb]" />
                                <span>{editingProject ? 'Edit Project' : 'Add New Project'}</span>
                            </h3>
                            <button
                                onClick={() => setProjectModalOpen(false)}
                                className="text-gray-400 hover:text-white text-lg w-8 h-8 rounded-full bg-white/5 flex items-center justify-center cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSaveProject} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                        Project Title *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. SmartSkin (Acne AI)"
                                        value={projectData.title}
                                        onChange={(e) => setProjectData('title', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#2563eb]"
                                    />
                                    {projectErrors.title && (
                                        <p className="text-xs text-red-400 mt-1">{projectErrors.title}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                        Category *
                                    </label>
                                    <select
                                        value={projectData.category}
                                        onChange={(e) => setProjectData('category', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#2563eb]"
                                    >
                                        <option value="Web App">Web App</option>
                                        <option value="Mobile">Mobile</option>
                                        <option value="AI / ML">AI / ML</option>
                                        <option value="Full-Stack">Full-Stack</option>
                                        <option value="Web3 & Blockchain">Web3 & Blockchain</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                    Short Description (Summary) *
                                </label>
                                <textarea
                                    rows={2}
                                    required
                                    placeholder="Brief summary displayed on project cards..."
                                    value={projectData.description}
                                    onChange={(e) => setProjectData('description', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#2563eb] resize-none"
                                />
                                {projectErrors.description && (
                                    <p className="text-xs text-red-400 mt-1">{projectErrors.description}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                    Long Detailed Description (For Modal Popup)
                                </label>
                                <textarea
                                    rows={3}
                                    placeholder="In-depth details about architecture, dataset, performance, etc..."
                                    value={projectData.long_description}
                                    onChange={(e) => setProjectData('long_description', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#2563eb] resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                    Tech Stack (Comma-separated) *
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Flutter, Dart, Python, TensorFlow, FastAPI"
                                    value={projectData.tech_stack}
                                    onChange={(e) => setProjectData('tech_stack', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#2563eb]"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                        GitHub URL
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="https://github.com/KREESS/..."
                                        value={projectData.github_url}
                                        onChange={(e) => setProjectData('github_url', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#2563eb]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                        Live Demo URL (Optional)
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="https://kreess.my.id/demo"
                                        value={projectData.live_url}
                                        onChange={(e) => setProjectData('live_url', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#2563eb]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                        Icon
                                    </label>
                                    <select
                                        value={projectData.icon_name}
                                        onChange={(e) => setProjectData('icon_name', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#2563eb]"
                                    >
                                        <option value="Smartphone">Smartphone (Mobile)</option>
                                        <option value="Bot">Bot (AI/CNN)</option>
                                        <option value="Utensils">Utensils (Restaurant/Food)</option>
                                        <option value="BookOpen">BookOpen (Education/Exam)</option>
                                        <option value="GraduationCap">GraduationCap (Academic)</option>
                                        <option value="Store">Store (E-commerce)</option>
                                        <option value="Cpu">Cpu (Tech/Hardware)</option>
                                        <option value="Layers">Layers (General Web)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                        Gradient Theme
                                    </label>
                                    <select
                                        value={projectData.gradient}
                                        onChange={(e) => setProjectData('gradient', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#2563eb]"
                                    >
                                        <option value="from-[#2563eb] to-[#0ea5e9]">Red to Purple</option>
                                        <option value="from-[#0ea5e9] to-[#38bdf8]">Purple to Sky</option>
                                        <option value="from-[#38bdf8] to-[#10b981]">Sky to Emerald</option>
                                        <option value="from-[#f59e0b] to-[#2563eb]">Amber to Red</option>
                                        <option value="from-[#0ea5e9] to-[#0ea5e9]">Pink to Violet</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                                        Sort Order
                                    </label>
                                    <input
                                        type="number"
                                        value={projectData.sort_order}
                                        onChange={(e) => setProjectData('sort_order', parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#2563eb]"
                                    />
                                </div>
                            </div>

                            <div className="pt-2">
                                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                                    <input
                                        type="checkbox"
                                        checked={projectData.is_featured}
                                        onChange={(e) => setProjectData('is_featured', e.target.checked)}
                                        className="rounded bg-black/40 border-white/10 text-[#2563eb] focus:ring-[#2563eb]"
                                    />
                                    <span>Mark as Featured Project (Displays badge & prioritizes order)</span>
                                </label>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                                <button
                                    type="button"
                                    onClick={() => setProjectModalOpen(false)}
                                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={projectProcessing}
                                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] hover:opacity-95 transition-all shadow-lg shadow-[#2563eb]/20 cursor-pointer disabled:opacity-50"
                                >
                                    {projectProcessing ? 'Saving...' : editingProject ? 'Update Project' : 'Publish Project'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* DELETE PROJECT CONFIRMATION MODAL */}
            {deleteProjectModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="glass-panel w-full max-w-md rounded-2xl p-6 border-white/20 bg-[#12101a] shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-white">Delete Project?</h3>
                                <p className="text-xs text-gray-400">
                                    Are you sure you want to remove "{deleteProjectModal.title}" from your portfolio?
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3">
                            <button
                                onClick={() => setDeleteProjectModal(null)}
                                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteProject}
                                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-500 transition-all cursor-pointer"
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* COMMENT ACTION CONFIRMATION MODAL */}
            {confirmModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="glass-panel w-full max-w-md rounded-2xl p-6 border-white/20 bg-[#12101a] shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-white">
                                    {confirmModal.type === 'delete' && 'Delete Comment?'}
                                    {confirmModal.type === 'restore' && 'Restore Comment?'}
                                    {confirmModal.type === 'force' && 'Permanently Purge Comment?'}
                                </h3>
                                <p className="text-xs text-gray-400">
                                    {confirmModal.type === 'delete' &&
                                        'The comment will be immediately removed from the live website.'}
                                    {confirmModal.type === 'restore' &&
                                        'The comment will be restored and visible on the website.'}
                                    {confirmModal.type === 'force' &&
                                        'This will permanently delete the record from the database. This action cannot be undone.'}
                                </p>
                            </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-gray-300 mb-6 italic">
                            "{confirmModal.comment.message}"
                            <div className="text-[10px] text-gray-500 not-italic mt-1">
                                — {confirmModal.comment.nickname} ({confirmModal.comment.ip_address})
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3">
                            <button
                                onClick={() => setConfirmModal(null)}
                                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={executeCommentAction}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all cursor-pointer ${
                                    confirmModal.type === 'restore'
                                        ? 'bg-emerald-600 hover:bg-emerald-500'
                                        : 'bg-red-600 hover:bg-red-500'
                                }`}
                            >
                                Confirm {confirmModal.type === 'delete' ? 'Delete' : confirmModal.type === 'restore' ? 'Restore' : 'Purge'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* ADMIN REPLY MODAL */}
            {replyModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="glass-panel w-full max-w-lg rounded-2xl p-6 border-white/20 bg-[#12101a] shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-[#2563eb]/20 text-[#3b82f6] flex items-center justify-center">
                                <MessageSquare className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-white">Balas Komentar</h3>
                                <p className="text-xs text-gray-400">
                                    Balasan akan tampil sebagai <span className="text-[#3b82f6] font-semibold">CREATOR</span> di guestbook.
                                </p>
                            </div>
                        </div>

                        {/* Quoted comment */}
                        <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-gray-300 mb-4 italic">
                            "{replyModal.message}"
                            <div className="text-[10px] text-gray-500 not-italic mt-1">
                                — {replyModal.nickname} ({replyModal.ip_address})
                            </div>
                        </div>

                        <textarea
                            rows={3}
                            maxLength={500}
                            autoFocus
                            placeholder="Tulis balasan Anda..."
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#2563eb] resize-none"
                        />
                        <div className="flex items-center justify-between mt-1 mb-5">
                            {replyMessage.trim().length > 0 && replyMessage.trim().length < 2 ? (
                                <span className="text-[10px] text-red-400">Minimal 2 karakter.</span>
                            ) : (
                                <span />
                            )}
                            <span className="text-[10px] text-gray-500 font-mono">{replyMessage.length}/500</span>
                        </div>

                        <div className="flex items-center justify-end gap-3">
                            <button
                                onClick={() => setReplyModal(null)}
                                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitAdminReply}
                                disabled={replySending || replyMessage.trim().length < 2}
                                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] hover:opacity-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {replySending ? 'Mengirim...' : 'Kirim Balasan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

