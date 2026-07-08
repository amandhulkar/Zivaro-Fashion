import { body, param } from 'express-validator'
import { sessionHeader } from './common.validator.js'

export const cartSessionValidators = [sessionHeader]
export const addCartValidators = [
  sessionHeader,
  body('productId').isMongoId().withMessage('Valid product is required'),
  body('quantity').isInt({ min: 1, max: 99 }).withMessage('Quantity must be between 1 and 99'),
  body('size').optional().isString().trim(),
  body('color').optional().isString().trim(),
]
export const updateCartValidators = [
  sessionHeader,
  param('itemId').isMongoId().withMessage('Invalid cart item identifier'),
  body('quantity').isInt({ min: 1, max: 99 }).withMessage('Quantity must be between 1 and 99'),
]
export const deleteCartValidators = [sessionHeader, param('itemId').isMongoId().withMessage('Invalid cart item identifier')]
