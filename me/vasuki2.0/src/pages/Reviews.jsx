import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { getReviews, saveReview } from '../services/dataStore';

const StarRating = ({ rating }) => {
  return (
    <div className="flex text-brand-gold">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-5 h-5 ${i < rating ? 'fill-current' : 'text-brand-cream/20 fill-current'}`} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const StarInput = ({ rating, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      {[...Array(5)].map((_, index) => {
        const value = index + 1;
        return (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            className={`text-3xl transition-colors ${value <= rating ? 'text-brand-gold' : 'text-brand-cream/30 hover:text-brand-cream'}`}
            aria-label={`${value} star${value > 1 ? 's' : ''}`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [formState, setFormState] = useState({ name: '', rating: 0, text: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    setReviews(getReviews().filter((review) => review.visible !== false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.rating || formState.rating < 1) {
      setError('Please select a star rating.');
      return;
    }

    setError('');
    saveReview(formState);
    setReviews(getReviews().filter((review) => review.visible !== false));
    setFormState({ name: '', rating: 0, text: '' });
    setMessage('Thank you! Your review has been submitted.');
    setTimeout(() => setMessage(''), 4000);
  };

  const handleWriteReview = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex-grow bg-brand-black py-20">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif font-bold text-brand-gold mb-6"
          >
            Customer Love
          </motion.h1>
          <p className="text-brand-cream/70 text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our community of pickle lovers has to say about the Acharruchi experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-8 rounded-2xl border border-brand-gold/10 hover:border-brand-gold/30 transition-colors"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-bold text-brand-cream text-lg">{review.name}</h3>
                  <p className="text-brand-cream/40 text-sm">{review.date}</p>
                </div>
                <StarRating rating={review.rating} />
              </div>
              <p className="text-brand-cream/80 leading-relaxed mb-6 italic">
                "{review.text}"
              </p>
              <div className="inline-block bg-brand-matte px-4 py-1 rounded-full text-brand-gold text-sm border border-brand-gold/20">
                Purchased: {review.product}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <p className="text-brand-cream/60 mb-6">Have you tried our pickles?</p>
          <button
            type="button"
            onClick={handleWriteReview}
            className="bg-brand-matte border-2 border-brand-gold text-brand-gold px-8 py-3 rounded-lg font-medium hover:bg-brand-gold hover:text-brand-black transition-colors"
          >
            Write a Review
          </button>
        </div>

        <div ref={formRef} className="mt-20 bg-brand-matte border border-white/10 rounded-3xl p-10">
          <h2 className="text-3xl font-serif text-brand-cream mb-4">Share your experience</h2>
          <p className="text-brand-cream/70 mb-8">Submit a review and help others discover the real flavour of Acharruchi.</p>

          {message && (
            <div className="mb-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-200">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-4">
              <label className="block text-sm text-brand-cream/70">Your Name</label>
              <input
                type="text"
                name="name"
                required
                value={formState.name}
                onChange={handleChange}
                className="w-full bg-brand-black border border-white/10 rounded-2xl px-4 py-3 text-brand-cream"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm text-brand-cream/70">Rating</label>
              <StarInput
                rating={formState.rating}
                onChange={(value) => setFormState((prev) => ({ ...prev, rating: value }))}
              />
              {error && <p className="text-sm text-red-400">{error}</p>}
            </div>
            <div className="lg:col-span-2 space-y-4">
              <label className="block text-sm text-brand-cream/70">Review</label>
              <textarea
                name="text"
                rows={5}
                required
                value={formState.text}
                onChange={handleChange}
                className="w-full bg-brand-black border border-white/10 rounded-2xl px-4 py-3 text-brand-cream resize-none"
              />
            </div>
            <button type="submit" className="lg:col-span-2 bg-brand-gold text-brand-black rounded-2xl px-8 py-4 font-semibold hover:bg-brand-gold/90 transition-colors">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
