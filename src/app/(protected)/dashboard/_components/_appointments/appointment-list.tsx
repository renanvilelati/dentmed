'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSearchParams, useRouter } from 'next/navigation';
import AddPlusButton from '../add-plus-button';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Prisma } from '../../../../../../prisma/src/generated/prisma/client';

type TAppointmentWIthService = Prisma.AppointmentGetPayload<{
  include: {
    service: true;
  };
}>;

type AppointmentListProps = {
  times: string[];
};

const AppointmentList = ({ times }: AppointmentListProps) => {
  const searchParams = useSearchParams();

  const date = searchParams.get('date');

  const { data, isLoading } = useQuery({
    queryKey: ['get-appointments', date],
    queryFn: async () => {
      let activeDate = date;

      if (!activeDate) {
        const today = format(new Date(), 'yyyy-MM-dd');
        activeDate = today;
      }

      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/clinic/appointments?date=${activeDate}`;

      const response = await fetch(url);
      const json = (await response.json()) as TAppointmentWIthService[];
      console.log(json);

      if (!response.ok) {
        return [];
      }

      return json;
    },
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

  const handleClick = () => {
    console.log('clicou');
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl text-gray-500 md:text-2xl">
          Agendamentos
        </CardTitle>
        <AddPlusButton onCLick={handleClick} />
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
                  <div
                    key={item}
                    className="mb-2 flex flex-wrap items-center gap-4 rounded-md bg-orange-200 px-2 py-2"
                  >
                    <p>{item}</p> {' - '}
                    <p>{ocuppant.name}</p> {' - '}
                    <p>{ocuppant.phone}</p>
                  </div>
                );
              }

              return (
                <div
                  key={item}
                  className="mb-2 flex flex-wrap items-center gap-4 rounded-md bg-emerald-100 px-2 py-2"
                >
                  <p>{item}</p> {' - '}
                  <p>Disponível</p>
                </div>
              );
            })
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AppointmentList;
