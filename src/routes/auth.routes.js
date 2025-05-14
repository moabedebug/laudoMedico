import express from 'express'
import { auth } from '../middlewares/auth.middleware.js'
import { signupSchema, loginSchema } from '../schemas/auth.schema.js'
import { login, logout, signup } from '../controllers/auth.controller.js'
import { validateSchemaAuth } from '../middlewares/validateSchemaAuth.js'

const router = express.Router()

router.post('/signup', validateSchemaAuth(signupSchema), signup)
router.post('/login', validateSchemaAuth(loginSchema), login)
router.post('/logout', auth, logout)

export default router
