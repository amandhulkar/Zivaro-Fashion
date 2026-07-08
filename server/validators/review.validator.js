import { body, param } from 'express-validator'
import { idParam } from './common.validator.js'

export const createReviewValidators = [
  body('productId').isMongoId().withMessage('Valid product is required'),
  body('guestName').optional().isString().trim().isLength({ min: 2, max: 120 }),
  body('guestEmail').optional().isEmail().normalizeEmail(),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').isString().trim().isLength({ min: 3, max: 2000 }).withMessage('Comment is required'),
  body('title').optional().isString().trim().isLength({ max: 160 }),
]

export const productReviewValidators = [param('productId').isMongoId().withMessage('Invalid product identifier')]
export const reviewIdValidators = [idParam()]
