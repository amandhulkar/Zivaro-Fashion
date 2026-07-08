import { Router } from 'express'
import { createProduct, deleteProduct, getProductBySlug, getProducts, updateProduct } from '../controllers/product.controller.js'
import { ROLES } from '../constants/roles.constants.js'
import { authorize, protect } from '../middleware/auth.middleware.js'
import { validate } from '../middleware/validate.middleware.js'
import { createProductValidators, productListValidators, productIdValidators, updateProductValidators } from '../validators/product.validator.js'

const router = Router()

router.get('/', productListValidators, validate, getProducts)
router.get('/slug/:slug', getProductBySlug)
router.post('/', protect, authorize(ROLES.ADMIN), createProductValidators, validate, createProduct)
router.put('/:id', protect, authorize(ROLES.ADMIN), updateProductValidators, validate, updateProduct)
router.delete('/:id', protect, authorize(ROLES.ADMIN), productIdValidators, validate, deleteProduct)

export default router
