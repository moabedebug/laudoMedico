import express from 'express'
import { auth } from '../middlewares/auth.middleware.js'
import { patientSchema } from '../schemas/patient.schema.js'
import { validateSchemaAuth } from '../middlewares/validateSchemaAuth.js'
import {
  create,
  findAll,
  findById,
  update,
  deleted,
} from '../controllers/patient.controller.js'

const router = express.Router()

router.use(auth)

router.post('/', validateSchemaAuth(patientSchema), create)
router.get('/', findAll)
router.get('/:id', findById)
router.put('/:id', validateSchemaAuth(patientSchema), update)
router.delete('/:id', deleted)

export default router
