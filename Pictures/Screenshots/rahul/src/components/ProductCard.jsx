import { motion } from 'framer-motion'

export default function ProductCard({ product, onAdd }) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      className="group overflow-hidden rounded-[28px] border border-sand-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="h-64 overflow-hidden bg-slate-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-olive-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-olive-900">
            {product.category}
          </span>
          <span className="text-xs text-slate-500">{product.stock} jars available</span>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-olive-950">{product.name}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{product.description}</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-lg font-semibold text-olive-900">₹{product.price}</span>
          <button
            onClick={() => onAdd(product)}
            className="rounded-full bg-olive-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-olive-800"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.article>
  )
}
