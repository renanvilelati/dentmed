'use client';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { NavLinks } from './nav-links';
import { useState } from 'react';
import { AuthenticationDialog } from '@/shared/components/public/authentication-dialog';

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAuthentication, setIsOpenAuthentication] = useState(false);

  const onHandleClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="md:hidden" asChild>
        <Button
          className="cursor-pointer text-black hover:bg-transparent"
          variant={'ghost'}
          size={'icon'}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="z-9999 w-[240px] sm:w-[300px]">
        <SheetHeader>
          <SheetTitle className="tex font-bold">Menu</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col px-4">
          <NavLinks onHandleClick={onHandleClick} />
          <Button onClick={() => setIsOpenAuthentication(true)}>Login</Button>
          <AuthenticationDialog
            isOpen={isOpenAuthentication}
            handleClose={() => setIsOpenAuthentication(false)}
          />
        </nav>
      </SheetContent>
    </Sheet>
  );
};
