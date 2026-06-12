import { motion } from 'framer-motion'

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      className="space-y-10"
    >
      <section className="rounded-[34px] border border-sand-200 bg-white p-8 shadow-sm sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.24em] text-olive-900/70">Our Story</p>
            <h1 className="text-4xl font-semibold text-olive-950">Simple, trusted pickle making from our family to yours.</h1>
            <p className="text-lg leading-8 text-slate-600">
              Vasuki Pickles preserves bright, spicy flavors using family recipes, local ingredients, and a fresh approach to traditional pickling. Every product is designed to taste clear, authentic, and memorable.
            </p>
          </div>
          <div className="rounded-[28px] bg-olive-50 p-8">
            <p className="text-2xl font-semibold text-olive-950">Our promise</p>
            <ul className="mt-6 space-y-4 text-slate-600">
              <li>• Transparent ingredient sourcing from trusted farmers</li>
              <li>• Gentle, small-batch preparation for consistent flavor</li>
              <li>• No artificial preservatives, colorings, or fillers</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-3">
        <article className="rounded-[28px] border border-sand-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-olive-950">Heritage taste</h2>
          <p className="mt-4 text-slate-600">
            Our recipes are inspired by generations of South Indian pickle-making and refreshed with a clean, modern presentation.
          </p>
        </article>
        <article className="rounded-[28px] border border-sand-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-olive-950">Fresh sourcing</h2>
          <p className="mt-4 text-slate-600">
            We choose fresh produce, aromatic spices, and quality oils so each jar tastes vivid from the first spoonful.
          </p>
        </article>
        <article className="rounded-[28px] border border-sand-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-olive-950">Everyday pairing</h2>
          <p className="mt-4 text-slate-600">
            Designed to complement rice, rotis, dosas, and sandwiches, our pickles make every meal more satisfying.
          </p>
        </article>
      </section>
    </motion.div>
  )
}
