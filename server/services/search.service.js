import { Product } from '../models/Product.model.js'
import { buildPaginationMeta, getPagination } from '../utils/pagination.js'

export const searchService = {
  async searchProducts(query) {
    const pagination = getPagination(query)
    const filter = {
      status: 'active',
      $text: { $search: query.q },
    }

    const [items, total] = await Promise.all([
      Product.find(filter, { score: { $meta: 'textScore' } })
        .sort({ score: { $meta: 'textScore' } })
        .skip(pagination.skip)
        .limit(pagination.limit)
        .populate('category', 'name slug')
        .lean(),
      Product.countDocuments(filter),
    ])

    return { data: items, meta: buildPaginationMeta({ ...pagination, total }) }
  },
}
