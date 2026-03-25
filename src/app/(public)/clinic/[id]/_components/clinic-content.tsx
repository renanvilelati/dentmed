'use client';

import { MapPin } from 'lucide-react';
import Image from 'next/image';
import AppointmentForm from './appointment-form';
import { ClinicContentProps } from '../_types/clinic-type';

const ClinicContent = ({ clinic }: ClinicContentProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <div style={{ height: '200px' }} className="h-32 bg-orange-500">
        {' '}
      </div>
      <section
        style={{ marginTop: '-4rem' }}
        className="container mx-auto -mt-16 px-4"
      >
        <div className="mx-auto max-w-2xl">
          <article className="flex flex-col items-center">
            <div
              style={{ height: '200px', width: '200px' }}
              className="relative overflow-hidden rounded-full border-4 border-white"
            >
              <Image
                src={clinic?.image ? clinic.image : '/doctor_1.webp'}
                alt="teste"
                className="object-cover"
                fill
              />
            </div>

            <h3 className="mb-2 text-2xl font-semibold">{clinic.name}</h3>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>
                {clinic?.address ? clinic.address : 'Endereço não informado'}
              </span>
            </div>
          </article>
        </div>

        <AppointmentForm clinic={clinic} />
      </section>
    </div>
  );
};

export default ClinicContent;
