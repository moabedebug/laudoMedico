import bcryptjs from 'bcryptjs';
import { env } from '../config/env.js';
import { UserRepository } from '../repositories/users.repository.js';

import UserAlreadyExistsError from './errors/UserAlreadyExistsError.js';
import InvalidCredentialsError from './errors/InvalidCredentialsError.js';

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

export async function loginUser({ email, password }) {

  const user = await UserRepository.findByEmail(email);
  if(!user) {
      throw new InvalidCredentialsError();
  }

  const passwordCompare = await bcryptjs.compare(password, user.passwordHash);
  if(!passwordCompare) {
    throw new InvalidCredentialsError();
  }

  const { passwordHash: _, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
}
