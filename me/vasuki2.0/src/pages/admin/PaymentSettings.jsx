import React, { useState, useEffect } from 'react';
import { getPaymentSettings, updatePaymentSettings } from '../../services/dataStore';
import Button from '../../components/ui/Button';
import { CreditCard } from 'lucide-react';

const PaymentSettings = () => {
  const [settings, setSettings] = useState({
    enableCOD: true,
    enableUPI: true,
    enableScanner: true,
    upiId: '',
    qrImage: '',
    scannerNote: '',
    instructions: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    setSettings(getPaymentSettings());
  }, []);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updatePaymentSettings(settings);
    setMessage('Payment settings saved. Customers will see the updated payment options immediately.');
    setTimeout(() => setMessage(''), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <CreditCard size={26} className="text-brand-gold" />
        <div>
          <h2 className="text-3xl font-serif text-brand-cream">Payment Settings</h2>
          <p className="text-brand-cream/60">Configure cash on delivery, UPI payments and the payment instructions visible to customers.</p>
        </div>
      </div>

      <div className="bg-brand-matte border border-white/10 rounded-3xl p-6 max-w-3xl">
        {message && (
          <div className="mb-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-200">
            {message}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-brand-black p-4">
              <input type="checkbox" name="enableCOD" checked={settings.enableCOD} onChange={handleChange} className="h-5 w-5 rounded border-brand-gold/50" />
              <span className="text-brand-cream">Enable Cash on Delivery</span>
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-brand-black p-4">
              <input type="checkbox" name="enableUPI" checked={settings.enableUPI} onChange={handleChange} className="h-5 w-5 rounded border-brand-gold/50" />
              <span className="text-brand-cream">Enable UPI Payment</span>
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-brand-black p-4">
              <input type="checkbox" name="enableScanner" checked={settings.enableScanner} onChange={handleChange} className="h-5 w-5 rounded border-brand-gold/50" />
              <span className="text-brand-cream">Enable UPI Scanner Display</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-brand-cream/70 mb-2">UPI ID</label>
              <input
                name="upiId"
                type="text"
                value={settings.upiId}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-brand-black px-4 py-3 text-brand-cream focus:border-brand-gold"
                placeholder="vasuki@upi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-cream/70 mb-2">Scanner Note</label>
              <input
                name="scannerNote"
                type="text"
                value={settings.scannerNote}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-brand-black px-4 py-3 text-brand-cream focus:border-brand-gold"
                placeholder="Use the QR code scanner in your UPI app to pay."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-brand-cream/70 mb-2">QR Code Image URL</label>
              <input
                name="qrImage"
                type="url"
                value={settings.qrImage}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-brand-black px-4 py-3 text-brand-cream focus:border-brand-gold"
                placeholder="https://example.com/upi-qr.png"
              />
            </div>
          </div>

          {settings.qrImage && (
            <div className="rounded-2xl border border-white/10 bg-brand-black p-4">
              <p className="text-sm text-brand-cream/70 mb-3">QR code preview</p>
              <img src={settings.qrImage} alt="UPI QR Code Preview" className="w-full rounded-2xl border border-brand-gold/20 object-cover" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-brand-cream/70 mb-2">Payment Instructions</label>
              <textarea
                name="instructions"
                rows={4}
                value={settings.instructions}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-brand-black px-4 py-3 text-brand-cream focus:border-brand-gold resize-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 text-right">
            <Button type="submit" variant="primary">Save Payment Settings</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentSettings;
