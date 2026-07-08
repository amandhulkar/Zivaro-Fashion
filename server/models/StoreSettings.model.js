import mongoose from 'mongoose'

const socialLinksSchema = new mongoose.Schema({
  instagram: String,
  facebook: String,
  youtube: String,
  x: String,
  pinterest: String,
}, { _id: false })

const policySchema = new mongoose.Schema({
  returnPolicy: String,
  privacyPolicy: String,
  termsConditions: String,
}, { _id: false })

const storeSettingsSchema = new mongoose.Schema({
  key: { type: String, default: 'default', unique: true, index: true },
  storeName: { type: String, default: 'Zivaro Fashion' },
  storeLogo: { url: String, publicId: String, alt: String },
  contactEmail: String,
  contactPhone: String,
  address: String,
  socialLinks: socialLinksSchema,
  shippingCharges: { type: Number, default: 99, min: 0 },
  expressShippingCharges: { type: Number, default: 199, min: 0 },
  freeShippingLimit: { type: Number, default: 2999, min: 0 },
  gstPercentage: { type: Number, default: 18, min: 0, max: 100 },
  currency: { type: String, default: 'INR' },
  policies: policySchema,
}, { timestamps: true })

export const StoreSettings = mongoose.model('StoreSettings', storeSettingsSchema)
