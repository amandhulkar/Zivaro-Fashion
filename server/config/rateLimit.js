import rateLimit from 'express-rate-limit'

import { env } from './env.js'

const rateLimitResponse = (message) => ({
  success: false,
  message,
  errors: [],
})

export const apiLimiter = rateLimit({
  windowMs: env.rateLimit.windowMs,
  max: env.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: rateLimitResponse('Too many requests, please try again later'),
})

export const authLimiter = env.nodeEnv === 'development'
  ? (_req, _res, next) => next()
  : rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: rateLimitResponse('Too many authentication attempts, please try again later'),
  })

export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: rateLimitResponse('Too many password reset attempts, please try again later'),
})
