import z from 'zod';

export const createAppointmentSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.email().min(1, 'O e-mail é obrigatório'),
  phone: z.string().min(1, 'O telefone é obrigatório'),
  date: z.date(),
  serviceId: z.string().min(1, 'O serviço é obrigatório'),
  time: z.string().min(1, 'O horário é obrigatório'),
  clinicId: z.string().min(1, 'O ID da clínica é obrigatório'),
});

export type TcreateAppointmentSchema = z.infer<typeof createAppointmentSchema>;
