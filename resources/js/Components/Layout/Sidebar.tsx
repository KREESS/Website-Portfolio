import { FC } from 'react';
import { FaHome, FaBook, FaGithub, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';

interface SidebarProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
}

const Sidebar: FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
    const navItems = [
        { id: 'home', label: 'Home', icon: FaHome },
        { id: 'guestbook', label: 'Guestbook', icon: FaBook },
    ];

    const socialLinks = [
        { icon: FaGithub, url: 'https://github.com/kreess' },
        { icon: FaLinkedin, url: 'https://linkedin.com/in/kreess' },
        { icon: FaInstagram, url: 'https://instagram.com/kreess' },
        { icon: FaYoutube, url: 'https://youtube.com/@kreess' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-20 md:w-24 lg:w-28 bg-[#1a1420]/90 backdrop-blur-sm border-r border-white/10 flex flex-col items-center py-8 z-50">
            <div className="mb-10">
                <div className="w-12 h-12 bg-[#ff6b6b] rounded-full flex items-center justify-center text-2xl font-bold text-white">
                    K
                </div>
            </div>

            <nav className="flex-1 flex flex-col items-center gap-6">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`group relative p-3 rounded-xl transition-all duration-300 ${activeSection === item.id
                                ? 'bg-[#ff6b6b]/20 text-[#ff6b6b]'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <item.icon className="text-xl" />
                        <span className="absolute left-full ml-4 px-3 py-1 bg-[#1a1420] text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                            {item.label}
                        </span>
                    </button>
                ))}
            </nav>

            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-px bg-white/10"></div>
                {socialLinks.map((social, index) => (
                    <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#ff6b6b] transition-colors duration-300 text-lg"
                    >
                        <social.icon />
                    </a>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;