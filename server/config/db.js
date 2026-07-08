import mongoose from 'mongoose'

import { env } from './env.js'
import { logger } from '../utils/logger.js'

export const connectDB = async () => {
  mongoose.connection.on('connected', () => logger.info('MongoDB connection established'))
  mongoose.connection.on('error', (error) => logger.error('MongoDB connection error', { message: error.message }))
  mongoose.connection.on('disconnected', () => logger.warn('MongoDB disconnected'))

  const connection = await mongoose.connect(env.mongoUri, {
    serverSelectionTimeoutMS: 10000,
  })

  return connection
}

export const disconnectDB = async () => {
  await mongoose.connection.close(false)
}
