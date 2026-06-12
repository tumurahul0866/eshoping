import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import products from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext.jsx'

const testimonials = [
  {
    name: 'Ananya M.',
    quote: 'The spicy kick feels handcrafted, just like old family recipes. Delivery was fast and the jar looks premium.'
  },
  {
    name: 'Rohan K.',
    quote: 'A perfect balance of heat and tang. The mango pickle is now a dinner staple in our house.'
  }
]

const highlights = [
  {
    title: 'Traditional recipes',
    detail: 'Small-batch pickles made with authentic Indian spice blends and time-tested family methods.'
  },
  {
    title: 'Fresh ingredients',
    detail: 'Locally sourced mangoes, lemons, gongura and more for bright, bold flavor in every jar.'
  },
  {
    title: 'Ready to enjoy',
    detail: 'Perfect for everyday meals, gifting, or pairing with your favorite rice and bread dishes.'
  }
]

export default function Home() {
  const { addItem } = useContext(CartContext)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      className="space-y-16"
    >
      <section className="rounded-[36px] border border-sand-200 bg-white p-8 shadow-sm sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex rounded-full bg-olive-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-olive-900">
              Crafted to Crave
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-olive-950 sm:text-6xl">
              Traditional Indian pickles with a clear, modern flavor story.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              From our family kitchen to your table, each jar carries bright spice, clean ingredients, and a bold heritage taste that feels easy and memorable.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="rounded-full bg-olive-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-olive-800"
              >
                Shop pickles
              </Link>
              <a
                href="#why"
                className="rounded-full border border-olive-900 px-6 py-3 text-sm font-semibold text-olive-900 transition hover:bg-olive-50"
              >
                Why Vasuki?
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-[32px] border border-sand-200 bg-sand-100 shadow-xl">
            <img
              src="https://picsum.photos/seed/pickle-hero/860/860"
              alt="Vasuki Pickles hero"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section id="why" className="grid gap-6 md:grid-cols-3">
        {highlights.map((item) => (
          <div key={item.title} className="rounded-[28px] border border-sand-200 bg-olive-50 p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-olive-900/70">{item.title}</p>
            <p className="mt-4 text-lg font-semibold text-olive-950">{item.detail}</p>
          </div>
        ))}
      </section>

      <section className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-olive-900/70">Featured flavors</p>
            <h2 className="mt-3 text-3xl font-semibold text-olive-950">Clear favorites in every jar.</h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center rounded-full border border-olive-900 bg-white px-4 py-2 text-sm font-semibold text-olive-900 transition hover:bg-olive-50"
          >
            Browse full range
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} onAdd={addItem} />
          ))}
        </div>
      </section>

      <section className="space-y-8 rounded-[36px] border border-sand-200 bg-white p-8 shadow-sm sm:p-12">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-olive-900/70">Testimonials</p>
          <h2 className="mt-3 text-3xl font-semibold text-olive-950">Customers say it clearly.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((item) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[28px] border border-sand-200 bg-olive-50 p-8 shadow-sm"
            >
              <p className="text-lg leading-8 text-slate-700">“{item.quote}”</p>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-slate-900">
                {item.name}
              </p>
            </motion.article>
          ))}
        </div>
      </section>
    </motion.div>
  )
}
