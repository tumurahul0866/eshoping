import { useContext } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminLayout from './components/admin/AdminLayout.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import ManageProducts from './pages/admin/ManageProducts.jsx'
import Orders from './pages/admin/Orders.jsx'
import { AuthContext } from './context/AuthContext.jsx'

const CustomerLayout = () => (
  <div className="min-h-screen bg-sand text-slate-900">
    <Navbar />
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Outlet />
    </main>
    <Footer />
  </div>
)

function App() {
  const location = useLocation()
  const { role } = useContext(AuthContext)

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
