'use server';

import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { profileSchema, TProfileFormData } from '../schemas/profile-form';
import { revalidatePath } from 'next/cache';

export const updateProfile = async (formData: TProfileFormData) => {
  const session = await auth();

  if (!session?.user.id) {
    return {
      error: 'Usuário não encontrado',
    };
  }

  const schema = profileSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: 'Preencha todos os campos',
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        status: formData.status,
        timeZone: formData.timeZone,
        times: formData.times,
      },
    });

    revalidatePath('/dashboard/profile');

    return {
      message: 'Clínica atualizada com sucesso!',
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'Falha ao atualizar clínica',
    };
  }
};
