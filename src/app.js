import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'
import { swaggerSpec, swaggerUi } from './config/swagger.js'

import doctorRoutes from './routes/doctor.routes.js'
import patientRoutes from './routes/patient.routes.js'
import reportRoutes from './routes/report.routes.js'

dotenv.config()

export const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/api/v1/doctors', doctorRoutes)
app.use('/api/v1/patients', patientRoutes)
app.use('/api/v1/reports', reportRoutes)

app.use((err, req, res, _next) => {
  console.error('Erro no processamento da requisição:', err)

  const statusCode = err.statusCode || 500
  const message = err.message || 'Erro interno do servidor'

  res.status(statusCode).json({ message })
})
