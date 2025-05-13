import express from 'express'
import { authenticate } from '../middlewares/auth.middleware.js'
import { validateAuthSchema } from '../middlewares/validateSchema.js'
import { signupSchema, loginSchema } from '../schemas/auth.schema.js'
import { login, logout, signup } from '../controller/auth.controller.js'

const router = express.Router()

router.post('/signup', validateAuthSchema(signupSchema), signup)
router.post('/login', validateAuthSchema(loginSchema), login)
router.post('/logout', authenticate, logout)

router.use((err, req, res, _next) => {
  console.error('Erro no processamento da requisição:', err)
  res.status(500).json({ message: 'Erro interno do servidor' })
})

export default router
