import { Button } from '@/components/ui/button';
import Image from 'next/image';
import dentistImage from '../../../../public/dentist.webp';

export const HeroSession = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto pt-20 px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-center gap-12">
          <article className="space-y-8 max-w-2xl flex flex-col">
            <h1 className="text-4xl lg:text-6xl font-bold text-muted-foreground">
              Encontre os melhores profissionais em um único local!
            </h1>
            <p className="text-base md:text-lg text-gray-500">
              Nós somos uma plataforma para profissionais da saúde com foco em
              agilizar seu atendimento de forma simplificada e organizada.
            </p>
            <Button className="cursor-pointer">Encontre uma clínica</Button>
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
