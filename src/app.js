import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js'
import PatientRoutes from './routes/patient.routes.js'

dotenv.config()

export const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/patients', PatientRoutes)

app.use((err, req, res, _next) => {
  console.error('Erro no processamento da requisição:', err)
  res.status(500).json({ message: 'Erro interno do servidor' })
})
