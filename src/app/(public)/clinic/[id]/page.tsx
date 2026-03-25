import { redirect } from 'next/navigation';
import getClinicData from './_data-access/get-clinic-data';
import ClinicContent from './_components/clinic-content';

const ClinicPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const clinic = await getClinicData({ userId: id });

  if (!clinic) {
    redirect('/');
  }

  return <ClinicContent clinic={clinic} />;
};

export default ClinicPage;
