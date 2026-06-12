import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginAdmin, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = loginAdmin(email, password);
    if (success) {
      setError('');
      navigate('/admin');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="admin-login min-h-screen flex items-center justify-center bg-brand-black p-6">
      <div className="w-full max-w-lg rounded-3xl border border-brand-gold/20 bg-brand-matte p-8">
        <h1 className="text-3xl font-serif text-brand-cream mb-6">Admin Login</h1>
        {error && <p className="mb-4 rounded-2xl border border-brand-red/30 bg-brand-red/10 px-4 py-3 text-brand-red">{error}</p>}
        <div className="mb-6 rounded-2xl border border-brand-gold/20 bg-brand-black p-4 text-brand-cream/80 text-sm">
          After login, go to Payments to enable the UPI scanner and to Website Settings to update the homepage images and feature picture.
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-brand-cream/70 mb-2">Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-2xl border border-white/10 bg-brand-black px-4 py-3 text-brand-cream"
            />
          </div>
          <div>
            <label className="block text-sm text-brand-cream/70 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-2xl border border-white/10 bg-brand-black px-4 py-3 text-brand-cream"
            />
          </div>
          <button type="submit" className="w-full rounded-2xl bg-brand-gold px-4 py-3 font-semibold text-brand-black hover:bg-brand-gold-light">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
