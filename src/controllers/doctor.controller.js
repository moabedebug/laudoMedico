import { env } from '../config/env.js'
import { sendTokenReponse } from '../utils/sendTokenResponse.js'
import { createDoctor, loginDoctor } from '../services/doctor.services.js'

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body
    const { doctor, token } = await createDoctor({ name, email, password })

    sendTokenReponse(res, doctor, token, 'Usuário criado com sucesso', 201)
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message })
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body

    const { doctor, token } = await loginDoctor({ email, password })

    sendTokenReponse(res, doctor, token, 'Login realizado com sucesso', 200)
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message })
  }
}

export function logout(req, res) {
  try {
    res
      .clearCookie('token', {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      .status(200)
      .json({ message: 'Logout realizado com sucesso' })
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message })
  }
}
