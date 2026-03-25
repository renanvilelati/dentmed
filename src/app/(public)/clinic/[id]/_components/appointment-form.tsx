'use client';
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Controller } from 'react-hook-form';
import {
  TAppointmentFormData,
  useAppointmentForm,
} from '../_hooks/appointment-hook';
import { Card } from '@/components/ui/card';
import { formatPhone } from '@/utils/phoneFormat';
import { DateTimePicker } from './appointment-date-picker';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ClinicContentProps } from '../_types/clinic-type';
import { useCallback, useEffect, useState } from 'react';
import AppointmentTimeSlots, { TTimeSlot } from './appointment-time-slots';

const AppointmentForm = ({ clinic }: ClinicContentProps) => {
  const [selectedTime, setSelectedTime] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TTimeSlot[]>([]);
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
          `${process.env.NEXT_PUBLIC_API_URL}/api/schedule/get-appointments?userId=${clinic.id}&date=${dateString}`,
        );

        return [];
      } catch (error) {
        console.error(error);
        return [];
      } finally {
        setLoadingSlots(false);
      }
    },
    [clinic.id],
  );

  const onSubmit = (data: TAppointmentFormData) => {
    console.log('appointment data', data);
  };

  useEffect(() => {
    if (selectedDate) {
      fetchBlockedTimes(selectedDate).then((blocked) => {
        console.log('hora bloqueada', blocked);
      });
    }
  }, [clinic.times, fetchBlockedTimes, selectedTime, selectedDate]);

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
                  onValueChange={field.onChange}
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
                        {item.name}
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

        <AppointmentTimeSlots
          selectedTime={selectedTime}
          loadingSlots={loadingSlots}
          availableTimeSlots={availableTimeSlots}
          blockedTimes={blockedTimes}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Confirmar
        </Button>
      </form>
    </Card>
  );
};

export default AppointmentForm;
