import { ProfessionalItem } from './professional-item';

export const ProfessionalsSection = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-muted-foreground mb-12 text-center text-3xl font-semibold">
          Profissionais
        </h2>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ProfessionalItem />
        </section>
      </div>
    </section>
  );
};
