import { User } from '../model/user.model.js';
import bcryptjs from 'bcryptjs';

function isValidEmail(email) {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
  return regex.test(email);
}

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Email inválido" });
    }

    if (password.length < 4) {
      return res.status(400).json({ message: "A senha deve conter 4 ou mais caracteres" });
    }

    const [existingByEmail, existingByName] = await Promise.all([
      User.findOne({ email }),
      User.findOne({ name }),
    ]);

    if (existingByEmail) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    if (existingByName) {
      return res.status(400).json({ message: "Nome de usuário já existe" });
    }

    const passwordHash = await bcryptjs.hash(password, 6);

    const newUser = new User({
      name,
      email,
      passwordHash,
    });

    await newUser.save();

    const { passwordHash: _, ...userWithoutPassword } = newUser.toObject();

    res.status(201).json({
      message: "Usuário criado com sucesso",
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error("Erro no signup controller:", err.message);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}
