import axios from 'axios'

let unauthorizedHandler = null
let isRefreshing = false
let refreshQueue = []

const isBrowser = typeof window !== 'undefined'
const isLocalHost = isBrowser && ['localhost', '127.0.0.1'].includes(window.location.hostname)
const envBaseUrl = import.meta.env.VITE_API_BASE_URL
const fallbackBaseUrl = isLocalHost ? 'http://localhost:5000/api/v1' : `${window.location.origin}/api/v1`
const baseURL = envBaseUrl && !(envBaseUrl.includes('localhost') && !isLocalHost) ? envBaseUrl : fallbackBaseUrl

export const setUnauthorizedHandler = (handler) => {
  unauthorizedHandler = handler
}

export const api = axios.create({
  baseURL,
  withCredentials: true,
})

const flushQueue = (error) => {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve()
  })
  refreshQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const status = error.response?.status
    const url = originalRequest?.url || ''
    const isAuthEndpoint = ['/auth/login', '/auth/register', '/auth/refresh-token', '/auth/forgot-password', '/auth/me'].some((path) => url.includes(path)) || url.includes('/auth/reset-password')

    if (status !== 401 || originalRequest?._retry || originalRequest?.skipAuthRefresh || isAuthEndpoint) {
      return Promise.reject(error)
    }

    originalRequest._retry = true

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({ resolve, reject })
      }).then(() => api(originalRequest))
    }

    isRefreshing = true

    try {
      await api.post('/auth/refresh-token')
      flushQueue()
      return api(originalRequest)
    } catch (refreshError) {
      flushQueue(refreshError)
      unauthorizedHandler?.()
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)
