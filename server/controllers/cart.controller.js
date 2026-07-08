import { cartService } from '../services/cart.service.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../middleware/asyncHandler.middleware.js'

export const getCart = asyncHandler(async (req, res) => {
  const cart = await cartService.getCart(req.headers['x-session-id'])
  res.status(200).json(new ApiResponse(200, cart, 'Cart fetched successfully'))
})

export const addCartItem = asyncHandler(async (req, res) => {
  const cart = await cartService.addItem(req.headers['x-session-id'], req.body)
  res.status(200).json(new ApiResponse(200, cart, 'Cart item added successfully'))
})

export const updateCartItem = asyncHandler(async (req, res) => {
  const cart = await cartService.updateItem(req.headers['x-session-id'], req.params.itemId, req.body.quantity)
  res.status(200).json(new ApiResponse(200, cart, 'Cart item updated successfully'))
})

export const deleteCartItem = asyncHandler(async (req, res) => {
  const cart = await cartService.removeItem(req.headers['x-session-id'], req.params.itemId)
  res.status(200).json(new ApiResponse(200, cart, 'Cart item removed successfully'))
})
