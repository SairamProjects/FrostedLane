'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
    id: string;
    name: string;
    price: number;
    isPopular: boolean;
    isAvailable: boolean;
    categoryId: string;
}

interface Category {
    id: string;
    name: string;
    description: string;
    items: MenuItem[];
}

interface Order {
    id: string;
    customerName: string;
    phone: string;
    pickupTime: string;
    status: string;
    total: number;
    createdAt: string;
    items: { id: string; quantity: number; price: number; menuItem: { name: string } }[];
}

interface ContactMessage {
    id: string;
    name: string;
    phone: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

type Tab = 'menu' | 'orders' | 'messages';

export default function AdminDashboard() {
    const router = useRouter();
    const [token, setToken] = useState('');
    const [activeTab, setActiveTab] = useState<Tab>('menu');
    const [categories, setCategories] = useState<Category[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);

    // Add/Edit menu item form state
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        categoryId: '',
        isPopular: false,
    });

    const fetchData = useCallback(async (authToken: string) => {
        try {
            const headers = { Authorization: `Bearer ${authToken}` };

            const [menuRes, ordersRes, messagesRes] = await Promise.all([
                fetch('/api/admin/menu', { headers }),
                fetch('/api/admin/orders', { headers }),
                fetch('/api/admin/messages', { headers }),
            ]);

            const [menuData, ordersData, messagesData] = await Promise.all([
                menuRes.json(), ordersRes.json(), messagesRes.json(),
            ]);

            if (menuData.success) setCategories(menuData.data);
            if (ordersData.success) setOrders(ordersData.data);
            if (messagesData.success) setMessages(messagesData.data);
        } catch (err) {
            console.error('Failed to fetch data:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const t = localStorage.getItem('admin-token');
        if (!t) {
            router.push('/admin');
            return;
        }
        setToken(t);
        fetchData(t);
    }, [router, fetchData]);

    const handleLogout = () => {
        localStorage.removeItem('admin-token');
        localStorage.removeItem('admin-user');
        router.push('/admin');
    };

    const handleAddItem = async () => {
        if (!formData.name || !formData.categoryId || formData.price <= 0) return;

        try {
            const res = await fetch('/api/admin/menu', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success) {
                fetchData(token);
                setShowAddForm(false);
                setFormData({ name: '', price: 0, categoryId: '', isPopular: false });
            }
        } catch (err) {
            console.error('Failed to add item:', err);
        }
    };

    const handleEditItem = async () => {
        if (!editingItem) return;

        try {
            const res = await fetch('/api/admin/menu', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ id: editingItem.id, ...formData }),
            });
            const data = await res.json();
            if (data.success) {
                fetchData(token);
                setEditingItem(null);
                setFormData({ name: '', price: 0, categoryId: '', isPopular: false });
            }
        } catch (err) {
            console.error('Failed to edit item:', err);
        }
    };

    const handleDeleteItem = async (id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        try {
            const res = await fetch(`/api/admin/menu?id=${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) fetchData(token);
        } catch (err) {
            console.error('Failed to delete item:', err);
        }
    };

    const handleTogglePopular = async (item: MenuItem) => {
        try {
            await fetch('/api/admin/menu', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ id: item.id, isPopular: !item.isPopular }),
            });
            fetchData(token);
        } catch (err) {
            console.error('Failed to toggle popular:', err);
        }
    };

    const handleUpdateOrderStatus = async (id: string, status: string) => {
        try {
            await fetch('/api/admin/orders', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ id, status }),
            });
            fetchData(token);
        } catch (err) {
            console.error('Failed to update order:', err);
        }
    };

    const handleMarkMessageRead = async (id: string) => {
        try {
            await fetch('/api/admin/messages', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ id }),
            });
            fetchData(token);
        } catch (err) {
            console.error('Failed to mark message:', err);
        }
    };

    const startEdit = (item: MenuItem) => {
        setEditingItem(item);
        setFormData({ name: item.name, price: item.price, categoryId: item.categoryId, isPopular: item.isPopular });
        setShowAddForm(false);
    };

    const statusColors: Record<string, string> = {
        PENDING: 'bg-yellow-100 text-yellow-800',
        CONFIRMED: 'bg-blue-100 text-blue-800',
        PREPARING: 'bg-purple-100 text-purple-800',
        READY: 'bg-green-100 text-green-800',
        COMPLETED: 'bg-gray-100 text-gray-800',
        CANCELLED: 'bg-red-100 text-red-800',
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-frost-50">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="text-5xl">
                    ❄️
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-frost-50 pt-20">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-frost-900">Admin Dashboard</h1>
                        <p className="text-frost-500 text-sm mt-1">Manage your menu, orders, and messages</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-5 py-2.5 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-colors text-sm"
                    >
                        🚪 Logout
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="glass rounded-2xl p-5">
                        <p className="text-frost-400 text-xs font-medium uppercase">Menu Items</p>
                        <p className="text-3xl font-bold text-frost-900 mt-1">
                            {categories.reduce((sum, c) => sum + c.items.length, 0)}
                        </p>
                    </div>
                    <div className="glass rounded-2xl p-5">
                        <p className="text-frost-400 text-xs font-medium uppercase">Total Orders</p>
                        <p className="text-3xl font-bold text-frost-900 mt-1">{orders.length}</p>
                    </div>
                    <div className="glass rounded-2xl p-5">
                        <p className="text-frost-400 text-xs font-medium uppercase">Messages</p>
                        <p className="text-3xl font-bold text-frost-900 mt-1">
                            {messages.filter((m) => !m.isRead).length} <span className="text-lg text-frost-400">unread</span>
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 mb-6 bg-frost-100 rounded-xl p-1 w-fit">
                    {(['menu', 'orders', 'messages'] as Tab[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2.5 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab
                                    ? 'bg-white text-frost-900 shadow-sm'
                                    : 'text-frost-500 hover:text-frost-700'
                                }`}
                        >
                            {tab === 'menu' && '📋 '}
                            {tab === 'orders' && '📦 '}
                            {tab === 'messages' && '💬 '}
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {activeTab === 'menu' && (
                        <motion.div key="menu" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-frost-900">Menu Management</h2>
                                <button
                                    onClick={() => { setShowAddForm(true); setEditingItem(null); setFormData({ name: '', price: 0, categoryId: categories[0]?.id || '', isPopular: false }); }}
                                    className="px-4 py-2 rounded-xl bg-frost-500 text-white font-medium text-sm hover:bg-frost-600 transition-colors"
                                >
                                    + Add Item
                                </button>
                            </div>

                            {/* Add/Edit Form */}
                            {(showAddForm || editingItem) && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mb-6 glass rounded-2xl p-6"
                                >
                                    <h3 className="font-semibold text-frost-900 mb-4">
                                        {editingItem ? 'Edit Item' : 'Add New Item'}
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Item name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="px-4 py-2.5 rounded-xl border border-frost-200 bg-white text-frost-900 text-sm focus:ring-2 focus:ring-frost-400 outline-none"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Price"
                                            value={formData.price || ''}
                                            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                                            className="px-4 py-2.5 rounded-xl border border-frost-200 bg-white text-frost-900 text-sm focus:ring-2 focus:ring-frost-400 outline-none"
                                        />
                                        <select
                                            value={formData.categoryId}
                                            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                            className="px-4 py-2.5 rounded-xl border border-frost-200 bg-white text-frost-900 text-sm focus:ring-2 focus:ring-frost-400 outline-none"
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                        <label className="flex items-center gap-2 px-4 py-2.5 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.isPopular}
                                                onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                                                className="w-4 h-4 rounded border-frost-300 text-frost-500"
                                            />
                                            <span className="text-sm text-frost-700">Mark as Popular</span>
                                        </label>
                                    </div>
                                    <div className="flex gap-3 mt-4">
                                        <button
                                            onClick={editingItem ? handleEditItem : handleAddItem}
                                            className="px-5 py-2 rounded-xl bg-frost-500 text-white font-medium text-sm hover:bg-frost-600"
                                        >
                                            {editingItem ? 'Save Changes' : 'Add Item'}
                                        </button>
                                        <button
                                            onClick={() => { setShowAddForm(false); setEditingItem(null); }}
                                            className="px-5 py-2 rounded-xl border border-frost-200 text-frost-600 text-sm hover:bg-frost-50"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Menu Items List */}
                            <div className="space-y-6">
                                {categories.map((cat) => (
                                    <div key={cat.id} className="bg-white rounded-2xl border border-frost-100 overflow-hidden">
                                        <div className="px-6 py-4 bg-frost-50/50 border-b border-frost-100">
                                            <h3 className="font-semibold text-frost-900">{cat.name}</h3>
                                            <p className="text-frost-400 text-xs">{cat.items.length} items</p>
                                        </div>
                                        <div className="divide-y divide-frost-50">
                                            {cat.items.map((item) => (
                                                <div key={item.id} className="px-6 py-3 flex items-center gap-4 hover:bg-frost-50/30 transition-colors">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-medium text-frost-900 truncate">{item.name}</span>
                                                            {item.isPopular && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">⭐ Popular</span>}
                                                            {!item.isAvailable && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Unavailable</span>}
                                                        </div>
                                                    </div>
                                                    <span className="text-sm font-bold text-frost-700 w-16 text-right">₹{item.price}</span>
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            onClick={() => handleTogglePopular(item)}
                                                            title="Toggle Popular"
                                                            className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 text-xs"
                                                        >
                                                            {item.isPopular ? '⭐' : '☆'}
                                                        </button>
                                                        <button
                                                            onClick={() => startEdit(item)}
                                                            className="p-1.5 rounded-lg hover:bg-frost-100 text-frost-500 text-xs"
                                                        >
                                                            ✏️
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteItem(item.id)}
                                                            className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 text-xs"
                                                        >
                                                            🗑️
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'orders' && (
                        <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <h2 className="text-xl font-bold text-frost-900 mb-6">Orders</h2>
                            {orders.length === 0 ? (
                                <div className="text-center py-16 glass rounded-2xl">
                                    <div className="text-5xl mb-4">📦</div>
                                    <p className="text-frost-500">No orders yet</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {orders.map((order) => (
                                        <div key={order.id} className="bg-white rounded-2xl border border-frost-100 p-5">
                                            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                                <div>
                                                    <h3 className="font-semibold text-frost-900">{order.customerName}</h3>
                                                    <p className="text-frost-400 text-xs mt-0.5">📞 {order.phone} · 🕒 Pickup: {order.pickupTime}</p>
                                                    <p className="text-frost-300 text-xs">{new Date(order.createdAt).toLocaleString()}</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                                                        {order.status}
                                                    </span>
                                                    <span className="text-lg font-bold text-frost-900">₹{order.total}</span>
                                                </div>
                                            </div>

                                            <div className="mb-4 space-y-1">
                                                {order.items.map((item) => (
                                                    <div key={item.id} className="flex items-center justify-between text-sm text-frost-600">
                                                        <span>{item.menuItem.name} × {item.quantity}</span>
                                                        <span>₹{item.price * item.quantity}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {['CONFIRMED', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED'].map((status) => (
                                                    <button
                                                        key={status}
                                                        onClick={() => handleUpdateOrderStatus(order.id, status)}
                                                        disabled={order.status === status}
                                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${order.status === status
                                                                ? 'bg-frost-200 text-frost-400 cursor-not-allowed'
                                                                : 'bg-frost-50 text-frost-600 hover:bg-frost-100'
                                                            }`}
                                                    >
                                                        {status}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'messages' && (
                        <motion.div key="messages" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <h2 className="text-xl font-bold text-frost-900 mb-6">Contact Messages</h2>
                            {messages.length === 0 ? (
                                <div className="text-center py-16 glass rounded-2xl">
                                    <div className="text-5xl mb-4">💬</div>
                                    <p className="text-frost-500">No messages yet</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`bg-white rounded-2xl border p-5 ${msg.isRead ? 'border-frost-100' : 'border-frost-300 shadow-sm'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between gap-4 mb-3">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-semibold text-frost-900">{msg.name}</h3>
                                                        {!msg.isRead && (
                                                            <span className="w-2 h-2 bg-frost-500 rounded-full" />
                                                        )}
                                                    </div>
                                                    <p className="text-frost-400 text-xs mt-0.5">📞 {msg.phone}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-frost-300 text-xs">
                                                        {new Date(msg.createdAt).toLocaleString()}
                                                    </span>
                                                    {!msg.isRead && (
                                                        <button
                                                            onClick={() => handleMarkMessageRead(msg.id)}
                                                            className="px-3 py-1 rounded-lg bg-frost-50 text-frost-600 text-xs font-medium hover:bg-frost-100"
                                                        >
                                                            ✓ Read
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-frost-600 text-sm leading-relaxed">{msg.message}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
