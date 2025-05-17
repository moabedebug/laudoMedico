import express from 'express'
import { auth } from '../middlewares/auth.middleware.js'
import { reportSchema } from '../schemas/report.schema.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import * as Controller from '../controllers/report.controller.js'

const router = express.Router()

router.use(auth)

router.post('/', validateSchema(reportSchema), Controller.create)
router.get('/patient/:id', Controller.findReportsByPatient)
router.get('/doctor', Controller.findReportsByDoctor)
router.get('/:id', Controller.findById)
router.put('/:id', validateSchema(reportSchema), Controller.update)
router.delete('/:id', Controller.remove)
router.get('/:id/download', Controller.generatePdf)

export default router
