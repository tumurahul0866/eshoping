import { motion } from 'framer-motion'
import { useContext } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import products from '../data/products.js'
import { CartContext } from '../context/CartContext.jsx'

export default function Products() {
  const { addItem } = useContext(CartContext)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      className="space-y-10"
    >
      <section className="rounded-[34px] border border-sand-200 bg-white p-8 shadow-sm sm:p-12">
        <div className="md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-olive-900/70">Pickle Pantry</p>
            <h1 className="mt-3 text-5xl font-semibold text-olive-950">Clear choices, bold pickle flavors.</h1>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:mt-0">
            Shop eight classic pickle varieties with simple descriptions, easy add-to-cart action, and transparent pricing.
          </p>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={addItem} />
        ))}
      </section>
    </motion.div>
  )
}
