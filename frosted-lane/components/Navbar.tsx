'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartProvider';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const { totalItems, setIsCartOpen } = useCart();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? 'glass shadow-lg shadow-frost-200/30'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-frost-300/50 group-hover:border-frost-400 transition-colors">
                            <Image
                                src="/images/logo.jpeg"
                                alt="Frosted Lane"
                                fill
                                className="object-cover"
                                sizes="48px"
                            />
                        </div>
                        <span className="text-xl md:text-2xl font-bold gradient-text">
                            Frosted Lane
                        </span>
                    </Link>

                    {/* Desktop nav links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 rounded-full text-sm font-medium text-frost-900 hover:text-frost-600 hover:bg-frost-100/60 transition-all duration-300"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative ml-2 px-4 py-2 rounded-full bg-gradient-to-r from-frost-500 to-ice-500 text-white font-medium text-sm hover:shadow-lg hover:shadow-frost-300/50 transition-all duration-300"
                        >
                            🛒 Cart
                            {totalItems > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2 w-5 h-5 bg-berry text-white text-xs rounded-full flex items-center justify-center font-bold"
                                >
                                    {totalItems}
                                </motion.span>
                            )}
                        </button>
                    </div>

                    {/* Mobile menu button + cart */}
                    <div className="flex md:hidden items-center gap-3">
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 rounded-full bg-frost-500/20 text-frost-700"
                        >
                            🛒
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-berry text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            className="p-2 rounded-lg text-frost-700 hover:bg-frost-100/60"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-white/20"
                    >
                        <div className="px-4 py-3 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className="block px-4 py-3 rounded-xl text-frost-900 hover:bg-frost-100/60 font-medium transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
