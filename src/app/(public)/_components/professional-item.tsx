import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const doctors = [
  {
    id: 1,
    name: 'Renan Vilela',
    image: '/doctor_1.png',
    address: 'Av. Capeão, 105',
    href: '/renan-clinic',
  },
  {
    id: 2,
    name: 'Carla Soares',
    image: '/doctor_3.png',
    address: 'Av. Capeão, 105',
    href: '/renan-clinic',
  },
  {
    id: 3,
    name: 'Vinicius Abreu',
    image: '/doctor_2.png',
    address: 'Av. Capeão, 105',
    href: '/renan-clinic',
  },
  {
    id: 4,
    name: 'Aline Moraes',
    image: '/doctor_3.png',
    address: 'Av. Capeão, 105',
    href: '/renan-clinic',
  },
  {
    id: 5,
    name: 'Cesar Menotti',
    image: '/doctor_1.png',
    address: 'Av. Capeão, 105',
    href: '/renan-clinic',
  },
  {
    id: 6,
    name: 'Rodrigo Carvalho',
    image: '/doctor_2.png',
    address: 'Av. Capeão, 105',
    href: '/renan-clinic',
  },
  {
    id: 7,
    name: 'Renan Vilela',
    image: '/doctor_3.png',
    address: 'Av. Capeão, 105',
    href: '/renan-clinic',
  },
  {
    id: 8,
    name: 'Renan Vilela',
    image: '/doctor_1.png',
    address: 'Av. Capeão, 105',
    href: '/renan-clinic',
  },
];

export const ProfessionalItem = () => {
  return doctors.map((item) => (
    <Card key={item.id} className="overflow-hidden p-0">
      <CardContent className="p-0">
        <div className="relative h-48">
          <Image
            src={item.image}
            alt="Foto do médico"
            fill
            className="object-cover object-top"
          />
        </div>

        <div className="space-y-4 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.address}</p>
            </div>

            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500"></div>
          </div>

          <Link
            href={item.href}
            className="bg-primary flex w-full items-center justify-center rounded-md py-2 text-sm font-medium text-white hover:bg-orange-500 md:text-base"
          >
            Agendar horário <ArrowRight className="ml-2" />
          </Link>
        </div>
      </CardContent>
    </Card>
  ));
};
