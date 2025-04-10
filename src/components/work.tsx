'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

type WorkItem = {
  image: string;
  title: string;
  description: string;
  type: 'web' | 'mobile' | 'desktop';
};

const works = [
  {
    image: '/images/mentor.png',
    title: 'Project 1',
    description: 'Description of Project 1',
    type: 'web' as const,
  },
  {
    image: '/images/phone.webp',
    title: 'Project 2',
    description: 'Description of Project 2',
    type: 'mobile' as const,
  },
  {
    image: '/images/mentor.png',
    title: 'Project 3',
    description: 'Description of Project 3',
    type: 'desktop' as const,
  },
  {
    image: '/images/mentor.png',
    title: 'Project 4',
    description: 'Description of Project 4',
    type: 'web' as const,
  },
];

export default function Works() {
  const date = useMemo(() => new Date(), []);

  const renderWorkItem = (
    work: WorkItem,
    index: number,
    isAriaHidden = false,
  ) => {
    const isMobile = work.type === 'mobile';

    const frameContainerClasses =
      'relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer p-1.5 flex items-center justify-center';

    const frameClasses = `relative h-full rounded-xl overflow-hidden ${
      isMobile ? 'w-[60%]' : 'w-full bg-neutral-100'
    }`;

    const imageClasses = `group-hover:opacity-80 transition-opacity rounded-lg ${
      isMobile ? 'object-contain' : 'object-cover'
    }`;

    return (
      <li
        key={`work-${index}-${work.title}`}
        className="flex-shrink-0 w-[90vw] h-[90vw] sm:w-[80vw] sm:h-[90vw] md:w-[640px] md:h-[660px] select-none"
        aria-hidden={isAriaHidden}
      >
        <div className={frameContainerClasses}>
          <div className={frameClasses}>
            <Image
              src={work.image}
              alt={`${work.title} - ${work.description}`}
              fill
              className={imageClasses}
              priority={index < works.length}
            />
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className="w-full mt-12">
      <p className="text-lg text-neutral-400 font-medium tracking-tight mb-3 max-w-[880px] mx-auto sm:px-0 px-4">
        Select work &lsquo;{date.getFullYear().toString().slice(2)} —
      </p>
      <div className="w-full overflow-hidden">
        <section className="flex w-full items-center py-3">
          <motion.ul
            className="flex list-none p-0 m-0 gap-2 sm:gap-4"
            animate={{
              x: ['0%', '-100%'],
            }}
            transition={{
              ease: 'linear',
              duration: 40 * (works.length / 4),
              repeat: Number.POSITIVE_INFINITY,
            }}
            whileHover={{ animationPlayState: 'paused' }}
          >
            {works.map((work, index) => renderWorkItem(work, index))}
            {works.map((work, index) =>
              renderWorkItem(work, index + works.length, true),
            )}
          </motion.ul>
        </section>
      </div>
    </div>
  );
}
