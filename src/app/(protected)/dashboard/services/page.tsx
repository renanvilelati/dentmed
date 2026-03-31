import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ServicesContent from './_components/services-content';

const Services = async () => {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  return <ServicesContent user={session.user} />;
};

export default Services;
