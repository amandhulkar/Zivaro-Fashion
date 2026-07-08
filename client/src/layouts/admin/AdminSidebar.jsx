import { FiBarChart2, FiBox, FiGrid, FiImage, FiLayers, FiPackage, FiPercent, FiSettings, FiShoppingBag, FiTruck, FiUsers } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

const links = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: FiGrid },
  { label: 'Products', path: '/admin/products', icon: FiPackage },
  { label: 'Categories', path: '/admin/categories', icon: FiLayers },
  { label: 'Inventory', path: '/admin/inventory', icon: FiBox },
  { label: 'Suppliers', path: '/admin/suppliers', icon: FiTruck },
  { label: 'Orders', path: '/admin/orders', icon: FiShoppingBag },
  { label: 'Customers', path: '/admin/customers', icon: FiUsers },
  { label: 'Coupons', path: '/admin/coupons', icon: FiPercent },
  { label: 'Banners', path: '/admin/banners', icon: FiImage },
  { label: 'Reports', path: '/admin/reports', icon: FiBarChart2 },
  { label: 'Settings', path: '/admin/settings', icon: FiSettings },
]

const AdminSidebar = ({ open, onClose }) => {
  const linkClass = ({ isActive }) => `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${isActive ? 'bg-accent text-secondary shadow-soft' : 'text-primary hover:bg-background hover:text-accent'}`

  return <aside className={`fixed inset-y-0 left-0 z-[80] w-72 border-r border-line bg-secondary p-5 shadow-luxury transition-transform lg:static lg:translate-x-0 lg:shadow-none ${open ? 'translate-x-0' : '-translate-x-full'}`}><div className="flex items-center justify-between"><NavLink to="/admin/dashboard" className="text-lg font-extrabold uppercase tracking-[0.22em] text-primary">Zivaro <span className="text-accent">Admin</span></NavLink><button className="text-sm lg:hidden" onClick={onClose}>Close</button></div><nav className="mt-8 space-y-2">{links.map(({ label, path, icon: Icon }) => <NavLink key={path} to={path} className={linkClass} onClick={onClose}><Icon />{label}</NavLink>)}</nav></aside>
}

export default AdminSidebar
