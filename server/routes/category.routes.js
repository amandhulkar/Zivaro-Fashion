import { Router } from 'express'
import { createCategory, deleteCategory, getCategories, updateCategory } from '../controllers/category.controller.js'
import { ROLES } from '../constants/roles.constants.js'
import { authorize, protect } from '../middleware/auth.middleware.js'
import { validate } from '../middleware/validate.middleware.js'
import { categoryIdValidators, createCategoryValidators, updateCategoryValidators } from '../validators/category.validator.js'

const router = Router()

router.get('/', getCategories)
router.post('/', protect, authorize(ROLES.ADMIN), createCategoryValidators, validate, createCategory)
router.put('/:id', protect, authorize(ROLES.ADMIN), updateCategoryValidators, validate, updateCategory)
router.delete('/:id', protect, authorize(ROLES.ADMIN), categoryIdValidators, validate, deleteCategory)

export default router
