'use client';
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { Controller } from 'react-hook-form';
import {
  TAppointmentFormData,
  useAppointmentForm,
} from '../hooks/appointment-hook';
import { Card } from '@/shared/components/ui/card';
import { formatPhone } from '@/shared/utils/phoneFormat';
import { DateTimePicker } from './appointment-date-picker';
import { Button } from '@/shared/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { ClinicContentProps } from '../types/clinic-type';
import { useCallback, useEffect, useMemo, useState } from 'react';
import AppointmentTimeSlots from './appointment-time-slots';
import { Label } from '@/shared/components/ui/label';
import { createNewAppointment } from '../actions/create-appointment';
import { toast } from 'sonner';

const AppointmentForm = ({ clinic }: ClinicContentProps) => {
  const [selectedTime, setSelectedTime] = useState('');
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [blockedTimes, setBlockedTimes] = useState<string[]>([]);

  const form = useAppointmentForm();

  const { watch } = form;

  const selectedDate = watch('date');
  const selectedServiceId = watch('serviceId');

  const fetchBlockedTimes = useCallback(
    async (date: Date): Promise<string[]> => {
      setLoadingSlots(true);
      try {
        const dateString = date.toISOString().split('T')[0];
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/schedule/get-appointments?userId=${clinic.id}&date=${dateString}`,
        );

        const json = await response.json();
        return json;
      } catch (err) {
        console.error(err);
        return [];
      } finally {
        setLoadingSlots(false);
      }
    },
    [clinic.id],
  );

  useEffect(() => {
    if (!selectedDate) {
      setBlockedTimes([]);
      return;
    }

    let cancelled = false;

    fetchBlockedTimes(selectedDate).then((blocked) => {
      if (!cancelled) {
        setBlockedTimes(blocked);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [selectedDate, fetchBlockedTimes]);

  const availableTimeSlots = useMemo(() => {
    const times = clinic.times || [];

    return times.map((time) => ({
      time,
      available: !blockedTimes.includes(time),
    }));
  }, [clinic.times, blockedTimes]);

  useEffect(() => {
    if (!selectedTime) return;

    const stillAvailable = availableTimeSlots.some(
      (slot) => slot.time === selectedTime && slot.available,
    );

    if (!stillAvailable) {
      setSelectedTime('');
    }
  }, [availableTimeSlots, selectedTime]);

  const onSubmit = async (formData: TAppointmentFormData) => {
    if (!selectedTime) {
      return;
    }

    const response = await createNewAppointment({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      time: selectedTime,
      date: formData.date,
      serviceId: formData.serviceId,
      clinicId: clinic.id,
    });

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success('Agendamento concluído');
    form.reset();
    setSelectedTime('');
  };

  return (
    <Card className="p-4">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="font-semibold" htmlFor="name">
                  Nome completo
                </FieldLabel>
                <Input
                  {...field}
                  id="name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Digite o nome do serviço"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="font-semibold" htmlFor="email">
                  E-mail
                </FieldLabel>
                <Input
                  {...field}
                  id="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Digite o seu e-mail"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="font-semibold" htmlFor="phone">
                  Telefone
                </FieldLabel>
                <Input
                  {...field}
                  id="phone"
                  aria-invalid={fieldState.invalid}
                  placeholder="Digite o seu telefone"
                  onChange={(e) => {
                    const formattedValue = formatPhone(e.target.value);
                    field.onChange(formattedValue);
                  }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            name="date"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="font-semibold" htmlFor="date">
                  Data do agendamento
                </FieldLabel>
                <DateTimePicker
                  className="w-full rounded border p-2"
                  initialDate={new Date()}
                  onChange={(date) => {
                    if (date) {
                      field.onChange(date);
                      setSelectedTime('');
                    }
                  }}
                />
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            name="serviceId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="font-semibold" htmlFor="services">
                  Serviços
                </FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedTime('');
                  }}
                >
                  <SelectTrigger
                    aria-invalid={fieldState.invalid}
                    className="w-full px-2"
                  >
                    <SelectValue placeholder="Selecione o serviço" />
                  </SelectTrigger>
                  <SelectContent
                    className="bg-white px-2"
                    position="item-aligned"
                  >
                    {clinic.services.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name} - {Math.floor(item.duration / 60)}h{' '}
                        {item.duration % 60}min
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {selectedServiceId && (
          <div className="space-y-2">
            <Label>Horários disponíveis</Label>
            <div className="rounded-lg bg-gray-100">
              {loadingSlots ? (
                <p>Carregando horários...</p>
              ) : availableTimeSlots.length === 0 ? (
                <p>Nenhum horário disponível</p>
              ) : (
                <AppointmentTimeSlots
                  onSelectTime={(time) => setSelectedTime(time)}
                  selectedTime={selectedTime}
                  availableTimeSlots={availableTimeSlots}
                  blockedTimes={blockedTimes}
                  clinicTimes={clinic.times}
                  selectedDate={selectedDate}
                  requiredSlots={
                    clinic.services.find(
                      (service) => service.id === selectedServiceId,
                    )
                      ? Math.ceil(
                          clinic.services.find(
                            (service) => service.id === selectedServiceId,
                          )!.duration / 30,
                        )
                      : 1
                  }
                />
              )}
            </div>
          </div>
        )}

        <Button
          className="bg-red-400 hover:bg-red-500"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          Confirmar
        </Button>
      </form>
    </Card>
  );
};

export default AppointmentForm;
