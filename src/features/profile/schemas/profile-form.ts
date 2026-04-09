import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.boolean(),
  timeZone: z.string().min(1, 'O timezone é obrigatório'),
  times: z.array(z.string()),
});

export type TProfileFormData = z.infer<typeof profileSchema>;
