'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="relative bg-gradient-to-b from-frost-950 to-frost-900 text-white overflow-hidden">
            {/* Decorative top wave */}
            <div className="absolute top-0 left-0 right-0">
                <svg viewBox="0 0 1440 60" fill="none" className="w-full">
                    <path d="M0 60L48 50C96 40 192 20 288 15C384 10 480 20 576 25C672 30 768 30 864 25C960 20 1056 10 1152 15C1248 20 1344 40 1392 50L1440 60V0H0V60Z" fill="#f0f7ff" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-frost-400/40">
                                <Image src="/images/logo.jpeg" alt="Frosted Lane" fill className="object-cover" sizes="40px" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-frost-300 to-ice-300 bg-clip-text text-transparent">
                                Frosted Lane
                            </span>
                        </div>
                        <p className="text-frost-300/80 text-sm leading-relaxed">
                            Delicious Frozen Curls & Drinks. The coolest destination for handcrafted frozen desserts.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-frost-200">Quick Links</h3>
                        <ul className="space-y-2">
                            {[
                                { href: '/', label: 'Home' },
                                { href: '/menu', label: 'Menu' },
                                { href: '/gallery', label: 'Gallery' },
                                { href: '/about', label: 'About Us' },
                                { href: '/contact', label: 'Contact' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-frost-300/80 hover:text-frost-200 transition-colors text-sm">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-frost-200">Visit Us</h3>
                        <div className="space-y-2 text-frost-300/80 text-sm">
                            <p>📍 Frosted Lane Dessert Shop</p>
                            <p>📞 Contact us for orders</p>
                            <p>🕒 Open daily</p>
                            <p className="mt-4 text-frost-400 font-medium">
                                &quot;Visit us for the coolest dessert experience!&quot;
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-frost-700/40 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-frost-400/60 text-xs">
                        © {new Date().getFullYear()} Frosted Lane. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="text-frost-400/60 hover:text-frost-300 text-xs transition-colors">
                            Admin
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
