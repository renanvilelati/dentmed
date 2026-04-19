'use client';
import Image from 'next/image';
import Link from 'next/link';
import { NavLinks } from './nav-links';
import { MobileMenu } from './mobile-menu';
import { useSession } from 'next-auth/react';
import { Button } from '@/shared/components/ui/button';
import { AuthenticationDialog } from '@/shared/components/public/authentication-dialog';
import { useState } from 'react';

export const Header = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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
            <Button onClick={() => setIsOpen(true)}>Login</Button>
          </nav>

          <MobileMenu session={session} />
        </div>
      </header>

      <AuthenticationDialog
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      />
    </>
  );
};
