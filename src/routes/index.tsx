import { createFileRoute } from '@tanstack/react-router';
import AboutInfo from '@/components/about/info';
import Cards from '@/components/about/cards';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <section className="flex flex-col">
      <AboutInfo />
      <Cards />
    </section>
  );
}
