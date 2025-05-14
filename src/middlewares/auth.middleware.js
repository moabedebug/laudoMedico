import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

import * as Errors from '../services/errors/index.js'

export function auth(req, res, next) {
  const token = req.cookies.token

  if (!token) {
    return next(new Errors.UnauthorizedError('Usuário não autenticado.'))
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET)

    if (!decoded || !decoded.id) {
      return next(new Errors.UnauthorizedError('Token inválido.'))
    }

    req.user = decoded
    next()
  } catch (err) {
    return next(new Errors.UnauthorizedError('Token não recebido'))
  }
}
