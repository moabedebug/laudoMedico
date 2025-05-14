import express from 'express'
import { auth } from '../middlewares/auth.middleware.js'
import { patientSchema } from '../schemas/patient.schema.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import {
  create,
  findAll,
  findById,
  update,
  deleted,
} from '../controllers/patient.controller.js'

const router = express.Router()

router.use(auth)

router.post('/', validateSchema(patientSchema), create)
router.get('/', findAll)
router.get('/:id', findById)
router.put('/:id', validateSchema(patientSchema), update)
router.delete('/:id', deleted)

export default router
