import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/experiments/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello Experiments!</div>;
}
