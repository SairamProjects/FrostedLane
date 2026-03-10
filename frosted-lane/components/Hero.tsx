'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

function Snowflake({ delay, left, size, duration }: { delay: number; left: string; size: number; duration: number }) {
    return (
        <motion.div
            className="absolute text-white/20 pointer-events-none select-none"
            style={{ left, top: '-5%', fontSize: size }}
            animate={{
                y: ['0vh', '110vh'],
                x: [0, Math.random() * 100 - 50],
                rotate: [0, 360],
            }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: 'linear',
            }}
        >
            ❄
        </motion.div>
    );
}

export default function Hero() {
    const snowflakes = Array.from({ length: 15 }, (_, i) => ({
        delay: Math.random() * 8,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 20 + 12,
        duration: Math.random() * 10 + 10,
    }));

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
            {/* Snowflakes */}
            {snowflakes.map((sf, i) => (
                <Snowflake key={i} {...sf} />
            ))}

            {/* Decorative circles */}
            <div className="absolute top-20 right-10 w-72 h-72 bg-frost-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-ice-400/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-frost-300/5 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                {/* Logo */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
                    className="mx-auto mb-8"
                >
                    <div className="relative w-28 h-28 md:w-36 md:h-36 mx-auto rounded-full overflow-hidden border-4 border-white/30 shadow-2xl shadow-frost-500/30 animate-pulse-glow">
                        <Image
                            src="/images/logo.jpeg"
                            alt="Frosted Lane"
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 112px, 144px"
                        />
                    </div>
                </motion.div>

                {/* Shop name */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight"
                    style={{ textShadow: '0 4px 30px rgba(0,0,0,0.3)' }}
                >
                    Frosted Lane
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-lg md:text-2xl text-frost-200/90 mb-10 font-light tracking-wide"
                >
                    ✨ Delicious Frozen Curls & Drinks ✨
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/menu"
                        className="group relative px-8 py-4 bg-white text-frost-700 rounded-full font-bold text-lg shadow-xl shadow-frost-500/20 hover:shadow-2xl hover:shadow-frost-400/40 transition-all duration-300 hover:-translate-y-1"
                    >
                        <span className="relative z-10">Explore Menu</span>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-frost-100 to-ice-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                    <Link
                        href="/about"
                        className="px-8 py-4 border-2 border-white/40 text-white rounded-full font-medium text-lg hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                    >
                        Our Story
                    </Link>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-white/50 text-2xl"
                    >
                        ↓
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
