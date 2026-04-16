'use client';
import { useState } from 'react';
import ServiceDialog from './service-dialog';
import { Service } from '@root/prisma/src/generated/prisma/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { Button } from '@/shared/components/ui/button';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/shared/utils/format-currency';
import { formatDuration } from '@/shared/utils/format-duration';
import { disableService } from '../actions/disable-service';
import { toast } from 'sonner';

type ServiceListProps = {
  services: Service[];
};

const ServicesList = ({ services }: ServiceListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const handleDeleteService = async (serviceId: string) => {
    const response = await disableService({ serviceId });

    if (response.error) {
      toast(response.error);
      return;
    }

    toast.success(response.message);
  };

  const handleUpdateService = async (service: Service) => {
    setEditingService(service);
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setEditingService(null);
  };

  return (
    <div className="flex flex-col p-4">
      <Button
        size={'lg'}
        className="self-end bg-red-400 hover:bg-red-500"
        onClick={() => setIsOpen(true)}
      >
        <Plus /> Adicionar
      </Button>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nome</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Duração</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell className="font-medium">{service.name}</TableCell>
              <TableCell>{formatCurrency(service.price / 100)}</TableCell>
              <TableCell>{formatDuration(service.duration)}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleUpdateService(service)}
                  variant={'secondary'}
                >
                  <Edit2 />
                </Button>
                <Button
                  onClick={() => handleDeleteService(service.id)}
                  variant={'secondary'}
                >
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ServiceDialog
        isOpen={isOpen}
        handleCloseDialog={handleCloseDialog}
        serviceId={editingService ? editingService.id : undefined}
        initialValues={
          editingService
            ? {
                name: editingService.name,
                price: (editingService.price / 100)
                  .toFixed(2)
                  .replace('.', ','),
                hours: Math.floor(editingService.duration / 60).toString(),
                minutes: Math.floor(editingService.duration % 60).toString(),
              }
            : undefined
        }
      />
    </div>
  );
};

export default ServicesList;
