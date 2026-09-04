import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '../UI/ThemeToggle';

interface NavbarProps {
    activeSection: string;
    setActiveSection: (id: string) => void;
    isAdmin?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection, isAdmin }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'hero', label: 'Overview' },
        { id: 'about', label: 'Biography' },
        { id: 'career', label: 'Career' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        { id: 'contact', label: 'Contact' },
    ];

    const scrollTo = (id: string) => {
        setActiveSection(id);
        setMobileOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Top Fixed Floating Header */}
            <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 md:py-6 transition-all duration-300 pointer-events-none">
                <nav
                    className={`w-full max-w-7xl flex items-center justify-between px-4 sm:px-8 lg:px-10 py-3 rounded-3xl transition-all duration-300 pointer-events-auto ${
                        scrolled
                            ? 'seedance-card border-white/15 shadow-2xl shadow-black/80 backdrop-blur-2xl bg-[#090810]/85'
                            : 'bg-[#090810]/40 border border-white/5 backdrop-blur-xl'
                    }`}
                >
                    {/* Brand Logo */}
                    <button
                        onClick={() => scrollTo('hero')}
                        className="flex items-center gap-3 group cursor-pointer text-left focus:outline-none"
                    >
                        <img
                            src="/img/logo-adit.png"
                            alt="Logo Aditya"
                            className="h-10 w-auto object-contain group-hover:scale-105 transition-transform"
                        />
                        <div className="flex flex-col">
                            <span className="font-extrabold text-sm md:text-base text-white tracking-wide font-heading">
                                Aditya Putra Sholahuddin
                            </span>
                        </div>
                    </button>

                    {/* Desktop Navigation links */}
                    <div className="hidden md:flex items-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/5">
                        {navItems.map((item) => {
                            const isActive = activeSection === item.id;
                            const isHovered = hoveredItem === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => scrollTo(item.id)}
                                    onMouseEnter={() => setHoveredItem(item.id)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    className={`relative px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-colors duration-150 cursor-pointer ${
                                        isActive
                                            ? 'text-white bg-white/[0.08] border border-white/15 shadow-sm'
                                            : isHovered
                                                ? 'text-white bg-white/[0.05]'
                                                : 'text-gray-400'
                                    }`}
                                >
                                    <span>{item.label}</span>
                                    {isActive && (
                                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-0.5 bg-[#2563eb] rounded-full"></span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right side CTA & theme */}
                    <div className="hidden md:flex items-center gap-3">
                        <ThemeToggle />

                        <button
                            onClick={() => scrollTo('contact')}
                            className="px-5 py-2.5 rounded-2xl text-xs font-bold text-white keep-white bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#0ea5e9] hover:opacity-95 transition-all shadow-lg shadow-[#2563eb]/25 active:scale-95 cursor-pointer"
                        >
                            <span>Connect</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="p-2.5 text-gray-300 hover:text-white md:hidden rounded-xl hover:bg-white/5 transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </nav>
            </header>

            {/* Mobile Navigation Dropdown */}
            {mobileOpen && (
                <div className="fixed inset-x-4 top-24 z-50 md:hidden seedance-card border-white/15 rounded-3xl p-5 shadow-2xl backdrop-blur-3xl bg-[#0b0914]/95 animate-in fade-in slide-in-from-top-4 duration-200">
                    <div className="flex flex-col gap-2">
                        {navItems.map((item) => {
                            const isActive = activeSection === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => scrollTo(item.id)}
                                    className={`w-full flex items-center px-4 py-3.5 rounded-2xl text-sm font-semibold transition-colors duration-150 ${
                                        isActive
                                            ? 'bg-[#2563eb]/15 text-white border border-[#2563eb]/30'
                                            : 'text-gray-300 hover:bg-white/5'
                                    }`}
                                >
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}

                        <div className="h-px bg-white/10 my-2" />

                        <div className="flex items-center justify-between px-4 py-2">
                            <span className="text-xs font-mono text-gray-400">Theme</span>
                            <ThemeToggle />
                        </div>

                        <button
                            onClick={() => scrollTo('contact')}
                            className="w-full py-3.5 rounded-2xl text-sm font-bold text-white keep-white bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#0ea5e9] text-center shadow-xl shadow-[#2563eb]/20 cursor-pointer"
                        >
                            Direct Transmission
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
