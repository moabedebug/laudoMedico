import { z } from 'z'

export const patientSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 letras'),
  age: z
    .String()
    .min(0, 'Idade não pode ser negativa')
    .max(130, 'Idade deve ser um valor razoável entre 0 e 130'),
  cpf: z
    .string()
    .lenght(11, 'CPF deve ter exatamente 11 dígitos')
    .regex(/^\d{11}$/, 'CPF deve conter apenas números'),
  phone: z
    .string()
    .min(10, 'Número de telefone deve ter pelo menos 10 dígitos')
    .max(15, 'Número de telefone não pode ter mais de 15 dígitos')
    .regex(
      /^\+?\d{10,15}$/,
      "Telefone deve conter apenas números e, opcionalmente, o símbolo '+'",
    ),
  email: z.string().email('Email inválido'),
  gender: z.enum(['Masculino', 'Feminino', 'Outro'], 'Gênero inválido'),
  address: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
})
