import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextType {
    loading: number;
    setLoading: (value: number) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within LoadingProvider');
    }
    return context;
};

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(0);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {loading < 100 && (
                <div className="fixed inset-0 z-[9999] bg-[#0b080c] flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-[#ff6b6b] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-400">Loading... {Math.round(loading)}%</p>
                    </div>
                </div>
            )}
            {children}
        </LoadingContext.Provider>
    );
};

export default LoadingProvider;