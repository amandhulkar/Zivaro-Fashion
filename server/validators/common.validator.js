import { body, header, param, query } from 'express-validator'
import mongoose from 'mongoose'

export const isObjectId = (value) => mongoose.Types.ObjectId.isValid(value)
export const idParam = (name = 'id') => param(name).custom(isObjectId).withMessage('Invalid resource identifier')
export const productIdBody = body('productId').custom(isObjectId).withMessage('Invalid product identifier')
export const sessionHeader = header('x-session-id').isString().trim().isLength({ min: 6, max: 120 }).withMessage('x-session-id header is required')
export const paginationValidators = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
]
