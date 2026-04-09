import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import '@/shared/styles/globals.css';
import { cn } from '@/shared/lib/utils';
import SessionAuthProvider from '@/shared/components/session-auth';
import { Toaster } from 'sonner';
import { QueryClientContext } from '@/shared/providers/query-client';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Dentmed',
  description: 'Sistema de cadastro de clínicas para dentistas',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={cn('font-sans', inter.variable)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionAuthProvider>
          <QueryClientContext>{children}</QueryClientContext>
        </SessionAuthProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
