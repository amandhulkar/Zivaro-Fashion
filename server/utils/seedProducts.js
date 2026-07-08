import { products } from '../../client/src/data/products.js'
import { Category } from '../models/Category.model.js'
import { Product } from '../models/Product.model.js'
import { slugify } from './slugify.js'

export const seedProducts = async () => {
  await Category.deleteMany({ slug: null })

  const categoryByName = new Map()
  for (const product of products) {
    if (!categoryByName.has(product.category)) {
      const category = await Category.findOneAndUpdate(
        { slug: slugify(product.category) },
        { name: product.category, slug: slugify(product.category), description: `${product.category} collection`, status: 'active' },
        { returnDocument: 'after', upsert: true, runValidators: true }
      )
      categoryByName.set(product.category, category)
    }
  }

  for (const product of products) {
    const category = categoryByName.get(product.category)
    await Product.findOneAndUpdate(
      { sku: product.sku },
      {
        sku: product.sku,
        slug: product.slug,
        title: product.name,
        name: product.name,
        description: product.description,
        category: category._id,
        brand: product.brand,
        fabric: product.fabric,
        sleeve: product.sleeve,
        neck: product.neck,
        pattern: product.pattern,
        occasion: product.occasion,
        sellingPrice: product.price,
        price: product.price,
        originalPrice: product.originalPrice,
        discount: product.discount,
        stock: product.stock,
        stockQuantity: product.stock,
        images: product.images.map((image) => ({ alt: image.alt })),
        thumbnail: { alt: product.name },
        sizes: product.availableSizes,
        colors: product.availableColors.map((color) => ({ name: color.name, hex: color.value })),
        ratings: product.rating,
        reviewsCount: product.totalReviews,
        featured: product.isFeatured,
        trending: product.isTrending,
        bestSeller: product.isBestSeller,
        newArrival: product.isNewArrival,
        status: 'active',
      },
      { returnDocument: 'after', upsert: true, runValidators: true }
    )
  }

  const totalProducts = await Product.countDocuments()
  const totalCategories = await Category.countDocuments()
  return { totalProducts, totalCategories }
}
