import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { getProducts, getReviews } from '../services/dataStore';
import { ArrowLeft, Heart, Star, ShoppingCart } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const products = getProducts();
  const product = products.find((item) => item.id === id);
  const [selectedWeight, setSelectedWeight] = useState(product?.weights?.[0] || { weight: '', price: 0 });

  const reviews = getReviews().filter((review) => review.visible !== false && (!review.product || review.product === product?.name));
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((item) => item.id !== product.id && item.productType === product.productType)
      .slice(0, 4);
  }, [product, products]);

  if (!product) {
    return (
      <div className="flex-grow bg-slate-50 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-xl w-full bg-white rounded-3xl border border-slate-200 p-10 text-center shadow-xl">
          <h1 className="text-3xl font-semibold text-slate-900 mb-4">Product not found</h1>
          <p className="text-slate-600 mb-6">The product you are looking for may have been removed or the link is incorrect.</p>
          <button
            type="button"
            onClick={() => navigate('/flavours')}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-brand-gold/90 transition"
          >
            View Flavours
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, 1);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedWeight, 1);
    navigate('/checkout');
  };

  return (
    <div className="flex-grow bg-white min-h-screen text-brand-black pb-20">
      <div className="max-w-7xl mx-auto px-4 pt-10">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-slate-700 hover:text-brand-gold mb-6 font-medium"
        >
          <ArrowLeft size={18} /> Back to products
        </button>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[30px] border border-slate-200 bg-slate-50 p-6 shadow-[0_30px_70px_rgba(15,23,42,0.08)]"
          >
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] items-start">
              <div className="rounded-[28px] overflow-hidden bg-white shadow-inner shadow-slate-200/40">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[380px] w-full object-cover sm:h-[420px] lg:h-[500px]"
                />
              </div>
              <div className="flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${product.category === 'Veg' ? 'bg-emerald-600/10 text-emerald-700 border border-emerald-600/15' : 'bg-rose-600/10 text-rose-700 border border-rose-600/15'}`}>
                      {product.category}
                    </span>
                    <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] bg-brand-gold/20 text-brand-gold border border-brand-gold/30">
                      {product.spiceLevel} Spice
                    </span>
                    {product.bestSeller && (
                      <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] bg-slate-900 text-brand-gold">
                        Best Seller
                      </span>
                    )}
                  </div>

                  <div>
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-slate-950">
                      {product.name}
                    </h1>
                    <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                      {product.description}
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl bg-white border border-slate-200 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400 mb-2">Shelf life</p>
                      <p className="text-sm font-semibold text-slate-900">{product.shelfLife}</p>
                    </div>
                    <div className="rounded-3xl bg-white border border-slate-200 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400 mb-2">Stock status</p>
                      <p className={`text-sm font-semibold ${product.inStock ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {product.inStock ? `${product.stockQuantity} available` : 'Currently unavailable'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-4">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400 mb-2">Choose weight</p>
                    <div className="flex flex-wrap gap-2">
                      {product.weights.map((option) => (
                        <button
                          key={option.weight}
                          type="button"
                          onClick={() => setSelectedWeight(option)}
                          className={`rounded-full border px-4 py-2 text-sm font-medium transition ${selectedWeight.weight === option.weight ? 'bg-brand-gold text-slate-950 border-brand-gold' : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'}`}
                        >
                          {option.weight}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Price</p>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-bold text-slate-950">₹{selectedWeight.price}</span>
                      <span className="text-sm text-slate-500">/ {selectedWeight.weight}</span>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className="inline-flex items-center justify-center gap-2 rounded-3xl border border-brand-gold bg-brand-gold px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-brand-gold/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <ShoppingCart size={18} /> Add to Cart
                    </button>
                    <button
                      type="button"
                      onClick={handleBuyNow}
                      disabled={!product.inStock}
                      className="inline-flex items-center justify-center gap-2 rounded-3xl border border-slate-900 bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Heart size={18} /> Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-[28px] border border-slate-200 bg-white p-6">
              <h2 className="text-2xl font-semibold text-slate-950 mb-4">Product details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-slate-500 mb-2">Ingredients</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{product.ingredients}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-2">Product type</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{product.productType}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="rounded-[30px] border border-slate-200 bg-slate-50 p-6 shadow-[0_15px_45px_rgba(15,23,42,0.08)]">
              <h2 className="text-2xl font-semibold text-slate-950 mb-5">Why customers love it</h2>
              <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                <p>Handcrafted with premium spices, this pickle brings out bold flavour in every meal.</p>
                <p>Ready to enjoy with rice, roti, and snacks — even better after a few days of marination.</p>
                <p>Perfect for gifting or everyday pantry use with long shelf life and premium packaging.</p>
              </div>
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-slate-50 p-6 shadow-[0_15px_45px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-semibold text-slate-950">Reviews</h3>
                <Link to="/reviews" className="text-sm text-brand-gold hover:text-brand-gold/80">See all</Link>
              </div>
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="rounded-3xl border border-slate-200 bg-white p-4">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{review.name}</p>
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{review.product || 'Acharruchi'}</p>
                        </div>
                        <div className="flex items-center gap-1 text-brand-gold">
                          {[...Array(5)].map((_, idx) => (
                            <Star key={idx} className={idx < review.rating ? 'fill-current' : 'text-slate-300'} size={14} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-600">No reviews for this product yet. Be the first to leave feedback.</p>
              )}
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-slate-50 p-6 shadow-[0_15px_45px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-semibold text-slate-950">Related products</h3>
                <Link to="/flavours" className="text-sm text-brand-gold hover:text-brand-gold/80">Browse more</Link>
              </div>
              {relatedProducts.length > 0 ? (
                <div className="space-y-4">
                  {relatedProducts.map((item) => (
                    <Link
                      key={item.id}
                      to={`/product/${item.id}`}
                      className="group block rounded-3xl border border-slate-200 bg-white p-4 hover:border-brand-gold transition"
                    >
                      <div className="flex items-center gap-4">
                        <img src={item.image} alt={item.name} className="h-16 w-16 rounded-3xl object-cover" />
                        <div>
                          <p className="font-semibold text-slate-950">{item.name}</p>
                          <p className="text-sm text-slate-500">₹{item.weights?.[0]?.price}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-600">No related items found yet.</p>
              )}
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
