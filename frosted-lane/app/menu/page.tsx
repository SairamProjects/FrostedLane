'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MenuCard from '@/components/MenuCard';
import AnimatedSection from '@/components/AnimatedSection';

interface MenuItem {
    id: string;
    name: string;
    price: number;
    isPopular: boolean;
    isAvailable: boolean;
}

interface Category {
    id: string;
    name: string;
    description: string;
    items: MenuItem[];
}

const categoryEmojis: Record<string, string> = {
    'Fruit Curls': '🍓',
    'Biscuit Curls': '🍪',
    'Dry Fruit Curls': '🥜',
    'Custom Curls': '✨',
    'Choco Fruits': '🍫',
    'Waffles': '🧇',
    'Chill Sips': '🥤',
    'Hot Sips': '☕',
};

export default function MenuPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<string>('');

    useEffect(() => {
        fetch('/api/menu')
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setCategories(data.data);
                    if (data.data.length > 0) {
                        setActiveCategory(data.data[0].id);
                    }
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const scrollToCategory = (id: string) => {
        setActiveCategory(id);
        document.getElementById(`category-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="min-h-screen pt-20">
            {/* Header */}
            <section className="py-12 md:py-20 hero-gradient text-center">
                <AnimatedSection>
                    <span className="text-sm font-semibold text-frost-200 uppercase tracking-widest">
                        Explore Our
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mt-3 mb-4">
                        Menu
                    </h1>
                    <p className="text-frost-200/80 text-lg max-w-2xl mx-auto">
                        Freshly prepared frozen curls, waffles, and refreshing drinks made with premium ingredients.
                    </p>
                </AnimatedSection>
            </section>

            {/* Category tabs */}
            <div className="sticky top-16 md:top-20 z-40 glass border-b border-white/20">
                <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
                    <div className="flex gap-1 py-3 min-w-max">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => scrollToCategory(cat.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${activeCategory === cat.id
                                    ? 'bg-frost-500 text-white shadow-lg shadow-frost-300/30'
                                    : 'text-frost-600 hover:bg-frost-100/60'
                                    }`}
                            >
                                {categoryEmojis[cat.name] || '🍨'} {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Menu content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                {loading ? (
                    <div className="text-center py-20">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            className="text-5xl inline-block"
                        >
                            ❄️
                        </motion.div>
                        <p className="text-frost-500 mt-4">Loading menu...</p>
                    </div>
                ) : categories.length === 0 ? (
                    <div className="text-center py-10 max-w-4xl mx-auto">
                        <div className="glass rounded-3xl p-4 mb-8 overflow-hidden shadow-2xl">
                            <img
                                src="/images/menu.jpeg"
                                alt="Frosted Lane Menu"
                                className="w-full h-auto rounded-2xl"
                            />
                        </div>
                        <div className="text-5xl mb-4">🍨</div>
                        <p className="text-frost-500 text-lg">Menu is being prepared. Check back soon!</p>
                    </div>
                ) : (
                    <div className="space-y-16">
                        {categories.map((category, catIndex) => (
                            <section key={category.id} id={`category-${category.id}`} className="scroll-mt-36">
                                <AnimatedSection delay={catIndex * 0.05}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-3xl">{categoryEmojis[category.name] || '🍨'}</span>
                                        <h2 className="text-2xl md:text-3xl font-bold text-frost-900">{category.name}</h2>
                                    </div>
                                    {category.description && (
                                        <p className="text-frost-500 text-sm mb-6 ml-12">{category.description}</p>
                                    )}
                                </AnimatedSection>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {category.items.map((item, i) => (
                                        <AnimatedSection key={item.id} delay={i * 0.05}>
                                            <MenuCard
                                                id={item.id}
                                                name={item.name}
                                                price={item.price}
                                                isPopular={item.isPopular}
                                                categoryName={category.name}
                                            />
                                        </AnimatedSection>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
