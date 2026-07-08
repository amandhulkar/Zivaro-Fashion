import dotenv from 'dotenv'

dotenv.config()

const toNumber = (value, fallback) => {
  const parsed = Number.parseInt(value, 10)
  return Number.isNaN(parsed) ? fallback : parsed
}

const isProduction = process.env.NODE_ENV === 'production'

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: toNumber(process.env.PORT, 5000),
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173,https://zivaro-fashion.onrender.com',
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/zivaro_fashion',
  jwtSecret: process.env.JWT_SECRET || 'change_this_later',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || 'change_this_later_refresh',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  accessCookieMaxAge: toNumber(process.env.ACCESS_COOKIE_MAX_AGE, 15 * 60 * 1000),
  refreshCookieMaxAge: toNumber(process.env.REFRESH_COOKIE_MAX_AGE, 7 * 24 * 60 * 60 * 1000),
  cookieSecure: process.env.COOKIE_SECURE ? process.env.COOKIE_SECURE === 'true' : isProduction,
  cookieSameSite: process.env.COOKIE_SAME_SITE || (isProduction ? 'lax' : 'lax'),
  jsonBodyLimit: process.env.JSON_BODY_LIMIT || '1mb',
  urlencodedBodyLimit: process.env.URLENCODED_BODY_LIMIT || '1mb',
  rateLimit: {
    windowMs: toNumber(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
    max: toNumber(process.env.RATE_LIMIT_MAX, 100),
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
    folder: process.env.CLOUDINARY_FOLDER || 'zivaro-fashion',
  },
}

if (env.nodeEnv === 'production' && env.jwtSecret === 'change_this_later') {
  throw new Error('JWT_SECRET must be configured in production')
}

if (env.nodeEnv === 'production' && env.jwtRefreshSecret === 'change_this_later_refresh') {
  throw new Error('JWT_REFRESH_SECRET must be configured in production')
}
