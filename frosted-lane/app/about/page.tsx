'use client';

import AnimatedSection from '@/components/AnimatedSection';
import { motion } from 'framer-motion';
import Image from 'next/image';

const stats = [
    { number: '30+', label: 'Menu Items' },
    { number: '100%', label: 'Fresh Ingredients' },
    { number: '8', label: 'Categories' },
    { number: '❤️', label: 'Made with Love' },
];

const values = [
    { icon: '🍃', title: 'Fresh Ingredients', desc: 'We use only the freshest fruits, premium biscuits, and quality dry fruits.' },
    { icon: '🧊', title: 'Frozen Perfection', desc: 'Every curl is freshly prepared using our unique freezing technique.' },
    { icon: '🎨', title: 'Handcrafted', desc: 'Each dessert is artfully crafted to deliver both visual appeal and taste.' },
    { icon: '💝', title: 'Customer First', desc: 'Your satisfaction is our top priority. We customize to your preferences.' },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-20">
            {/* Header */}
            <section className="py-12 md:py-20 hero-gradient text-center">
                <AnimatedSection>
                    <span className="text-sm font-semibold text-frost-200 uppercase tracking-widest">
                        Our Story
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mt-3 mb-4">
                        About Frosted Lane
                    </h1>
                    <p className="text-frost-200/80 text-lg max-w-2xl mx-auto">
                        The coolest destination for handcrafted frozen desserts.
                    </p>
                </AnimatedSection>
            </section>

            {/* Story Section */}
            <section className="py-16 md:py-24 frost-gradient">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <AnimatedSection direction="left">
                            <div className="relative">
                                <div className="w-full aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-frost-200/40 border-4 border-white/50">
                                    <Image
                                        src="/images/logo.jpeg"
                                        alt="Frosted Lane Shop"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                {/* Decorative element */}
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-frost-200/50 rounded-2xl -z-10" />
                                <div className="absolute -top-6 -left-6 w-24 h-24 bg-ice-200/50 rounded-2xl -z-10" />
                            </div>
                        </AnimatedSection>

                        <AnimatedSection direction="right">
                            <span className="text-sm font-semibold text-frost-500 uppercase tracking-widest">
                                Who We Are
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-frost-900 mt-3 mb-6">
                                Crafting Joy,<br />One Curl at a Time
                            </h2>
                            <div className="space-y-4 text-frost-600 leading-relaxed">
                                <p>
                                    Welcome to Frosted Lane – the coolest destination for handcrafted frozen curls,
                                    chocolate treats, crispy waffles, and refreshing beverages.
                                </p>
                                <p>
                                    Every dessert is freshly prepared using premium fruits, biscuits, and dry fruits
                                    to deliver a delightful frozen experience. We believe in transforming simple
                                    ingredients into extraordinary frozen delicacies.
                                </p>
                                <p>
                                    From our signature fruit curls to our indulgent Biscoff curls, every item on
                                    our menu is crafted with passion and precision. Come experience the magic of
                                    Frosted Lane!
                                </p>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-gradient-to-r from-frost-500 to-ice-500">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, i) => (
                            <AnimatedSection key={i} delay={i * 0.1}>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="text-center"
                                >
                                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.number}</div>
                                    <div className="text-frost-100 text-sm font-medium">{stat.label}</div>
                                </motion.div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <AnimatedSection className="text-center mb-14">
                        <span className="text-sm font-semibold text-frost-500 uppercase tracking-widest">
                            Our Values
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-frost-900 mt-3">
                            What Makes Us Special
                        </h2>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, i) => (
                            <AnimatedSection key={i} delay={i * 0.1}>
                                <motion.div
                                    whileHover={{ y: -8 }}
                                    className="glass rounded-2xl p-6 text-center h-full"
                                >
                                    <div className="text-4xl mb-4">{value.icon}</div>
                                    <h3 className="text-lg font-bold text-frost-900 mb-2">{value.title}</h3>
                                    <p className="text-frost-500 text-sm">{value.desc}</p>
                                </motion.div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
