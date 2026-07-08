import { Banner } from '../models/Banner.model.js'
import { Category } from '../models/Category.model.js'
import { Coupon } from '../models/Coupon.model.js'
import { InventoryMovement } from '../models/InventoryMovement.model.js'
import { Order } from '../models/Order.model.js'
import { Product } from '../models/Product.model.js'
import { StoreSettings } from '../models/StoreSettings.model.js'
import { Supplier } from '../models/Supplier.model.js'
import { User } from '../models/User.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../middleware/asyncHandler.middleware.js'
import { buildPaginationMeta, getPagination } from '../utils/pagination.js'
import { slugify } from '../utils/slugify.js'

const send = (res, data, message = 'Success', statusCode = 200, meta) => res.status(statusCode).json(new ApiResponse(statusCode, data, message, meta))
const safeUserSelect = '-password -refreshToken -passwordResetToken -passwordResetExpires'

const paginated = async ({ model, filter = {}, query = {}, sort = { createdAt: -1 }, populate, select }) => {
  const pagination = getPagination(query)
  let finder = model.find(filter).sort(sort).skip(pagination.skip).limit(pagination.limit)
  if (populate) finder = finder.populate(populate)
  if (select) finder = finder.select(select)
  const [items, total] = await Promise.all([finder.lean(), model.countDocuments(filter)])
  return { items, meta: buildPaginationMeta({ ...pagination, total }) }
}

const statusFilter = (query) => query.status ? { status: query.status } : {}

export const getOverview = asyncHandler(async (_req, res) => {
  const [totalProducts, totalCategories, totalOrders, totalCustomers, orders, lowStockProducts, outOfStockProducts, recentOrders] = await Promise.all([
    Product.countDocuments(),
    Category.countDocuments(),
    Order.countDocuments(),
    User.countDocuments({ role: 'customer' }),
    Order.find().lean(),
    Product.find({ stock: { $gt: 0, $lte: 5 } }).limit(10).lean(),
    Product.find({ stock: { $lte: 0 } }).limit(10).lean(),
    Order.find().sort({ createdAt: -1 }).limit(8).populate('user', 'name email').lean(),
  ])

  const totalRevenue = orders.filter((order) => ['paid', 'unpaid'].includes(order.paymentStatus)).reduce((sum, order) => sum + (order.total || 0), 0)
  const byStatus = orders.reduce((acc, order) => ({ ...acc, [order.status]: (acc[order.status] || 0) + 1 }), {})
  const monthlySales = orders.reduce((acc, order) => {
    const key = new Date(order.createdAt).toISOString().slice(0, 7)
    acc[key] = acc[key] || { month: key, revenue: 0, orders: 0 }
    acc[key].revenue += order.total || 0
    acc[key].orders += 1
    return acc
  }, {})

  send(res, {
    metrics: {
      totalProducts,
      totalCategories,
      totalOrders,
      totalCustomers,
      totalRevenue,
      pendingOrders: byStatus.pending || 0,
      completedOrders: byStatus.delivered || 0,
      cancelledOrders: byStatus.cancelled || 0,
      lowStockProducts: lowStockProducts.length,
      outOfStockProducts: outOfStockProducts.length,
    },
    monthlySales: Object.values(monthlySales).slice(-12),
    orderStatus: byStatus,
    lowStockProducts,
    outOfStockProducts,
    recentOrders,
    bestSellingProducts: [],
  }, 'Admin overview fetched successfully')
})

export const listProducts = asyncHandler(async (req, res) => {
  const filter = { ...statusFilter(req.query) }
  if (req.query.q) filter.$text = { $search: req.query.q }
  if (req.query.category) filter.category = req.query.category
  if (req.query.lowStock === 'true') filter.stock = { $lte: 5 }
  const result = await paginated({ model: Product, filter, query: req.query, populate: 'category supplier' })
  send(res, result.items, 'Products fetched successfully', 200, result.meta)
})

export const createProduct = asyncHandler(async (req, res) => {
  const payload = { ...req.body }
  payload.price = payload.price ?? payload.sellingPrice
  payload.stock = payload.stock ?? payload.stockQuantity
  payload.slug = payload.slug || slugify(payload.title || payload.name)
  const product = await Product.create(payload)
  send(res, product, 'Product created successfully', 201)
})

export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category supplier')
  if (!product) throw new ApiError(404, 'Product not found')
  send(res, product, 'Product fetched successfully')
})

export const updateProduct = asyncHandler(async (req, res) => {
  const payload = { ...req.body }
  payload.price = payload.price ?? payload.sellingPrice
  payload.stock = payload.stock ?? payload.stockQuantity
  const product = await Product.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true })
  if (!product) throw new ApiError(404, 'Product not found')
  send(res, product, 'Product updated successfully')
})

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)
  if (!product) throw new ApiError(404, 'Product not found')
  send(res, null, 'Product deleted successfully')
})

