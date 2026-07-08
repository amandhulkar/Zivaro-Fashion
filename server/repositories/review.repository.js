import { Review } from '../models/Review.model.js'

export const reviewRepository = {
  findByProduct: (productId) => Review.find({ product: productId, isApproved: true }).sort({ createdAt: -1 }).lean(),
  create: (payload) => Review.create(payload),
  delete: (id) => Review.findByIdAndDelete(id),
  aggregateRatings: (productId) => Review.aggregate([
    { $match: { product: productId, isApproved: true } },
    { $group: { _id: '$product', average: { $avg: '$rating' }, count: { $sum: 1 } } },
  ]),
}
