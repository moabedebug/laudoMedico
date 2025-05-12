import { createUser, loginUser } from '../services/auth.services.js';

import UserAlreadyExistsError from '../services/errors/UserAlreadyExistsError.js';
import InvalidCredentialsError from '../services/errors/InvalidCredentialsError.js';
import { sendTokenReponse } from '../utils/sendTokenResponse.js';

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await createUser({ name, email, password });

    sendTokenReponse(res, user, token,"Usuário criado com sucesso", 201);
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
    const { user, token } = await loginUser({ email, password });

     sendTokenReponse(res, user, token, "Login realizado com sucesso");
  } catch (err) {
    console.error("Error no login:", err.message);

    if(err instanceof InvalidCredentialsError) {
      return res.status(err.statusCode).json({ message: err.message });
    }

    res.status(500).json({ message: "Erro interno no servidor"});

  }
}
