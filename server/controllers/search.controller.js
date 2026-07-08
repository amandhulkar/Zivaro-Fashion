import { searchService } from '../services/search.service.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../middleware/asyncHandler.middleware.js'

export const searchProducts = asyncHandler(async (req, res) => {
  const result = await searchService.searchProducts(req.query)
  res.status(200).json(new ApiResponse(200, result.data, 'Search completed successfully', result.meta))
})
