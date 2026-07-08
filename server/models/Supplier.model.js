import mongoose from 'mongoose'

const purchaseHistorySchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, min: 0 },
  purchasePrice: { type: Number, min: 0 },
  purchasedAt: { type: Date, default: Date.now },
  note: String,
}, { _id: false })

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, index: true },
  phone: { type: String, trim: true },
  email: { type: String, trim: true, lowercase: true },
  address: { type: String, trim: true },
  gstNumber: { type: String, trim: true, uppercase: true },
  productsSupplied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  purchaseHistory: [purchaseHistorySchema],
  status: { type: String, enum: ['active', 'inactive'], default: 'active', index: true },
}, { timestamps: true })

supplierSchema.index({ name: 'text', email: 'text', phone: 'text', gstNumber: 'text' })

export const Supplier = mongoose.model('Supplier', supplierSchema)
