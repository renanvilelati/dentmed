'use server';

import { prisma } from '@/shared/lib/prisma';
import {
  createAppointmentSchema,
  TcreateAppointmentSchema,
} from '../schemas/create-appointment.schema';

export const createNewAppointment = async (
  formData: TcreateAppointmentSchema,
) => {
  const schema = createAppointmentSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    };
  }

  try {
    const selectedDate = new Date(formData.date);

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const day = selectedDate.getDate();

    const appointmentDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));

    const newAppointment = await prisma.appointment.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        time: formData.time,
        appointmentDate: appointmentDate,
        serviceId: formData.serviceId,
        userId: formData.clinicId,
      },
    });

    return {
      data: newAppointment,
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'Erro ao cadastrar agendamento',
    };
  }
};
