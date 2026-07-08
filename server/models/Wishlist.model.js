import mongoose from 'mongoose'

const wishlistItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  addedAt: { type: Date, default: Date.now },
}, { _id: false })

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null, index: true },
  sessionId: { type: String, trim: true, index: true },
  items: [wishlistItemSchema],
}, { timestamps: true })

wishlistSchema.index({ sessionId: 1, user: 1 })

export const Wishlist = mongoose.model('Wishlist', wishlistSchema)
