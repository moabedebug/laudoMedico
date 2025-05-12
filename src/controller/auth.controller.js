import { createUser } from '../services/user.services.js';

export async function signup(req, res) {
  try {
    const user = await createUser(parsed.data);

    res.status(201).json({
      message: "Usuário criado com sucesso",
      user
    });
  } catch (err) {
    console.error("Erro no signup:", err.message);
    res.status(500).json("Erro interno no servidor");
  }
}
