'use client';

import { MapPin } from 'lucide-react';
import Image from 'next/image';
import AppointmentForm from './appointment-form';
import { ClinicContentProps } from '../types/clinic-type';

const ClinicContent = ({ clinic }: ClinicContentProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="h-40 bg-red-400"> </div>
      <section className="container mx-auto -mt-24 space-y-4 px-4">
        <div className="mx-auto max-w-2xl">
          <article className="flex flex-col items-center">
            <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-white">
              <Image
                src={clinic?.image ? clinic.image : '/default_user.svg'}
                alt="teste"
                className="object-cover bg-white"
                fill
              />
            </div>

            <h3 className="mb-2 text-2xl font-semibold text-gray-500">
              {clinic.name}
            </h3>
            <div className="flex items-center gap-1 text-gray-500">
              <MapPin className="h-4 w-4" />
              <span>
                {clinic?.address ? clinic.address : 'Endereço não informado'}
              </span>
            </div>
            <h2 className="py-4 text-2xl text-gray-500">
              Formulário de agendamento
            </h2>
          </article>
        </div>

        <AppointmentForm clinic={clinic} />
      </section>
    </div>
  );
};

export default ClinicContent;
