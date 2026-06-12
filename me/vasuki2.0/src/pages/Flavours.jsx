import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { getProducts, getProductTypes } from '../services/dataStore';

const Flavours = () => {
  const [products, setProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchedProducts = getProducts();
    const fetchedTypes = getProductTypes();
    setProducts(fetchedProducts);
    setProductTypes(fetchedTypes);

    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      setSearchQuery(urlSearch);
      setSelectedType('All');
    } else {
      setSelectedType('All');
    }
  }, [searchParams]);

  const availableTypes = ['All', ...productTypes];

  let filteredProducts = selectedType && selectedType !== 'All'
    ? products.filter((p) => p.productType === selectedType)
    : products;

  if (searchQuery.trim()) {
    filteredProducts = filteredProducts.filter(
      (p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <div className="flex-grow bg-white min-h-screen text-brand-black">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="min-h-[calc(100vh-5rem)] flex flex-col justify-center">
          <div className="mx-auto w-full max-w-4xl rounded-[2rem] border border-slate-200 bg-slate-50/80 p-8 shadow-xl shadow-slate-200/60">
            <div className="text-center mb-10">
              <p className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
                Explore all flavours
              </p>
              <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
                Choose a category or browse all products. Every item is visible here.
              </p>
            </div>

            <div className="mb-8">
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Search size={20} className="text-brand-gold" />
                </div>
                <input
                  type="text"
                  placeholder="Search products by name or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-10 py-3 md:py-4 border-2 border-brand-gold/40 rounded-full focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all text-slate-900 placeholder-slate-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-4 flex items-center text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-5 mb-10">
              {availableTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`min-w-[140px] px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 ${
                    selectedType === type
                      ? 'bg-brand-gold text-slate-950 shadow-[0_0_20px_rgba(220,163,14,0.33)] border border-brand-gold/90'
                      : 'bg-white text-brand-black border border-slate-200 hover:border-brand-gold/70 hover:bg-slate-100'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 text-brand-black/60">
                <p className="text-xl">No products found for this selection.</p>
              </div>
            ) : (
              <>
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredProducts.map((product) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      key={product.id}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-16 text-brand-cream/50">
                    <p className="text-xl">No products found in this type.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flavours;
