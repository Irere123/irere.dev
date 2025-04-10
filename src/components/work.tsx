'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

// Define the type for a work item more explicitly
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
    image: '/images/mentor.png',
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
      'relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer p-1.5 flex items-center justify-center'; // Added flex centering

    const frameClasses = `relative h-full rounded-xl overflow-hidden shadow-lg ${
      isMobile
        ? 'w-[60%] bg-zinc-800 border-4 border-zinc-800'
        : 'w-full bg-neutral-100'
    }`;

    const imageClasses = `group-hover:opacity-80 transition-opacity rounded-lg ${
      isMobile ? 'object-contain' : 'object-cover'
    }`;

    return (
      <li
        key={`work-${index}-${work.title}`}
        className="flex-shrink-0 w-[90vw] h-[110vw] sm:w-[80vw] sm:h-[90vw] md:w-[640px] md:h-[660px] select-none" // Responsive dimensions
        aria-hidden={isAriaHidden}
      >
        {/* Outer container with padding and centering */}
        <div className={frameContainerClasses}>
          {/* Inner frame with type-specific styles */}
          <div className={frameClasses}>
            <Image
              src={work.image}
              alt={`${work.title} - ${work.description}`}
              fill // Keep fill, object-fit handles the rest
              className={imageClasses} // Apply conditional image classes
              priority={index < works.length}
            />
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className="w-full mt-12">
      <p className="text-lg text-neutral-600 font-medium tracking-tight mb-3 max-w-[880px] mx-auto font-sans">
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
