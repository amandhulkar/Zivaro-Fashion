import { authService } from '../services/auth.service.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../middleware/asyncHandler.middleware.js'

export const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body, res)
  res.status(201).json(new ApiResponse(201, { user }, 'Account created successfully'))
})

export const login = asyncHandler(async (req, res) => {
  const user = await authService.login(req.body, res)
  res.status(200).json(new ApiResponse(200, { user }, 'Logged in successfully'))
})

export const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.user?._id, res)
  res.status(200).json(new ApiResponse(200, null, 'Logged out successfully'))
})

export const refreshToken = asyncHandler(async (req, res) => {
  const user = await authService.refreshToken(req.cookies?.refreshToken, res)
  res.status(200).json(new ApiResponse(200, { user }, 'Token refreshed successfully'))
})

export const forgotPassword = asyncHandler(async (req, res) => {
  const resetToken = await authService.forgotPassword(req.body.email)
  const data = resetToken ? { resetToken } : null
  res.status(200).json(new ApiResponse(200, data, 'If an account exists, password reset instructions have been sent'))
})

export const resetPassword = asyncHandler(async (req, res) => {
  const user = await authService.resetPassword(req.params.token, req.body.password, res)
  res.status(200).json(new ApiResponse(200, { user }, 'Password reset successfully'))
})

export const getMe = asyncHandler(async (req, res) => {
  const user = authService.getMe(req.user)
  res.status(200).json(new ApiResponse(200, { user }, 'Current user fetched successfully'))
})

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await authService.updateProfile(req.user._id, req.body)
  res.status(200).json(new ApiResponse(200, { user }, 'Profile updated successfully'))
})

export const changePassword = asyncHandler(async (req, res) => {
  const user = await authService.changePassword(req.user._id, req.body, res)
  res.status(200).json(new ApiResponse(200, { user }, 'Password changed successfully'))
})
