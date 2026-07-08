import { bannerRepository } from '../repositories/banner.repository.js'

export const bannerService = {
  getBanners() {
    return bannerRepository.findActive()
  },
}
