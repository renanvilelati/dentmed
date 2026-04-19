import z from 'zod';

export const signupSchema = z.object({
  email: z.email('Digite um e-mail válido'),
  password: z.string().min(1, 'A senha é obrigatória'),
  name: z.string().min(1, 'O nome é obrigatório'),
});

export type TsignupSchema = z.infer<typeof signupSchema>;
