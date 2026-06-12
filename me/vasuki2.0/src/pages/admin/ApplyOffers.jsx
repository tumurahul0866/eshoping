import React, { useState, useEffect } from 'react';
import { getOffers, saveOffer, deleteOffer, toggleOffer, getProducts } from '../../services/dataStore';

const ApplyOffers = () => {
  const [offers, setOffers] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingOffer, setEditingOffer] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [discount, setDiscount] = useState(0);
  const [active, setActive] = useState(true);
  const [productId, setProductId] = useState('');

  useEffect(() => {
    setOffers(getOffers());
    setProducts(getProducts());
  }, []);

  const resetForm = () => {
    setEditingOffer(null);
    setTitle('');
    setDescription('');
    setDiscount(0);
    setActive(true);
    setProductId('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveOffer({
      id: editingOffer ? editingOffer.id : undefined,
      title,
      description,
      discount,
      active,
      productId
    });
    setOffers(getOffers());
    resetForm();
  };

  const handleEdit = (offer) => {
    setEditingOffer(offer);
    setTitle(offer.title);
    setDescription(offer.description);
    setDiscount(offer.discount);
    setActive(offer.active);
    setProductId(offer.productId || '');
  };

  const handleDelete = (id) => {
    deleteOffer(id);
    setOffers(getOffers());
    if (editingOffer && editingOffer.id === id) resetForm();
  };

  const handleToggle = (id) => {
    toggleOffer(id);
    setOffers(getOffers());
  };

  return (
    <div className="apply-offers max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">{editingOffer ? 'Edit Offer' : 'Add Offer'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Select Product</label>
          <select value={productId} onChange={e => setProductId(e.target.value)} className="w-full border px-3 py-2 rounded">
            <option value="">All Products (Global Offer)</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} required className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Discount (%)</label>
          <input type="number" value={discount} onChange={e => setDiscount(Number(e.target.value))} min="0" max="100" className="w-full border px-3 py-2 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={active} onChange={e => setActive(e.target.checked)} id="active-offer" />
          <label htmlFor="active-offer">Active</label>
        </div>
        <div className="flex gap-2">
          <button type="submit" className="bg-brand-yellow text-white px-4 py-2 rounded font-bold">
            {editingOffer ? 'Update Offer' : 'Add Offer'}
          </button>
          {editingOffer && (
            <button type="button" onClick={resetForm} className="bg-gray-300 px-4 py-2 rounded font-bold">Cancel</button>
          )}
        </div>
      </form>

      <h2 className="text-xl font-bold mt-8 mb-4">Current Offers</h2>
      <div className="space-y-3">
        {offers.map((offer) => (
          <div key={offer.id} className="p-4 border rounded flex flex-col md:flex-row md:items-center md:justify-between gap-2 bg-brand-yellow-light">
            <div>
              <div className="font-bold text-brand-yellow">{offer.title}</div>
              <div className="text-brand-black/80">{offer.description}</div>
              {offer.productId && (
                <div className="text-xs text-brand-black/60 mt-1">Product: {products.find(p => p.id === offer.productId)?.name || 'Unknown'}</div>
              )}
              {offer.discount > 0 && <span className="inline-block mt-1 px-2 py-1 rounded-full bg-brand-yellow text-white text-xs font-bold">{offer.discount}% OFF</span>}
              <span className={`ml-2 text-xs font-bold ${offer.active ? 'text-green-700' : 'text-red-700'}`}>{offer.active ? 'Active' : 'Inactive'}</span>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              <button onClick={() => handleEdit(offer)} className="px-3 py-1 rounded bg-brand-yellow text-white font-bold">Edit</button>
              <button onClick={() => handleDelete(offer.id)} className="px-3 py-1 rounded bg-red-500 text-white font-bold">Delete</button>
              <button onClick={() => handleToggle(offer.id)} className={`px-3 py-1 rounded ${offer.active ? 'bg-gray-400' : 'bg-green-600'} text-white font-bold`}>{offer.active ? 'Deactivate' : 'Activate'}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplyOffers;