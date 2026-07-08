import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({ url: String, publicId: String, alt: String }, { _id: false })

const reviewSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  guestName: { type: String, trim: true, maxlength: 120 },
  guestEmail: { type: String, trim: true, lowercase: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, trim: true, maxlength: 160 },
  comment: { type: String, required: true, trim: true, maxlength: 2000 },
  images: [imageSchema],
  isApproved: { type: Boolean, default: true, index: true },
}, { timestamps: true })

reviewSchema.index({ product: 1, createdAt: -1 })

export const Review = mongoose.model('Review', reviewSchema)
