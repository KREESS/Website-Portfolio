import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Navbar } from '../Components/Layout/Navbar';
import { HeroSection } from '../Components/Sections/HeroSection';
import { AboutSection } from '../Components/Sections/AboutSection';
import { CareerSection } from '../Components/Sections/CareerSection';
import { SkillsSection, SkillItem } from '../Components/Sections/SkillsSection';
import { ProjectsSection, ProjectItem } from '../Components/Sections/ProjectsSection';
import { ContactSection } from '../Components/Sections/ContactSection';
import { Footer } from '../Components/Layout/Footer';

interface HomePageProps {
    projects: ProjectItem[];
    skills: SkillItem[];
}

export default function Home({ projects, skills }: HomePageProps) {
    const [activeSection, setActiveSection] = useState('hero');
    const { props } = usePage<{ auth: { user: { id: number; name: string } | null } }>();
    const isAdmin = Boolean(props.auth?.user);

    useEffect(() => {
        const sections = ['hero', 'about', 'career', 'skills', 'projects', 'contact'];
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY + window.innerHeight / 3;

                    for (const sectionId of sections) {
                        const el = document.getElementById(sectionId);
                        if (el) {
                            const top = el.offsetTop;
                            const height = el.offsetHeight;
                            if (scrollY >= top && scrollY < top + height) {
                                setActiveSection(sectionId);
                                break;
                            }
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavigate = (sectionId: string) => {
        setActiveSection(sectionId);
        const el = document.getElementById(sectionId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative bg-[#030305] text-gray-100 min-h-screen selection:bg-[#2563eb]/30 selection:text-[#3b82f6] luxury-noise">
            <Head title="Aditya Putra Sholahuddin (Kreess) — Full-Stack & AI Architecture" />

            {/* Floating Top Navbar */}
            <Navbar
                activeSection={activeSection}
                setActiveSection={handleNavigate}
                isAdmin={isAdmin}
            />

            {/* Main Sections */}
            <main className="relative z-10">
                <HeroSection onNavigate={handleNavigate} />
                <AboutSection />
                <CareerSection />
                <SkillsSection skills={skills} />
                <ProjectsSection projects={projects} />
                <ContactSection />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

