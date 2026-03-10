'use client';

import Hero from '@/components/Hero';
import AnimatedSection from '@/components/AnimatedSection';
import Link from 'next/link';
import { motion } from 'framer-motion';

const favorites = [
  { name: 'Oreo Curls', emoji: '🍪', desc: 'Crispy Oreo blended into frozen perfection' },
  { name: 'Mango Curls', emoji: '🥭', desc: 'Fresh mango in creamy frozen curls' },
  { name: 'Biscoff Curls', emoji: '🍫', desc: 'Rich Biscoff caramel frozen curls' },
  { name: 'Red Velvet Waffle', emoji: '🧇', desc: 'Crispy red velvet with premium toppings' },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <section className="py-20 md:py-28 frost-gradient">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <span className="text-sm font-semibold text-frost-500 uppercase tracking-widest">
              Welcome to
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-frost-900 mt-3 mb-6">
              Frosted Lane
            </h2>
            <p className="text-lg text-frost-600 leading-relaxed">
              Welcome to Frosted Lane – the coolest destination for handcrafted frozen curls,
              chocolate treats, crispy waffles, and refreshing beverages. Every dessert is freshly
              prepared using premium fruits, biscuits, and dry fruits to deliver a delightful frozen experience.
            </p>
          </AnimatedSection>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              { icon: '🍦', title: 'Frozen Curls', desc: 'Freshly rolled frozen curls made to order with premium ingredients' },
              { icon: '🧇', title: 'Crispy Waffles', desc: 'Golden waffles with customizable spreads and toppings' },
              { icon: '🥤', title: 'Cool Drinks', desc: 'Refreshing chill sips and warm beverages for every mood' },
            ].map((feature, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="glass rounded-2xl p-8 text-center hover:shadow-xl hover:shadow-frost-200/30 transition-all duration-300 group">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-frost-900 mb-2">{feature.title}</h3>
                  <p className="text-frost-500 text-sm">{feature.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Favorites Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-frost-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-sm font-semibold text-berry uppercase tracking-widest">
              ⭐ Most Loved
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-frost-900 mt-3">
              Customer Favorites
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favorites.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="glass rounded-2xl p-6 text-center cursor-pointer group"
                >
                  <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-500">
                    {item.emoji}
                  </div>
                  <h3 className="text-lg font-bold text-frost-900 mb-2">{item.name}</h3>
                  <p className="text-frost-500 text-sm">{item.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-frost-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-ice-400/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready for a Frozen Treat?
            </h2>
            <p className="text-frost-200/80 text-lg mb-8 max-w-2xl mx-auto">
              Explore our full menu of frozen curls, waffles, and refreshing drinks.
              Every bite is an experience worth savoring.
            </p>
            <Link
              href="/menu"
              className="inline-block px-10 py-4 bg-white text-frost-700 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              View Full Menu →
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
