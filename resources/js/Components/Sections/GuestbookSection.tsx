import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { 
    MessageSquareQuote, 
    Send, 
    Sparkles, 
    Clock, 
    ShieldCheck, 
    User as UserIcon,
    RefreshCw,
    MessageCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatDistanceToNow } from 'date-fns';
import { ToastContainer, useToast } from '../UI/Toast';

export interface ReplyItem {
    id: number;
    parent_id: number;
    nickname: string;
    message: string;
    avatar_color: string;
    is_admin?: boolean;
    created_at: string;
}

export interface CommentItem {
    id: number;
    nickname: string;
    message: string;
    avatar_color: string;
    created_at: string;
    replies?: ReplyItem[];
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
    const [replyTo, setReplyTo] = useState<{ id: number; nickname: string } | null>(null);
    const [expandedReplies, setExpandedReplies] = useState<number[]>([]);
    const { toasts, showToast, dismissToast } = useToast();

    // Inertia form handling
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        nickname: '',
        message: '',
        avatar_color: '#2563eb',
        parent_id: null as number | null,
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

        if (!data.message.trim()) return;

        const isReply = !!data.parent_id;

        post('/comments', {
            preserveScroll: true,
            onSuccess: () => {
                if (isReply && data.parent_id) {
                    // Append optimistically into the parent's replies
                    const parentId = data.parent_id;
                    const newReply: ReplyItem = {
                        id: Date.now(),
                        parent_id: parentId,
                        nickname: data.nickname.trim() || 'Anonymous Visitor',
                        message: data.message.trim(),
                        avatar_color: data.avatar_color,
                        created_at: new Date().toISOString(),
                    };
                    setCommentsList((prev) =>
                        prev.map((c) =>
                            c.id === parentId
                                ? { ...c, replies: [...(c.replies ?? []), newReply] }
                                : c
                        )
                    );
                    setReplyTo(null);
                    setData('parent_id', null);
                    showToast('success', 'Balasan berhasil dikirim!');
                } else {
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
                        replies: [],
                    };

                    setCommentsList((prev) => [newComment, ...prev]);
                    showToast('success', 'Pesan Anda berhasil dipublikasikan!');
                }

                reset('message');
            },
            onError: (err) => {
                console.error('Comment submit error:', err);
                if (err.rate_limit) {
                    showToast('error', err.rate_limit);
                } else {
                    showToast('error', 'Gagal mengirim pesan. Silakan coba lagi.');
                }
            },
        });
    };

    const startReply = (comment: CommentItem) => {
        setReplyTo({ id: comment.id, nickname: comment.nickname });
        setData('parent_id', comment.id);
    };

    const cancelReply = () => {
        setReplyTo(null);
        setData('parent_id', null);
    };

    const toggleReplies = (id: number) => {
        setExpandedReplies((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    // Show rate-limit / validation errors as toast popups
    useEffect(() => {
        if (errors.rate_limit) showToast('error', errors.rate_limit);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors.rate_limit]);

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
            {/* Toast Notifications (top-right popups) */}
            <ToastContainer toasts={toasts} onDismiss={dismissToast} />

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

                                {/* Reply indicator */}
                                {replyTo && (
                                    <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#2563eb]/10 border border-[#2563eb]/25">
                                        <span className="text-xs text-[#3b82f6] font-medium truncate">
                                            Membalas komentar @{replyTo.nickname}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={cancelReply}
                                            className="text-gray-400 hover:text-white text-sm shrink-0 cursor-pointer"
                                            aria-label="Cancel reply"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                )}

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

                                <button
                                    type="submit"
                                    disabled={processing || !data.message.trim()}
                                    className="w-full py-4 px-6 rounded-2xl text-sm font-bold text-white keep-white bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#0ea5e9] hover:opacity-95 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 shadow-xl shadow-[#2563eb]/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    <span>{processing ? 'Sending...' : replyTo ? 'Kirim Balasan' : 'Post Message'}</span>
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
                                {commentsList.map((comment) => {
                                    const replies = comment.replies ?? [];
                                    const isExpanded = expandedReplies.includes(comment.id);
                                    const visibleReplies = isExpanded ? replies : replies.slice(0, 2);
                                    const hiddenCount = replies.length - visibleReplies.length;

                                    return (
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

                                            {/* Replies (nested, collapsed by default) */}
                                            {replies.length > 0 && (
                                                <div className="mt-4 pl-4 border-l-2 border-white/10 space-y-3">
                                                    {visibleReplies.map((reply) => (
                                                        <div key={reply.id} className="flex items-start gap-2.5">
                                                            <div
                                                                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                                                                style={{
                                                                    backgroundColor: reply.avatar_color || '#2563eb',
                                                                }}
                                                            >
                                                                {reply.nickname.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <div className="flex items-center gap-2 flex-wrap">
                                                                    <span
                                                                        className={`text-xs font-semibold font-heading ${
                                                                            reply.is_admin ? 'text-[#3b82f6]' : 'text-white'
                                                                        }`}
                                                                    >
                                                                        {reply.nickname}
                                                                    </span>
                                                                    {reply.is_admin && (
                                                                        <span className="text-[9px] px-1.5 py-px rounded-md bg-[#2563eb]/15 text-[#3b82f6] border border-[#2563eb]/30 font-mono font-semibold">
                                                                            CREATOR
                                                                        </span>
                                                                    )}
                                                                    <span className="text-[10px] text-gray-500 font-mono">
                                                                        {formatRelativeTime(reply.created_at)}
                                                                    </span>
                                                                </div>
                                                                <p className="text-gray-300 text-xs leading-relaxed whitespace-pre-wrap mt-0.5 font-sans font-light break-words">
                                                                    {reply.message}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}

                                                    {hiddenCount > 0 && (
                                                        <button
                                                            onClick={() => toggleReplies(comment.id)}
                                                            className="text-[11px] font-semibold text-[#3b82f6] hover:text-[#60a5fa] transition-colors cursor-pointer"
                                                        >
                                                            Tampilkan {hiddenCount} balasan lainnya ↓
                                                        </button>
                                                    )}
                                                    {isExpanded && replies.length > 2 && (
                                                        <button
                                                            onClick={() => toggleReplies(comment.id)}
                                                            className="text-[11px] font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
                                                        >
                                                            Sembunyikan balasan ↑
                                                        </button>
                                                    )}
                                                </div>
                                            )}

                                            {/* Reply action */}
                                            {!replyTo && (
                                                <button
                                                    onClick={() => startReply(comment)}
                                                    className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 hover:text-[#3b82f6] transition-colors cursor-pointer"
                                                >
                                                    <MessageCircle className="w-3 h-3" />
                                                    Balas
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
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
