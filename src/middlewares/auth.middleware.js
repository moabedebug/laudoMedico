import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

import UnauthorizedError from '../services/errors/UnauthorizedError.js'

export function auth(req, res, next) {
  const token = req.cookies.token

  if (!token) {
    return next(new UnauthorizedError('Token não encontrado.'))
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return next(new UnauthorizedError('Token inválido ou expirado.'))
  }
}
