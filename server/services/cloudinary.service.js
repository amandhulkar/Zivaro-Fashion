import { Readable } from 'stream'

import { env } from '../config/env.js'
import { cloudinary } from '../config/cloudinary.js'
import { ApiError } from '../utils/ApiError.js'

export const cloudinaryService = {
  uploadBuffer(file, folder = env.cloudinary.folder) {
    if (!env.cloudinary.cloudName || !env.cloudinary.apiKey || !env.cloudinary.apiSecret) {
      throw new ApiError(500, 'Cloudinary is not configured')
    }

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder, resource_type: 'image' }, (error, result) => {
        if (error) return reject(error)
        return resolve({ url: result.secure_url, publicId: result.public_id, alt: file.originalname })
      })

      Readable.from(file.buffer).pipe(stream)
    })
  },

  deleteImage(publicId) {
    if (!publicId) return null
    return cloudinary.uploader.destroy(publicId)
  },
}
