import { useMemo } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

type WorkItem = {
  image: string;
  title: string;
  description: string;
  type: 'web' | 'mobile' | 'desktop';
};

const works = [
  {
    image: '/images/work-1.webp',
    title: 'Project 1',
    description: 'Description of Project 1',
    type: 'mobile' as const,
  },
  {
    image: '/images/phone.webp',
    title: 'Project 2',
    description: 'Description of Project 2',
    type: 'mobile' as const,
  },
  {
    image: '/images/work-2.webp',
    title: 'Project 3',
    description: 'Description of Project 3',
    type: 'desktop' as const,
  },
  {
    image: '/images/work-3.avif',
    title: 'Project 4',
    description: 'Description of Project 4',
    type: 'mobile' as const,
  },
  {
    image: '/images/work-4.webp',
    title: 'Project 5',
    description: 'Description of Project 5',
    type: 'desktop' as const,
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

    const cardWidthClass = isMobile ? 'w-[300px]' : 'w-[720px]';

    return (
      <motion.li
        key={`work-${index}-${work.title}`}
        className={`flex-shrink-0 ${cardWidthClass} h-[550px] select-none`}
        aria-hidden={isAriaHidden}
      >
        <div className="relative w-full h-full p-2">
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <img
              src={work.image}
              alt={`${work.title} - ${work.description}`}
              className={cn('w-full h-full object-contain')}
            />
          </div>
        </div>
      </motion.li>
    );
  };

  return (
    <div className="w-full mt-12">
      <p className="text-lg text-neutral-400 dark:text-neutral-200 font-serif font-semibold sm:px-0 px-4 mb-8 max-w-[880px] mx-auto">
        Select work &lsquo;{date.getFullYear().toString().slice(2)} —
      </p>
      <div className="w-full overflow-hidden">
        <motion.div
          className="py-4"
          whileHover={{ animationPlayState: 'paused' }}
        >
          <motion.ul
            className="flex gap-4"
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              duration: 20,
              ease: 'linear',
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            {works.map((work, index) => renderWorkItem(work, index))}
            {works.map((work, index) =>
              renderWorkItem(work, index + works.length, true),
            )}
          </motion.ul>
        </motion.div>
      </div>
    </div>
  );
}
