import bcryptjs from 'bcryptjs';
import { env } from '../config/env.js';
import { UserRepository } from '../repositories/user.repository.js';
import UserAlreadyExistsError from './errors/UserAlreadyExistsError.js';

const SALT_ROUNDS = env.SALT_ROUNDS;

export async function createUser({ name, email, password }) {
  const existingEmail = await UserRepository.findByEmail(email);
  if (existingEmail) {
    throw new UserAlreadyExistsError();
  }

  const passwordHash = await bcryptjs.hash(password, SALT_ROUNDS);
  const newUser = await UserRepository.create({ name, email, passwordHash });

  const { passwordHash: _, ...userWithoutPassword } = newUser.toObject();
  return userWithoutPassword;
}
