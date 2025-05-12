import bcryptjs from 'bcryptjs';
import { UserRepository } from '../repositories/user.repository.js';

export async function createUser({ name, email, password }) {
  const existingEmail = await UserRepository.findByEmail(email);
  if (existingEmail) {
    throw new Error("Email já cadastrado");
  }

  const existingName = await UserRepository.findByName(name);
  if (existingName) {
    throw new Error("Nome de usuário já existe");
  }

  const passwordHash = await bcryptjs.hash(password, 6);
  const newUser = await UserRepository.create({ name, email, passwordHash });

  const { passwordHash: _, ...userWithoutPassword } = newUser.toObject();
  return userWithoutPassword;
}
