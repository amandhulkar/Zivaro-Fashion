import { Banner } from '../models/Banner.model.js'

export const bannerRepository = {
  findActive: () => Banner.find({ isActive: true }).sort({ sortOrder: 1 }).lean(),
}
