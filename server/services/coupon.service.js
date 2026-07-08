import { couponRepository } from '../repositories/coupon.repository.js'
import { ApiError } from '../utils/ApiError.js'

export const couponService = {
  async validateCoupon(code, subtotal = 0) {
    const coupon = await couponRepository.findActiveByCode(code)
    if (!coupon) throw new ApiError(404, 'Coupon not found')

    const now = new Date()
    if (coupon.startsAt && coupon.startsAt > now) throw new ApiError(400, 'Coupon is not active yet')
    if (coupon.expiresAt && coupon.expiresAt < now) throw new ApiError(400, 'Coupon has expired')
    if (subtotal < coupon.minOrderAmount) throw new ApiError(400, 'Cart subtotal does not meet coupon minimum')

    const rawDiscount = coupon.discountType === 'percentage' ? subtotal * (coupon.discountValue / 100) : coupon.discountValue
    const discount = coupon.maxDiscountAmount ? Math.min(rawDiscount, coupon.maxDiscountAmount) : rawDiscount

    return { coupon, discount }
  },
}
