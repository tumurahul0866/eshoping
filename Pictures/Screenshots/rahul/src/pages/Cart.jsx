import { useContext } from 'react'
import { motion } from 'framer-motion'
import { CartContext } from '../context/CartContext.jsx'

export default function Cart() {
  const { cartItems, removeItem, updateQuantity, cartTotal } = useContext(CartContext)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      className="space-y-10"
    >
      <section className="rounded-[34px] border border-sand-200 bg-white p-8 shadow-sm sm:p-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-olive-900/70">Shopping Cart</p>
            <h1 className="mt-3 text-4xl font-semibold text-olive-950">Review your selected jars.</h1>
          </div>
          <p className="text-sm text-slate-600">Update quantities, remove items, and confirm the total before checkout.</p>
        </div>
      </section>

      {cartItems.length === 0 ? (
        <section className="rounded-[34px] border border-dashed border-sand-200 bg-white p-12 text-center text-slate-600 shadow-sm">
          <p className="text-xl font-semibold text-olive-900">Your cart is empty.</p>
          <p className="mt-3">Return to products and add a jar to bring home the flavor.</p>
        </section>
      ) : (
        <section className="grid gap-8 xl:grid-cols-[1.8fr_0.8fr]">
          <div className="space-y-6 rounded-[34px] border border-sand-200 bg-white p-8 shadow-sm sm:p-10">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col gap-4 rounded-3xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <img src={item.imageUrl} alt={item.name} className="h-24 w-24 rounded-3xl object-cover" />
                  <div>
                    <p className="text-lg font-semibold text-olive-950">{item.name}</p>
                    <p className="mt-1 text-sm text-slate-600">₹{item.price} per jar</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:items-end">
                  <div className="flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-3 py-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-xl text-olive-900"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="min-w-[2rem] text-center text-sm font-semibold text-slate-900">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-xl text-olive-900"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-sm font-semibold text-red-700 transition hover:text-red-900"
                  >
                    Remove item
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-[34px] border border-sand-200 bg-olive-50 p-8 shadow-sm sm:p-10">
            <p className="text-sm uppercase tracking-[0.24em] text-olive-900/70">Order summary</p>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-olive-950">₹{cartTotal}</span>
              </div>
              <div className="rounded-3xl bg-white p-4 text-sm text-slate-700 shadow-sm">
                Free delivery on every order and fast packing for freshness.
              </div>
            </div>
            <button className="mt-8 w-full rounded-full bg-olive-900 px-6 py-4 text-sm font-semibold text-white transition hover:bg-olive-800">
              Checkout now
            </button>
          </div>
        </section>
      )}
    </motion.div>
  )
}
