import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import baseProducts from '../../data/products.js'

const STORAGE_KEY = 'vasukiAdminProducts'

export default function ManageProducts() {
  const [products, setProducts] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
    return saved ? JSON.parse(saved) : baseProducts
  })
  const [formState, setFormState] = useState({ name: '', price: '', description: '', imageUrl: '', stock: '' })
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  }, [products])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const entry = {
      id: editId || `p-${Date.now()}`,
      name: formState.name,
      price: Number(formState.price),
      description: formState.description,
      imageUrl: formState.imageUrl || 'https://picsum.photos/seed/pickle/520/520',
      stock: Number(formState.stock),
      category: 'Custom'
    }

    if (editId) {
      setProducts((current) => current.map((product) => (product.id === editId ? entry : product)))
    } else {
      setProducts((current) => [entry, ...current])
    }

    setFormState({ name: '', price: '', description: '', imageUrl: '', stock: '' })
    setEditId(null)
  }

  const handleEdit = (product) => {
    setEditId(product.id)
    setFormState({
      name: product.name,
      price: product.price,
      description: product.description,
      imageUrl: product.imageUrl,
      stock: product.stock
    })
  }

  const handleDelete = (id) => {
    setProducts((current) => current.filter((product) => product.id !== id))
    if (editId === id) {
      setEditId(null)
      setFormState({ name: '', price: '', description: '', imageUrl: '', stock: '' })
    }
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
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Product manager</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Add or update product listings</h1>
          </div>
          <p className="text-sm text-slate-600">Changes persist locally for the admin session.</p>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.2fr_1fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Product table</h2>
          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-100">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Stock</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-5 py-4 text-slate-900">{product.name}</td>
                    <td className="px-5 py-4 text-slate-600">{product.stock}</td>
                    <td className="px-5 py-4 text-slate-600">₹{product.price}</td>
                    <td className="px-5 py-4 text-slate-600">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(product)}
                          className="rounded-full border border-olive-900 px-4 py-2 text-sm font-semibold text-olive-900 hover:bg-olive-50"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          className="rounded-full border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">{editId ? 'Edit product' : 'Add product'}</h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700">Name</label>
              <input
                required
                name="name"
                value={formState.name}
                onChange={handleChange}
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-olive-900"
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">Price</label>
                <input
                  required
                  type="number"
                  name="price"
                  min="0"
                  value={formState.price}
                  onChange={handleChange}
                  className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-olive-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Stock</label>
                <input
                  required
                  type="number"
                  name="stock"
                  min="0"
                  value={formState.stock}
                  onChange={handleChange}
                  className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-olive-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Image URL</label>
              <input
                name="imageUrl"
                value={formState.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-olive-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Description</label>
              <textarea
                required
                name="description"
                rows="4"
                value={formState.description}
                onChange={handleChange}
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-olive-900"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-olive-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-olive-800"
            >
              {editId ? 'Update Product' : 'Add Product'}
            </button>
          </form>
        </div>
      </section>
    </motion.div>
  )
}
