import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
    const [isLight, setIsLight] = useState<boolean>(() =>
        typeof document !== 'undefined' && document.documentElement.classList.contains('light')
    );

    const toggleTheme = () => {
        const next = !isLight;
        document.documentElement.classList.toggle('light', next);
        try {
            localStorage.setItem('theme', next ? 'light' : 'dark');
        } catch (e) {
            // storage unavailable
        }
        setIsLight(next);
    };

    return (
        <button
            onClick={toggleTheme}
            aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
            title={isLight ? 'Dark mode' : 'Light mode'}
            className="relative w-10 h-10 rounded-2xl seedance-card border border-white/15 flex items-center justify-center text-gray-300 hover:text-white transition-all active:scale-90 cursor-pointer overflow-hidden"
        >
            <span className="absolute inset-0 bg-gradient-to-tr from-[#2563eb]/0 via-[#0ea5e9]/0 to-[#38bdf8]/0" />
            {isLight ? (
                <Moon className="w-4.5 h-4.5 w-[18px] h-[18px] relative z-10 text-indigo-500" />
            ) : (
                <Sun className="w-[18px] h-[18px] relative z-10 text-amber-300" />
            )}
        </button>
    );
};
