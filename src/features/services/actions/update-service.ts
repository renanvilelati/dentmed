'use server';

import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { revalidatePath } from 'next/cache';
import z from 'zod';

const formSchema = z.object({
  serviceId: z.string().min(1, 'O id é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório'),
  price: z.number().min(1, 'Preço  é obrigatório'),
  duration: z.int().positive(),
});

type FormSchema = z.infer<typeof formSchema>;

export const updateService = async (formData: FormSchema) => {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: 'Falha ao atualizar serviço',
    };
  }

  const parsedSchema = formSchema.safeParse(formData);

  if (!parsedSchema.success) {
    return {
      error: parsedSchema.error.issues[0].message,
    };
  }

  try {
    await prisma.service.update({
      where: {
        id: formData.serviceId,
        userId: session.user.id,
      },
      data: {
        name: formData.name,
        price: formData.price,
        duration: formData.duration,
      },
    });

    revalidatePath('/dashboard/services');

    return {
      message: 'Serviço atualizado com sucesso!',
    };
  } catch (error) {
    console.error('Erro ao atualizar serviço', error);
    return {
      error: 'Falha ao atualizar serviço',
    };
  }
};
