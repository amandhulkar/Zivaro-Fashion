import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Loader from '../components/common/Loader'
import { useAuth } from '../hooks/useAuth'

const AdminRoutes = () => {
  const { isAuthenticated, isAuthLoading, user } = useAuth()
  const location = useLocation()

  if (isAuthLoading) return <Loader />
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />
  if (user?.role !== 'admin') return <Navigate to="/profile" replace />

  return <Outlet />
}

export default AdminRoutes
