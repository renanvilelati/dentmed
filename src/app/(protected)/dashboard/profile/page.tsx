import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getUserData } from './data-access/get-user-data';

const ProfilePage = async () => {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  const user = await getUserData({ userId: session?.user?.id });

  if (!user) {
    redirect('/');
  }

  return <div>ProfilePage</div>;
};

export default ProfilePage;
