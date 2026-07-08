import { body, query } from 'express-validator'
import { SORT_OPTIONS } from '../constants/product.constants.js'
import { idParam, paginationValidators } from './common.validator.js'

export const productListValidators = [
  ...paginationValidators,
  query('sort').optional().isIn(SORT_OPTIONS).withMessage('Invalid sort option'),
  query('minPrice').optional().isFloat({ min: 0 }).withMessage('Minimum price must be positive'),
  query('maxPrice').optional().isFloat({ min: 0 }).withMessage('Maximum price must be positive'),
]

export const createProductValidators = [
  body('sku').isString().trim().notEmpty().withMessage('SKU is required'),
  body('title').isString().trim().notEmpty().withMessage('Title is required'),
  body('description').isString().trim().notEmpty().withMessage('Description is required'),
  body('category').isMongoId().withMessage('Valid category is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be greater than or equal to 0'),
  body('originalPrice').optional().isFloat({ min: 0 }),
  body('discount').optional().isFloat({ min: 0, max: 100 }),
  body('stock').optional().isInt({ min: 0 }),
]

export const updateProductValidators = [idParam(), ...createProductValidators.map((validator) => validator.optional?.() || validator)]
export const productIdValidators = [idParam()]
