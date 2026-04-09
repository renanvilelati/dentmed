import { Prisma } from '@root/prisma/src/generated/prisma/client';

export type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true;
    services: true;
  };
}>;

export type ClinicContentProps = {
  clinic: UserWithServiceAndSubscription;
};
