'use client';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavLinks } from './nav-links';
import { useState } from 'react';
import { LoginButton } from '../app/(public)/_components/login-button';

type MobileMenuProps = {
  session: boolean;
};

export const MobileMenu = ({ session }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onHandleClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="md:hidden" asChild>
        <Button
          className="text-black hover:bg-transparent cursor-pointer"
          variant={'ghost'}
          size={'icon'}
        >
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[240px] sm:w-[300px] z-[9999]">
        <SheetHeader>
          <SheetTitle className="font-bold tex">Menu</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col px-4">
          <NavLinks onHandleClick={onHandleClick} />
          <LoginButton session={session} />
        </nav>
      </SheetContent>
    </Sheet>
  );
};
