import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AdminTopbar from './AdminTopbar'

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return <div className="min-h-screen bg-background text-text"><div className="flex min-h-screen"><AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />{sidebarOpen && <button className="fixed inset-0 z-[70] bg-primary/40 lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close admin menu" />}<div className="min-w-0 flex-1"><AdminTopbar onMenu={() => setSidebarOpen(true)} /><main className="p-4 lg:p-8"><Outlet /></main></div></div></div>
}

export default AdminLayout
