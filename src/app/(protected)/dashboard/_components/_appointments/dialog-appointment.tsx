import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { TAppointmentWIthService } from './appointment-list';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDuration } from '@/utils/formatDuration';
import { Separator } from '@/components/ui/separator';

type DialogAppointmentProps = {
  appointment: TAppointmentWIthService | null;
};

const DialogAppointment = ({ appointment }: DialogAppointmentProps) => {
  return (
    <DialogContent className="gap-2">
      <DialogHeader>
        <DialogTitle className="text-sm text-gray-700 md:text-xl">
          Detalhes do Agendamento
        </DialogTitle>
      </DialogHeader>
      <DialogDescription className="p-0">
        Veja todos os detalhes do agendamento selecionado.
      </DialogDescription>

      <div className="py-2">
        {appointment && (
          <article className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-gray-500">Serviço</h3>
              <p>
                <span className="font-semibold">Serviço</span>:{' '}
                {appointment.service.name}
              </p>
              <p>
                <span className="font-semibold">Data</span>:{' '}
                {new Intl.DateTimeFormat('pt-BR', {
                  timeZone: 'UTC',
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                }).format(new Date(appointment.appointmentDate))}
              </p>
              <p>
                <span className="font-semibold">Preço</span>:{' '}
                {formatCurrency(appointment.service.price / 100)}
              </p>
              <p>
                <span className="font-semibold">Duração</span>:{' '}
                {formatDuration(appointment.service.duration)}
              </p>
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-gray-500">
                Dados do cliente
              </h3>
              <p>
                <span className="font-semibold">Nome</span>: {appointment.name}
              </p>
              <p>
                <span className="font-semibold">Email</span>:{' '}
                {appointment.email}
              </p>
              <p>
                <span className="font-semibold">Telefone</span>:{' '}
                {appointment.phone}
              </p>
              <p>
                <span className="font-semibold">Horário</span>:{' '}
                {appointment.time}
              </p>
            </div>
          </article>
        )}
      </div>
    </DialogContent>
  );
};

export default DialogAppointment;
