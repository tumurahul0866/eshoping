import { motion } from 'framer-motion'
import products from '../../data/products.js'

const mockOrders = [
  { id: 'O-301', customer: 'Sneha R.', total: 890, status: 'Pending' },
  { id: 'O-302', customer: 'Rahul S.', total: 670, status: 'Shipped' },
  { id: 'O-303', customer: 'Priya K.', total: 1020, status: 'Delivered' }
]

export default function Dashboard() {
  const totalOrders = mockOrders.length
  const totalProducts = products.length
  const revenue = mockOrders.reduce((sum, order) => sum + order.total, 0)

  const quickLinks = [
    { label: 'Manage products', href: '/admin/products' },
    { label: 'View orders', href: '/admin/orders' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      className="space-y-10"
    >
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Total orders</p>
          <p className="mt-4 text-4xl font-semibold text-slate-900">{totalOrders}</p>
        </div>
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Products listed</p>
          <p className="mt-4 text-4xl font-semibold text-slate-900">{totalProducts}</p>
        </div>
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Projected revenue</p>
          <p className="mt-4 text-4xl font-semibold text-slate-900">₹{revenue}</p>
        </div>
      </section>

      <section className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Quick links</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Jump to management tools</h2>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {quickLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Recent orders</h2>
        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-100">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {mockOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 font-semibold text-slate-900">{order.id}</td>
                  <td className="px-6 py-4 text-slate-600">{order.customer}</td>
                  <td className="px-6 py-4 text-slate-600">₹{order.total}</td>
                  <td className="px-6 py-4 text-slate-600">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </motion.div>
  )
}
