import bcryptjs from 'bcryptjs';
import { env } from '../config/env.js';
import { UserRepository } from '../repositories/user.repository.js';

const SALT_ROUNDS = env.SALT_ROUNDS;

if (isNaN(SALT_ROUNDS) || SALT_ROUNDS <= 0) {
  throw new Error("SALT_ROUNDS deve ser um número válido e maior que 0.");
}

export async function createUser({ name, email, password }) {
  const existingEmail = await UserRepository.findByEmail(email);
  if (existingEmail) {
    throw new Error("Email já cadastrado");
  }

  const existingName = await UserRepository.findByName(name);
  if (existingName) {
    throw new Error("Nome de usuário já existe");
  }

  const passwordHash = await bcryptjs.hash(password, SALT_ROUNDS);
  const newUser = await UserRepository.create({ name, email, passwordHash });

  const { passwordHash: _, ...userWithoutPassword } = newUser.toObject();
  return userWithoutPassword;
}
