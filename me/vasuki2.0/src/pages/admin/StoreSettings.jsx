import React, { useState, useEffect } from 'react';
import { getStoreSettings, updateStoreSettings } from '../../services/dataStore';
import Button from '../../components/ui/Button';
import { Settings } from 'lucide-react';

const StoreSettings = () => {
  const [settings, setSettings] = useState({
    contactNumber: '',
    email: '',
    whatsappMessage: '',
    instagram: '',
    snapchat: '',
    logoUrl: '',
    heroBackgroundUrl: '',
    featureImageUrl: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    setSettings(getStoreSettings());
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateStoreSettings(settings);
    setMessage('Settings updated successfully! Changes will appear across the site.');
    setTimeout(() => setMessage(''), 4000);
  };

  return (
    <div>
      <h2 className="text-2xl font-serif text-brand-cream mb-6 flex items-center gap-2">
        <Settings size={24} className="text-brand-gold" /> Store Settings
      </h2>

      <div className="bg-brand-matte border border-white/10 rounded-xl p-6 max-w-2xl">
        <p className="text-brand-cream/60 text-sm mb-6">
          Update the contact phone number, email, and social media links. These will be displayed on the Contact page, Footer, and WhatsApp button.
        </p>

        {message && (
          <div className="mb-6 p-3 bg-green-500/20 border border-green-500 text-green-400 rounded text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-brand-cream/70 mb-1">Contact Phone Number</label>
              <input
                type="text"
                name="contactNumber"
                value={settings.contactNumber}
                onChange={handleChange}
                className="w-full bg-brand-black border border-white/10 rounded px-4 py-2 text-brand-cream focus:outline-none focus:border-brand-gold"
                placeholder="+918885473903"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-cream/70 mb-1">Contact Email Address</label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="w-full bg-brand-black border border-white/10 rounded px-4 py-2 text-brand-cream focus:outline-none focus:border-brand-gold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-cream/70 mb-1">WhatsApp Message</label>
              <input
                type="text"
                name="whatsappMessage"
                value={settings.whatsappMessage}
                onChange={handleChange}
                className="w-full bg-brand-black border border-white/10 rounded px-4 py-2 text-brand-cream focus:outline-none focus:border-brand-gold"
                placeholder="Hi! I would like to place an order for Acharruchi."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-cream/70 mb-1">Instagram Link</label>
              <input
                type="url"
                name="instagram"
                value={settings.instagram}
                onChange={handleChange}
                className="w-full bg-brand-black border border-white/10 rounded px-4 py-2 text-brand-cream focus:outline-none focus:border-brand-gold"
                placeholder="https://instagram.com/vasukipickles"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-cream/70 mb-1">Logo Image URL</label>
              <input
                type="url"
                name="logoUrl"
                value={settings.logoUrl}
                onChange={handleChange}
                className="w-full bg-brand-black border border-white/10 rounded px-4 py-2 text-brand-cream focus:outline-none focus:border-brand-gold"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-cream/70 mb-1">Hero Background Image URL</label>
              <input
                type="url"
                name="heroBackgroundUrl"
                value={settings.heroBackgroundUrl}
                onChange={handleChange}
                className="w-full bg-brand-black border border-white/10 rounded px-4 py-2 text-brand-cream focus:outline-none focus:border-brand-gold"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-cream/70 mb-1">Homepage Feature Image URL</label>
              <input
                type="url"
                name="featureImageUrl"
                value={settings.featureImageUrl}
                onChange={handleChange}
                className="w-full bg-brand-black border border-white/10 rounded px-4 py-2 text-brand-cream focus:outline-none focus:border-brand-gold"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-cream/70 mb-1">Snapchat Link</label>
              <input
                type="url"
                name="snapchat"
                value={settings.snapchat}
                onChange={handleChange}
                className="w-full bg-brand-black border border-white/10 rounded px-4 py-2 text-brand-cream focus:outline-none focus:border-brand-gold"
                placeholder="https://snapchat.com/add/vasukipickles"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <Button variant="primary" type="submit">
              Save Settings
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoreSettings;
