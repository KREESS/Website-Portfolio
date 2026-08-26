import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { 
    MessageSquareQuote, 
    Send, 
    Sparkles, 
    Clock, 
    ShieldCheck, 
    AlertCircle, 
    CheckCircle2, 
    User as UserIcon,
    RefreshCw,
    MessageCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatDistanceToNow } from 'date-fns';

export interface CommentItem {
    id: number;
    nickname: string;
    message: string;
    avatar_color: string;
    created_at: string;
}

interface GuestbookSectionProps {
    initialComments: CommentItem[];
    totalComments: number;
}

export const GuestbookSection: React.FC<GuestbookSectionProps> = ({
    initialComments,
    totalComments: initialTotal,
}) => {
    const [commentsList, setCommentsList] = useState<CommentItem[]>(initialComments || []);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(initialComments.length < initialTotal);
    const [loadingMore, setLoadingMore] = useState(false);
    const [submitFeedback, setSubmitFeedback] = useState<string | null>(null);

    // Inertia form handling
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        nickname: '',
        message: '',
        avatar_color: '#2563eb',
        honeypot: '', // bot protection
        website_url: '', // bot protection
    });

    const avatarPalette = [
        '#2563eb',
        '#0ea5e9',
        '#38bdf8',
        '#10b981',
        '#f59e0b',
        '#ec4899',
        '#6366f1',
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        clearErrors();
        setSubmitFeedback(null);

        if (!data.message.trim()) return;

        post('/comments', {
            preserveScroll: true,
            onSuccess: () => {
                // Optimistic instant feedback with celebratory confetti
                confetti({
                    particleCount: 80,
                    spread: 70,
                    origin: { y: 0.8 },
                    colors: ['#2563eb', '#0ea5e9', '#38bdf8'],
                });

                const newComment: CommentItem = {
                    id: Date.now(),
                    nickname: data.nickname.trim() || 'Anonymous Visitor',
                    message: data.message.trim(),
                    avatar_color: data.avatar_color,
                    created_at: new Date().toISOString(),
                };

                setCommentsList((prev) => [newComment, ...prev]);
                reset('message');
                setSubmitFeedback('Pesan Anda berhasil dipublikasikan!');
                setTimeout(() => setSubmitFeedback(null), 5000);
            },
            onError: (err) => {
                console.error('Comment submit error:', err);
            },
        });
    };

    const loadMoreComments = async () => {
        if (loadingMore) return;
        setLoadingMore(true);
        const nextPage = page + 1;

        try {
            const res = await fetch(`/comments?page=${nextPage}`);
            const json = await res.json();
            if (json.data && json.data.length > 0) {
                setCommentsList((prev) => [...prev, ...json.data]);
                setPage(nextPage);
                if (nextPage >= json.last_page) {
                    setHasMore(false);
                }
            } else {
                setHasMore(false);
            }
        } catch (err) {
            console.error('Failed to load more comments', err);
        } finally {
            setLoadingMore(false);
        }
    };

    const formatRelativeTime = (dateStr: string) => {
        try {
            return formatDistanceToNow(new Date(dateStr), { addSuffix: true });
        } catch {
            return 'Just now';
        }
    };

    return (
        <section id="comments" className="py-28 relative overflow-hidden seedance-mesh">
            {/* Background lighting */}
            <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] glow-orb-coral blur-[160px] pointer-events-none -z-10" />
            <div className="absolute bottom-10 left-10 w-[500px] h-[500px] glow-orb-purple blur-[150px] pointer-events-none -z-10" />

            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Title */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#3b82f6] mb-4 backdrop-blur-md shadow-inner">
                        <span>GUESTBOOK</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight font-heading">
                        <span className="text-gradient-seedance">Guestbook</span>
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed font-sans font-light">
                        Drop a message or just say hi — no login needed, it's live instantly.
                    </p>
                    <div className="w-20 h-1 bg-gradient-to-r from-[#2563eb] via-[#0ea5e9] to-[#38bdf8] rounded-full mt-5"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Post Message Form */}
                    <div className="lg:col-span-5">
                        <div className="seedance-card p-7 sm:p-8 rounded-3xl border border-white/10 sticky top-28 shadow-2xl">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2 font-heading">
                                    <Sparkles className="w-4 h-4 text-[#2563eb]" />
                                    Say Something
                                </h3>
                                <span className="text-[10px] font-mono text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                    Live Stream
                                </span>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Honeypots for anti-spam bots */}
                                <div className="hidden" aria-hidden="true">
                                    <input
                                        type="text"
                                        name="honeypot"
                                        tabIndex={-1}
                                        value={data.honeypot}
                                        onChange={(e) => setData('honeypot', e.target.value)}
                                        autoComplete="off"
                                    />
                                    <input
                                        type="text"
                                        name="website_url"
                                        tabIndex={-1}
                                        value={data.website_url}
                                        onChange={(e) => setData('website_url', e.target.value)}
                                        autoComplete="off"
                                    />
                                </div>

                                {/* Nickname Input */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center justify-between">
                                        <span>Handle / Name</span>
                                        <span className="text-[11px] text-gray-500 font-mono">(Optional)</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="e.g. Fellow Engineer, Sarah, or Anon"
                                            maxLength={50}
                                            value={data.nickname}
                                            onChange={(e) => setData('nickname', e.target.value)}
                                            className="w-full px-4 py-3 input-lux rounded-2xl text-sm transition-all"
                                        />
                                    </div>
                                    {errors.nickname && (
                                        <p className="text-xs text-red-400 mt-1">{errors.nickname}</p>
                                    )}
                                </div>

                                {/* Avatar Color Picker */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-2">
                                        Accent Tone
                                    </label>
                                    <div className="flex items-center gap-2.5">
                                        {avatarPalette.map((color) => (
                                            <button
                                                key={color}
                                                type="button"
                                                onClick={() => setData('avatar_color', color)}
                                                className={`w-7 h-7 rounded-full transition-all ${
                                                    data.avatar_color === color
                                                        ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-[#0d0c15]'
                                                        : 'hover:scale-110 opacity-70 hover:opacity-100'
                                                }`}
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Message Area */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center justify-between">
                                        <span>Message</span>
                                        <span className="text-[11px] text-gray-500 font-mono">
                                            {data.message.length}/500
                                        </span>
                                    </label>
                                    <textarea
                                        rows={4}
                                        maxLength={500}
                                        required
                                        placeholder="Type your feedback, inquiries or collaborative greetings..."
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        className="w-full px-4 py-3 input-lux rounded-2xl text-sm transition-all resize-none font-sans"
                                    />
                                    {errors.message && (
                                        <p className="text-xs text-red-400 mt-1">{errors.message}</p>
                                    )}
                                </div>

                                {/* Rate Limit / General Errors */}
                                {errors.rate_limit && (
                                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        <span>{errors.rate_limit}</span>
                                    </div>
                                )}

                                {/* Success Feedback */}
                                {submitFeedback && (
                                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                                        <span>{submitFeedback}</span>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={processing || !data.message.trim()}
                                    className="w-full py-4 px-6 rounded-2xl text-sm font-bold text-white keep-white bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#0ea5e9] hover:opacity-95 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 shadow-xl shadow-[#2563eb]/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    <span>{processing ? 'Sending...' : 'Post Message'}</span>
                                </button>
                            </form>

                            <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400 font-mono">
                                <span className="flex items-center gap-1.5"> Verified Clean
                                </span>
                                <span>No-Spam Policy</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Live Feed */}
                    <div className="lg:col-span-7 space-y-4">
                        <div className="flex items-center justify-between px-2 mb-2">
                            <div className="text-sm font-semibold text-gray-300 flex items-center gap-2 font-heading">
                                <span>Entries Feed</span>
                                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-gray-300">
                                    {commentsList.length} visible
                                </span>
                            </div>
                        </div>

                        {commentsList.length === 0 ? (
                            <div className="seedance-card p-14 rounded-3xl text-center border border-white/10">
                                <h4 className="text-base font-semibold text-gray-300 font-heading">No entries yet</h4>
                                <p className="text-xs text-gray-400 mt-1 font-sans">
                                    No messages yet — be the first to say hi!
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {commentsList.map((comment) => (
                                    <div
                                        key={comment.id}
                                        className="seedance-card p-6 rounded-2xl border border-white/10 group relative"
                                    >
                                        <div className="flex items-start justify-between gap-3 mb-3">
                                            <div className="flex items-center gap-3">
                                                {/* Avatar Bubble */}
                                                <div
                                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white shadow-lg"
                                                    style={{
                                                        backgroundColor: comment.avatar_color || '#2563eb',
                                                    }}
                                                >
                                                    {comment.nickname.charAt(0).toUpperCase()}
                                                </div>

                                                <div>
                                                    <div className="text-sm font-bold text-white group-hover:text-[#3b82f6] transition-colors font-heading">
                                                        {comment.nickname}
                                                    </div>
                                                    <div className="text-[11px] text-gray-400 font-mono flex items-center gap-1 mt-0.5">
                                                        <span>{formatRelativeTime(comment.created_at)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap pl-13 font-sans font-light">
                                            {comment.message}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Load more button */}
                        {hasMore && (
                            <div className="pt-4 text-center">
                                <button
                                    onClick={loadMoreComments}
                                    disabled={loadingMore}
                                    className="px-7 py-3 rounded-2xl text-xs font-semibold text-gray-200 seedance-card hover:text-white transition-all inline-flex items-center gap-2.5 cursor-pointer"
                                >
                                    <RefreshCw className={`w-3.5 h-3.5 ${loadingMore ? 'animate-spin' : ''}`} />
                                    <span>{loadingMore ? 'Loading...' : 'Load More'}</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
