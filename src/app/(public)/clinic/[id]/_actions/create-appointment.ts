'use server';

import { prisma } from '@/shared/lib/prisma';
import z from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.email().min(1, 'O e-mail é obrigatório'),
  phone: z.string().min(1, 'O telefone é obrigatório'),
  date: z.date(),
  serviceId: z.string().min(1, 'O serviço é obrigatório'),
  time: z.string().min(1, 'O horário é obrigatório'),
  clinicId: z.string().min(1, 'O ID da clínica é obrigatório'),
});

type FormSchema = z.infer<typeof formSchema>;

export const createNewAppointment = async (formData: FormSchema) => {
  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    };
  }

  try {
    const selectedDate = new Date(formData.date);

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const day = selectedDate.getDate();

    const appointmentDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));

    const newAppointment = await prisma.appointment.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        time: formData.time,
        appointmentDate: appointmentDate,
        serviceId: formData.serviceId,
        userId: formData.clinicId,
      },
    });

    return {
      data: newAppointment,
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'Erro ao cadastrar agendamento',
    };
  }
};
