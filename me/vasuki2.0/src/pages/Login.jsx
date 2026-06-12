import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Simple mock validation
    if (email && password) {
      loginUser(email, password);
      navigate('/dashboard');
    } else {
      setError('Please fill in all fields');
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
          <h1 className="text-3xl font-serif text-brand-gold mb-2">Welcome Back</h1>
          <p className="text-brand-cream/60">Log in to manage your orders</p>
        </div>

        {error && <div className="mb-4 p-3 bg-brand-red/20 border border-brand-red text-brand-red rounded text-center text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-brand-cream/70 mb-2">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-brand-matte border border-white/10 rounded-lg px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-cream/70 mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-brand-matte border border-white/10 rounded-lg px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors"
            />
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center text-brand-cream/70 cursor-pointer">
              <input type="checkbox" className="mr-2 accent-brand-gold" />
              Remember me
            </label>
            <a href="#" className="text-brand-gold hover:underline">Forgot password?</a>
          </div>

          <Button variant="primary" type="submit" fullWidth>
            Login
          </Button>
        </form>

        <div className="mt-8 text-center text-brand-cream/60 text-sm">
          Don't have an account? <Link to="/register" className="text-brand-gold font-bold hover:underline">Register here</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
