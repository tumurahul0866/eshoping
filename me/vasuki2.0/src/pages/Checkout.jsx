import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { saveOrder, getPaymentSettings } from '../services/dataStore';
import Button from '../components/ui/Button';

const InputField = ({ label, name, type = 'text', required = true, value, onChange, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-brand-cream/70 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      {...props}
      className="w-full bg-brand-matte border border-white/10 rounded-lg px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors"
    />
  </div>
);

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'COD',
    notes: ''
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentSettings, setPaymentSettings] = useState({ enableScanner: true, scannerNote: '' });

  useEffect(() => {
    setPaymentSettings(getPaymentSettings());
  }, []);

  if (cartItems.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  const formatWhatsappMessage = (customer) => {
    const lines = [
      'Hello Acharruchi,',
      'I would like to place an order with the following details:',
      `Name: ${customer.name}`,
      `Phone: ${customer.phone}`,
      `Location: ${customer.address}, ${customer.city}, ${customer.state} - ${customer.pincode}`,
      '',
      'Order Items:',
    ];

    cartItems.forEach((item) => {
      const itemTotal = item.weightOption.price * item.quantity;
      lines.push(`- ${item.product.name} (${item.weightOption.weight}) x ${item.quantity} = ₹${itemTotal}`);
    });

    lines.push('', `Total Price: ₹${getCartTotal()}`);
    if (customer.notes) {
      lines.push('', `Notes: ${customer.notes}`);
    }
    lines.push('', 'Please confirm the order and delivery details.');
    return lines.join('\n');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const normalizedValue = name === 'phone' ? value.replace(/\D/g, '') : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: normalizedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ['name', 'phone', 'address', 'city', 'state', 'pincode'];
    const missingFields = requiredFields.filter((field) => !formData[field].trim());

    if (missingFields.length > 0) {
      setErrorMessage('Please provide all required customer details and location.');
      return;
    }

    if (!/^[0-9]+$/.test(formData.phone)) {
      setErrorMessage('Phone number must contain only digits.');
      return;
    }

    setErrorMessage('');

    const newOrder = {
      customer: { ...formData },
      items: cartItems,
      totalAmount: getCartTotal(),
    };

    const id = saveOrder(newOrder);
    const url = `https://wa.me/918885473903?text=${encodeURIComponent(formatWhatsappMessage(formData))}`;
    setWhatsappUrl(url);
    window.open(url, '_blank');

    setOrderId(id);
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="flex-grow flex items-center justify-center bg-brand-black p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-panel max-w-lg w-full p-8 text-center rounded-2xl"
        >
          <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-serif text-brand-cream mb-4">Order Confirmed!</h2>
          <p className="text-brand-cream/70 mb-2">Thank you for choosing Acharruchi.</p>
          <p className="text-brand-gold font-bold mb-4">Order ID: {orderId}</p>
          <p className="text-brand-cream/70 mb-6">Please send a WhatsApp message to <strong>+91 8885473903</strong> to confirm your order.</p>
          <a
            href={whatsappUrl || `https://wa.me/918885473903?text=${encodeURIComponent(`Hello Acharruchi, I have placed order ${orderId}. Please confirm.`)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full justify-center rounded-md bg-green-500 px-6 py-3 text-sm font-medium text-brand-black hover:bg-green-400 transition-colors mb-4"
          >
            Message on WhatsApp
          </a>
          <Button variant="primary" onClick={() => navigate('/dashboard')} fullWidth>
            View My Orders
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-brand-black min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-serif font-bold text-brand-gold mb-12">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Form */}
          <div className="flex-grow">
            <form onSubmit={handleSubmit} className="glass-panel p-6 md:p-8 rounded-xl space-y-6">
              
              <div>
                <h2 className="text-xl font-serif text-brand-cream mb-4 border-b border-white/10 pb-2">Contact Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} />
                  <InputField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    placeholder="Only digits"
                  />
                  <div className="md:col-span-2">
                    <InputField label="Email Address" name="email" type="email" required={false} value={formData.email} onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-serif text-brand-cream mb-4 border-b border-white/10 pb-2">Shipping Address</h2>
                <InputField label="Street Address" name="address" value={formData.address} onChange={handleChange} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InputField label="City" name="city" value={formData.city} onChange={handleChange} />
                  <InputField label="State" name="state" value={formData.state} onChange={handleChange} />
                  <InputField label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-serif text-brand-cream mb-4 border-b border-white/10 pb-2">Payment Method</h2>
                <div className="space-y-3">
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${formData.paymentMethod === 'COD' ? 'border-brand-gold bg-brand-gold/5' : 'border-white/10 bg-brand-matte'}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="COD" 
                      checked={formData.paymentMethod === 'COD'}
                      onChange={handleChange}
                      className="mr-3"
                    />
                    <span className="text-brand-cream font-medium">Cash on Delivery (COD)</span>
                  </label>
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${formData.paymentMethod === 'UPI' ? 'border-brand-gold bg-brand-gold/5' : 'border-white/10 bg-brand-matte'}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="UPI" 
                      checked={formData.paymentMethod === 'UPI'}
                      onChange={handleChange}
                      className="mr-3"
                    />
                    <span className="text-brand-cream font-medium">Pay via UPI (Scan QR)</span>
                  </label>
                </div>
                
                {/* Dummy QR Scanner Display */}
                {formData.paymentMethod === 'UPI' && paymentSettings.enableScanner && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 p-6 bg-brand-matte border border-brand-gold/30 rounded-lg text-center"
                  >
                    <p className="text-brand-cream mb-4">{paymentSettings.scannerNote || 'Scan this QR code with any UPI app to pay'} <strong className="text-brand-gold">₹{getCartTotal()}</strong></p>
                    <div className="w-48 h-48 bg-white mx-auto p-2 rounded-lg mb-4 flex items-center justify-center border-4 border-brand-gold">
                      {paymentSettings.qrImage ? (
                        <img src={paymentSettings.qrImage} alt="UPI QR Code" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <div className="grid grid-cols-5 grid-rows-5 gap-1 w-full h-full opacity-80">
                          {Array.from({length: 25}).map((_, i) => (
                            <div key={i} className={`bg-black ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`}></div>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-brand-cream/60">UPI ID: {paymentSettings.upiId || 'acharruchi@upi'}</p>
                    <p className="text-xs text-brand-gold mt-2">Admin will verify the payment manually.</p>
                  </motion.div>
                )}
              </div>

              <div>
                <h2 className="text-xl font-serif text-brand-cream mb-4 border-b border-white/10 pb-2">Order Notes (Optional)</h2>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full bg-brand-matte border border-white/10 rounded-lg px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors"
                  rows="3"
                  placeholder="Special instructions for delivery..."
                ></textarea>
              </div>
              {errorMessage && (
                <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  {errorMessage}
                </div>
              )}

            </form>
          </div>

          {/* Sidebar Summary */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="glass-panel p-6 rounded-xl sticky top-28">
              <h2 className="text-2xl font-serif text-brand-cream mb-6 border-b border-white/10 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <img src={item.product.image} className="w-16 h-16 object-cover rounded" alt={item.product.name} />
                    <div>
                      <p className="text-brand-cream font-medium text-sm">{item.product.name}</p>
                      <p className="text-brand-cream/50 text-xs">{item.weightOption.weight} x {item.quantity}</p>
                      <p className="text-brand-gold text-sm font-bold mt-1">₹{item.weightOption.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 mb-8">
                <div className="flex justify-between items-center text-xl">
                  <span className="font-bold text-brand-cream">Total</span>
                  <span className="font-bold text-brand-gold">₹{getCartTotal()}</span>
                </div>
              </div>

              <Button 
                variant="primary" 
                fullWidth 
                onClick={handleSubmit}
                className="py-4 text-lg"
              >
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
