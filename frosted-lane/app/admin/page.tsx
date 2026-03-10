'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem('admin-token', data.data.token);
                localStorage.setItem('admin-user', JSON.stringify(data.data.user));
                router.push('/admin/dashboard');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch {
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center hero-gradient p-4">
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <div className="glass rounded-3xl p-8 shadow-2xl">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="relative w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-white/40 mb-4">
                            <Image src="/images/logo.jpeg" alt="Frosted Lane" fill className="object-cover" sizes="64px" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-1">Admin Portal</h1>
                        <p className="text-frost-200/80 text-sm">Frosted Lane Management</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-3 rounded-xl bg-red-500/20 border border-red-400/30 text-red-200 text-sm text-center"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-frost-200 mb-1.5">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@frostedlane.com"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-frost-300/50 focus:ring-2 focus:ring-frost-400 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-frost-200 mb-1.5">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-frost-300/50 focus:ring-2 focus:ring-frost-400 focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3.5 rounded-xl bg-white text-frost-700 font-bold shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 mt-2"
                        >
                            {loading ? '⏳ Logging in...' : '🔐 Login'}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
