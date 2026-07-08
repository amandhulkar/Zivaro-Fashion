import { Outlet } from 'react-router-dom'
import ScrollTop from '../components/common/ScrollTop'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollTop />
    </div>
  )
}

export default MainLayout
