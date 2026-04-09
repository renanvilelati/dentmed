import clsx from 'clsx';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SidebarLinkProps = {
  href: string;
  icon: LucideIcon;
  label: string;
  pathname: string;
  isCollapsed: boolean;
};

export const SidebarLink = ({
  href,
  icon: Icon,
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
            'bg-red-400 text-white': pathname === href,
            'text-gray-700 hover:bg-gray-100': pathname !== href,
          },
        )}
      >
        <span>
          <Icon className="h-6 w-6" />
        </span>
        {!isCollapsed && <span>{label}</span>}
      </div>
    </Link>
  );
};
