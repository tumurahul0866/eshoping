import { createContext, useEffect, useMemo, useState } from 'react'

export const CartContext = createContext()
const STORAGE_KEY = 'vasukiCart'

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  const addItem = (product) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
            : item
        )
      }
      return [...current, { ...product, quantity: 1 }]
    })
  }

  const removeItem = (id) => {
    setCartItems((current) => current.filter((item) => item.id !== id))
  }

  const updateQuantity = (id, quantity) => {
    setCartItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) } : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  )

  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  )

  return (
    <CartContext.Provider
      value={{ cartItems, addItem, removeItem, updateQuantity, clearCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  )
}
