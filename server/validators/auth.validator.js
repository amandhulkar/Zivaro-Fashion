import { body, param } from 'express-validator'

const strongPassword = body('password')
  .isString()
  .trim()
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters')

const phoneValidator = body('phone')
  .optional({ checkFalsy: true })
  .trim()
  .matches(/^[+\d\s()-]{7,20}$/)
  .withMessage('Phone number is invalid')

export const registerValidators = [
  body('firstName').optional({ checkFalsy: true }).trim().isLength({ min: 2, max: 60 }).withMessage('First name must be between 2 and 60 characters'),
  body('lastName').optional({ checkFalsy: true }).trim().isLength({ max: 60 }).withMessage('Last name must be less than 60 characters'),
  body('name').optional({ checkFalsy: true }).trim().isLength({ min: 2, max: 120 }).withMessage('Name must be between 2 and 120 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  phoneValidator,
  strongPassword,
]

export const loginValidators = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isString().notEmpty().withMessage('Password is required'),
]

export const forgotPasswordValidators = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
]

export const resetPasswordValidators = [
  param('token').isString().isLength({ min: 20 }).withMessage('Reset token is invalid'),
  strongPassword,
]

export const updateProfileValidators = [
  body('firstName').optional({ checkFalsy: true }).trim().isLength({ min: 2, max: 60 }),
  body('lastName').optional({ checkFalsy: true }).trim().isLength({ max: 60 }),
  body('name').optional({ checkFalsy: true }).trim().isLength({ min: 2, max: 120 }),
  phoneValidator,
  body('address').optional({ checkFalsy: true }).trim().isLength({ max: 240 }),
  body('city').optional({ checkFalsy: true }).trim().isLength({ max: 80 }),
  body('state').optional({ checkFalsy: true }).trim().isLength({ max: 80 }),
  body('country').optional({ checkFalsy: true }).trim().isLength({ max: 80 }),
  body('pincode').optional({ checkFalsy: true }).trim().isLength({ max: 20 }),
]

export const changePasswordValidators = [
  body('currentPassword').isString().notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .isString()
    .trim()
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters'),
]
