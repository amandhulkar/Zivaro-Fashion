import crypto from 'crypto'

import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

import { ROLES, USER_ROLES } from '../constants/roles.constants.js'

const imageSchema = new mongoose.Schema({ url: String, publicId: String, alt: String }, { _id: false })

const userSchema = new mongoose.Schema({
  firstName: { type: String, trim: true, maxlength: 60 },
  lastName: { type: String, trim: true, maxlength: 60 },
  name: { type: String, trim: true, maxlength: 120 },
  email: { type: String, required: true, lowercase: true, trim: true, unique: true, index: true },
  phone: { type: String, trim: true },
  password: { type: String, required: true, select: false },
  profileImage: imageSchema,
  role: { type: String, enum: USER_ROLES, default: ROLES.CUSTOMER, index: true },
  address: { type: String, trim: true },
  city: { type: String, trim: true },
  state: { type: String, trim: true },
  country: { type: String, trim: true },
  pincode: { type: String, trim: true },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wishlist' }],
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  status: { type: String, enum: ['active', 'inactive', 'blocked'], default: 'active', index: true },
  isActive: { type: Boolean, default: true, index: true },
  refreshToken: { type: String, select: false },
  passwordResetToken: { type: String, select: false },
  passwordResetExpires: { type: Date, select: false },
  passwordChangedAt: Date,
  lastLoginAt: Date,
}, { timestamps: true })

userSchema.pre('validate', function syncName() {
  if (!this.name && (this.firstName || this.lastName)) {
    this.name = [this.firstName, this.lastName].filter(Boolean).join(' ')
  }

  if (this.name && (!this.firstName || !this.lastName)) {
    const [firstName, ...rest] = this.name.split(' ')
    this.firstName = this.firstName || firstName
    this.lastName = this.lastName || rest.join(' ')
  }
})

userSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password') || !this.password) return
  this.password = await bcrypt.hash(this.password, 12)
  this.passwordChangedAt = this.isNew ? undefined : new Date(Date.now() - 1000)
})

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

userSchema.methods.createPasswordResetToken = function createPasswordResetToken() {
  const resetToken = crypto.randomBytes(32).toString('hex')
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000
  return resetToken
}

userSchema.methods.changedPasswordAfter = function changedPasswordAfter(jwtTimestamp) {
  if (!this.passwordChangedAt) return false
  return Math.floor(this.passwordChangedAt.getTime() / 1000) > jwtTimestamp
}

userSchema.methods.toSafeObject = function toSafeObject() {
  return {
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    name: this.name,
    email: this.email,
    phone: this.phone,
    profileImage: this.profileImage,
    role: this.role,
    address: this.address,
    city: this.city,
    state: this.state,
    country: this.country,
    pincode: this.pincode,
    status: this.status,
    isActive: this.isActive,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  }
}

export const User = mongoose.model('User', userSchema)
