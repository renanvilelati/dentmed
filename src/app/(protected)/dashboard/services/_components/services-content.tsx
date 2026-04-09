import { Card, CardHeader } from '@/shared/components/ui/card';
import { User } from '../../../../../../prisma/src/generated/prisma/client';
import { getServices } from '../_data-access/get-services';
import ServicesList from './services-list';
import PageTitle from '@/shared/layout/page-title';
import { Folder } from 'lucide-react';
import PageContainer from '@/shared/layout/page-container';

type ServicesContentProps = {
  user: User;
};

const ServicesContent = async ({ user }: ServicesContentProps) => {
  const services = await getServices(user.id);
  return (
    <PageContainer>
      <Card className="w-full">
        <CardHeader>
          <PageTitle>
            <div className="flex items-center gap-2">
              <Folder className="h-8 w-8" /> Serviços
            </div>
          </PageTitle>
        </CardHeader>
        <ServicesList services={services.data || []} />
      </Card>
    </PageContainer>
  );
};

export default ServicesContent;
