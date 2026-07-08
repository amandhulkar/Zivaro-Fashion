import { Cart } from '../models/Cart.model.js'

export const cartRepository = {
  findBySession: (sessionId) => Cart.findOne({ sessionId }).populate('items.product', 'title slug price thumbnail stock status'),
  create: (payload) => Cart.create(payload),
}
