import mongoose from 'mongoose'

const inventoryMovementSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
  sku: { type: String, trim: true, uppercase: true, index: true },
  type: { type: String, enum: ['increase', 'decrease', 'adjustment', 'sale', 'return', 'damage', 'manual'], required: true, index: true },
  quantity: { type: Number, required: true },
  previousStock: { type: Number, required: true, min: 0 },
  newStock: { type: Number, required: true, min: 0 },
  reason: { type: String, trim: true },
  referenceType: { type: String, enum: ['order', 'admin', 'supplier', 'system'], default: 'admin' },
  referenceId: mongoose.Schema.Types.ObjectId,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

inventoryMovementSchema.index({ createdAt: -1 })
inventoryMovementSchema.index({ product: 1, createdAt: -1 })

export const InventoryMovement = mongoose.model('InventoryMovement', inventoryMovementSchema)
