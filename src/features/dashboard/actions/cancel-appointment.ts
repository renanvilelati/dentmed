'use server';

import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { revalidatePath } from 'next/cache';
import z from 'zod';

const formSchema = z.object({
  appointmentId: z.string().min(1, 'O id é obrigatório'),
});

type FormSchema = z.infer<typeof formSchema>;

export const cancelAppointment = async (formData: FormSchema) => {
  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: schema.error.issues[0]?.message,
    };
  }

  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: 'Usuário não encontrado',
    };
  }

  try {
    await prisma.appointment.delete({
      where: {
        id: formData.appointmentId,
      },
    });

    revalidatePath('/dashboard');

    return {
      message: 'Agendamento cancelado com sucesso!',
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'Erro ao cancelar agendamento',
    };
  }
};
