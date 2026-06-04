/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'bellezza-cart'

function normalizeCartItem(product) {
  return {
    id: product.id,
    name: product.name,
    price: Number(product.price) || 0,
    image: product.image,
    quantity: product.quantity || 1,
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem(STORAGE_KEY)
      return storedCart ? JSON.parse(storedCart) : []
    } catch {
      return []
    }
  })
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    document.body.classList.toggle('cart-drawer-open', isCartOpen)
    return () => document.body.classList.remove('cart-drawer-open')
  }, [isCartOpen])

  const openCart = useCallback(() => setIsCartOpen(true), [])
  const closeCart = useCallback(() => setIsCartOpen(false), [])

  const addToCart = useCallback((product) => {
    const item = normalizeCartItem(product)

    setCartItems((currentItems) => {
      const existingItem = currentItems.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        )
      }

      return [...currentItems, item]
    })

    openCart()
  }, [openCart])

  const removeFromCart = useCallback((id) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }, [])

  const updateQuantity = useCallback((id, type) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) => {
          if (item.id !== id) return item

          const nextQuantity = type === 'increase'
            ? item.quantity + 1
            : item.quantity - 1

          return { ...item, quantity: nextQuantity }
        })
        .filter((item) => item.quantity > 0)
    )
  }, [])

  const getTotal = useCallback(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  )

  const cartCount = useMemo(
    () => cartItems.reduce((count, item) => count + item.quantity, 0),
    [cartItems]
  )

  const value = useMemo(() => ({
    cartItems,
    cartCount,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotal,
    openCart,
    closeCart,
  }), [
    cartItems,
    cartCount,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotal,
    openCart,
    closeCart,
  ])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}
