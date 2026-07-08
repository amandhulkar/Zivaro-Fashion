import mongoose from 'mongoose'
import { slugify } from '../utils/slugify.js'

const imageSchema = new mongoose.Schema({ url: String, publicId: String, alt: String }, { _id: false })

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  slug: { type: String, unique: true, lowercase: true, trim: true, index: true },
  image: imageSchema,
  description: { type: String, trim: true, maxlength: 1000 },
  status: { type: String, enum: ['active', 'inactive'], default: 'active', index: true },
}, { timestamps: true })

categorySchema.pre('validate', function setSlug(next) {
  if (!this.slug && this.name) this.slug = slugify(this.name)
  next()
})

export const Category = mongoose.model('Category', categorySchema)
