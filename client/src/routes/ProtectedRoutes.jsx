import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Loader from '../components/common/Loader'
import { useAuth } from '../hooks/useAuth'

const ProtectedRoutes = () => {
  const { isAuthenticated, isAuthLoading } = useAuth()
  const location = useLocation()

  if (isAuthLoading) return <Loader />
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />

  return <Outlet />
}

export default ProtectedRoutes
