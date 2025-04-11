import { createFileRoute } from '@tanstack/react-router';
import Hero from '@/components/hero';
import Works from '@/components/work';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <div>
      <Hero />
      <Works />
    </div>
  );
}
