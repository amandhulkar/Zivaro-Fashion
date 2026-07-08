import { Router } from 'express'

import {
  acceptOrder,
  adjustInventory,
  createBanner,
  createCategory,
  createCoupon,
  createProduct,
  createSupplier,
  deleteBanner,
  deleteCategory,
  deleteCoupon,
  deleteProduct,
  deleteSupplier,
  duplicateProduct,
  getBanner,
  getCoupon,
  getCustomer,
  getOrder,
  getOverview,
  getProduct,
  getReport,
  getSettings,
  getSupplier,
  listBanners,
  listCategories,
  listCoupons,
  listCustomers,
  listInventory,
  listInventoryMovements,
  listLowStock,
  listOrders,
  listProducts,
  listSuppliers,
  rejectOrder,
  updateBanner,
  updateBannerOrder,
  updateBannerStatus,
  updateCategory,
  updateCategoryStatus,
  updateCoupon,
  updateCouponStatus,
  updateCustomerRole,
  updateCustomerStatus,
  updateOrderStatus,
  updateProduct,
  updateProductStatus,
  updateProductStock,
  updateSettings,
  updateSupplier,
} from '../controllers/admin.controller.js'
import { ROLES } from '../constants/roles.constants.js'
import { authorize, protect } from '../middleware/auth.middleware.js'

const router = Router()

router.use(protect, authorize(ROLES.ADMIN))

router.get('/overview', getOverview)
router.get('/settings', getSettings)
router.put('/settings', updateSettings)

router.get('/products', listProducts)
router.post('/products', createProduct)
router.get('/products/:id', getProduct)
router.put('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)
router.post('/products/:id/duplicate', duplicateProduct)
router.patch('/products/:id/status', updateProductStatus)
router.patch('/products/:id/stock', updateProductStock)

router.get('/categories', listCategories)
router.post('/categories', createCategory)
router.put('/categories/:id', updateCategory)
router.delete('/categories/:id', deleteCategory)
router.patch('/categories/:id/status', updateCategoryStatus)

router.get('/inventory', listInventory)
router.get('/inventory/low-stock', listLowStock)
router.get('/inventory/movements', listInventoryMovements)
router.post('/inventory/adjust', adjustInventory)

router.get('/suppliers', listSuppliers)
router.post('/suppliers', createSupplier)
router.get('/suppliers/:id', getSupplier)
router.put('/suppliers/:id', updateSupplier)
router.delete('/suppliers/:id', deleteSupplier)

router.get('/orders', listOrders)
router.get('/orders/:id', getOrder)
router.patch('/orders/:id/accept', acceptOrder)
router.patch('/orders/:id/reject', rejectOrder)
router.patch('/orders/:id/status', updateOrderStatus)
router.patch('/orders/:id/payment-status', updateOrderStatus)

router.get('/customers', listCustomers)
router.get('/customers/:id', getCustomer)
router.patch('/customers/:id/status', updateCustomerStatus)
router.patch('/customers/:id/role', updateCustomerRole)

router.get('/coupons', listCoupons)
router.post('/coupons', createCoupon)
router.get('/coupons/:id', getCoupon)
router.put('/coupons/:id', updateCoupon)
router.delete('/coupons/:id', deleteCoupon)
router.patch('/coupons/:id/status', updateCouponStatus)

router.get('/banners', listBanners)
router.post('/banners', createBanner)
router.get('/banners/:id', getBanner)
router.put('/banners/:id', updateBanner)
router.delete('/banners/:id', deleteBanner)
router.patch('/banners/:id/status', updateBannerStatus)
router.patch('/banners/:id/order', updateBannerOrder)

router.get('/reports/:type', getReport)

export default router
