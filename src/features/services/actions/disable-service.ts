'use server';

import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { revalidatePath } from 'next/cache';
import z from 'zod';

const formSchema = z.object({
  serviceId: z.string().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

export const disableService = async (formData: FormSchema) => {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: 'Falha ao deletar serviço',
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
        status: false,
      },
    });

    revalidatePath('/dashboard/services');

    return {
      message: 'Serviço deletado com sucesso!',
    };
  } catch (error) {
    console.error('Erro ao deletar serviço:', error);
    return {
      error: 'Falha ao deletar serviço',
    };
  }
};
