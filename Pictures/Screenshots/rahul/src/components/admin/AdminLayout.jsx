import { NavLink, Outlet } from 'react-router-dom'
import AdminNavbar from './AdminNavbar.jsx'

const menuItems = [
  { label: 'Dashboard', to: '/admin/dashboard' },
  { label: 'Products', to: '/admin/products' },
  { label: 'Orders', to: '/admin/orders' }
]

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="border-r border-slate-800 bg-slate-950 px-4 py-8 lg:px-6">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Vasuki Admin</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Control Center</h2>
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block rounded-3xl px-4 py-3 text-sm font-medium transition ${
                    isActive ? 'bg-olive-900/90 text-white' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <div className="bg-slate-50 text-slate-900">
          <AdminNavbar />
          <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <Outlet />
          </section>
        </div>
      </div>
    </div>
  )
}
