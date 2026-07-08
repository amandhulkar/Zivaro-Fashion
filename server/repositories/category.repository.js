import { Category } from '../models/Category.model.js'

export const categoryRepository = {
  find: () => Category.find().sort({ createdAt: -1 }).lean(),
  findById: (id) => Category.findById(id),
  create: (payload) => Category.create(payload),
  update: (id, payload) => Category.findByIdAndUpdate(id, payload, { new: true, runValidators: true }),
  delete: (id) => Category.findByIdAndDelete(id),
}
