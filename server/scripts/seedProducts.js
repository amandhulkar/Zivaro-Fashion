import { connectDB, disconnectDB } from '../config/db.js'
import { seedProducts } from '../utils/seedProducts.js'

const run = async () => {
  await connectDB()
  const result = await seedProducts()
  console.log(`Seed complete: ${result.totalProducts} products, ${result.totalCategories} categories`)
  await disconnectDB()
}

run().catch(async (error) => {
  console.error(error)
  await disconnectDB().catch(() => {})
  process.exit(1)
})
