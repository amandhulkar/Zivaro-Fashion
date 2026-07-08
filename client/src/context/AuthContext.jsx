import { useCallback, useEffect, useMemo, useState } from 'react'
import { setUnauthorizedHandler } from '../lib/api'
import { authService } from '../services/authService'
import { AuthContext } from './auth-context'

const AUTH_HINT_KEY = 'zivaro_auth_hint'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  const clearUser = useCallback(() => {
    localStorage.removeItem(AUTH_HINT_KEY)
    setUser(null)
  }, [])

  const fetchMe = useCallback(async () => {
    const data = await authService.getMe()
    localStorage.setItem(AUTH_HINT_KEY, '1')
    setUser(data.user)
    return data.user
  }, [])

  const refresh = useCallback(async () => {
    const data = await authService.refreshToken()
    localStorage.setItem(AUTH_HINT_KEY, '1')
    setUser(data.user)
    return data.user
  }, [])

  useEffect(() => {
    setUnauthorizedHandler(clearUser)
  }, [clearUser])

  useEffect(() => {
    let active = true

    const bootstrap = async () => {
      if (!localStorage.getItem(AUTH_HINT_KEY)) {
        setIsAuthLoading(false)
        return
      }

      try {
        const data = await authService.getMe()
        if (active) setUser(data.user)
      } catch (_error) {
        try {
          const data = await authService.refreshToken()
          if (active) {
            localStorage.setItem(AUTH_HINT_KEY, '1')
            setUser(data.user)
          }
        } catch (_refreshError) {
          if (active) clearUser()
        }
      } finally {
        if (active) setIsAuthLoading(false)
      }
    }

    bootstrap()

    return () => {
      active = false
    }
  }, [clearUser])

  const register = useCallback(async (payload) => {
    const data = await authService.register(payload)
    localStorage.setItem(AUTH_HINT_KEY, '1')
    setUser(data.user)
    return data.user
  }, [])

  const login = useCallback(async (payload) => {
    const data = await authService.login(payload)
    localStorage.setItem(AUTH_HINT_KEY, '1')
    setUser(data.user)
    return data.user
  }, [])

  const logout = useCallback(async () => {
    try {
      await authService.logout()
    } finally {
      setUser(null)
    }
  }, [])

  const updateProfile = useCallback(async (payload) => {
    const data = await authService.updateProfile(payload)
    setUser(data.user)
    return data.user
  }, [])

  const changePassword = useCallback(async (payload) => {
    const data = await authService.changePassword(payload)
    setUser(data.user)
    return data.user
  }, [])

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    isAuthLoading,
    register,
    login,
    logout,
    refresh,
    fetchMe,
    updateProfile,
    changePassword,
    forgotPassword: authService.forgotPassword,
    resetPassword: authService.resetPassword,
  }), [user, isAuthLoading, register, login, logout, refresh, fetchMe, updateProfile, changePassword])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
