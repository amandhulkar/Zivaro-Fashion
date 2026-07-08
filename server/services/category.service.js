import { categoryRepository } from '../repositories/category.repository.js'
import { ApiError } from '../utils/ApiError.js'

export const categoryService = {
  getCategories() {
    return categoryRepository.find()
  },

  createCategory(payload) {
    return categoryRepository.create(payload)
  },

  async updateCategory(id, payload) {
    const category = await categoryRepository.update(id, payload)
    if (!category) throw new ApiError(404, 'Category not found')
    return category
  },

  async deleteCategory(id) {
    const category = await categoryRepository.delete(id)
    if (!category) throw new ApiError(404, 'Category not found')
    return category
  },
}
