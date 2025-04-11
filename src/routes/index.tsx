import { createFileRoute } from '@tanstack/react-router';
import Hero from '@/components/hero';
import Works from '@/components/work';
import Footer from '@/components/footer';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <div>
      <Hero />
      <Works />
      <Footer />
    </div>
  );
}
