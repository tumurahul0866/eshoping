import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="flex-grow bg-brand-black py-20">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand-gold mb-6">Our Story</h1>
            <p className="text-brand-cream/80 text-lg leading-relaxed mb-6">
              Acharruchi is crafted with traditional recipes, fresh ingredients, and bold flavours. Every jar is prepared with care to bring rich homemade taste to every meal.
            </p>
            <p className="text-brand-cream/80 text-lg leading-relaxed mb-6">
              What started as a small family tradition has blossomed into a premium brand dedicated to preserving the authentic culinary heritage of India. We believe that a meal is incomplete without that perfect touch of spice and tanginess.
            </p>
            <p className="text-brand-cream/80 text-lg leading-relaxed">
              Our name "Vasuki" symbolizes strength and tradition. Like the mythical serpent, our flavors are bold, legendary, and timeless.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px]"
          >
            <img 
              src="https://images.unsplash.com/photo-1506544777-64cfb638973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Indian Spices" 
              className="w-full h-full object-cover rounded-2xl border border-brand-gold/20"
            />
          </motion.div>
        </div>

        <div className="bg-brand-matte border border-brand-gold/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-serif text-brand-gold mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="w-16 h-16 mx-auto bg-brand-black border border-brand-gold/50 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-xl font-serif text-brand-cream mb-2">Natural Ingredients</h3>
              <p className="text-brand-cream/60">Sourced directly from local farmers to ensure the highest quality and freshness.</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto bg-brand-black border border-brand-gold/50 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">👩‍🍳</span>
              </div>
              <h3 className="text-xl font-serif text-brand-cream mb-2">Traditional Methods</h3>
              <p className="text-brand-cream/60">Handcrafted using age-old techniques that preserve authentic flavors without chemicals.</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto bg-brand-black border border-brand-gold/50 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-serif text-brand-cream mb-2">Made with Love</h3>
              <p className="text-brand-cream/60">Every batch is prepared with the same care and attention as we do for our own family.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
