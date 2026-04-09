'use server';

import { prisma } from '@/lib/prisma';

export const getProfessionals = async () => {
  try {
    const professionals = prisma.user.findMany({
      where: {
        status: true,
      },
    });

    return professionals;
  } catch (error) {
    console.error(error);
    return [];
  }
};
