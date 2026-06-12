import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

const STORAGE_KEY = 'vasukiAuth'

const initialState = {
  user: null,
  role: null
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
    return saved ? JSON.parse(saved) : initialState
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(auth))
  }, [auth])

  const login = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase()
    if (normalizedEmail === 'admin@vasuki.com' && password === 'admin123') {
      setAuth({ user: 'Vasuki Admin', role: 'admin', email: normalizedEmail })
      return { success: true, role: 'admin' }
    }

    setAuth({ user: email, role: 'customer', email: normalizedEmail })
    return { success: true, role: 'customer' }
  }

  const logout = () => {
    setAuth(initialState)
  }

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
