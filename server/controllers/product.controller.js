import { productService } from '../services/product.service.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../middleware/asyncHandler.middleware.js'

export const getProducts = asyncHandler(async (req, res) => {
  const result = await productService.getProducts(req.query)
  res.status(200).json(new ApiResponse(200, result.data, 'Products fetched successfully', result.meta))
})

export const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await productService.getProductBySlug(req.params.slug)
  res.status(200).json(new ApiResponse(200, product, 'Product fetched successfully'))
})

export const createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body)
  res.status(201).json(new ApiResponse(201, product, 'Product created successfully'))
})

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body)
  res.status(200).json(new ApiResponse(200, product, 'Product updated successfully'))
})

export const deleteProduct = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id)
  res.status(200).json(new ApiResponse(200, null, 'Product deleted successfully'))
})
