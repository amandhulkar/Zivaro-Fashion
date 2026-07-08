import { reviewService } from '../services/review.service.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../middleware/asyncHandler.middleware.js'

export const getReviews = asyncHandler(async (req, res) => {
  const reviews = await reviewService.getReviews(req.params.productId)
  res.status(200).json(new ApiResponse(200, reviews, 'Reviews fetched successfully'))
})

export const addReview = asyncHandler(async (req, res) => {
  const review = await reviewService.addReview(req.body)
  res.status(201).json(new ApiResponse(201, review, 'Review added successfully'))
})

export const deleteReview = asyncHandler(async (req, res) => {
  await reviewService.deleteReview(req.params.id)
  res.status(200).json(new ApiResponse(200, null, 'Review deleted successfully'))
})
