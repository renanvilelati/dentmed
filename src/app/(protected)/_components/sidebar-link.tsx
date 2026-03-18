import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';

type SidebarLinkProps = {
  href: string;
  icon: ReactNode;
  label: string;
  pathname: string;
  isCollapsed: boolean;
};

export const SidebarLink = ({
  href,
  icon,
  isCollapsed,
  label,
  pathname,
}: SidebarLinkProps) => {
  return (
    <Link href={href}>
      <div
        className={clsx(
          'flex items-center gap-2 rounded-md p-2 transition-colors',
          {
            'bg-orange-500 text-white': pathname === href,
            'text-gray-700 hover:bg-gray-100': pathname !== href,
          },
        )}
      >
        <span className="h-6 w-6">{icon}</span>
        {!isCollapsed && <span>{label}</span>}
      </div>
    </Link>
  );
};
