import { Button } from '@/components/ui/button';
import { Session } from 'next-auth';
import Link from 'next/link';
import { handleRegister } from '../_actions/login';
import Image from 'next/image';

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
      <Button variant="outline" onClick={() => handleLogin('google')}>
        <Image
          src={'/google.png'}
          alt="Logo do Google"
          width={20}
          height={20}
        />
        Login com Google
      </Button>
    </>
  );
};
