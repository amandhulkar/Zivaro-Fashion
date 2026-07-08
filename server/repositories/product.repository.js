import { Product } from '../models/Product.model.js'

export const productRepository = {
  find: (filter, options) => Product.find(filter).sort(options.sort).skip(options.skip).limit(options.limit).populate('category', 'name slug').lean(),
  count: (filter) => Product.countDocuments(filter),
  findById: (id) => Product.findById(id).populate('category', 'name slug'),
  findBySlug: (slug) => Product.findOne({ slug }).populate('category', 'name slug').lean(),
  create: (payload) => Product.create(payload),
  update: (id, payload) => Product.findByIdAndUpdate(id, payload, { new: true, runValidators: true }),
  delete: (id) => Product.findByIdAndDelete(id),
}
