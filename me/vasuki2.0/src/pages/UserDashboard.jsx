import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../services/dataStore';
import { User, Package, LogOut } from 'lucide-react';
import Button from '../components/ui/Button';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      // In a real app, we'd filter orders by user email/id from the backend.
      // Here we filter the mock data by the email stored in the order customer details.
      const allOrders = getOrders();
      const myOrders = allOrders.filter(o => o.customer.email === user.email || !o.customer.email); // Fallback for dummy orders
      setOrders(myOrders.reverse());
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex-grow bg-brand-black py-16">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="glass-panel p-6 rounded-2xl sticky top-28">
              <div className="text-center mb-8 border-b border-white/10 pb-6">
                <div className="w-20 h-20 bg-brand-matte rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-gold/30">
                  <User size={32} className="text-brand-gold" />
                </div>
                <h2 className="text-xl font-serif text-brand-cream">{user.name}</h2>
                <p className="text-brand-cream/50 text-sm">{user.email}</p>
              </div>

              <nav className="space-y-2">
                <button 
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-brand-gold/10 text-brand-gold' : 'text-brand-cream/70 hover:bg-brand-matte hover:text-brand-cream'}`}
                >
                  <Package size={20} /> My Orders
                </button>
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-brand-gold/10 text-brand-gold' : 'text-brand-cream/70 hover:bg-brand-matte hover:text-brand-cream'}`}
                >
                  <User size={20} /> Profile Details
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-brand-red/70 hover:bg-brand-red/10 hover:text-brand-red transition-colors mt-8"
                >
                  <LogOut size={20} /> Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-8 rounded-2xl min-h-[500px]"
            >
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-serif text-brand-cream mb-6">Order History</h2>
                  
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-brand-cream/50 mb-4">You haven't placed any orders yet.</p>
                      <Button variant="outline" onClick={() => navigate('/flavours')}>
                        Browse Pickles
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div key={order.id} className="bg-brand-matte border border-white/10 rounded-xl p-6">
                          <div className="flex flex-wrap justify-between items-center mb-4 pb-4 border-b border-white/5">
                            <div>
                              <p className="text-sm text-brand-cream/50">Order ID</p>
                              <p className="font-bold text-brand-gold">{order.id}</p>
                            </div>
                            <div>
                              <p className="text-sm text-brand-cream/50">Date</p>
                              <p className="text-brand-cream">{new Date(order.date).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-brand-cream/50">Total</p>
                              <p className="font-bold text-brand-cream">₹{order.totalAmount}</p>
                            </div>
                            <div className="text-right">
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                                order.status === 'Cancelled' ? 'bg-brand-red/20 text-brand-red' :
                                'bg-brand-gold/20 text-brand-gold'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex gap-4 items-center">
                                <img src={item.product.image} className="w-12 h-12 object-cover rounded" alt={item.product.name} />
                                <div className="flex-grow">
                                  <p className="text-brand-cream text-sm">{item.product.name}</p>
                                  <p className="text-brand-cream/50 text-xs">{item.weightOption.weight} x {item.quantity}</p>
                                </div>
                                <p className="text-brand-cream font-medium text-sm">₹{item.weightOption.price * item.quantity}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-serif text-brand-cream mb-6">Profile Details</h2>
                  <div className="space-y-6 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-brand-cream/50 mb-1">Full Name</label>
                      <input disabled value={user.name} className="w-full bg-brand-matte border border-white/5 rounded-lg px-4 py-3 text-brand-cream opacity-70 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-cream/50 mb-1">Email Address</label>
                      <input disabled value={user.email} className="w-full bg-brand-matte border border-white/5 rounded-lg px-4 py-3 text-brand-cream opacity-70 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-cream/50 mb-1">Phone Number</label>
                      <input disabled value={user.phone || 'Not provided'} className="w-full bg-brand-matte border border-white/5 rounded-lg px-4 py-3 text-brand-cream opacity-70 cursor-not-allowed" />
                    </div>
                    <p className="text-xs text-brand-gold mt-4">To update profile details, please contact support.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
