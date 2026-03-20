import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

export const serviceSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  price: z.string(),
  hours: z.string(),
  minutes: z.string(),
});

export type TServiceSchema = z.infer<typeof serviceSchema>;

export const useServiceForm = () => {
  return useForm<TServiceSchema>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: '',
      price: '',
      hours: '',
      minutes: '',
    },
  });
};
