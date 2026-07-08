import { query } from 'express-validator'
import { paginationValidators } from './common.validator.js'

export const searchValidators = [
  query('q').isString().trim().isLength({ min: 1, max: 120 }).withMessage('Search keyword is required'),
  ...paginationValidators,
]
