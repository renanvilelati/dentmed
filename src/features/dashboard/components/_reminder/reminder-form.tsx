'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

export const reminderSchema = z.object({
  description: z.string().min(1, 'A descrição é obrigatória'),
});

export type TReminderSchema = z.infer<typeof reminderSchema>;

export const useReminderForm = () => {
  return useForm<TReminderSchema>({
    shouldUnregister: true,
    resolver: zodResolver(reminderSchema),
    defaultValues: {
      description: '',
    },
  });
};
