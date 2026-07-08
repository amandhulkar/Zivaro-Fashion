import { body } from 'express-validator'
import { idParam } from './common.validator.js'

export const createCategoryValidators = [
  body('name').isString().trim().notEmpty().withMessage('Name is required'),
  body('description').optional().isString().trim(),
  body('status').optional().isIn(['active', 'inactive']).withMessage('Invalid category status'),
]

export const updateCategoryValidators = [
  idParam(),
  body('name').optional().isString().trim().notEmpty(),
  body('description').optional().isString().trim(),
  body('status').optional().isIn(['active', 'inactive']),
]

export const categoryIdValidators = [idParam()]
