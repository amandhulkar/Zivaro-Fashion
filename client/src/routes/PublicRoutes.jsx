import { Navigate, Outlet } from 'react-router-dom'
import Loader from '../components/common/Loader'
import { useAuth } from '../hooks/useAuth'

const PublicRoutes = () => {
  const { isAuthenticated, isAuthLoading } = useAuth()

  if (isAuthLoading) return <Loader />
  if (isAuthenticated) return <Navigate to="/profile" replace />

  return <Outlet />
}

export default PublicRoutes
