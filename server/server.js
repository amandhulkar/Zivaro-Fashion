import app from './app.js'
import { connectDB, disconnectDB } from './config/db.js'
import { env } from './config/env.js'
import { logger } from './utils/logger.js'
import { seedProducts } from './utils/seedProducts.js'

let server

const startServer = async () => {
  await connectDB()

  if (env.seedProducts) {
    const result = await seedProducts()
    logger.info('Products seeded', result)
  }

  server = app.listen(env.port, () => {
    logger.info(`Server running in ${env.nodeEnv} mode on port ${env.port}`)
  })
}

const shutdown = async (signal) => {
  logger.warn(`${signal} received. Shutting down gracefully.`)

  if (server) {
    server.close(async () => {
      await disconnectDB()
      process.exit(0)
    })
  } else {
    await disconnectDB()
    process.exit(0)
  }
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
process.on('unhandledRejection', (error) => {
  logger.error('Unhandled rejection', { message: error.message })
  shutdown('unhandledRejection')
})
process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception', { message: error.message })
  process.exit(1)
})

startServer().catch((error) => {
  logger.error('Failed to start server', { message: error.message })
  process.exit(1)
})
