import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import Link from 'next/link';

type LoginBUttonProps = {
  session: boolean;
};

export const LoginButton = ({ session }: LoginBUttonProps) => {
  return session ? (
    <Link href={'/dashboard'}>Dashboard</Link>
  ) : (
    <Button className="cursor-pointer">
      <LogIn /> Login
    </Button>
  );
};
