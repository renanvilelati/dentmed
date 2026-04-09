import { redirect } from 'next/navigation';
import getClinicData from '@/features/clinic/data-access/get-clinic-data';
import ClinicContent from '@/features/clinic/components/clinic-content';

const ClinicPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const clinic = await getClinicData({ userId: id });

  if (!clinic) {
    redirect('/');
  }

  return <ClinicContent clinic={clinic} />;
};

export default ClinicPage;
