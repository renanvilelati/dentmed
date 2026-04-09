import { Card, CardHeader } from '@/shared/components/ui/card';
import { User } from '@root/prisma/src/generated/prisma/client';
import ServicesList from './services-list';
import PageTitle from '@/shared/components/protected/page-title';
import { Folder } from 'lucide-react';
import PageContainer from '@/shared/layout/protected/page-container';
import { getServices } from '../data-access/get-services';

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
