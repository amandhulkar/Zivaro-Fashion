import { wishlistService } from '../services/wishlist.service.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../middleware/asyncHandler.middleware.js'

export const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await wishlistService.getWishlist(req.headers['x-session-id'])
  res.status(200).json(new ApiResponse(200, wishlist, 'Wishlist fetched successfully'))
})

export const addWishlistItem = asyncHandler(async (req, res) => {
  const wishlist = await wishlistService.addItem(req.headers['x-session-id'], req.body.productId)
  res.status(200).json(new ApiResponse(200, wishlist, 'Wishlist item added successfully'))
})

export const removeWishlistItem = asyncHandler(async (req, res) => {
  const wishlist = await wishlistService.removeItem(req.headers['x-session-id'], req.params.productId)
  res.status(200).json(new ApiResponse(200, wishlist, 'Wishlist item removed successfully'))
})
