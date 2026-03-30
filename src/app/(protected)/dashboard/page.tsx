import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import ButtonCopy from './_components/button-copy';
import Reminders from './_components/_reminder/reminders';

const DashboardPage = async () => {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  return (
    <main>
      <div className="flex items-center justify-end space-x-2">
        <Link href={`/clinic/${session.user.id}`} target="_blank">
          <Button className="flex-1 bg-orange-500 hover:bg-orange-400 md:flex-0">
            <Calendar className="h-5 w-5" />
            <span>Novo agendamento</span>
          </Button>
        </Link>
        <ButtonCopy userId={session.user.id} />
      </div>

      <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>Agenda</div>
        <Reminders userId={session.user.id} />
      </section>
    </main>
  );
};

export default DashboardPage;