export const duplicateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).lean()
  if (!product) throw new ApiError(404, 'Product not found')
  delete product._id
  product.sku = `${product.sku}-COPY-${Date.now()}`
  product.title = `${product.title} Copy`
  product.slug = slugify(product.title)
  const copy = await Product.create(product)
  send(res, copy, 'Product duplicated successfully', 201)
})

export const updateProductStatus = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true })
  if (!product) throw new ApiError(404, 'Product not found')
  send(res, product, 'Product status updated successfully')
})

export const updateProductStock = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) throw new ApiError(404, 'Product not found')
  const previousStock = product.stock || 0
  const nextStock = Math.max(Number(req.body.stock ?? previousStock + Number(req.body.quantity || 0)), 0)
  product.stock = nextStock
  await product.save()
  await InventoryMovement.create({ product: product._id, sku: product.sku, type: req.body.type || 'manual', quantity: nextStock - previousStock, previousStock, newStock: nextStock, reason: req.body.reason, createdBy: req.user._id })
  send(res, product, 'Product stock updated successfully')
})

export const listCategories = asyncHandler(async (req, res) => {
  const result = await paginated({ model: Category, filter: statusFilter(req.query), query: req.query })
  send(res, result.items, 'Categories fetched successfully', 200, result.meta)
})
export const createCategory = asyncHandler(async (req, res) => send(res, await Category.create(req.body), 'Category created successfully', 201))
export const updateCategory = asyncHandler(async (req, res) => send(res, await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }), 'Category updated successfully'))
export const deleteCategory = asyncHandler(async (req, res) => { await Category.findByIdAndDelete(req.params.id); send(res, null, 'Category deleted successfully') })
export const updateCategoryStatus = asyncHandler(async (req, res) => send(res, await Category.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true }), 'Category status updated successfully'))

export const listInventory = asyncHandler(async (req, res) => {
  const filter = req.query.lowStock === 'true' ? { stock: { $lte: 5 } } : {}
  const result = await paginated({ model: Product, filter, query: req.query, populate: 'category supplier' })
  send(res, result.items, 'Inventory fetched successfully', 200, result.meta)
})
export const listLowStock = asyncHandler(async (_req, res) => send(res, await Product.find({ stock: { $lte: 5 } }).lean(), 'Low stock products fetched successfully'))
export const listInventoryMovements = asyncHandler(async (req, res) => {
  const result = await paginated({ model: InventoryMovement, query: req.query, populate: 'product createdBy' })
  send(res, result.items, 'Inventory movements fetched successfully', 200, result.meta)
})
export const adjustInventory = asyncHandler(async (req, res) => {
  req.params.id = req.body.productId
  return updateProductStock(req, res)
})

export const listSuppliers = asyncHandler(async (req, res) => {
  const filter = req.query.q ? { $text: { $search: req.query.q } } : {}
  const result = await paginated({ model: Supplier, filter, query: req.query, populate: 'productsSupplied' })
  send(res, result.items, 'Suppliers fetched successfully', 200, result.meta)
})
export const createSupplier = asyncHandler(async (req, res) => send(res, await Supplier.create(req.body), 'Supplier created successfully', 201))
export const getSupplier = asyncHandler(async (req, res) => send(res, await Supplier.findById(req.params.id).populate('productsSupplied'), 'Supplier fetched successfully'))
export const updateSupplier = asyncHandler(async (req, res) => send(res, await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }), 'Supplier updated successfully'))
export const deleteSupplier = asyncHandler(async (req, res) => { await Supplier.findByIdAndUpdate(req.params.id, { status: 'inactive' }); send(res, null, 'Supplier disabled successfully') })

export const listOrders = asyncHandler(async (req, res) => {
  const filter = { ...statusFilter(req.query) }
  if (req.query.paymentStatus) filter.paymentStatus = req.query.paymentStatus
  const result = await paginated({ model: Order, filter, query: req.query, populate: 'user' })
  send(res, result.items, 'Orders fetched successfully', 200, result.meta)
})
export const getOrder = asyncHandler(async (req, res) => send(res, await Order.findById(req.params.id).populate('user items.product'), 'Order fetched successfully'))
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (!order) throw new ApiError(404, 'Order not found')
  order.status = req.body.status
  order.statusHistory = order.statusHistory || []
  order.statusHistory.push({ status: req.body.status, note: req.body.note, changedBy: req.user._id, changedAt: new Date() })
  if (req.body.paymentStatus) order.paymentStatus = req.body.paymentStatus
  await order.save()
  send(res, order, 'Order status updated successfully')
})
export const acceptOrder = asyncHandler(async (req, res) => { req.body.status = 'accepted'; return updateOrderStatus(req, res) })
export const rejectOrder = asyncHandler(async (req, res) => { req.body.status = 'cancelled'; req.body.note = req.body.reason || 'Rejected by admin'; return updateOrderStatus(req, res) })

