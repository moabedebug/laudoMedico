import express from 'express'
import { auth } from '../middlewares/auth.middleware.js'
import * as Controller from '../controllers/doctor.controller.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { signupSchema, loginSchema } from '../schemas/auth.schema.js'

const router = express.Router()

router.post('/signup', validateSchema(signupSchema), Controller.signup)
router.post('/login', validateSchema(loginSchema), Controller.login)
router.post('/logout', auth, Controller.logout)

export default router
