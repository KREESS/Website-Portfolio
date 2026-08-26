import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastData {
    id: number;
    type: ToastType;
    message: string;
}

export interface Toast {
    toasts: ToastData[];
    showToast: (type: ToastType, message: string) => void;
    dismissToast: (id: number) => void;
}

const TOAST_DURATION = 5000;

export const useToast = (): Toast => {
    const [toasts, setToasts] = useState<ToastData[]>([]);
    const counter = useRef(0);

    const dismissToast = useCallback((id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showToast = useCallback(
        (type: ToastType, message: string) => {
            const id = ++counter.current;
            setToasts((prev) => [...prev, { id, type, message }]);
            window.setTimeout(() => dismissToast(id), TOAST_DURATION);
        },
        [dismissToast]
    );

    return { toasts, showToast, dismissToast };
};

const toastConfig: Record<ToastType, { icon: React.ReactNode; ring: string; bar: string }> = {
    success: {
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
        ring: 'border-emerald-500/40 shadow-emerald-500/10',
        bar: 'bg-gradient-to-r from-emerald-400 to-teal-400',
    },
    error: {
        icon: <XCircle className="w-5 h-5 text-red-500 shrink-0" />,
        ring: 'border-red-500/40 shadow-red-500/10',
        bar: 'bg-gradient-to-r from-red-400 to-orange-400',
    },
    info: {
        icon: <Info className="w-5 h-5 text-[#2563eb] shrink-0" />,
        ring: 'border-[#2563eb]/40 shadow-blue-500/10',
        bar: 'bg-gradient-to-r from-[#2563eb] to-[#0ea5e9]',
    },
};

interface ToastContainerProps {
    toasts: ToastData[];
    onDismiss: (id: number) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
    // Render through a portal so toasts are never clipped or covered
    // by sections / navbar stacking contexts.
    if (typeof document === 'undefined') return null;

    return createPortal(
        <div className="fixed top-24 right-4 z-[200] flex flex-col gap-3 w-[calc(100vw-2rem)] max-w-sm pointer-events-none">
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
            ))}
        </div>,
        document.body
    );
};

interface ToastItemProps {
    toast: ToastData;
    onDismiss: (id: number) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
    const [leaving, setLeaving] = useState(false);
    const config = toastConfig[toast.type];

    useEffect(() => {
        const timer = window.setTimeout(() => setLeaving(true), TOAST_DURATION - 300);
        return () => window.clearTimeout(timer);
    }, []);

    return (
        <div
            role="alert"
            className={`toast-surface pointer-events-auto relative overflow-hidden rounded-2xl border backdrop-blur-xl shadow-2xl ${config.ring} ${
                leaving ? 'toast-exit' : 'toast-enter'
            }`}
            onAnimationEnd={(e) => {
                if (e.animationName === 'toast-slide-out') {
                    onDismiss(toast.id);
                }
            }}
        >
            <div className="flex items-start gap-3 p-4 pr-10">
                {config.icon}
                <p className="toast-message text-xs font-medium leading-relaxed break-words">
                    {toast.message}
                </p>
            </div>

            <button
                onClick={() => setLeaving(true)}
                className="toast-close absolute top-3 right-3 transition-colors cursor-pointer"
                aria-label="Close notification"
            >
                <X className="w-4 h-4" />
            </button>

            <div className={`h-1 toast-progress ${config.bar}`} />
        </div>
    );
};
