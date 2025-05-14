import express from 'express'
import { auth } from '../middlewares/auth.middleware.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { signupSchema, loginSchema } from '../schemas/auth.schema.js'
import { login, logout, signup } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/signup', validateSchema(signupSchema), signup)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', auth, logout)

export default router
