import { Coupon } from '../models/Coupon.model.js'

export const couponRepository = {
  findActiveByCode: (code) => Coupon.findOne({ code: code?.toUpperCase(), isActive: true }).lean(),
}
