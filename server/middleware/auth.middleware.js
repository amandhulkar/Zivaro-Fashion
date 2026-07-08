import jwt from 'jsonwebtoken'

import { env } from '../config/env.js'
import { User } from '../models/User.model.js'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from './asyncHandler.middleware.js'

const getTokenFromRequest = (req) => {
  if (req.cookies?.accessToken) return req.cookies.accessToken

  const authHeader = req.headers.authorization
  if (authHeader?.startsWith('Bearer ')) return authHeader.split(' ')[1]

  return null
}

export const protect = asyncHandler(async (req, _res, next) => {
  const token = getTokenFromRequest(req)
  if (!token) throw new ApiError(401, 'Authentication required')

  let decoded
  try {
    decoded = jwt.verify(token, env.jwtSecret)
  } catch (_error) {
    throw new ApiError(401, 'Authentication token expired or invalid')
  }

  const user = await User.findById(decoded.id)
  if (!user || !user.isActive || user.status !== 'active') {
    throw new ApiError(401, 'User no longer exists or is inactive')
  }

  if (user.changedPasswordAfter(decoded.iat)) {
    throw new ApiError(401, 'Password changed recently. Please log in again')
  }

  req.user = user
  next()
})

export const authorize = (...roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new ApiError(403, 'You do not have permission to perform this action'))
  }

  return next()
}
