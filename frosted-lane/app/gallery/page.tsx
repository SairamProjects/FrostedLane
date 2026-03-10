'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';

const galleryItems = [
    { emoji: '🍦', title: 'Frozen Curls', desc: 'Handcrafted frozen curls with premium fruits', color: 'from-frost-300 to-ice-300' },
    { emoji: '🍪', title: 'Oreo Curls', desc: 'Classic Oreo cookies blended into creamy frozen curls', color: 'from-gray-300 to-gray-400' },
    { emoji: '🥭', title: 'Mango Curls', desc: 'Fresh mangoes transformed into golden frozen curls', color: 'from-amber-200 to-orange-300' },
    { emoji: '🍫', title: 'Choco Banana', desc: 'Fresh bananas dipped in rich Belgian chocolate', color: 'from-amber-700 to-amber-900' },
    { emoji: '🧇', title: 'Red Velvet Waffle', desc: 'Crispy red velvet waffle with cream cheese drizzle', color: 'from-red-300 to-rose-400' },
    { emoji: '🍓', title: 'Strawberry Curls', desc: 'Sweet strawberries frozen into luscious curls', color: 'from-rose-200 to-pink-300' },
    { emoji: '🥥', title: 'Coconut Curls', desc: 'Tropical coconut blended into refreshing frozen curls', color: 'from-white to-gray-200' },
    { emoji: '🥤', title: 'Chill Sips', desc: 'Cool refreshing beverages with real fruit flavors', color: 'from-frost-200 to-frost-400' },
    { emoji: '☕', title: 'Hot Beverages', desc: 'Warm coffee and tea to complement your desserts', color: 'from-amber-600 to-amber-800' },
    { emoji: '🍨', title: 'Biscoff Curls', desc: 'Caramelized Biscoff cookies in premium frozen curls', color: 'from-amber-300 to-amber-500' },
    { emoji: '🥜', title: 'Dry Fruit Curls', desc: 'Premium pistachios and cashews in frozen curls', color: 'from-green-200 to-emerald-300' },
    { emoji: '🍫', title: 'Chocolate Waffle', desc: 'Golden waffle drizzled with rich chocolate sauce', color: 'from-amber-800 to-amber-950' },
];

export default function GalleryPage() {
    return (
        <div className="min-h-screen pt-20">
            {/* Header */}
            <section className="py-12 md:py-20 hero-gradient text-center">
                <AnimatedSection>
                    <span className="text-sm font-semibold text-frost-200 uppercase tracking-widest">
                        Visual Treats
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mt-3 mb-4">
                        Gallery
                    </h1>
                    <p className="text-frost-200/80 text-lg max-w-2xl mx-auto">
                        A feast for the eyes! Explore our handcrafted desserts and frozen delicacies.
                    </p>
                </AnimatedSection>
            </section>

            {/* Gallery Grid */}
            <section className="py-16 max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {galleryItems.map((item, i) => (
                        <AnimatedSection key={i} delay={i * 0.05}>
                            <motion.div
                                whileHover={{ y: -10, scale: 1.03 }}
                                className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                            >
                                {/* Gradient background as image placeholder */}
                                <div className={`aspect-square bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                                    <motion.span
                                        className="text-7xl filter drop-shadow-lg"
                                        whileHover={{ scale: 1.3, rotate: 10 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        {item.emoji}
                                    </motion.span>
                                </div>

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
                                    <h3 className="text-white text-lg font-bold">{item.title}</h3>
                                    <p className="text-white/80 text-sm mt-1">{item.desc}</p>
                                </div>

                                {/* Title bar */}
                                <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-3 group-hover:translate-y-full transition-transform duration-500">
                                    <h3 className="text-frost-900 font-semibold text-sm">{item.title}</h3>
                                </div>
                            </motion.div>
                        </AnimatedSection>
                    ))}
                </div>
            </section>
        </div>
    );
}
