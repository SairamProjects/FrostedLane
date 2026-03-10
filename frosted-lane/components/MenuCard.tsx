'use client';

import { motion } from 'framer-motion';
import { useCart } from './CartProvider';

interface MenuCardProps {
    id: string;
    name: string;
    price: number;
    isPopular?: boolean;
    categoryName: string;
}

export default function MenuCard({ id, name, price, isPopular, categoryName }: MenuCardProps) {
    const { addItem } = useCart();

    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative group glass rounded-2xl p-5 cursor-pointer transition-shadow duration-300 hover:shadow-xl hover:shadow-frost-300/20"
        >
            {/* Popular badge */}
            {isPopular && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-berry to-frost-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    ⭐ Popular
                </div>
            )}

            {/* Item info */}
            <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex-1">
                    <h3 className="font-semibold text-frost-900 text-base group-hover:text-frost-600 transition-colors">
                        {name}
                    </h3>
                    <p className="text-frost-400 text-xs mt-1">{categoryName}</p>
                </div>
                <div className="text-lg font-bold text-frost-700 whitespace-nowrap">
                    ₹{price}
                </div>
            </div>

            {/* Add to cart button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addItem({ id, name, price, categoryName })}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-frost-500 to-ice-500 text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-lg hover:shadow-frost-300/40"
            >
                + Add to Cart
            </motion.button>

            {/* Bottom frost line */}
            <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-frost-300/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
    );
}
