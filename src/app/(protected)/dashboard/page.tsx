import { Button } from '@/shared/components/ui/button';
import { auth } from '@/shared/lib/auth';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import ButtonCopy from '@/features/dashboard/components/button-copy';
import Reminders from '@/features/dashboard/components/_reminder/reminders';
import Appointments from '@/features/dashboard/components/_appointments/appointments';
import PageContainer from '@/shared/layout/protected/page-container';
import { Suspense } from 'react';
import { SkeletonCard } from '@/shared/components/protected/skeleton-card';

const DashboardPage = async () => {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  return (
    <PageContainer>
      <main>
        <div className="flex items-center justify-end space-x-2">
          <Link href={`/clinic/${session.user.id}`} target="_blank">
            <Button className="flex-1 bg-red-400 hover:bg-red-500 md:flex-0">
              <Calendar className="h-5 w-5" />
              <span>Novo agendamento</span>
            </Button>
          </Link>
          <ButtonCopy userId={session.user.id} />
        </div>

        <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Suspense fallback={<SkeletonCard />}>
            <Appointments userId={session.user.id} />
          </Suspense>
          <Suspense fallback={<SkeletonCard />}>
            <Reminders userId={session.user.id} />
          </Suspense>
        </section>
      </main>
    </PageContainer>
  );
};

export default DashboardPage;
