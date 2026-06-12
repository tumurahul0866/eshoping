import { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'

export default function Login() {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/products'

  const handleSubmit = (event) => {
    event.preventDefault()
    const result = login({ email, password })

    if (result.success) {
      if (result.role === 'admin') {
        navigate('/admin/dashboard', { replace: true })
      } else {
        navigate(from === '/login' ? '/products' : from, { replace: true })
      }
    } else {
      setError('Unable to login. Please check your credentials.')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      className="mx-auto max-w-2xl space-y-8 rounded-[34px] border border-sand-200 bg-white p-8 shadow-sm sm:p-12"
    >
      <div className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.24em] text-olive-900/70">Login</p>
        <h1 className="text-4xl font-semibold text-olive-950">Access your account</h1>
        <p className="text-sm text-slate-600">
          Use <span className="font-semibold">admin@vasuki.com</span> / <span className="font-semibold">admin123</span> for admin access.
          Otherwise sign in as a customer to browse products.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-olive-900"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-olive-900"
            placeholder="Enter your password"
          />
        </div>
        {error && <p className="text-sm text-red-700">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-full bg-olive-900 px-6 py-4 text-sm font-semibold text-white transition hover:bg-olive-800"
        >
          Sign in
        </button>
      </form>
      <div className="rounded-[28px] border border-sand-200 bg-olive-50 p-6 text-sm text-slate-700">
        <p className="font-semibold text-olive-900">Need help?</p>
        <p className="mt-3">Enter any email and password to continue as a customer.</p>
        <p className="mt-2">Use the admin credentials above only to access admin routes.</p>
      </div>
    </motion.div>
  )
}
