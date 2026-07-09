import { useCallback, useMemo, useState } from 'react'
import { categories, priceRanges } from '../data/categories'
import { allProducts, formatPrice, getProductBySlug } from '../data/products'
const RECENT_KEY = 'zivaro_recently_viewed'
const readRecent = () => { try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || [] } catch { return [] } }
const writeRecent = (ids) => localStorage.setItem(RECENT_KEY, JSON.stringify(ids.slice(0, 8)))
export const useProducts = ({ query = '', category = 'All', sort = 'featured', filters = {} } = {}) => {
  const [recentIds, setRecentIds] = useState(readRecent)
  const availableColors = useMemo(() => [...new Set(allProducts.flatMap((p) => p.availableColors.map((c) => c.name)))], [])
  const availableSizes = useMemo(() => [...new Set(allProducts.flatMap((p) => p.availableSizes))], [])
  const availableOccasions = useMemo(() => [...new Set(allProducts.map((p) => p.occasion))], [])
  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 2) return []
    return [...new Set(allProducts.flatMap((p) => [p.name, p.category, p.subCategory, p.fabric, p.occasion, p.color]).filter((value) => value.toLowerCase().includes(q)))].slice(0, 6)
  }, [query])
  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase()
    let result = allProducts.filter((p) => {
      const text = [p.name, p.sku, p.category, p.subCategory, p.brand, p.description, p.fabric, p.fit, p.sleeve, p.neck, p.pattern, p.occasion, p.color].join(' ').toLowerCase()
      const priceRange = filters.price ? priceRanges.find((range) => range.label === filters.price) : null
      return (!q || text.includes(q)) && (category === 'All' || p.category === category) && (!priceRange || (p.price >= priceRange.min && p.price <= priceRange.max)) && (!filters.rating || p.rating >= Number(filters.rating)) && (!filters.discount || p.discount >= Number(filters.discount)) && (!filters.size || p.availableSizes.includes(filters.size)) && (!filters.color || p.availableColors.some((c) => c.name === filters.color)) && (!filters.availability || p.stock > 0) && (!filters.occasion || p.occasion === filters.occasion)
    })
    const weight = (p) => Number(p.isFeatured) * 4 + Number(p.isBestSeller) * 3 + Number(p.isTrending) * 2 + Number(p.isNewArrival)
    return [...result].sort((a, b) => sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : sort === 'rating' ? b.rating - a.rating : sort === 'discount' ? b.discount - a.discount : sort === 'newest' ? Number(b.isNewArrival) - Number(a.isNewArrival) : sort === 'best-sellers' ? Number(b.isBestSeller) - Number(a.isBestSeller) : weight(b) - weight(a))
  }, [query, category, sort, filters])
  const getRelatedProducts = useCallback((product, limit = 4) => allProducts.filter((p) => p.id !== product.id && (p.category === product.category || p.occasion === product.occasion)).slice(0, limit), [])
  const addRecentlyViewed = useCallback((id) => { setRecentIds((current) => { const next = [id, ...current.filter((item) => item !== id)].slice(0, 8); writeRecent(next); return next }) }, [])
  const recentlyViewed = useMemo(() => recentIds.map((id) => allProducts.find((p) => p.id === id)).filter(Boolean), [recentIds])
  return { products: allProducts, filteredProducts, suggestions, categories, priceRanges, availableColors, availableSizes, availableOccasions, formatPrice, getProductBySlug, getRelatedProducts, addRecentlyViewed, recentlyViewed }
}
