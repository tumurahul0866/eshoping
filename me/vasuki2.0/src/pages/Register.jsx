import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.name && formData.email && formData.password) {
      registerUser(formData);
      navigate('/dashboard');
    } else {
      setError('Please fill in all required fields');
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-brand-black p-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel max-w-md w-full p-8 rounded-2xl border border-brand-gold/20"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-brand-gold mb-2">Create Account</h1>
          <p className="text-brand-cream/60">Join the Acharruchi family</p>
        </div>

        {error && <div className="mb-4 p-3 bg-brand-red/20 border border-brand-red text-brand-red rounded text-center text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-cream/70 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-brand-matte border border-white/10 rounded-lg px-4 py-2.5 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-cream/70 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-brand-matte border border-white/10 rounded-lg px-4 py-2.5 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-cream/70 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-brand-matte border border-white/10 rounded-lg px-4 py-2.5 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-cream/70 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-brand-matte border border-white/10 rounded-lg px-4 py-2.5 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-cream/70 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-brand-matte border border-white/10 rounded-lg px-4 py-2.5 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors"
            />
          </div>

          <Button variant="primary" type="submit" fullWidth className="mt-6">
            Register
          </Button>
        </form>

        <div className="mt-8 text-center text-brand-cream/60 text-sm">
          Already have an account? <Link to="/login" className="text-brand-gold font-bold hover:underline">Login here</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
