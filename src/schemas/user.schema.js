import { z } from "zod";

export const signupSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    passwor: z.string().min(4, "Senha deve conter no mínimo 4 caracteres")
});
