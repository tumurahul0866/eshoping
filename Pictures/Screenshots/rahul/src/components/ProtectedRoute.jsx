import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'

export default function ProtectedRoute({ children }) {
  const { role } = useContext(AuthContext)
  const location = useLocation()

  if (role !== 'admin') {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
