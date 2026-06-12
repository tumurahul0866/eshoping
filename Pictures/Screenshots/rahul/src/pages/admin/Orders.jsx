import { useState } from 'react'
import { motion } from 'framer-motion'

const initialOrders = [
  { id: 'O-100', customer: 'Ayesha N.', total: 760, status: 'Pending', items: 3 },
  { id: 'O-101', customer: 'Vikram D.', total: 920, status: 'Shipped', items: 4 },
  { id: 'O-102', customer: 'Lekha P.', total: 540, status: 'Delivered', items: 2 }
]

export default function Orders() {
  const [orders, setOrders] = useState(initialOrders)

  const handleStatus = (id, status) => {
    setOrders((current) => current.map((order) => (order.id === id ? { ...order, status } : order)))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      className="space-y-10"
    >
      <section className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Order management</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Monitor and update order status.</h1>
          </div>
          <p className="text-sm text-slate-600">Click status to move each order through the workflow.</p>
        </div>
      </section>

      <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Items</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 font-semibold text-slate-900">{order.id}</td>
                <td className="px-6 py-4 text-slate-600">{order.customer}</td>
                <td className="px-6 py-4 text-slate-600">{order.items}</td>
                <td className="px-6 py-4 text-slate-600">₹{order.total}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                      order.status === 'Delivered'
                        ? 'bg-emerald-100 text-emerald-700'
                        : order.status === 'Shipped'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={order.status}
                    onChange={(event) => handleStatus(order.id, event.target.value)}
                    className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-800 outline-none"
                  >
                    <option>Pending</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </motion.div>
  )
}
