import { z } from 'zod'

export const reportSchema = z.object({
  patient: z.string().optional(),
  diagnosis: z.string().min(1, 'Diagnóstico não pode ser vazio').max(1000),
  observations: z.string().trim().max(1000).optional(),
  recommendation: z.string().trim().max(1000).optional(),
})
