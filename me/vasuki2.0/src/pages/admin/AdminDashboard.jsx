import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  LogOut,
  TrendingUp,
  Users,
  Settings,
  CreditCard,
  Star,
  Bell,
  Globe,
  User,
  Key,
  Plus
} from 'lucide-react';
import { getProducts, getOrders } from '../../services/dataStore';
import ManageProducts from './ManageProducts';
import ManageOrders from './ManageOrders';
import StoreSettings from './StoreSettings';
import AddPickle from './AddPickle';
import PaymentSettings from './PaymentSettings';
import ReviewsManagement from './ReviewsManagement';
import CustomersManagement from './CustomersManagement';
import ApplyOffers from './ApplyOffers';
import AdminProfile from './AdminProfile';
import ChangePassword from './ChangePassword';

const AdminDashboard = () => {
  const { isAdmin, logout, loginAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [loginState, setLoginState] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    todayOrders: 0,
    lowStock: 0,
    totalRevenue: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    if (!isAdmin) {
      return;
    }

    const products = getProducts();
    const orders = getOrders();
    const today = new Date().toISOString().slice(0, 10);
    const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;
    const cancelledOrders = orders.filter((o) => o.status === 'Cancelled').length;
    const pendingOrders = orders.filter((o) => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
    const lowStock = products.filter((p) => p.stockQuantity <= 8 && p.visible).length;
    const todayOrders = orders.filter((o) => o.date.slice(0, 10) === today).length;
    const totalRevenue = orders
      .filter((o) => o.status !== 'Cancelled')
      .reduce((sum, order) => sum + Number(order.totalAmount), 0);

    setStats({
      totalProducts: products.length,
      totalOrders: orders.length,
      pendingOrders,
      deliveredOrders,
      cancelledOrders,
      todayOrders,
      lowStock,
      totalRevenue
    });
    setRecentOrders(orders.slice(-5).reverse());
  }, [isAdmin, navigate, activeTab]);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const success = loginAdmin(loginState.email, loginState.password);
    if (success) {
      setLoginError('');
      setLoginState({ email: '', password: '' });
      setActiveTab('overview');
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'add-product', label: 'Add New Product', icon: Plus },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'offers', label: 'Offers', icon: Bell },
    { id: 'website-settings', label: 'Website Settings', icon: Globe },
    { id: 'admin-profile', label: 'Admin Profile', icon: User },
    { id: 'change-password', label: 'Change Password', icon: Key }
  ];

  return (
    <div className="min-h-screen flex bg-brand-black text-brand-cream">
      <aside className="hidden md:flex flex-col w-72 shrink-0 bg-brand-matte border-r border-brand-gold/20">
        <div className="p-6 border-b border-white/5 text-center">
          <Link to="/" className="inline-block mb-2">
            <img src="/logo.svg" alt="Acharruchi Logo" className="h-16 w-auto object-contain mx-auto rounded-md" />
          </Link>
          <p className="text-xs text-brand-red uppercase tracking-widest mt-1 font-bold">Admin Portal</p>
          <p className="text-sm text-brand-cream/70 mt-2">Acharruchi Control Center</p>
        </div>

        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors text-left ${
                  activeTab === item.id
                    ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20'
                    : 'text-brand-cream/80 hover:bg-white/5 hover:text-brand-cream'
                }`}
              >
                <Icon size={18} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-brand-red/80 hover:bg-brand-red/10 hover:text-brand-red transition-colors"
          >
            <LogOut size={18} /> Logout Admin
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden bg-brand-matte border-b border-brand-gold/20 p-4 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold text-brand-gold tracking-wider">ACHARRUCHI ADMIN</h2>
            <p className="text-sm text-brand-cream/70">Manage products, orders, payments and settings.</p>
          </div>
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="bg-brand-black text-brand-cream border border-brand-gold/30 rounded-xl px-3 py-2"
          >
            {navItems.map((item) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </select>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            {activeTab === 'overview' && (
              <div>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-serif text-brand-cream">Dashboard Overview</h1>
                    <p className="text-brand-cream/60 mt-2">Track product activity, order flow and website updates in one premium admin console.</p>
                  </div>
                </div>

                <div className="grid gap-6 xl:grid-cols-4 lg:grid-cols-2">
                  <div className="glass-panel rounded-3xl p-6 border border-brand-gold/20">
                    <p className="text-sm uppercase tracking-[0.3em] text-brand-cream/50 mb-4">Total Revenue</p>
                    <p className="text-4xl font-bold text-brand-gold">₹{stats.totalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="glass-panel rounded-3xl p-6 border border-white/10">
                    <p className="text-sm uppercase tracking-[0.3em] text-brand-cream/50 mb-4">Total Orders</p>
                    <p className="text-4xl font-bold text-brand-cream">{stats.totalOrders}</p>
                  </div>
                  <div className="glass-panel rounded-3xl p-6 border border-brand-red/20">
                    <p className="text-sm uppercase tracking-[0.3em] text-brand-cream/50 mb-4">Pending Orders</p>
                    <p className="text-4xl font-bold text-brand-red">{stats.pendingOrders}</p>
                  </div>
                  <div className="glass-panel rounded-3xl p-6 border border-white/10">
                    <p className="text-sm uppercase tracking-[0.3em] text-brand-cream/50 mb-4">Low Stock</p>
                    <p className="text-4xl font-bold text-brand-gold">{stats.lowStock}</p>
                  </div>
                </div>

                <div className="grid gap-6 xl:grid-cols-3 mt-6">
                  <div className="glass-panel rounded-3xl p-6 border border-white/10">
                    <p className="text-sm uppercase tracking-[0.3em] text-brand-cream/50 mb-4">Today&apos;s Orders</p>
                    <p className="text-3xl font-bold text-brand-cream">{stats.todayOrders}</p>
                  </div>
                  <div className="glass-panel rounded-3xl p-6 border border-white/10">
                    <p className="text-sm uppercase tracking-[0.3em] text-brand-cream/50 mb-4">Delivered</p>
                    <p className="text-3xl font-bold text-brand-cream">{stats.deliveredOrders}</p>
                  </div>
                  <div className="glass-panel rounded-3xl p-6 border border-white/10">
                    <p className="text-sm uppercase tracking-[0.3em] text-brand-cream/50 mb-4">Cancelled</p>
                    <p className="text-3xl font-bold text-brand-red">{stats.cancelledOrders}</p>
                  </div>
                </div>

                <div className="glass-panel rounded-3xl border border-white/10 mt-8 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.4em] text-brand-cream/50 mb-2">Recent Orders</p>
                      <h2 className="text-2xl font-bold text-brand-cream">Latest Activity</h2>
                    </div>
                    <button onClick={() => setActiveTab('orders')} className="text-brand-gold hover:text-brand-gold-light text-sm font-semibold">View All Orders</button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-brand-cream/80">
                      <thead className="text-xs uppercase text-brand-cream/60 border-b border-white/10">
                        <tr>
                          <th className="py-3 px-4">Order ID</th>
                          <th className="py-3 px-4">Customer</th>
                          <th className="py-3 px-4">Amount</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="py-8 text-center text-brand-cream/50">No recent orders available.</td>
                          </tr>
                        ) : (
                          recentOrders.map((order) => (
                            <tr key={order.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                              <td className="py-4 px-4 font-medium text-brand-cream">{order.id}</td>
                              <td className="py-4 px-4">{order.customer.name || 'Guest'}</td>
                              <td className="py-4 px-4">₹{order.totalAmount}</td>
                              <td className="py-4 px-4 uppercase text-xs font-semibold text-brand-gold">{order.status}</td>
                              <td className="py-4 px-4">{new Date(order.date).toLocaleDateString()}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && <ManageProducts />}
            {activeTab === 'add-product' && <AddPickle />}
            {activeTab === 'orders' && <ManageOrders />}
            {activeTab === 'payments' && <PaymentSettings />}
            {activeTab === 'reviews' && <ReviewsManagement />}
            {activeTab === 'customers' && <CustomersManagement />}
            {activeTab === 'offers' && <ApplyOffers />}
            {activeTab === 'website-settings' && <StoreSettings />}
            {activeTab === 'admin-profile' && <AdminProfile />}
            {activeTab === 'change-password' && <ChangePassword />}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
