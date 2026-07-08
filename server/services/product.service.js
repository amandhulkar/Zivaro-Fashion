import { productRepository } from '../repositories/product.repository.js'
import { ApiError } from '../utils/ApiError.js'
import { buildPaginationMeta, getPagination } from '../utils/pagination.js'

const sortMap = {
  newest: { createdAt: -1 },
  oldest: { createdAt: 1 },
  price_asc: { price: 1 },
  price_desc: { price: -1 },
  rating_desc: { ratings: -1 },
  popular: { reviewsCount: -1 },
  featured: { featured: -1, createdAt: -1 },
}

const buildFilter = (query = {}) => {
  const filter = {}

  if (query.category) filter.category = query.category
  if (query.brand) filter.brand = new RegExp(query.brand, 'i')
  if (query.size) filter.sizes = query.size
  if (query.color) filter['colors.name'] = new RegExp(query.color, 'i')
  if (query.featured !== undefined) filter.featured = query.featured === 'true'
  if (query.trending !== undefined) filter.trending = query.trending === 'true'
  if (query.bestSeller !== undefined) filter.bestSeller = query.bestSeller === 'true'
  if (query.newArrival !== undefined) filter.newArrival = query.newArrival === 'true'
  if (query.status) filter.status = query.status

  if (query.minPrice || query.maxPrice) {
    filter.price = {}
    if (query.minPrice) filter.price.$gte = Number(query.minPrice)
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice)
  }

  if (query.q) filter.$text = { $search: query.q }

  return filter
}

export const productService = {
  async getProducts(query) {
    const pagination = getPagination(query)
    const filter = buildFilter(query)
    const sort = sortMap[query.sort] || sortMap.newest

    const [items, total] = await Promise.all([
      productRepository.find(filter, { ...pagination, sort }),
      productRepository.count(filter),
    ])

    return { data: items, meta: buildPaginationMeta({ ...pagination, total }) }
  },

  async getProductBySlug(slug) {
    const product = await productRepository.findBySlug(slug)
    if (!product) throw new ApiError(404, 'Product not found')
    return product
  },

  async createProduct(payload) {
    return productRepository.create(payload)
  },

  async updateProduct(id, payload) {
    const product = await productRepository.update(id, payload)
    if (!product) throw new ApiError(404, 'Product not found')
    return product
  },

  async deleteProduct(id) {
    const product = await productRepository.delete(id)
    if (!product) throw new ApiError(404, 'Product not found')
    return product
  },
}
