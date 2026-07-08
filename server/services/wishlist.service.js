import { Product } from '../models/Product.model.js'
import { wishlistRepository } from '../repositories/wishlist.repository.js'
import { ApiError } from '../utils/ApiError.js'

const getOrCreateWishlist = async (sessionId) => {
  let wishlist = await wishlistRepository.findBySession(sessionId)
  if (!wishlist) wishlist = await wishlistRepository.create({ sessionId, items: [] })
  return wishlist
}

export const wishlistService = {
  getWishlist(sessionId) {
    return getOrCreateWishlist(sessionId)
  },

  async addItem(sessionId, productId) {
    const wishlist = await getOrCreateWishlist(sessionId)
    const product = await Product.findById(productId).lean()
    if (!product || product.status !== 'active') throw new ApiError(404, 'Product not found')

    const exists = wishlist.items.some((item) => item.product._id?.toString?.() === productId || item.product.toString() === productId)
    if (!exists) wishlist.items.push({ product: productId })

    await wishlist.save()
    return wishlist.populate('items.product', 'title slug price thumbnail stock status')
  },

  async removeItem(sessionId, productId) {
    const wishlist = await getOrCreateWishlist(sessionId)
    wishlist.items = wishlist.items.filter((item) => item.product._id?.toString?.() !== productId && item.product.toString() !== productId)
    await wishlist.save()
    return wishlist.populate('items.product', 'title slug price thumbnail stock status')
  },
}
