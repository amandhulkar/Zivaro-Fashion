import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { showErrorToast, showInfoToast, showSuccessToast } from '../utils/toast'
import { CartContext } from './cart-context'

const BASE_KEY = 'zivaro_cart'
const getCartKey = (user) => `${BASE_KEY}_${user?._id || user?.id || user?.email || 'guest'}`
const read = (key) => { try { return JSON.parse(localStorage.getItem(key)) || [] } catch { return [] } }
const makeKey = (productId, size, color) => `${productId}__${size}__${color}`

export const CartProvider = ({ children }) => {
  const { user } = useAuth()
  const cartKey = useMemo(() => getCartKey(user), [user])
  const [cartItems, setCartItems] = useState(() => read(cartKey))

  useEffect(() => {
    localStorage.removeItem(BASE_KEY)
    setCartItems(read(cartKey))
  }, [cartKey])

  useEffect(() => { localStorage.setItem(cartKey, JSON.stringify(cartItems)) }, [cartItems, cartKey])

  const addToCart = useCallback((product, options = {}) => {
    const size = options.size || product.availableSizes?.[0] || 'Free Size'
    const color = options.color || product.availableColors?.[0]?.name || product.color
    const quantity = Number(options.quantity || 1)
    if (product.stock <= 0) return showErrorToast('This item is out of stock.')
    const key = makeKey(product.id, size, color)
    setCartItems((items) => {
      const existing = items.find((item) => item.key === key)
      if (existing) {
        const nextQty = Math.min(product.stock, existing.quantity + quantity)
        if (nextQty === existing.quantity) showErrorToast(`Only ${product.stock} available in stock.`)
        else showSuccessToast('Cart quantity updated.')
        return items.map((item) => item.key === key ? { ...item, quantity: nextQty } : item)
      }
      showSuccessToast('Added to cart successfully.')
      return [...items, { key, productId: product.id, slug: product.slug, name: product.name, category: product.category, price: product.price, originalPrice: product.originalPrice, imageTone: product.imageTone, thumbnail: product.thumbnail, size, color, quantity: Math.min(quantity, product.stock), stock: product.stock }]
    })
  }, [])

  const removeFromCart = useCallback((key) => { setCartItems((items) => items.filter((item) => item.key !== key)); showInfoToast('Removed successfully.') }, [])
  const updateQuantity = useCallback((key, quantity) => setCartItems((items) => items.map((item) => item.key === key ? { ...item, quantity: Math.max(1, Math.min(item.stock, quantity)) } : item)), [])
  const clearCart = useCallback(() => { setCartItems([]); showInfoToast('Cart cleared.') }, [])
  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems])
  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartItems])
  const savings = useMemo(() => cartItems.reduce((sum, item) => sum + Math.max(0, item.originalPrice - item.price) * item.quantity, 0), [cartItems])
  const deliveryCharge = subtotal > 2999 || subtotal === 0 ? 0 : 99
  const grandTotal = subtotal + deliveryCharge
  const value = { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, subtotal, savings, deliveryCharge, grandTotal }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
