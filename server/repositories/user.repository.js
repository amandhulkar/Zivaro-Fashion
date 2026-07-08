import { User } from '../models/User.model.js'

export const userRepository = {
  findByEmail: (email) => User.findOne({ email: email?.toLowerCase() }),
  findByEmailWithPassword: (email) => User.findOne({ email: email?.toLowerCase() }).select('+password +refreshToken'),
  findById: (id) => User.findById(id),
  findByIdWithSecrets: (id) => User.findById(id).select('+password +refreshToken +passwordResetToken +passwordResetExpires'),
  findByRefreshToken: (tokenHash) => User.findOne({ refreshToken: tokenHash }).select('+refreshToken'),
  findByResetToken: (tokenHash) => User.findOne({ passwordResetToken: tokenHash, passwordResetExpires: { $gt: Date.now() } }).select('+passwordResetToken +passwordResetExpires'),
  create: (payload) => User.create(payload),
}
