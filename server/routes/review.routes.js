import { Router } from 'express'
import { addReview, deleteReview, getReviews } from '../controllers/review.controller.js'
import { validate } from '../middleware/validate.middleware.js'
import { createReviewValidators, productReviewValidators, reviewIdValidators } from '../validators/review.validator.js'

const router = Router()

router.post('/', createReviewValidators, validate, addReview)
router.get('/product/:productId', productReviewValidators, validate, getReviews)
router.delete('/:id', reviewIdValidators, validate, deleteReview)

export default router
