'use server';

import { signIn } from '@/lib/auth';

export const handleRegister = async (provider: string) => {
  await signIn(provider, { redirectTo: '/dashboard' });
};