export const listCustomers = asyncHandler(async (req, res) => {
  const filter = { role: 'customer' }
  if (req.query.q) filter.$or = [{ name: new RegExp(req.query.q, 'i') }, { email: new RegExp(req.query.q, 'i') }, { phone: new RegExp(req.query.q, 'i') }]
  if (req.query.status) filter.status = req.query.status
  const result = await paginated({ model: User, filter, query: req.query, select: safeUserSelect })
  send(res, result.items, 'Customers fetched successfully', 200, result.meta)
})
export const getCustomer = asyncHandler(async (req, res) => send(res, await User.findById(req.params.id).select(safeUserSelect), 'Customer fetched successfully'))
export const updateCustomerStatus = asyncHandler(async (req, res) => send(res, await User.findByIdAndUpdate(req.params.id, { status: req.body.status, isActive: req.body.status === 'active' }, { new: true }).select(safeUserSelect), 'Customer status updated successfully'))
export const updateCustomerRole = asyncHandler(async (req, res) => send(res, await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true }).select(safeUserSelect), 'Customer role updated successfully'))

export const listCoupons = asyncHandler(async (req, res) => { const result = await paginated({ model: Coupon, query: req.query }); send(res, result.items, 'Coupons fetched successfully', 200, result.meta) })
export const createCoupon = asyncHandler(async (req, res) => send(res, await Coupon.create(req.body), 'Coupon created successfully', 201))
export const getCoupon = asyncHandler(async (req, res) => send(res, await Coupon.findById(req.params.id), 'Coupon fetched successfully'))
export const updateCoupon = asyncHandler(async (req, res) => send(res, await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }), 'Coupon updated successfully'))
export const deleteCoupon = asyncHandler(async (req, res) => { await Coupon.findByIdAndDelete(req.params.id); send(res, null, 'Coupon deleted successfully') })
export const updateCouponStatus = asyncHandler(async (req, res) => send(res, await Coupon.findByIdAndUpdate(req.params.id, { isActive: req.body.isActive }, { new: true }), 'Coupon status updated successfully'))

export const listBanners = asyncHandler(async (req, res) => { const result = await paginated({ model: Banner, query: req.query }); send(res, result.items, 'Banners fetched successfully', 200, result.meta) })
export const createBanner = asyncHandler(async (req, res) => send(res, await Banner.create(req.body), 'Banner created successfully', 201))
export const getBanner = asyncHandler(async (req, res) => send(res, await Banner.findById(req.params.id), 'Banner fetched successfully'))
export const updateBanner = asyncHandler(async (req, res) => send(res, await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }), 'Banner updated successfully'))
export const deleteBanner = asyncHandler(async (req, res) => { await Banner.findByIdAndDelete(req.params.id); send(res, null, 'Banner deleted successfully') })
export const updateBannerStatus = asyncHandler(async (req, res) => send(res, await Banner.findByIdAndUpdate(req.params.id, { isActive: req.body.isActive }, { new: true }), 'Banner status updated successfully'))
export const updateBannerOrder = asyncHandler(async (req, res) => send(res, await Banner.findByIdAndUpdate(req.params.id, { sortOrder: req.body.sortOrder }, { new: true }), 'Banner order updated successfully'))

export const getSettings = asyncHandler(async (_req, res) => {
  const settings = await StoreSettings.findOneAndUpdate(
    { key: 'default' },
    { $setOnInsert: { key: 'default' } },
    { new: true, upsert: true }
  )
  send(res, settings, 'Store settings fetched successfully')
})

export const updateSettings = asyncHandler(async (req, res) => {
  const settings = await StoreSettings.findOneAndUpdate(
    { key: 'default' },
    { ...req.body, key: 'default' },
    { new: true, upsert: true, runValidators: true }
  )
  send(res, settings, 'Store settings updated successfully')
})

export const getReport = asyncHandler(async (req, res) => {
  const type = req.params.type
  const orders = await Order.find().populate('user', 'name email').lean()
  const rows = orders.map((order) => ({ orderNumber: order.orderNumber, status: order.status, total: order.total, paymentStatus: order.paymentStatus, createdAt: order.createdAt }))
  if (req.query.format === 'csv') {
    const header = 'orderNumber,status,total,paymentStatus,createdAt\n'
    const body = rows.map((row) => `${row.orderNumber || ''},${row.status || ''},${row.total || 0},${row.paymentStatus || ''},${row.createdAt || ''}`).join('\n')
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', `attachment; filename="${type}-report.csv"`)
    return res.status(200).send(header + body)
  }
  send(res, { type, rows }, 'Report fetched successfully')
})
