import { z } from 'zod'

export const patientSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 letras'),
  age: z
    .number()
    .int('Idade deve ser um número inteiro')
    .min(0, 'Idade não pode ser negativa')
    .max(130, 'Idade deve ser entre 0 e 130'),
  cpf: z
    .string()
    .length(14, 'CPF deve ter exatamente 11 dígitos numéricos')
    .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, 'CPF inválido')
    .transform((cpf) => cpf.replace(/\D/g, '')),
  phone: z
    .string()
    .length(15, 'Número Telefônico deve ter exatamente 11 dígitos')
    .regex(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "Telefone deve conter apenas números e, opcionalmente, o símbolo '+'",
    )
    .transform((phone) => phone.replace(/\D/g, '')),
  email: z.string().email('Email inválido'),
  gender: z.enum(['Masculino', 'Feminino', 'Outro'], {
    errorMap: () => ({ message: 'Gênero inválido' }),
  }),
})
