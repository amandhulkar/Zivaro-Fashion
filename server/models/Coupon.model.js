import mongoose from 'mongoose'

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, uppercase: true, trim: true, unique: true, index: true },
  description: { type: String, trim: true },
  discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
  discountValue: { type: Number, required: true, min: 0 },
  minOrderAmount: { type: Number, default: 0, min: 0 },
  maxDiscountAmount: { type: Number, min: 0 },
  startsAt: Date,
  expiresAt: Date,
  usageLimit: Number,
  usedCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true, index: true },
}, { timestamps: true })

export const Coupon = mongoose.model('Coupon', couponSchema)
