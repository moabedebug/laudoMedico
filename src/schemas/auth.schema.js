import { z } from 'zod'

export const signupSchema = z.object({
  name: z.string().trim().min(1, 'Nome é obrigatório'),
  email: z.string().trim().email('Email inválido'),
  password: z
    .string()
    .trim()
    .min(4, 'Senha deve conter no mínimo 4 caracteres'),
})

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty('Todos os campos são requeridos')
    .email('Email ou Senha inválido'),
  password: z
    .string()
    .trim()
    .nonempty('Todos os campos são requeridos')
    .min(4, 'Email ou Senha inválido'),
})
