import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center p-8 bg-brand-black min-h-[60vh]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-brand-matte rounded-full flex items-center justify-center mx-auto mb-6 border border-brand-gold/20">
            <span className="text-brand-gold/50 text-4xl">🛒</span>
          </div>
          <h2 className="text-3xl font-serif text-brand-cream mb-4">Your cart is empty</h2>
          <p className="text-brand-cream/60 mb-8">Looks like you haven't added any of our delicious pickles yet.</p>
          <Link to="/flavours">
            <Button variant="primary">Discover Flavours</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-brand-black min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-serif font-bold text-brand-gold mb-12">Your Cart</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="flex-grow space-y-6">
            {cartItems.map((item) => (
              <motion.div 
                key={`${item.product.id}-${item.weightOption.weight}`}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-panel p-4 md:p-6 rounded-xl flex flex-col sm:flex-row items-center gap-6"
              >
                <img 
                  src={item.product.image} 
                  alt={item.product.name} 
                  className="w-24 h-24 object-cover rounded-lg border border-white/10"
                />
                
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="text-xl font-serif text-brand-cream">{item.product.name}</h3>
                  <p className="text-brand-cream/60 text-sm mt-1">Weight: {item.weightOption.weight}</p>
                  <p className="text-brand-gold font-bold mt-2">₹{item.weightOption.price}</p>
                </div>

                <div className="flex items-center gap-4 bg-brand-matte border border-white/10 rounded-lg p-2">
                  <button 
                    onClick={() => updateQuantity(item.product.id, item.weightOption.weight, item.quantity - 1)}
                    className="p-1 text-brand-cream hover:text-brand-gold transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-bold text-brand-cream">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.product.id, item.weightOption.weight, item.quantity + 1)}
                    className="p-1 text-brand-cream hover:text-brand-gold transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="text-right flex flex-col items-end gap-2 sm:w-24">
                  <p className="font-bold text-brand-cream">₹{item.weightOption.price * item.quantity}</p>
                  <button 
                    onClick={() => removeFromCart(item.product.id, item.weightOption.weight)}
                    className="text-brand-red/70 hover:text-brand-red transition-colors text-sm flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="glass-panel p-6 rounded-xl sticky top-28">
              <h2 className="text-2xl font-serif text-brand-cream mb-6 border-b border-white/10 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-brand-cream/80">
                  <span>Subtotal</span>
                  <span>₹{getCartTotal()}</span>
                </div>
                <div className="flex justify-between text-brand-cream/80">
                  <span>Shipping</span>
                  <span className="text-brand-gold">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-brand-cream">Total</span>
                  <span className="text-2xl font-bold text-brand-gold">₹{getCartTotal()}</span>
                </div>
                <p className="text-xs text-brand-cream/50 mt-1 text-right">Inclusive of all taxes</p>
              </div>

              <Button 
                variant="primary" 
                fullWidth 
                onClick={() => navigate('/checkout')}
                className="py-4"
              >
                Proceed to Checkout <ArrowRight size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
