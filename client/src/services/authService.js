import { api } from '../lib/api'

const unwrap = (response) => response.data.data

export const authService = {
  register: async (payload) => unwrap(await api.post('/auth/register', payload)),
  login: async (payload) => unwrap(await api.post('/auth/login', payload)),
  logout: async () => unwrap(await api.post('/auth/logout')),
  refreshToken: async () => unwrap(await api.post('/auth/refresh-token', undefined, { skipAuthRefresh: true })),
  getMe: async () => unwrap(await api.get('/auth/me', { skipAuthRefresh: true })),
  updateProfile: async (payload) => unwrap(await api.patch('/auth/profile', payload)),
  changePassword: async (payload) => unwrap(await api.patch('/auth/change-password', payload)),
  forgotPassword: async (email) => unwrap(await api.post('/auth/forgot-password', { email })),
  resetPassword: async (token, password) => unwrap(await api.post(`/auth/reset-password/${token}`, { password })),
}
