import { Router } from 'express'
import { addCartItem, deleteCartItem, getCart, updateCartItem } from '../controllers/cart.controller.js'
import { validate } from '../middleware/validate.middleware.js'
import { addCartValidators, cartSessionValidators, deleteCartValidators, updateCartValidators } from '../validators/cart.validator.js'

const router = Router()

router.get('/', cartSessionValidators, validate, getCart)
router.post('/', addCartValidators, validate, addCartItem)
router.patch('/:itemId', updateCartValidators, validate, updateCartItem)
router.delete('/:itemId', deleteCartValidators, validate, deleteCartItem)

export default router
