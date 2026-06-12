import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

export default function AdminNavbar() {
  const { logout, user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-5 shadow-sm">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Admin Panel</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900">Welcome back, {user || 'Admin'}</h1>
      </div>
      <button
        onClick={handleLogout}
        className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
      >
        Sign Out
      </button>
    </header>
  )
}
