import mongoose from 'mongoose'
import { ORDER_STATUS, PAYMENT_STATUS } from '../constants/order.constants.js'

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  title: String,
  sku: String,
  quantity: Number,
  price: Number,
  image: String,
}, { _id: false })

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true, sparse: true, index: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  items: [orderItemSchema],
  subtotal: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  shippingFee: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  status: { type: String, enum: ORDER_STATUS, default: 'pending', index: true },
  paymentStatus: { type: String, enum: PAYMENT_STATUS, default: 'unpaid', index: true },
}, { timestamps: true })

export const Order = mongoose.model('Order', orderSchema)
