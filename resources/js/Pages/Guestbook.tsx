import React from 'react';
import { Head } from '@inertiajs/react';
import { GuestbookSection, CommentItem } from '../Components/Sections/GuestbookSection';
import { Footer } from '../Components/Layout/Footer';

interface GuestbookPageProps {
    initialComments: CommentItem[];
    totalComments: number;
}

export default function Guestbook({ initialComments, totalComments }: GuestbookPageProps) {
    return (
        <div className="relative bg-[#030305] text-gray-100 min-h-screen selection:bg-[#2563eb]/30 selection:text-[#3b82f6] luxury-noise">
            <Head title="Guestbook — Aditya Putra Sholahuddin" />

            <main className="relative z-10">
                <GuestbookSection
                    initialComments={initialComments}
                    totalComments={totalComments}
                />
            </main>

            <Footer />
        </div>
    );
}
