import { useState, useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CartContext } from '../context/CartContext.jsx'
import { AuthContext } from '../context/AuthContext.jsx'
import { motion } from 'framer-motion'

const links = [
  { label: 'Products', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { cartCount } = useContext(CartContext)
  const { role, logout } = useContext(AuthContext)

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 border-b border-sand-200 bg-white/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-lg font-semibold text-olive-900">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-yellow-100 text-xl font-bold text-yellow-900 shadow-sm">
            V
          </span>
          <div>
            <p className="text-xl font-display">Vasuki Pickles</p>
            <p className="text-sm text-slate-600">Crafted to Crave</p>
          </div>
        </Link>

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center rounded-lg border border-slate-200 bg-white p-2 text-slate-700 shadow-sm sm:hidden"
          aria-label="Toggle navigation"
        >
          <span className="text-2xl">☰</span>
        </button>

        <nav className={`${open ? 'block' : 'hidden'} w-full sm:block sm:w-auto`}>
          <ul className="flex flex-col gap-3 rounded-3xl bg-white/95 px-4 py-5 shadow-lg sm:flex-row sm:items-center sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `block text-sm font-medium transition ${
                      isActive ? 'text-olive-900' : 'text-slate-600 hover:text-olive-900'
                    }`
                  }
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to="/cart"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-olive-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-olive-800"
                onClick={() => setOpen(false)}
              >
                Cart
                <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-olive-900">
                  {cartCount}
                </span>
              </NavLink>
            </li>
            <li>
              {role === 'admin' ? (
                <button
                  onClick={logout}
                  className="rounded-full border border-olive-900 bg-white px-4 py-2 text-sm font-semibold text-olive-900 transition hover:bg-olive-50"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="rounded-full border border-olive-900 bg-white px-4 py-2 text-sm font-semibold text-olive-900 transition hover:bg-olive-50"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  )
}
