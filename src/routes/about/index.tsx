import Cards from '@/components/about/cards';
import AboutInfo from '@/components/about/info';
import { seo } from '@/lib/utils';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about/')({
  component: RouteComponent,
  head: () => ({
    meta: [
      ...seo({
        title: 'About | Irere Emmanuel',
      }),
    ],
  }),
});

function RouteComponent() {
  return (
    <section className="flex flex-col">
      <AboutInfo />
      <Cards />
    </section>
  );
}
