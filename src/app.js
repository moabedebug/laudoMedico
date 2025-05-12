import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import cors from 'cors';

dotenv.config();

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);

app.use((err, req, res, next) => {
  console.error("Erro no processamento da requisição:", err);
  res.status(500).json({ message: "Erro interno do servidor" });
});
