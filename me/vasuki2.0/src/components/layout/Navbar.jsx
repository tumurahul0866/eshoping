import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/flavours?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/flavours' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-brand-gold/20 backdrop-blur-xl border-b border-brand-gold/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="Acharruchi Logo" className="h-14 w-auto object-contain rounded-2xl shadow-sm" />
            <span className="hidden sm:inline-block text-base font-semibold uppercase tracking-[0.32em] text-brand-black">Acharruchi</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 flex-1 ml-6">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-brand-black hover:text-brand-gold transition-colors font-medium text-sm uppercase tracking-[0.2em]"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-2 ml-auto">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gold/70" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearch}
                  className="pl-9 pr-4 py-2 rounded-full bg-white/80 border border-brand-gold/30 focus:outline-none focus:border-brand-gold focus:bg-white transition-all text-sm text-brand-black placeholder-brand-black/50"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {!isAdmin && (
              <Link to="/cart" className="relative text-brand-black hover:text-brand-gold transition-colors">
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-red text-brand-cream text-[10px] font-bold rounded-full h-5 w-5 grid place-items-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {isAdmin ? (
              <button onClick={handleLogout} className="text-brand-black hover:text-brand-red transition-colors" aria-label="Logout">
                <LogOut size={24} />
              </button>
            ) : user ? (
              <div className="flex items-center gap-3">
                <Link to="/dashboard" className="text-brand-black hover:text-brand-gold transition-colors" aria-label="Dashboard">
                  <User size={24} />
                </Link>
                <button onClick={handleLogout} className="text-brand-black hover:text-brand-red transition-colors" aria-label="Logout">
                  <LogOut size={24} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-brand-black hover:text-brand-gold transition-colors" aria-label="Login">
                <User size={24} />
              </Link>
            )}

            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-brand-black" aria-label="Toggle menu">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-gold/15 border-t border-brand-gold/30"
          >
            <div className="px-4 pt-4 pb-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-brand-black hover:text-brand-gold transition-colors font-medium text-lg"
                >
                  {link.name}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="block text-brand-gold font-bold"
                >
                  Admin Panel
                </Link>
              )}
              {isAdmin ? (
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full text-left text-brand-red">Logout</button>
              ) : user ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block text-brand-black">My Dashboard</Link>
                  <button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full text-left text-brand-red">Logout</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="block text-brand-black">Login / Register</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
