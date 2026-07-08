import mongoose from 'mongoose'

import { env } from '../config/env.js'

const duplicateKeyMessage = (error) => {
  const field = Object.keys(error.keyValue || {})[0] || 'field'
  return `${field} already exists`
}

export const errorHandler = (err, _req, res, _next) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal server error'
  let errors = err.errors || []

  if (err instanceof mongoose.Error.CastError) {
    statusCode = 400
    message = 'Invalid resource identifier'
    errors = [{ field: err.path, message: 'Invalid MongoDB ObjectId' }]
  }

  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400
    message = 'Validation failed'
    errors = Object.values(err.errors).map((error) => ({ field: error.path, message: error.message }))
  }

  if (err.code === 11000) {
    statusCode = 409
    message = duplicateKeyMessage(err)
    errors = [{ field: Object.keys(err.keyValue || {})[0], message }]
  }

  if (err.name === 'MulterError') {
    statusCode = 400
    message = err.message
  }

  if (err.type === 'entity.parse.failed') {
    statusCode = 400
    message = 'Invalid JSON payload'
  }

  const response = {
    success: false,
    message,
    errors,
  }

  if (env.nodeEnv === 'development') {
    response.stack = err.stack
  }

  res.status(statusCode).json(response)
}
