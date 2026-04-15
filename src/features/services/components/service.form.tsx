import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

export const serviceSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  price: z.string(),
  hours: z.string(),
  minutes: z.string(),
});

export type UseServiceFormProps = {
  initialValues?: {
    name: string;
    price: string;
    hours: string;
    minutes: string;
  };
};

export type TServiceSchema = z.infer<typeof serviceSchema>;

const emptyValues: TServiceSchema = {
  name: '',
  price: '',
  hours: '',
  minutes: '',
};

export const useServiceForm = ({ initialValues }: UseServiceFormProps) => {
  const form = useForm<TServiceSchema>({
    shouldUnregister: true,
    resolver: zodResolver(serviceSchema),
    defaultValues: initialValues || emptyValues,
  });

  useEffect(() => {
    form.reset(initialValues || emptyValues);
  }, [initialValues, form]);

  return form;
};
