'use server';

import { prisma } from '@/shared/lib/prisma';

export const getServices = async (userId: string) => {
  if (!userId) {
    return {
      error: 'Falha ao buscar serviços',
    };
  }

  try {
    const services = await prisma.service.findMany({
      where: {
        userId: userId,
        status: true,
      },
    });

    return {
      data: services,
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'Falha ao buscar serviços',
    };
  }
};
