import { FC, useState } from 'react';

interface Message {
    id: number;
    name: string;
    message: string;
    date: string;
}

const Guestbook: FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, name: 'Anonymous', message: 'Keren banget websitenya! 🔥', date: '2024-01-15' },
        { id: 2, name: 'Anonymous', message: 'Karakter 3D-nya keren!', date: '2024-01-14' },
    ]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        const newMessage: Message = {
            id: messages.length + 1,
            name: name.trim() || 'Anonymous',
            message: message.trim(),
            date: new Date().toISOString().split('T')[0],
        };

        setMessages([newMessage, ...messages]);
        setName('');
        setMessage('');
    };

    return (
        <div className="section-container">
            <div className="section-content">
                <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">📖 Guestbook</h1>

                <form onSubmit={handleSubmit} className="glass-effect p-6 rounded-2xl mb-10 max-w-2xl mx-auto">
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Nama (opsional)"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#ff6b6b] transition-colors"
                        />
                    </div>
                    <div className="mb-4">
                        <textarea
                            placeholder="Tulis pesanmu..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#ff6b6b] transition-colors resize-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-6 py-3 bg-[#ff6b6b] text-white rounded-xl hover:bg-[#ff6b6b]/80 transition-all duration-300 font-semibold"
                    >
                        Kirim Pesan
                    </button>
                </form>

                <div className="max-w-2xl mx-auto space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className="glass-effect p-4 rounded-xl hover:bg-white/10 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-semibold text-[#ff6b6b]">{msg.name}</span>
                                <span className="text-sm text-gray-400">{msg.date}</span>
                            </div>
                            <p className="text-gray-200">{msg.message}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Guestbook;