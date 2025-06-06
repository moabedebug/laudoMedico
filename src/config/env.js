import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  MONGO_URI: z.string().url('MONGO_URI inválida'),
  SALT_ROUNDS: z.coerce.number().default(10),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET é obrigatório'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('❌ Erro nas variáveis de ambiente:', _env.error.format())
  process.exit(1)
}

export const env = _env.data
