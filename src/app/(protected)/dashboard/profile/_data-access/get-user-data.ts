'use server';

import { prisma } from '@/shared/lib/prisma';

type TGetUserData = {
  userId: string;
};

export const getUserData = async ({ userId }: TGetUserData) => {
  if (!userId) {
    return null;
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        subscription: true,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
};
