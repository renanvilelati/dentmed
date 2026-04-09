'use server';

import { prisma } from '@/shared/lib/prisma';
import { Prisma } from '@root/prisma/src/generated/prisma/client';

type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true;
    services: {
      where: {
        status: true;
      };
    };
  };
}>;

const getClinicData = async ({
  userId,
}: {
  userId: string;
}): Promise<UserWithServiceAndSubscription | null> => {
  try {
    if (!userId) {
      return null;
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        subscription: true,
        services: {
          where: {
            status: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Erro ao listar clínicas', error);
    return null;
  }
};

export default getClinicData;
