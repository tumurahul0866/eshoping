import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, offer }) => {
  const minPrice = Math.min(...product.weights.map((weight) => weight.price));

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group rounded-[20px] md:rounded-[28px] overflow-hidden bg-white border border-slate-200 shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition-transform duration-300"
    >
      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="relative h-40 md:h-44 overflow-hidden bg-slate-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            <span className={`px-2 md:px-3 py-1 text-[9px] md:text-[10px] font-bold rounded-full uppercase tracking-[0.18em] ${
              product.category === 'Veg' ? 'bg-emerald-600/90 text-white' : 'bg-rose-600/90 text-white'
            }`}>
              {product.category}
            </span>
            <span className="px-2 md:px-3 py-1 text-[9px] md:text-[10px] font-bold rounded-full uppercase tracking-[0.18em] bg-slate-900/90 text-brand-gold border border-brand-gold/30">
              {product.spiceLevel} Spice
            </span>
            {offer && offer.active && (
              <span className="px-2 md:px-3 py-1 text-[9px] md:text-[10px] font-bold rounded-full uppercase tracking-[0.18em] bg-brand-gold text-slate-950 border border-brand-gold/60 shadow-sm">
                {offer.title} {offer.discount > 0 ? `- ${offer.discount}% OFF` : ''}
              </span>
            )}
          </div>
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-serif text-sm font-bold border border-white/20 px-5 py-2 rounded-full tracking-[0.2em] uppercase">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        <div className="p-4 md:p-5">
          <h3 className="font-serif text-lg md:text-xl text-slate-950 leading-tight mb-2 group-hover:text-brand-gold transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-slate-600 mb-4 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400 mb-1">Starting at</p>
              <p className="text-2xl font-bold text-slate-950">₹{minPrice}</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-brand-gold/15 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold">
              View details
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
