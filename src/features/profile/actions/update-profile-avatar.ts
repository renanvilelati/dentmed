'use server';

import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { revalidatePath } from 'next/cache';

export const updateProfileAvatar = async ({
  avatarUrl,
}: {
  avatarUrl: string;
}) => {
  const session = await auth();

  if (!session?.user.id) {
    return {
      error: 'Usuário não encontrado',
    };
  }

  if (!avatarUrl) {
    return {
      error: 'Falha ao alterar imagem',
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: avatarUrl,
      },
    });

    revalidatePath('/dashboard/profile');

    return {
      data: 'Imagem alterara com sucesso',
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'Falha ao alterar imagem',
    };
  }
};
