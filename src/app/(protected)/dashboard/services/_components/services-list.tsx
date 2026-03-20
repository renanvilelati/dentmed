'use client';
import { useState } from 'react';
import ServiceDialog from './service-dialog';
import { Service } from '../../../../../../prisma/src/generated/prisma/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDuration } from '@/utils/formatDuration';

type ServiceListProps = {
  services: Service[];
};

const ServicesList = ({ services }: ServiceListProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col p-4">
      <Button size={'lg'} className="self-end" onClick={() => setIsOpen(true)}>
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
                <Button variant={'secondary'}>
                  <Edit2 />
                </Button>
                <Button variant={'secondary'}>
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ServiceDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default ServicesList;
