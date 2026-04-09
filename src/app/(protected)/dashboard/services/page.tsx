import { auth } from '@/shared/lib/auth';
import { redirect } from 'next/navigation';
import ServicesContent from './_components/services-content';
import { Suspense } from 'react';
import { SkeletonCard } from '@/shared/layout/skeleton-card';

const Services = async () => {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  return (
    <Suspense fallback={<SkeletonCard />}>
      <ServicesContent user={session.user} />
    </Suspense>
  );
};

export default Services;
