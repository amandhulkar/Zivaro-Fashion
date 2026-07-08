import mongoose from 'mongoose'
import { PRODUCT_STATUS } from '../constants/product.constants.js'
import { slugify } from '../utils/slugify.js'

const imageSchema = new mongoose.Schema({ url: String, publicId: String, alt: String }, { _id: false })
const colorSchema = new mongoose.Schema({ name: String, hex: String }, { _id: false })

const productSchema = new mongoose.Schema({
  sku: { type: String, required: true, trim: true, uppercase: true, unique: true, index: true },
  slug: { type: String, unique: true, lowercase: true, trim: true, index: true },
  title: { type: String, required: true, trim: true, maxlength: 180 },
  name: { type: String, trim: true, maxlength: 180 },
  description: { type: String, required: true, trim: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', index: true },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', index: true },
  brand: { type: String, trim: true, index: true },
  fabric: { type: String, trim: true, index: true },
  sleeve: { type: String, trim: true },
  neck: { type: String, trim: true },
  pattern: { type: String, trim: true, index: true },
  occasion: { type: String, trim: true, index: true },
  purchasePrice: { type: Number, min: 0, default: 0 },
  sellingPrice: { type: Number, min: 0 },
  price: { type: Number, required: true, min: 0, index: true },
  originalPrice: { type: Number, min: 0 },
  discount: { type: Number, min: 0, max: 100, default: 0 },
  profit: { type: Number, default: 0 },
  gstPercent: { type: Number, min: 0, max: 100, default: 18 },
  stock: { type: Number, min: 0, default: 0, index: true },
  stockQuantity: { type: Number, min: 0, default: 0 },
  minimumStockAlert: { type: Number, min: 0, default: 5 },
  images: [imageSchema],
  thumbnail: imageSchema,
  sizes: [{ type: String, trim: true }],
  colors: [colorSchema],
  ratings: { type: Number, min: 0, max: 5, default: 0, index: true },
  reviewsCount: { type: Number, min: 0, default: 0 },
  featured: { type: Boolean, default: false, index: true },
  trending: { type: Boolean, default: false, index: true },
  bestSeller: { type: Boolean, default: false, index: true },
  newArrival: { type: Boolean, default: false, index: true },
  status: { type: String, enum: PRODUCT_STATUS, default: 'active', index: true },
}, { timestamps: true })

productSchema.index({ title: 'text', name: 'text', description: 'text', brand: 'text', sku: 'text' })
productSchema.index({ category: 1, status: 1 })
productSchema.index({ createdAt: -1 })

productSchema.pre('validate', function normalizeProduct() {
  if (!this.title && this.name) this.title = this.name
  if (!this.name && this.title) this.name = this.title
  if (!this.price && this.sellingPrice) this.price = this.sellingPrice
  if (!this.sellingPrice && this.price) this.sellingPrice = this.price
  if (this.stockQuantity === 0 && this.stock) this.stockQuantity = this.stock
  if (!this.slug && this.title) this.slug = slugify(this.title)
  this.profit = (this.sellingPrice || this.price || 0) - (this.purchasePrice || 0)
})

export const Product = mongoose.model('Product', productSchema)
