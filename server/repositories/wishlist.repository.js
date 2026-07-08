import { Wishlist } from '../models/Wishlist.model.js'

export const wishlistRepository = {
  findBySession: (sessionId) => Wishlist.findOne({ sessionId }).populate('items.product', 'title slug price thumbnail stock status'),
  create: (payload) => Wishlist.create(payload),
}
