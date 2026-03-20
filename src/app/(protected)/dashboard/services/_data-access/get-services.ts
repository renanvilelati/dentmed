'use server';

import { prisma } from '@/lib/prisma';

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
