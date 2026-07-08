import { param } from 'express-validator'
import { productIdBody, sessionHeader } from './common.validator.js'

export const wishlistSessionValidators = [sessionHeader]
export const addWishlistValidators = [sessionHeader, productIdBody]
export const removeWishlistValidators = [sessionHeader, param('productId').isMongoId().withMessage('Invalid product identifier')]
