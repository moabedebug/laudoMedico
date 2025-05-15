import bcryptjs from 'bcryptjs'
import { env } from '../config/env.js'
import { generateToken } from '../utils/auth.utils.js'
import { DoctorRepository } from '../repositories/doctor.repository.js'

import * as Errors from '../errors/index.js'

const SALT_ROUNDS = env.SALT_ROUNDS

export async function createDoctor({ name, email, password }) {
  const existingEmail = await DoctorRepository.findByEmail(email)
  if (existingEmail) {
    throw new Errors.UserAlreadyExistsError()
  }

  const passwordHash = await bcryptjs.hash(password, SALT_ROUNDS)
  const newDoctor = await DoctorRepository.create({ name, email, passwordHash })

  const token = generateToken(newDoctor)

  const { passwordHash: _, ...userWithoutPassword } = newDoctor.toObject()
  return { doctor: userWithoutPassword, token }
}

export async function loginDoctor({ email, password }) {
  const doctor = await DoctorRepository.findByEmail(email)
  if (!doctor) {
    throw new Errors.InvalidCredentialsError()
  }

  const passwordCompare = await bcryptjs.compare(password, doctor.passwordHash)
  if (!passwordCompare) {
    throw new Errors.InvalidCredentialsError()
  }

  const token = generateToken(doctor)

  const { passwordHash: _, ...doctorWithoutPassword } = doctor.toObject()

  return { doctor: doctorWithoutPassword, token }
}
