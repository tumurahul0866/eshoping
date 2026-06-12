import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Share2, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-green text-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <span className="font-serif text-4xl font-bold tracking-widest text-brand-gold">ACHARRUCHI</span>
            </Link>
            <p className="text-sm text-brand-cream leading-relaxed">
              Crafted to Crave. Experience rich, authentic pickles made with premium ingredients and time-tested family recipes.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-brand-gold text-slate-950 grid place-items-center transition hover:bg-brand-gold-light">
                <Share2 size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-gold text-slate-950 grid place-items-center transition hover:bg-brand-gold-light">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl text-brand-cream mb-6">Explore</h3>
            <ul className="space-y-4">
              {['Home', 'Flavours', 'About Us', 'Reviews', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(' ', '') === 'home' ? '' : item.toLowerCase().replace(' ', '')}`}
                    className="text-brand-cream hover:text-brand-gold transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl text-brand-cream mb-6">Useful Links</h3>
            <ul className="space-y-4">
              {['Terms of Service', 'Shipping Info', 'Returns'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-brand-cream hover:text-brand-gold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl text-brand-cream mb-6">Contact Us</h3>
            <ul className="space-y-4 text-brand-cream">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-brand-gold shrink-0 mt-1" />
                <span>123 Spice Lane, Culinary District, Hyderabad, India 500001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-brand-gold shrink-0" />
                <span>+91 8885473903</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-brand-gold shrink-0" />
                <span>hello@vasukipickles.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-brand-cream/30 pt-8 text-center text-sm text-brand-cream">
          <p>&copy; {new Date().getFullYear()} Acharruchi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
