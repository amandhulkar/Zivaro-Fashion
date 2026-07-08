import crypto from 'crypto'

import jwt from 'jsonwebtoken'

import { env } from '../config/env.js'
import { ROLES } from '../constants/roles.constants.js'
import { userRepository } from '../repositories/user.repository.js'
import { ApiError } from '../utils/ApiError.js'

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex')

const signAccessToken = (user) => jwt.sign({ id: user._id, role: user.role }, env.jwtSecret, { expiresIn: env.jwtExpiresIn })
const signRefreshToken = (user) => jwt.sign({ id: user._id, type: 'refresh' }, env.jwtRefreshSecret, { expiresIn: env.jwtRefreshExpiresIn })

const safeUser = (user) => user.toSafeObject?.() || {
  _id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  name: user.name,
  email: user.email,
  phone: user.phone,
  profileImage: user.profileImage,
  role: user.role,
  address: user.address,
  city: user.city,
  state: user.state,
  country: user.country,
  pincode: user.pincode,
  status: user.status,
  isActive: user.isActive,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
}

const setAuthCookies = (res, { accessToken, refreshToken }) => {
  const baseOptions = {
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: env.cookieSameSite,
    path: '/',
  }

  res.cookie('accessToken', accessToken, { ...baseOptions, maxAge: env.accessCookieMaxAge })
  res.cookie('refreshToken', refreshToken, { ...baseOptions, maxAge: env.refreshCookieMaxAge })
}

const clearAuthCookies = (res) => {
  const options = {
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: env.cookieSameSite,
    path: '/',
  }

  res.clearCookie('accessToken', options)
  res.clearCookie('refreshToken', options)
}

const issueTokens = async (user, res) => {
  const accessToken = signAccessToken(user)
  const refreshToken = signRefreshToken(user)

  user.refreshToken = hashToken(refreshToken)
  await user.save({ validateBeforeSave: false })
  setAuthCookies(res, { accessToken, refreshToken })

  return { accessToken, refreshToken }
}

const ensureActive = (user) => {
  if (!user || !user.isActive || user.status !== 'active') {
    throw new ApiError(403, 'Your account is inactive. Please contact support.')
  }
}

export const authService = {
  async register(payload, res) {
    const existingUser = await userRepository.findByEmail(payload.email)
    if (existingUser) throw new ApiError(409, 'Email is already registered')

    const user = await userRepository.create({
      firstName: payload.firstName,
      lastName: payload.lastName,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      password: payload.password,
      role: ROLES.CUSTOMER,
    })

    await issueTokens(user, res)
    return safeUser(user)
  },

  async login({ email, password }, res) {
    const user = await userRepository.findByEmailWithPassword(email)
    if (!user || !(await user.comparePassword(password))) {
      throw new ApiError(401, 'Invalid email or password')
    }

    ensureActive(user)
    user.lastLoginAt = new Date()
    await issueTokens(user, res)
    return safeUser(user)
  },

  async logout(userId, res) {
    if (userId) {
      const user = await userRepository.findByIdWithSecrets(userId)
      if (user) {
        user.refreshToken = undefined
        await user.save({ validateBeforeSave: false })
      }
    }

    clearAuthCookies(res)
  },

  async refreshToken(token, res) {
    if (!token) throw new ApiError(401, 'Refresh token missing')

    let decoded
    try {
      decoded = jwt.verify(token, env.jwtRefreshSecret)
    } catch (_error) {
      throw new ApiError(401, 'Refresh token expired or invalid')
    }

    const user = await userRepository.findByIdWithSecrets(decoded.id)
    if (!user) throw new ApiError(401, 'Refresh token expired or invalid')
    ensureActive(user)

    if (user.refreshToken !== hashToken(token)) {
      throw new ApiError(401, 'Refresh token expired or invalid')
    }

    await issueTokens(user, res)
    return safeUser(user)
  },

  getMe(user) {
    return safeUser(user)
  },

  async updateProfile(userId, payload) {
    const user = await userRepository.findById(userId)
    if (!user) throw new ApiError(404, 'User not found')

    const allowedFields = ['firstName', 'lastName', 'name', 'phone', 'address', 'city', 'state', 'country', 'pincode']
    for (const field of allowedFields) {
      if (payload[field] !== undefined) user[field] = payload[field]
    }

    await user.save()
    return safeUser(user)
  },

  async changePassword(userId, { currentPassword, newPassword }, res) {
    const user = await userRepository.findByIdWithSecrets(userId)
    if (!user || !(await user.comparePassword(currentPassword))) {
      throw new ApiError(401, 'Current password is incorrect')
    }

    user.password = newPassword
    user.refreshToken = undefined
    await user.save()
    await issueTokens(user, res)
    return safeUser(user)
  },

  async forgotPassword(email) {
    const user = await userRepository.findByEmail(email)
    if (!user) return null

    const resetToken = user.createPasswordResetToken()
    await user.save({ validateBeforeSave: false })

    return env.nodeEnv === 'development' ? resetToken : null
  },

  async resetPassword(token, password, res) {
    const hashedToken = hashToken(token)
    const user = await userRepository.findByResetToken(hashedToken)
    if (!user) throw new ApiError(400, 'Password reset token is invalid or has expired')

    user.password = password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    user.refreshToken = undefined
    await user.save()
    await issueTokens(user, res)

    return safeUser(user)
  },

  clearAuthCookies,
}
