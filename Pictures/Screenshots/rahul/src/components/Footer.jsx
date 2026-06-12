import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-t border-sand-200 bg-white/95 py-10"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-4">
          <p className="text-2xl font-display text-olive-900">Vasuki Pickles</p>
          <p className="max-w-xl text-sm leading-6 text-slate-600">
            Handcrafted Indian pickles with bright spice, clean ingredients, and a warm modern presentation for every meal.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-600">
            <Link to="/products" className="font-semibold text-olive-900 hover:text-olive-700">
              Shop
            </Link>
            <Link to="/about" className="font-semibold text-olive-900 hover:text-olive-700">
              About
            </Link>
            <Link to="/contact" className="font-semibold text-olive-900 hover:text-olive-700">
              Contact
            </Link>
          </div>
        </div>
        <div className="rounded-[28px] bg-olive-50 p-6 text-sm text-slate-700">
          <p className="font-semibold text-olive-900">Contact us</p>
          <p className="mt-4">123 Spice Bazaar, Hyderabad</p>
          <p className="mt-2">WhatsApp: +91 98765 43210</p>
          <p className="mt-2">Email: hello@vasukipickles.com</p>
        </div>
      </div>
    </motion.footer>
  )
}
