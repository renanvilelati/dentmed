'use client';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import clsx from 'clsx';
import {
  Banknote,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Folder,
  List,
  LogOut,
  Settings,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { SidebarLink } from './sidebar-link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';

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

  const router = useRouter();

  const { update } = useSession();

  const handleSignOut = async () => {
    await signOut();
    await update();
    router.replace('/');
  };

  return (
    <div className="flex min-h-screen w-full">
      <aside
        className={clsx(
          'bg-background flex h-full flex-col border-r p-4 transition-all duration-300',
          {
            'w-20': isCollapsed,
            'w-64': !isCollapsed,
            'hidden md:fixed md:flex': true,
          },
        )}
      >
        <div className="mt-4 mb-6">
          {!isCollapsed && (
            <Image
              src={'/large-logo.svg'}
              alt="Logo da Dentmed"
              quality={100}
              priority
              width={120}
              height={120}
            />
          )}
        </div>

        <Button
          className="mb-2 self-end bg-gray-100 text-zinc-900 hover:bg-gray-50"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {!isCollapsed ? (
            <ChevronLeft className="h-12 w-12" />
          ) : (
            <ChevronRight className="h-12 w-12" />
          )}
        </Button>

        <div className="flex h-full flex-col justify-between">
          <nav className="flex flex-col gap-1 overflow-hidden">
            {!isCollapsed && (
              <span className="mt-1 text-sm font-medium text-gray-400 uppercase">
                Painel
              </span>
            )}

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
          <Button onClick={handleSignOut}>
            {!isCollapsed ? 'Sair' : <LogOut />}
          </Button>
        </div>
      </aside>

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

              <div className="flex h-full flex-col justify-between">
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
                <Button onClick={handleSignOut}>
                  {' '}
                  <LogOut /> Sair
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 py-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};
