import { Product } from '../models/Product.model.js'
import { reviewRepository } from '../repositories/review.repository.js'
import { ApiError } from '../utils/ApiError.js'

const recalculateProductRating = async (productId) => {
  const [stats] = await reviewRepository.aggregateRatings(productId)
  await Product.findByIdAndUpdate(productId, {
    ratings: stats ? Number(stats.average.toFixed(1)) : 0,
    reviewsCount: stats?.count || 0,
  })
}

export const reviewService = {
  getReviews(productId) {
    return reviewRepository.findByProduct(productId)
  },

  async addReview(payload) {
    const product = await Product.findById(payload.productId)
    if (!product) throw new ApiError(404, 'Product not found')

    const review = await reviewRepository.create({ ...payload, product: payload.productId })
    await recalculateProductRating(product._id)
    return review
  },

  async deleteReview(id) {
    const review = await reviewRepository.delete(id)
    if (!review) throw new ApiError(404, 'Review not found')
    await recalculateProductRating(review.product)
    return review
  },
}
