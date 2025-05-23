import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export function generateToken(user) {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    doctorId: user._id,
  }

  const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: '24h' })

  return token
}
