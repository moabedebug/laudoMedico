import { createUser } from '../services/user.services.js';
import UserAlreadyExistsError from '../services/errors/UserAlreadyExistsError.js';

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;
    const user = await createUser({ name, email, password });

    res.status(201).json({
      message: "Usuário criado com sucesso",
      user
    });
  } catch (err) {
    console.error("Erro no signup:", err.message);

    if(err instanceof UserAlreadyExistsError) {
      return res.status(err.statusCode).json({ message: err.message });
    }

    res.status(500).json({ message: "Erro interno no servidor"});
  }
}
