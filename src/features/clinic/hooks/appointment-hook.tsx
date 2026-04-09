'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

export const appointmentSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.email('E-mail é obrigatório'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  date: z.date(),
  serviceId: z.string().min(1, 'O id do serviço é obrigatório'),
});

export type TAppointmentFormData = z.infer<typeof appointmentSchema>;

export const useAppointmentForm = () => {
  return useForm({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      date: new Date(),
    },
  });
};
