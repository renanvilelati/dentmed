import { Card, CardContent } from '@/shared/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { User } from '../../../../prisma/src/generated/prisma/client';

type ProfessionalItemProps = {
  professionals: User[];
};

export const ProfessionalItem = ({ professionals }: ProfessionalItemProps) => {
  return professionals.map((item) => (
    <Card
      key={item.id}
      className="overflow-hidden p-0 duration-300 hover:shadow-lg"
    >
      <CardContent className="p-0">
        <div className="relative h-48">
          <Image
            src={item.image ?? '/default_user.svg'}
            alt="Foto do médico ou clínica"
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
            href={`${process.env.NEXT_PUBLIC_API_URL}/clinic/${item.id}`}
            className="flex w-full items-center justify-center rounded-md bg-red-400 py-2 text-sm font-medium text-white hover:bg-red-500 md:text-base"
          >
            Agendar horário <ArrowRight className="ml-2" />
          </Link>
        </div>
      </CardContent>
    </Card>
  ));
};
