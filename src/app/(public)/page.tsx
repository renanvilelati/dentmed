import { Header } from './_components/header';
import { HeroSession } from './_components/hero-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main>
        <HeroSession />
      </main>
    </div>
  );
}
