import { HeroSession } from './_components/hero-section';
import { Header } from '../../shared/layout/header';
import { ProfessionalsSection } from './_components/professionals-section';
import { Footer } from '@/shared/layout/footer';

export const revalidate = 120;

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main>
        <HeroSession />

        <ProfessionalsSection />
      </main>

      <Footer />
    </div>
  );
}
