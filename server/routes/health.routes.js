import mongoose from 'mongoose'
import { Router } from 'express'

import { env } from '../config/env.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const router = Router()

router.get('/', (_req, res) => {
  res.status(200).json(new ApiResponse(200, {
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: env.nodeEnv,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  }, 'Health check successful'))
})

export default router
