import mongoose from 'mongoose'

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1, max: 99 },
  size: { type: String, trim: true },
  color: { type: String, trim: true },
  priceSnapshot: { type: Number, min: 0, required: true },
  titleSnapshot: { type: String, required: true },
  imageSnapshot: String,
}, { timestamps: true })

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null, index: true },
  sessionId: { type: String, trim: true, index: true },
  items: [cartItemSchema],
  subtotal: { type: Number, min: 0, default: 0 },
  expiresAt: { type: Date, index: { expireAfterSeconds: 0 } },
}, { timestamps: true })

cartSchema.index({ sessionId: 1, user: 1 })

export const Cart = mongoose.model('Cart', cartSchema)
