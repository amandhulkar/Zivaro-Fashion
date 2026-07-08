import { Router } from 'express'
import { addWishlistItem, getWishlist, removeWishlistItem } from '../controllers/wishlist.controller.js'
import { validate } from '../middleware/validate.middleware.js'
import { addWishlistValidators, removeWishlistValidators, wishlistSessionValidators } from '../validators/wishlist.validator.js'

const router = Router()

router.get('/', wishlistSessionValidators, validate, getWishlist)
router.post('/', addWishlistValidators, validate, addWishlistItem)
router.delete('/:productId', removeWishlistValidators, validate, removeWishlistItem)

export default router
