import multer from 'multer'

import { ApiError } from '../utils/ApiError.js'

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp']

const fileFilter = (_req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new ApiError(400, 'Only JPEG, PNG, and WebP images are allowed'))
  }

  return cb(null, true)
}

export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})
