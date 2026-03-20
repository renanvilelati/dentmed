import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ServicesContent from './_components/services-content';

const Services = async () => {
  const session = await auth();

  console.log(session, 'session');

  if (!session) {
    redirect('/');
  }

  return <ServicesContent user={session.user} />;
};

export default Services;
