import { DefaultSession } from 'next-auth';
import { User } from '@root/prisma/src/generated/prisma/client';

declare module 'next-auth' {
  interface Session {
    user: User & DefaultSession['user'];
  }
}
