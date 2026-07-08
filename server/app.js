import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import { API_PREFIX } from './constants/app.constants.js'
import { corsOptions } from './config/cors.js'
import { env } from './config/env.js'
import { apiLimiter } from './config/rateLimit.js'
import { errorHandler } from './middleware/error.middleware.js'
import { notFound } from './middleware/notFound.middleware.js'
import { attachRequestId } from './middleware/requestLogger.middleware.js'
import { hppProtection, sanitizeInputs } from './middleware/security.middleware.js'
import routes from './routes/index.js'
import { ApiResponse } from './utils/ApiResponse.js'

const app = express()

app.use(attachRequestId)
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(compression())
app.use(cors(corsOptions))
app.use(express.json({ limit: env.jsonBodyLimit }))
app.use(express.urlencoded({ extended: true, limit: env.urlencodedBodyLimit }))
app.use(cookieParser())
app.use(sanitizeInputs)
app.use(hppProtection)

if (env.nodeEnv === 'development') {
  app.use(morgan('dev'))
}

if (env.nodeEnv !== 'development') {
  app.use(apiLimiter)
}

app.get('/', (_req, res) => {
  res.status(200).json(new ApiResponse(200, { service: 'Zivaro Fashion API' }, 'Zivaro Fashion backend is running'))
})

app.use(API_PREFIX, routes)

app.use(notFound)
app.use(errorHandler)

export default app
