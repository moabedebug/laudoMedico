import { env } from '../config/env.js'

export function sendTokenReponse(
  res,
  doctor,
  token,
  message,
  statusCode = 200,
) {
  res
    .cookie('token', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 Hour
    })
    .status(statusCode)
    .json({
      message,
      token,
      doctor,
    })
}
