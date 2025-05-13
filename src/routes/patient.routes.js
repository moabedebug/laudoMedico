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
} from '../controller/patient.controller.js'

const router = express.Router()

router.use(auth)

router.post('/', validateSchema(patientSchema), create)
router.get('/', findAll)
router.get('/:id', findById)
router.put('/:id', validateSchema(patientSchema), update)
router.delete('/:id', deleted)

router.use((err, req, res, _next) => {
  console.error('Erro no processamento da requisição:', err)
  res.status(500).json({ message: 'Erro interno do servidor' })
})

export default router
