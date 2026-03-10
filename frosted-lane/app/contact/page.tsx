'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', phone: '', message: '' });
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        setError('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (data.success) {
                setSuccess(true);
                setForm({ name: '', phone: '', message: '' });
                setTimeout(() => setSuccess(false), 5000);
            } else {
                setError(data.error || 'Failed to send message');
            }
        } catch {
            setError('Failed to send message. Please try again.');
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="min-h-screen pt-20">
            {/* Header */}
            <section className="py-12 md:py-20 hero-gradient text-center">
                <AnimatedSection>
                    <span className="text-sm font-semibold text-frost-200 uppercase tracking-widest">
                        Get in Touch
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mt-3 mb-4">
                        Contact Us
                    </h1>
                    <p className="text-frost-200/80 text-lg max-w-2xl mx-auto">
                        Visit us for the coolest dessert experience!
                    </p>
                </AnimatedSection>
            </section>

            <section className="py-16 md:py-24 frost-gradient">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <AnimatedSection direction="left">
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-3xl font-bold text-frost-900 mb-4">
                                        Frosted Lane
                                    </h2>
                                    <p className="text-frost-600 leading-relaxed">
                                        Visit us for the coolest dessert experience! We&apos;d love to hear from you.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { icon: '🏪', label: 'Shop', value: 'Frosted Lane Dessert Shop' },
                                        { icon: '🕒', label: 'Hours', value: 'Open Daily' },
                                        { icon: '📧', label: 'Email', value: 'hello@frostedlane.com' },
                                    ].map((info, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ x: 5 }}
                                            className="flex items-center gap-4 p-4 glass rounded-xl"
                                        >
                                            <span className="text-2xl">{info.icon}</span>
                                            <div>
                                                <p className="text-xs text-frost-400 font-medium">{info.label}</p>
                                                <p className="text-frost-900 font-medium">{info.value}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* Contact Form */}
                        <AnimatedSection direction="right">
                            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8">
                                <h3 className="text-xl font-bold text-frost-900 mb-6">Send us a Message</h3>

                                {success && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm"
                                    >
                                        ✅ Message sent successfully! We&apos;ll get back to you soon.
                                    </motion.div>
                                )}

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
                                    >
                                        ❌ {error}
                                    </motion.div>
                                )}

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-frost-700 mb-1.5">Name</label>
                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            placeholder="Your name"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-frost-200 bg-white/80 text-frost-900 focus:ring-2 focus:ring-frost-400 focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-frost-700 mb-1.5">Phone</label>
                                        <input
                                            type="tel"
                                            value={form.phone}
                                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                            placeholder="Your phone number"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-frost-200 bg-white/80 text-frost-900 focus:ring-2 focus:ring-frost-400 focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-frost-700 mb-1.5">Message</label>
                                        <textarea
                                            value={form.message}
                                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                                            placeholder="Your message..."
                                            required
                                            rows={4}
                                            className="w-full px-4 py-3 rounded-xl border border-frost-200 bg-white/80 text-frost-900 focus:ring-2 focus:ring-frost-400 focus:border-transparent outline-none transition-all resize-none"
                                        />
                                    </div>
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={sending}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-frost-500 to-ice-500 text-white font-bold shadow-lg hover:shadow-xl hover:shadow-frost-300/40 transition-all disabled:opacity-50"
                                >
                                    {sending ? '⏳ Sending...' : '📬 Send Message'}
                                </motion.button>
                            </form>
                        </AnimatedSection>
                    </div>
                </div>
            </section>
        </div>
    );
}
