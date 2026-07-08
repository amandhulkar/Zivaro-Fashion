import { FiMenu } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'
import { useAuth } from '../../hooks/useAuth'
import { showSuccessToast } from '../../utils/toast'

const AdminTopbar = ({ onMenu }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    showSuccessToast('Logged out successfully')
    navigate('/login', { replace: true })
  }

  return <header className="sticky top-0 z-40 border-b border-line bg-secondary/90 px-4 py-4 backdrop-blur-xl lg:px-8"><div className="flex items-center justify-between gap-4"><button className="text-2xl lg:hidden" onClick={onMenu} aria-label="Open admin menu"><FiMenu /></button><div><p className="small-text">Admin Dashboard</p><h1 className="font-serif text-2xl text-primary">Business Control Center</h1></div><div className="flex items-center gap-4"><div className="hidden text-right sm:block"><p className="text-sm font-semibold text-primary">{user?.name || user?.email}</p><p className="small-text">{user?.role}</p></div><Button size="sm" variant="outline" onClick={()=>navigate('/profile')}>Profile</Button><Button size="sm" variant="outline" onClick={handleLogout}>Logout</Button></div></div></header>
}

export default AdminTopbar
