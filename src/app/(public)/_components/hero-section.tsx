import { Button } from '@/components/ui/button';
import Image from 'next/image';
import dentistImage from '../../../../public/dentist.webp';

export const HeroSession = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 pt-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-center gap-12">
          <article className="flex max-w-2xl flex-col space-y-8">
            <h1 className="text-muted-foreground text-4xl font-bold lg:text-6xl">
              Gestão inteligente para clínicas e profissionais de saúde{' '}
            </h1>
            <p className="text-base text-gray-500 md:text-lg">
              Conectamos pacientes a especialistas qualificados enquanto
              ajudamos clínicas a gerenciar seus atendimentos com eficiência e
              praticidade.
            </p>
            <Button className="cursor-pointer bg-red-400 hover:bg-red-500">
              Encontre uma clínica
            </Button>
          </article>

          <div className="hidden lg:block">
            <Image
              src={dentistImage}
              alt="Foto de um dentista"
              quality={100}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
