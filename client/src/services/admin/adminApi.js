import { api } from '../../lib/api'

const unwrap = (response) => ({ data: response.data.data, meta: response.data.meta })
const admin = '/admin'

export const adminApi = {
  overview: async () => unwrap(await api.get(`${admin}/overview`)),
  getSettings: async () => unwrap(await api.get(`${admin}/settings`)),
  updateSettings: async (payload) => unwrap(await api.put(`${admin}/settings`, payload)),

  listProducts: async (params) => unwrap(await api.get(`${admin}/products`, { params })),
  createProduct: async (payload) => unwrap(await api.post(`${admin}/products`, payload)),
  getProduct: async (id) => unwrap(await api.get(`${admin}/products/${id}`)),
  updateProduct: async (id, payload) => unwrap(await api.put(`${admin}/products/${id}`, payload)),
  deleteProduct: async (id) => unwrap(await api.delete(`${admin}/products/${id}`)),
  duplicateProduct: async (id) => unwrap(await api.post(`${admin}/products/${id}/duplicate`)),
  updateProductStatus: async (id, payload) => unwrap(await api.patch(`${admin}/products/${id}/status`, payload)),
  updateProductStock: async (id, payload) => unwrap(await api.patch(`${admin}/products/${id}/stock`, payload)),

  listCategories: async (params) => unwrap(await api.get(`${admin}/categories`, { params })),
  createCategory: async (payload) => unwrap(await api.post(`${admin}/categories`, payload)),
  updateCategory: async (id, payload) => unwrap(await api.put(`${admin}/categories/${id}`, payload)),
  deleteCategory: async (id) => unwrap(await api.delete(`${admin}/categories/${id}`)),
  updateCategoryStatus: async (id, payload) => unwrap(await api.patch(`${admin}/categories/${id}/status`, payload)),

  listInventory: async (params) => unwrap(await api.get(`${admin}/inventory`, { params })),
  listLowStock: async () => unwrap(await api.get(`${admin}/inventory/low-stock`)),
  listInventoryMovements: async (params) => unwrap(await api.get(`${admin}/inventory/movements`, { params })),
  adjustInventory: async (payload) => unwrap(await api.post(`${admin}/inventory/adjust`, payload)),

  listSuppliers: async (params) => unwrap(await api.get(`${admin}/suppliers`, { params })),
  createSupplier: async (payload) => unwrap(await api.post(`${admin}/suppliers`, payload)),
  updateSupplier: async (id, payload) => unwrap(await api.put(`${admin}/suppliers/${id}`, payload)),
  deleteSupplier: async (id) => unwrap(await api.delete(`${admin}/suppliers/${id}`)),

  listOrders: async (params) => unwrap(await api.get(`${admin}/orders`, { params })),
  getOrder: async (id) => unwrap(await api.get(`${admin}/orders/${id}`)),
  acceptOrder: async (id) => unwrap(await api.patch(`${admin}/orders/${id}/accept`)),
  rejectOrder: async (id, payload) => unwrap(await api.patch(`${admin}/orders/${id}/reject`, payload)),
  updateOrderStatus: async (id, payload) => unwrap(await api.patch(`${admin}/orders/${id}/status`, payload)),

  listCustomers: async (params) => unwrap(await api.get(`${admin}/customers`, { params })),
  updateCustomerStatus: async (id, payload) => unwrap(await api.patch(`${admin}/customers/${id}/status`, payload)),

  listCoupons: async (params) => unwrap(await api.get(`${admin}/coupons`, { params })),
  createCoupon: async (payload) => unwrap(await api.post(`${admin}/coupons`, payload)),
  updateCoupon: async (id, payload) => unwrap(await api.put(`${admin}/coupons/${id}`, payload)),
  deleteCoupon: async (id) => unwrap(await api.delete(`${admin}/coupons/${id}`)),

  listBanners: async (params) => unwrap(await api.get(`${admin}/banners`, { params })),
  createBanner: async (payload) => unwrap(await api.post(`${admin}/banners`, payload)),
  updateBanner: async (id, payload) => unwrap(await api.put(`${admin}/banners/${id}`, payload)),
  deleteBanner: async (id) => unwrap(await api.delete(`${admin}/banners/${id}`)),

  getReport: async (type, params) => unwrap(await api.get(`${admin}/reports/${type}`, { params })),
  reportCsvUrl: (type) => `${api.defaults.baseURL}${admin}/reports/${type}?format=csv`,
}
