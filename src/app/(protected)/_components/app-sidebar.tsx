'use client';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import clsx from 'clsx';
import { Banknote, CalendarCheck, Folder, List, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { SidebarLink } from './sidebar-link';

const LINKS = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: <CalendarCheck className="h-6 w-6" />,
  },
  {
    href: '/dashboard/services',
    label: 'Serviços',
    icon: <Folder className="h-6 w-6" />,
  },
  {
    href: '/dashboard/profile',
    label: 'Meu perfil',
    icon: <Settings className="h-6 w-6" />,
  },
  {
    href: '/dashboard/plans',
    label: 'Planos',
    icon: <Banknote className="h-6 w-6" />,
  },
];

export const AppSidebar = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <div
        className={clsx('flex flex-1 flex-col transition-all duration-300', {
          'md:ml-20': isCollapsed,
          'md:ml-64': !isCollapsed,
        })}
      >
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-white px-2 md:hidden md:px-6">
          <Sheet>
            <div className="flex items-center gap-4">
              <SheetTrigger asChild>
                <Button variant={'outline'} size={'icon'} className="md:hidden">
                  <List className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <h1 className="text-base font-semibold md:text-lg">
                Menu Dentmed
              </h1>
            </div>

            <SheetContent side="left" className="p-4 sm:max-w-xs">
              <SheetTitle className="font-semibold">Dentmet</SheetTitle>
              <SheetDescription>Menu administrativo</SheetDescription>

              <nav className="grid gap-2 pt-5 text-base">
                {LINKS.map((item) => (
                  <SidebarLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                    pathname={pathname}
                    isCollapsed={isCollapsed}
                  />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 py-4 md:p-6">{children}</main>

        <Sidebar>
          <SidebarHeader />
          <SidebarContent>
            <SidebarGroup />
            <SidebarGroup />
          </SidebarContent>
          <SidebarFooter />
        </Sidebar>
      </div>
    </div>
  );
};
