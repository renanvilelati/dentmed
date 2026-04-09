'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSearchParams } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Prisma } from '../../../../../../prisma/src/generated/prisma/client';
import { Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cancelAppointment } from '../../_actions/cancel-appointment';
import { toast } from 'sonner';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import DialogAppointment from './dialog-appointment';
import DateButton from './date-picker-button';

export type TAppointmentWIthService = Prisma.AppointmentGetPayload<{
  include: {
    service: true;
  };
}>;

type AppointmentListProps = {
  times: string[];
};

const AppointmentList = ({ times }: AppointmentListProps) => {
  const [open, setOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<TAppointmentWIthService | null>(null);
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const date = searchParams.get('date');

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['get-appointments', date],
    queryFn: async () => {
      let activeDate = date;

      if (!activeDate) {
        const today = format(new Date(), 'yyyy-MM-dd');
        activeDate = today;
      }

      const url = `${process.env.NEXT_PUBLIC_URL}/api/clinic/appointments?date=${activeDate}`;

      const response = await fetch(url);
      const json = (await response.json()) as TAppointmentWIthService[];

      if (!response.ok) {
        return [];
      }

      return json;
    },
    staleTime: 30000,
    refetchInterval: 60000,
  });

  const occupantMap: Record<string, TAppointmentWIthService> = {};

  if (data && data.length > 0) {
    for (const appointment of data) {
      const requiredSlots = Math.ceil(appointment.service.duration / 30);

      const startIndex = times.indexOf(appointment.time);

      if (startIndex !== -1) {
        for (let i = 0; i < requiredSlots; i++) {
          const slotIndex = startIndex + i;

          if (slotIndex < times.length) {
            occupantMap[times[slotIndex]] = appointment;
          }
        }
      }
    }
  }

  const handleCancelAppointment = async (appointmentId: string) => {
    const response = await cancelAppointment({ appointmentId });

    if (response.error) {
      toast.error(response.error);
      return;
    }

    queryClient.invalidateQueries({ queryKey: ['get-appointments'] });
    await refetch();
    toast.success(response.message);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Card>
        <CardHeader className="flex items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl text-gray-500 md:text-2xl">
            Agendamentos
          </CardTitle>

          <DateButton />
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-340 w-full flex-1 pr-0 lg:max-h-[calc(100vh-15rem)]">
            {isLoading ? (
              <p>Carregando...</p>
            ) : (
              times.map((item) => {
                const ocuppant = occupantMap[item];

                if (ocuppant) {
                  return (
                    <div key={item} className="flex">
                      <div className="mb-1 flex w-full items-center gap-2 p-1 pl-0">
                        <p>{item}</p>
                        <div className="ml-3 flex w-full gap-4 rounded bg-orange-100 p-2">
                          <p>{ocuppant.name}</p> {' - '}
                          <p>{ocuppant.phone}</p>
                        </div>
                        <div className="flex gap-2">
                          <DialogTrigger asChild>
                            <Button
                              size={'sm'}
                              className="bg-blue-400 hover:bg-blue-500"
                              onClick={() => setSelectedAppointment(ocuppant)}
                            >
                              <Eye />
                            </Button>
                          </DialogTrigger>
                          <Button
                            size={'sm'}
                            className="bg-red-400 hover:bg-red-500"
                            onClick={() => handleCancelAppointment(ocuppant.id)}
                          >
                            <X />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={item} className="mb-2 flex items-center gap-2">
                    <p className="min-w-12">{item}</p>
                    <p className="rounded bg-emerald-500 p-1.5 text-white">
                      Disponível
                    </p>
                  </div>
                );
              })
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      <DialogAppointment appointment={selectedAppointment} />
    </Dialog>
  );
};

export default AppointmentList;
