import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({ url: String, publicId: String, alt: String }, { _id: false })

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  subtitle: { type: String, trim: true },
  image: imageSchema,
  ctaText: String,
  ctaUrl: String,
  placement: { type: String, enum: ['home-hero', 'home-secondary', 'category', 'promo'], default: 'home-hero', index: true },
  sortOrder: { type: Number, default: 0 },
  startsAt: Date,
  endsAt: Date,
  isActive: { type: Boolean, default: true, index: true },
}, { timestamps: true })

bannerSchema.index({ placement: 1, isActive: 1, sortOrder: 1 })

export const Banner = mongoose.model('Banner', bannerSchema)
