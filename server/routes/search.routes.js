import { Router } from 'express'
import { searchProducts } from '../controllers/search.controller.js'
import { validate } from '../middleware/validate.middleware.js'
import { searchValidators } from '../validators/search.validator.js'

const router = Router()

router.get('/products', searchValidators, validate, searchProducts)

export default router
