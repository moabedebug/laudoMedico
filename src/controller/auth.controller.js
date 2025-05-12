import { signupSchema } from '../schemas/user.schema.js';
import { createUser } from '../services/user.services.js';

export async function signup(req, res) {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      const errorMsg = parsed.error.issues[0].message;
      return res.status(400).json({ message: errorMsg });
    }

    const user = await createUser(parsed.data);

    res.status(201).json({
      message: "Usuário criado com sucesso",
      user
    });
  } catch (err) {
    console.error("Erro no signup:", err.message);
    res.status(400).json({ message: err.message });
  }
}
