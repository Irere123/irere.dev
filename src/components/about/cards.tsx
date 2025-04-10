'use client';
import {
  ArrowLeft,
  ArrowRight,
  FigmaLogo,
  GoogleChromeLogo,
  NotionLogo,
  Warning,
  XLogo,
} from '@phosphor-icons/react';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

import Button from '../ui/button';
import { ABOUT_ME_SLIDES } from '@/lib/constants';

export default function Cards() {
  const date = useMemo(() => new Date(), []);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlideIndex(
      (prevIndex) => (prevIndex + 1) % ABOUT_ME_SLIDES.length,
    );
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex(
      (prevIndex) =>
        (prevIndex - 1 + ABOUT_ME_SLIDES.length) % ABOUT_ME_SLIDES.length,
    );
  };

  return (
    <section className="max-w-[880px] mx-auto mt-12 mb-4 sm:px-0 px-3 sm:pb-0 pb-3">
      <h3 className="text-neutral-400 mb-3">More —</h3>
      <div className="grid md:grid-cols-3 gap-3 sm:grid-cols-2 h-96">
        <div className="flex flex-col h-full gap-3">
          <div className="flex flex-col bg-[#f4f4f4] rounded-2xl p-6 justify-center items-center gap-3 text-center cursor-pointer sm:hover:-rotate-2 transition-transform duration-200">
            <h3 className="font-semibold text-neutral-400 text-lg">
              Softwares I use as part of development process.
            </h3>
            <div className="flex gap-3">
              <FigmaLogo size={32} />
              <GoogleChromeLogo size={32} />
              <NotionLogo size={32} />
              <XLogo size={32} />
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-1 justify-center items-center bg-[#f4f4f4] rounded-2xl p-4 text-neutral-400 cursor-pointer sm:hover:rotate-2 transition-transform duration-200">
            <div className="flex flex-1 justify-center items-center">
              <p className="text-3xl italic">Signature</p>
            </div>
            <p className="h-6 w-6 bg-neutral-200 rounded-full flex justify-center items-center">
              C
            </p>
            <p className="text-sm">{date.getFullYear()} • irere.dev</p>
            <p className="text-sm">All rights reserved</p>
          </div>
        </div>
        <div className="flex flex-col bg-[#f4f4f4] rounded-2xl p-6 sm:hover:rotate-2 transition-transform duration-200 cursor-pointer">
          <div className="flex flex-1 flex-col">
            <p>Pic</p>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center text-center">
            <h2 className="text-2xl font-semibold">Get in touch</h2>
            <Link
              href={'mailto:hello@irere.dev'}
              className="text-lg font-semibold hover:underline text-neutral-400"
            >
              hello@irere.dev
            </Link>
            <Link
              href={'https://github.com/irere123'}
              target="_blank"
              className="text-lg font-semibold hover:underline text-neutral-400"
            >
              Follow me on Github
            </Link>
            <Link
              href={'https://x.com/irere_emmanuel'}
              target="_blank"
              className="text-lg font-semibold hover:underline text-neutral-400"
            >
              Follow me on X
            </Link>
          </div>
        </div>
        <div className="flex flex-col h-full gap-3">
          <div className="flex flex-col bg-[#f4f4f4] rounded-2xl p-6 justify-center items-center text-center cursor-pointer sm:hover:-rotate-2 transition-transform duration-200">
            <Warning size={28} weight="fill" className="text-neutral-400" />
            <h3 className="text-xl font-semibold">Disclaimer</h3>
            <p className="text-lg text-neutral-400 font-semibold">
              No client ever resisted my good work.
            </p>
          </div>
          <div className="flex flex-1 flex-col bg-[#f4f4f4] rounded-2xl p-4 overflow-hidden">
            <div className="flex justify-between mb-4">
              <Button
                icon={<ArrowLeft />}
                variant="secondary"
                onClick={handlePrevSlide}
                disabled={currentSlideIndex === 0}
                aria-label="Previous slide"
              />
              <Button
                icon={<ArrowRight />}
                variant="secondary"
                onClick={handleNextSlide}
                disabled={currentSlideIndex === ABOUT_ME_SLIDES.length - 1}
                aria-label="Next slide"
              />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlideIndex}
                className="flex-1 flex flex-col items-center justify-center text-center text-neutral-500 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {currentSlideIndex === 0 && ABOUT_ME_SLIDES[0]?.title && (
                  <h4 className="text-2xl font-semibold text-neutral-800 mb-2">
                    {ABOUT_ME_SLIDES[0].title}
                  </h4>
                )}
                <p className="text-lg font-semibold text-neutral-400">
                  {ABOUT_ME_SLIDES.length > 0 &&
                    ABOUT_ME_SLIDES[currentSlideIndex]?.info}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
