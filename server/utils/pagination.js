export const getPagination = (query = {}) => {
  const page = Math.max(Number.parseInt(query.page, 10) || 1, 1)
  const rawLimit = Math.max(Number.parseInt(query.limit, 10) || 12, 1)
  const limit = Math.min(rawLimit, 50)
  const skip = (page - 1) * limit

  return { page, limit, skip }
}

export const buildPaginationMeta = ({ page, limit, total }) => {
  const totalPages = Math.ceil(total / limit) || 0

  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  }
}
