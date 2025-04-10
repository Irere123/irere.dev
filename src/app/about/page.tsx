import type { Metadata } from 'next';

import Cards from '@/components/about/cards';
import AboutInfo from '@/components/about/info';

export const metadata: Metadata = {
  title: 'About',
  description: 'About page',
};

export default function About() {
  return (
    <section className='flex flex-col'>
      <AboutInfo />
      <Cards />
    </section>
  );
}
