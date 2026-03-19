'use client';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

const SessionAuthProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionAuthProvider;
