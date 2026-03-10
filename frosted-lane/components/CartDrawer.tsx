'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartProvider';

export default function CartDrawer() {
    const {
        items,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
    } = useCart();

    const [orderForm, setOrderForm] = useState({
        customerName: '',
        phone: '',
        pickupTime: '',
    });
    const [isOrdering, setIsOrdering] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [error, setError] = useState('');

    const handlePlaceOrder = async () => {
        if (!orderForm.customerName || !orderForm.phone || !orderForm.pickupTime) {
            setError('Please fill in all fields');
            return;
        }

        setIsOrdering(true);
        setError('');

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerName: orderForm.customerName,
                    phone: orderForm.phone,
                    pickupTime: orderForm.pickupTime,
                    items: items.map((item) => ({
                        menuItemId: item.id,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                }),
            });

            const data = await res.json();

            if (data.success) {
                setOrderSuccess(true);
                clearCart();
                setOrderForm({ customerName: '', phone: '', pickupTime: '' });
                setTimeout(() => {
                    setOrderSuccess(false);
                    setShowOrderForm(false);
                    setIsCartOpen(false);
                }, 3000);
            } else {
                setError(data.error || 'Failed to place order');
            }
        } catch {
            setError('Failed to place order. Please try again.');
        } finally {
            setIsOrdering(false);
        }
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-frost-100 bg-gradient-to-r from-frost-50 to-ice-50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-frost-900">Your Cart</h2>
                                    <p className="text-sm text-frost-500">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
                                </div>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="p-2 rounded-full hover:bg-frost-100 transition-colors text-frost-500"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Cart items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {orderSuccess ? (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center py-16"
                                >
                                    <div className="text-6xl mb-4">🎉</div>
                                    <h3 className="text-xl font-bold text-frost-900 mb-2">Order Placed!</h3>
                                    <p className="text-frost-500">We&apos;ll have your desserts ready for pickup!</p>
                                </motion.div>
                            ) : items.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="text-6xl mb-4">🛒</div>
                                    <h3 className="text-lg font-medium text-frost-900">Your cart is empty</h3>
                                    <p className="text-frost-400 text-sm mt-2">Add some delicious treats!</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="flex items-center gap-4 p-4 rounded-xl bg-frost-50/50 border border-frost-100"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-frost-900 text-sm truncate">{item.name}</h4>
                                                <p className="text-xs text-frost-400">{item.categoryName}</p>
                                                <p className="text-sm font-semibold text-frost-700 mt-1">₹{item.price}</p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-7 h-7 rounded-full bg-frost-100 text-frost-600 flex items-center justify-center hover:bg-frost-200 transition-colors text-sm font-bold"
                                                >
                                                    −
                                                </button>
                                                <span className="w-6 text-center font-medium text-frost-900 text-sm">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-7 h-7 rounded-full bg-frost-500 text-white flex items-center justify-center hover:bg-frost-600 transition-colors text-sm font-bold"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="p-1.5 rounded-full hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {/* Order form */}
                            {showOrderForm && items.length > 0 && !orderSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 p-4 rounded-xl border border-frost-200 bg-frost-50/30"
                                >
                                    <h3 className="font-semibold text-frost-900 mb-4">Order Details</h3>
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            value={orderForm.customerName}
                                            onChange={(e) => setOrderForm({ ...orderForm, customerName: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-xl border border-frost-200 bg-white text-frost-900 text-sm focus:ring-2 focus:ring-frost-400 focus:border-transparent outline-none"
                                        />
                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            value={orderForm.phone}
                                            onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-xl border border-frost-200 bg-white text-frost-900 text-sm focus:ring-2 focus:ring-frost-400 focus:border-transparent outline-none"
                                        />
                                        <input
                                            type="time"
                                            placeholder="Pickup Time"
                                            value={orderForm.pickupTime}
                                            onChange={(e) => setOrderForm({ ...orderForm, pickupTime: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-xl border border-frost-200 bg-white text-frost-900 text-sm focus:ring-2 focus:ring-frost-400 focus:border-transparent outline-none"
                                        />
                                    </div>
                                    {error && (
                                        <p className="text-red-500 text-sm mt-2">{error}</p>
                                    )}
                                </motion.div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && !orderSuccess && (
                            <div className="p-6 border-t border-frost-100 bg-white">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-frost-500 font-medium">Total</span>
                                    <span className="text-2xl font-bold text-frost-900">₹{totalPrice}</span>
                                </div>

                                {!showOrderForm ? (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={clearCart}
                                            className="flex-1 py-3 rounded-xl border border-frost-200 text-frost-600 font-medium text-sm hover:bg-frost-50 transition-colors"
                                        >
                                            Clear Cart
                                        </button>
                                        <button
                                            onClick={() => setShowOrderForm(true)}
                                            className="flex-[2] py-3 rounded-xl bg-gradient-to-r from-frost-500 to-ice-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-frost-300/40 transition-all"
                                        >
                                            Proceed to Order
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handlePlaceOrder}
                                        disabled={isOrdering}
                                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-frost-600 to-ice-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-frost-300/40 transition-all disabled:opacity-50"
                                    >
                                        {isOrdering ? '⏳ Placing Order...' : '🎉 Place Order'}
                                    </button>
                                )}
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
