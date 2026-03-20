import { Card, CardHeader } from '@/components/ui/card';
import { User } from '../../../../../../prisma/src/generated/prisma/client';
import { getServices } from '../_data-access/get-services';
import ServicesList from './services-list';
import PageTitle from '@/layout/page-title';

type ServicesContentProps = {
  user: User;
};

const ServicesContent = async ({ user }: ServicesContentProps) => {
  const services = await getServices(user.id);
  return (
    <div className="mx-auto">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <PageTitle>Serviços</PageTitle>
        </CardHeader>
        <ServicesList services={services.data || []} />
      </Card>
    </div>
  );
};

export default ServicesContent;
