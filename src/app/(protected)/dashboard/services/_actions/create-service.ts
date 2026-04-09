'use server';

import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { revalidatePath } from 'next/cache';
import z from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  price: z.number().min(1, 'Preço é obrigatório'),
  duration: z.number().int().positive(),
});

export const createService = async (formData: z.infer<typeof formSchema>) => {
  const session = await auth();

  if (!session?.user.id) {
    return {
      error: 'Falha ao cadastrar serviço',
    };
  }

  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    };
  }

  try {
    const newService = await prisma.service.create({
      data: {
        name: formData.name,
        price: formData.price,
        duration: formData.duration,
        userId: session.user.id,
      },
    });

    revalidatePath('/dashboard/service');

    return {
      data: newService,
      message: 'Serviço criado com sucesso!',
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'Falha ao cadastrar serviço',
    };
  }
};
