'use client';
import Image from 'next/image';
import Link from 'next/link';
import { NavLinks } from './nav-links';
import { LoginButton } from '../app/(public)/_components/login-button';
import { MobileMenu } from './mobile-menu';
import { useSession } from 'next-auth/react';

export const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header className="fixed top-0 right-0 left-0 z-999 bg-white py-2">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <Image
            src={'large-logo.svg'}
            width={200}
            height={120}
            alt="logo da empresa dentmed"
          />
        </Link>

        <nav className="hidden items-center md:flex">
          <NavLinks />
          <LoginButton session={session} />
        </nav>

        <MobileMenu session={session} />
      </div>
    </header>
  );
};
