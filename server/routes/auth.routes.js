import { Router } from 'express'

import { authLimiter, passwordResetLimiter } from '../config/rateLimit.js'
import { changePassword, forgotPassword, getMe, login, logout, refreshToken, register, resetPassword, updateProfile } from '../controllers/auth.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import { validate } from '../middleware/validate.middleware.js'
import { changePasswordValidators, forgotPasswordValidators, loginValidators, registerValidators, resetPasswordValidators, updateProfileValidators } from '../validators/auth.validator.js'

const router = Router()

router.post('/register', authLimiter, registerValidators, validate, register)
router.post('/login', authLimiter, loginValidators, validate, login)
router.post('/logout', logout)
router.post('/refresh-token', refreshToken)
router.post('/forgot-password', passwordResetLimiter, forgotPasswordValidators, validate, forgotPassword)
router.post('/reset-password/:token', passwordResetLimiter, resetPasswordValidators, validate, resetPassword)
router.get('/me', protect, getMe)
router.patch('/profile', protect, updateProfileValidators, validate, updateProfile)
router.patch('/change-password', protect, changePasswordValidators, validate, changePassword)

export default router
