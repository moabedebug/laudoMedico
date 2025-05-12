import { createUser, loginUser } from '../services/user.services.js';

import UserAlreadyExistsError from '../services/errors/UserAlreadyExistsError.js';
import InvalidCredentialsError from '../services/errors/InvalidCredentialsError.js';

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

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await loginUser({ email, password });

    res.status(200).json({
      message: "Login realizado com sucesso",
      user
    });
  } catch (err) {
    console.error("Error no login:", err.message);

    if(err instanceof InvalidCredentialsError) {
      return res.status(err.statusCode).json({ message: err.message });
    }

    res.status(500).json({ message: "Erro interno no servidor"});

  }
}
