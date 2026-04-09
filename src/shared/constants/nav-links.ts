import { CalendarCheck, Folder, Settings, Banknote } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const LINKS: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: CalendarCheck,
  },
  {
    href: '/dashboard/services',
    label: 'Serviços',
    icon: Folder,
  },
  {
    href: '/dashboard/profile',
    label: 'Meu perfil',
    icon: Settings,
  },
  {
    href: '/dashboard/plans',
    label: 'Planos',
    icon: Banknote,
  },
];
