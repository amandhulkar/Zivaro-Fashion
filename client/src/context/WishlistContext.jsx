import { useCallback, useEffect, useMemo, useState } from 'react'
import { allProducts } from '../data/products'
import { showInfoToast, showSuccessToast } from '../utils/toast'
import { WishlistContext } from './wishlist-context'
const KEY = 'zivaro_wishlist'
const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] } }
export const WishlistProvider = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState(read)
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(wishlistIds)) }, [wishlistIds])
  const isWishlisted = useCallback((id) => wishlistIds.includes(id), [wishlistIds])
  const toggleWishlist = useCallback((id) => setWishlistIds((ids) => ids.includes(id) ? (showInfoToast('Removed from wishlist.'), ids.filter((item) => item !== id)) : (showSuccessToast('Wishlist updated.'), [...ids, id])), [])
  const removeFromWishlist = useCallback((id) => setWishlistIds((ids) => ids.filter((item) => item !== id)), [])
  const clearWishlist = useCallback(() => { setWishlistIds([]); showInfoToast('Wishlist cleared.') }, [])
  const wishlistItems = useMemo(() => wishlistIds.map((id) => allProducts.find((p) => p.id === id)).filter(Boolean), [wishlistIds])
  return <WishlistContext.Provider value={{ wishlistIds, wishlistItems, wishlistCount: wishlistItems.length, isWishlisted, toggleWishlist, removeFromWishlist, clearWishlist }}>{children}</WishlistContext.Provider>
}
