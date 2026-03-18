import { HeroSession } from './_components/hero-section';
import { Header } from '../../layout/header';
import { ProfessionalsSection } from './_components/professionals-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main>
        <HeroSession />

        <ProfessionalsSection />
      </main>
    </div>
  );
}
