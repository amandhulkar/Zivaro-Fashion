import { env } from './env.js'

const allowedOrigins = env.clientUrl.split(',').map((origin) => origin.trim()).filter(Boolean)
const isAllowedRenderOrigin = (origin) => /^https:\/\/[a-z0-9-]+\.onrender\.com$/i.test(origin)
const isAllowedLocalOrigin = (origin) => /^http:\/\/localhost:\d+$/i.test(origin) || /^http:\/\/127\.0\.0\.1:\d+$/i.test(origin)

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || isAllowedRenderOrigin(origin) || isAllowedLocalOrigin(origin)) {
      return callback(null, true)
    }

    return callback(new Error(`CORS blocked origin: ${origin}`))
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-session-id'],
}
