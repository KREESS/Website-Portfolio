import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Navbar } from '../Components/Layout/Navbar';
import { HeroSection } from '../Components/Sections/HeroSection';
import { AboutSection } from '../Components/Sections/AboutSection';
import { CareerSection } from '../Components/Sections/CareerSection';
import { SkillsSection, SkillItem } from '../Components/Sections/SkillsSection';
import { ProjectsSection, ProjectItem } from '../Components/Sections/ProjectsSection';
import { GuestbookSection, CommentItem } from '../Components/Sections/GuestbookSection';
import { ContactSection } from '../Components/Sections/ContactSection';
import { Footer } from '../Components/Layout/Footer';

interface HomePageProps {
    initialComments: CommentItem[];
    totalComments: number;
    projects: ProjectItem[];
    skills: SkillItem[];
}

export default function Home({ initialComments, totalComments, projects, skills }: HomePageProps) {
    const [activeSection, setActiveSection] = useState('hero');
    const { props } = usePage<{ auth: { user: { id: number; name: string } | null } }>();
    const isAdmin = Boolean(props.auth?.user);

    useEffect(() => {
        const sections = ['hero', 'about', 'career', 'skills', 'projects', 'comments', 'contact'];

        const handleScroll = () => {
            const scrollY = window.scrollY + 200;

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
        };

        window.addEventListener('scroll', handleScroll);
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
                <GuestbookSection
                    initialComments={initialComments}
                    totalComments={totalComments}
                />
                <ContactSection />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

