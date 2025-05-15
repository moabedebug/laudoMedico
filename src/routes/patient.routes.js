import express from 'express'
import { auth } from '../middlewares/auth.middleware.js'
import { patientSchema } from '../schemas/patient.schema.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import * as Controller from '../controllers/patient.controller.js'

const router = express.Router()

router.use(auth)

router.post('/', validateSchema(patientSchema), Controller.create)
router.get('/', Controller.findAll)
router.get('/:id', Controller.findById)
router.put('/:id', validateSchema(patientSchema), Controller.update)
router.delete('/:id', Controller.remove)

export default router
