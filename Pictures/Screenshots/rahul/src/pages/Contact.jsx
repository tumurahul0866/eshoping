import { motion } from 'framer-motion'

export default function Contact() {
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
            <p className="text-sm uppercase tracking-[0.24em] text-olive-900/70">Contact</p>
            <h1 className="text-4xl font-semibold text-olive-950">Support that is clear and easy to reach.</h1>
            <p className="text-lg leading-8 text-slate-600">
              Send us a message for orders, questions, or gift jars. Our WhatsApp and email support keeps everything straightforward.
            </p>
          </div>
          <div className="rounded-[28px] bg-olive-50 p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-olive-900/70">Contact details</p>
            <p className="mt-4 text-xl font-semibold text-olive-950">+91 98765 43210</p>
            <p className="mt-2 text-slate-700">WhatsApp support 9am–8pm IST</p>
            <p className="mt-6 text-slate-700">hello@vasukipickles.com</p>
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <form
          onSubmit={(event) => event.preventDefault()}
          className="rounded-[34px] border border-sand-200 bg-white p-8 shadow-sm sm:p-12"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-olive-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-olive-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Message</label>
              <textarea
                rows="5"
                placeholder="Tell us about your order or question"
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-olive-900"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-olive-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-olive-800"
            >
              Send message
            </button>
          </div>
        </form>
        <div className="rounded-[34px] border border-sand-200 bg-olive-50 p-8 shadow-sm sm:p-12">
          <h2 className="text-3xl font-semibold text-olive-950">Why contact Vasuki?</h2>
          <div className="mt-8 space-y-5 text-slate-700">
            <p>• Simple order support for retail and wholesale.</p>
            <p>• Fast replies on WhatsApp and email.</p>
            <p>• Help with product pairing, gift jars, and delivery timelines.</p>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
