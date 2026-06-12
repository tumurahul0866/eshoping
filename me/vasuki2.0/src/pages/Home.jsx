import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Sparkles, Truck } from 'lucide-react';
import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';
import { getStoreSettings, getProducts, getOffers, getProductTypes } from '../services/dataStore';

const Home = () => {
  const [settings, setSettings] = useState({});
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    const storeSettings = getStoreSettings();
    const visibleProducts = getProducts().filter((product) => product.visible);
    const activeOffers = getOffers().filter((offer) => offer.active);
    const types = getProductTypes();
    const defaultType = types.includes('Podis') ? 'Podis' : types[0] || '';

    setSettings(storeSettings);
    setProducts(visibleProducts);
    setOffers(activeOffers);
    setProductTypes(types);
    setSelectedType(defaultType);
  }, []);

  const logoUrl = settings.logoUrl || '/logo.svg';
  const heroTitle = settings.heroTitle || 'ACHARRUCHI';
  const brandTagline = settings.brandTagline || 'Crafted to Crave.';

  const featuredProducts = products.filter((product) => product.bestSeller).slice(0, 3);
  const filteredProducts = selectedType ? products.filter((product) => product.productType === selectedType) : [];

  return (
    <div className="flex-grow flex flex-col bg-white text-brand-black">
      {offers.length > 0 && (
        <section className="py-6 md:py-8 bg-brand-yellow-light border-b border-brand-yellow/30">
          <div className="max-w-6xl mx-auto px-3 md:px-4">
            <div className="grid gap-3 md:gap-4 md:grid-cols-2">
              {offers.map((offer) => (
                <div key={offer.id} className="rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 bg-white border border-brand-gold/20 shadow-[0_20px_50px_rgba(183,137,38,0.12)]">
                  <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-brand-gold/95 font-semibold mb-2 md:mb-3">Limited Time</p>
                  <h2 className="text-xl md:text-2xl font-serif font-bold text-brand-black mb-2">{offer.title}</h2>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">{offer.description}</p>
                  {offer.discount > 0 && (
                    <span className="mt-4 inline-flex rounded-full bg-brand-gold/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">
                      {offer.discount}% OFF
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative overflow-hidden py-12 md:py-24">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(183,137,38,0.2),transparent_30%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-3 md:px-4 relative z-10 text-center">
          <div className="mx-auto mb-8 md:mb-10 max-w-4xl rounded-[1.5rem] md:rounded-[2rem] border border-brand-gold/20 bg-brand-cream/90 p-6 md:p-10 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
            <div className="mx-auto mb-4 md:mb-6 h-20 md:h-28 w-20 md:w-28 overflow-hidden rounded-full border border-brand-gold/30 bg-white shadow-sm">
              <img src={logoUrl} alt="Acharruchi Logo" className="h-full w-full object-contain" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-black mb-4 md:mb-6 tracking-tight">{heroTitle}</h1>
            <p className="mx-auto max-w-3xl text-base md:text-lg lg:text-xl text-slate-700 leading-relaxed">{brandTagline} Discover handcrafted pickles, podis and snacks inspired by family tradition and premium ingredients.</p>
            <div className="mt-6 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <Link to="/flavours">
                <Button variant="primary" className="px-8 md:px-12 py-3 md:py-4 text-base md:text-lg">
                  Explore Flavours
                </Button>
              </Link>
              <Link to="/contact" className="text-brand-black/70 underline underline-offset-4 hover:text-brand-black transition-colors text-sm md:text-base">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="grid gap-3 md:gap-4 md:grid-cols-3">
            {[
              {
                Icon: Leaf,
                title: 'Premium Ingredients',
                description: 'Fresh, authentic spices and vegetables sourced for the highest taste.',
              },
              {
                Icon: Sparkles,
                title: 'Handcrafted Flavour',
                description: 'Small-batch recipes with tradition, texture, and bold regional taste.',
              },
              {
                Icon: Truck,
                title: 'Reliable Delivery',
                description: 'Quick shipping across Hyderabad with secure packaging.',
              }
            ].map((feature) => (
            <div className="rounded-[1.5rem] md:rounded-[2rem] border border-slate-200 bg-white/90 p-4 md:p-6 text-left shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
                <div className="inline-flex items-center justify-center h-12 md:h-14 w-12 md:w-14 rounded-2xl bg-brand-gold/10 text-brand-gold mb-3 md:mb-4">
                  <feature.Icon size={20} />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-brand-black mb-2">{feature.title}</h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-brand-cream/70 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-3 md:px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 mb-8 md:mb-10">
            <div>
              <p className="text-xs md:text-sm uppercase tracking-[0.24em] text-brand-gold mb-2 md:mb-3">Shop by flavour</p>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-brand-black">Explore our top categories</h2>
            </div>
            <Link to="/flavours" className="text-brand-gold font-semibold hover:text-brand-gold-light">
              Browse all flavours
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-10">
            {productTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`min-w-[120px] md:min-w-[140px] px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${
                  selectedType === type
                    ? 'bg-brand-gold text-brand-black shadow-[0_15px_40px_rgba(183,137,38,0.2)]'
                    : 'bg-white text-brand-black border border-slate-200 hover:border-brand-gold/60 hover:bg-slate-50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-[1.5rem] md:rounded-[2rem] border border-slate-200 bg-white p-8 md:p-14 text-center shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
              <p className="text-base md:text-xl text-slate-600">No products found for {selectedType}. Try another category or browse our full menu.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {filteredProducts.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} offer={offers[0] || null} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
