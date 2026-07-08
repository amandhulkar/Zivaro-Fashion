import { Product } from '../models/Product.model.js'
import { cartRepository } from '../repositories/cart.repository.js'
import { ApiError } from '../utils/ApiError.js'

const calculateSubtotal = (items) => items.reduce((total, item) => total + item.priceSnapshot * item.quantity, 0)

const getOrCreateCart = async (sessionId) => {
  let cart = await cartRepository.findBySession(sessionId)
  if (!cart) {
    cart = await cartRepository.create({
      sessionId,
      items: [],
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    })
  }
  return cart
}

export const cartService = {
  getCart(sessionId) {
    return getOrCreateCart(sessionId)
  },

  async addItem(sessionId, payload) {
    const cart = await getOrCreateCart(sessionId)
    const product = await Product.findById(payload.productId).lean()
    if (!product || product.status !== 'active') throw new ApiError(404, 'Product not found')
    if (product.stock < payload.quantity) throw new ApiError(400, 'Requested quantity exceeds available stock')

    const existingItem = cart.items.find((item) => item.product._id?.toString?.() === payload.productId || item.product.toString() === payload.productId)

    if (existingItem) {
      existingItem.quantity += Number(payload.quantity)
    } else {
      cart.items.push({
        product: product._id,
        quantity: Number(payload.quantity),
        size: payload.size,
        color: payload.color,
        priceSnapshot: product.price,
        titleSnapshot: product.title,
        imageSnapshot: product.thumbnail?.url,
      })
    }

    cart.subtotal = calculateSubtotal(cart.items)
    await cart.save()
    return cart.populate('items.product', 'title slug price thumbnail stock status')
  },

  async updateItem(sessionId, itemId, quantity) {
    const cart = await getOrCreateCart(sessionId)
    const item = cart.items.id(itemId)
    if (!item) throw new ApiError(404, 'Cart item not found')
    item.quantity = Number(quantity)
    cart.subtotal = calculateSubtotal(cart.items)
    await cart.save()
    return cart.populate('items.product', 'title slug price thumbnail stock status')
  },

  async removeItem(sessionId, itemId) {
    const cart = await getOrCreateCart(sessionId)
    const item = cart.items.id(itemId)
    if (!item) throw new ApiError(404, 'Cart item not found')
    item.deleteOne()
    cart.subtotal = calculateSubtotal(cart.items)
    await cart.save()
    return cart.populate('items.product', 'title slug price thumbnail stock status')
  },
}
