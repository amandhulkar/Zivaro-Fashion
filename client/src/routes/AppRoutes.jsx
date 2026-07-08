import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Loader from '../components/common/Loader'
import MainLayout from '../layouts/MainLayout'
import AdminLayout from '../layouts/admin/AdminLayout'
import AdminRoutes from './AdminRoutes'
import ProtectedRoutes from './ProtectedRoutes'
import PublicRoutes from './PublicRoutes'

const Home = lazy(() => import('../pages/public/Home'))
const Shop = lazy(() => import('../pages/public/Shop'))
const Categories = lazy(() => import('../pages/public/Categories'))
const ProductDetails = lazy(() => import('../pages/public/ProductDetails'))
const Wishlist = lazy(() => import('../pages/public/Wishlist'))
const Cart = lazy(() => import('../pages/public/Cart'))
const Checkout = lazy(() => import('../pages/public/Checkout'))
const Login = lazy(() => import('../pages/public/Login'))
const Register = lazy(() => import('../pages/public/Register'))
const ForgotPassword = lazy(() => import('../pages/public/ForgotPassword'))
const ResetPassword = lazy(() => import('../pages/public/ResetPassword'))
const Profile = lazy(() => import('../pages/protected/Profile'))
const About = lazy(() => import('../pages/public/About'))
const Contact = lazy(() => import('../pages/public/Contact'))
const NotFound = lazy(() => import('../pages/public/NotFound'))

const AdminDashboard = lazy(() => import('../pages/admin/Dashboard'))
const AdminProducts = lazy(() => import('../pages/admin/Products'))
const AdminProductForm = lazy(() => import('../pages/admin/ProductForm'))
const AdminCategories = lazy(() => import('../pages/admin/Categories'))
const AdminInventory = lazy(() => import('../pages/admin/Inventory'))
const AdminSuppliers = lazy(() => import('../pages/admin/Suppliers'))
const AdminOrders = lazy(() => import('../pages/admin/Orders'))
const AdminOrderDetails = lazy(() => import('../pages/admin/OrderDetails'))
const AdminCustomers = lazy(() => import('../pages/admin/Customers'))
const AdminCoupons = lazy(() => import('../pages/admin/Coupons'))
const AdminBanners = lazy(() => import('../pages/admin/Banners'))
const AdminReports = lazy(() => import('../pages/admin/Reports'))
const AdminSettings = lazy(() => import('../pages/admin/Settings'))
const AdminNotAuthorized = lazy(() => import('../pages/admin/NotAuthorized'))

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<AdminRoutes />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new" element={<AdminProductForm />} />
            <Route path="products/:id/edit" element={<AdminProductForm />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="suppliers" element={<AdminSuppliers />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="orders/:id" element={<AdminOrderDetails />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="coupons" element={<AdminCoupons />} />
            <Route path="banners" element={<AdminBanners />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="unauthorized" element={<AdminNotAuthorized />} />
          </Route>
        </Route>

        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="categories" element={<Categories />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />

          <Route element={<PublicRoutes />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route path="profile" element={<Profile />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
