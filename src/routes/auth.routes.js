import express from 'express';
import { login, signup } from '../controller/auth.controller.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { signupSchema, loginSchema } from '../schemas/user.schema.js';

const router = express.Router();

router.post('/signup', validateSchema(signupSchema), signup);
router.post('/login',validateSchema(loginSchema), login)

router.use((err, req, res, next) => {
  console.error("Erro no processamento da requisição:", err);
  res.status(500).json({ message: "Erro interno do servidor" });
});

export default router;
