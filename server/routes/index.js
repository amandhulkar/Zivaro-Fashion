import { Router } from 'express'

import adminRoutes from './admin.routes.js'
import authRoutes from './auth.routes.js'
import cartRoutes from './cart.routes.js'
import categoryRoutes from './category.routes.js'
import healthRoutes from './health.routes.js'
import productRoutes from './product.routes.js'
import reviewRoutes from './review.routes.js'
import searchRoutes from './search.routes.js'
import wishlistRoutes from './wishlist.routes.js'

const router = Router()

router.use('/health', healthRoutes)
router.use('/auth', authRoutes)
router.use('/admin', adminRoutes)
router.use('/products', productRoutes)
router.use('/categories', categoryRoutes)
router.use('/reviews', reviewRoutes)
router.use('/wishlist', wishlistRoutes)
router.use('/cart', cartRoutes)
router.use('/search', searchRoutes)

export default router
