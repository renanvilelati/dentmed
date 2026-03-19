import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { Session } from 'next-auth';
import Link from 'next/link';
import { handleRegister } from '../_actions/login';

type LoginBUttonProps = {
  session: Session | null;
};

const handleLogin = async (adapterName: string) => {
  await handleRegister(adapterName);
};

export const LoginButton = ({ session }: LoginBUttonProps) => {
  return session ? (
    <Button asChild>
      <Link href={'/dashboard'}>Dashboard</Link>
    </Button>
  ) : (
    <>
      <Button className="cursor-pointer" onClick={() => handleLogin('google')}>
        <LogIn /> Login com Google
      </Button>
    </>
  );
};
