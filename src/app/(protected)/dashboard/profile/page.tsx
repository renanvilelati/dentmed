import { auth } from '@/shared/lib/auth';
import { redirect } from 'next/navigation';
import { getUserData } from '@/features/profile/data-access/get-user-data';
import ProfileContent from '@/features/profile/components/profile-content';

const ProfilePage = async () => {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  const user = await getUserData({ userId: session?.user?.id });

  if (!user) {
    redirect('/');
  }

  return <ProfileContent user={user} />;
};

export default ProfilePage;
