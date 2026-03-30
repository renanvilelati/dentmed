'use server';

import { prisma } from '@/lib/prisma';

export const getReminders = async ({ userId }: { userId: string }) => {
  if (!userId) {
    return [];
  }

  try {
    const reminders = await prisma.reminder.findMany({
      where: {
        userId: userId,
      },
    });

    return reminders;
  } catch (error) {
    console.error(error);
    return [];
  }
};
