import { Button } from '@/components/ui/button';
import Link from 'next/link';

const navItems = [
  {
    href: '#profissionals',
    label: 'Profissionais',
  },
];

type NavLinksProps = {
  onHandleClick?: () => void;
};

export const NavLinks = ({ onHandleClick }: NavLinksProps) => {
  return navItems.map((item) => (
    <Button
      key={item.href}
      onClick={onHandleClick}
      variant={'ghost'}
      className="bg-transparent text-black"
    >
      <Link href={item.href}>{item.label}</Link>
    </Button>
  ));
};
