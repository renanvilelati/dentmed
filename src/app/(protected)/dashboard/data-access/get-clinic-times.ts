'use server';

import { prisma } from '@/lib/prisma';

export const getClinicTimes = async ({ userId }: { userId: string }) => {
  console.log('chamou');
  const emptyValues = {
    times: [],
    userId: '',
  };

  if (!userId) {
    return emptyValues;
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        times: true,
      },
    });

    if (!user) {
      return emptyValues;
    }

    return {
      times: user.times,
      userId: user.id,
    };
  } catch (error) {
    console.error(error);
    return emptyValues;
  }
};
