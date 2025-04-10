'use client';

import {
  ArrowRight,
  DribbbleLogo,
  FigmaLogo,
  GithubLogo,
  LinkedinLogo,
} from '@phosphor-icons/react';

import Button from './ui/button';

export default function Hero() {
  return (
    <section className="max-w-[880px] mx-auto">
      <p className="text-lg text-neutral-600 mb-3">Irere&apos;s Portfolio</p>
      <div className="grid md:grid-cols-3 gap-3 sm:grid-cols-2 h-[450px]">
        <div className="flex flex-col gap-3 h-full">
          <div className="flex flex-col flex-1 bg-neutral-100 rounded-2xl p-4">
            <div className="flex flex-1">
              <p>Pic</p>
            </div>
            <div className="flex flex-col text-center gap-2 justify-center items-center">
              <h2 className="text-2xl font-semibold text-neutral-800">
                Software Engineer
              </h2>
              <p className="text-neutral-500 font-semibold">
                Open-Source & Paid
              </p>
            </div>
          </div>
          <div className="bg-neutral-100 rounded-2xl p-4 flex flex-col justify-center items-center gap-2 hover:rotate-3 transition-transform duration-300 cursor-pointer">
            <h2 className="text-2xl font-medium text-neutral-800">About me</h2>
            <Button icon={<ArrowRight size={20} />} variant="secondary" />
          </div>
        </div>
        <div className="flex flex-col gap-3 h-full bg-neutral-100 rounded-2xl p-4">
          <div className="flex flex-1 flex-col gap-2">
            <p>Pic</p>
          </div>
          <div className="flex flex-col gap-3 justify-between items-center">
            <h2 className="text-2xl font-semibold text-neutral-800">
              Projects
            </h2>
            <p className="text-neutral-500 font-semibold">
              AI, Web, and more...
            </p>
            <div>
              <Button icon={<ArrowRight size={20} />} variant="secondary" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 h-full">
          <div className="flex flex-col gap-3 flex-1 bg-neutral-100 rounded-2xl p-4 hover:-rotate-2 transition-transform duration-300 cursor-pointer">
            <div className="flex flex-1">
              <p>Pic</p>
            </div>
            <div className="flex flex-col text-center gap-2 justify-center items-center">
              <h2 className="text-2xl font-semibold text-neutral-800">
                Services I offer
              </h2>
              <p className="text-neutral-500 font-semibold">
                I could help you with a few things...
              </p>
              <div>
                <Button icon={<ArrowRight size={20} />} variant="secondary" />
              </div>
            </div>
          </div>
          <div className="bg-neutral-100 rounded-2xl px-4 py-6 flex items-center justify-evenly gap-2 cursor-pointer hover:rotate-3 transition-transform duration-300">
            <LinkedinLogo size={28} weight="fill" />
            <GithubLogo size={28} weight="fill" />
            <DribbbleLogo size={28} weight="fill" />
            <FigmaLogo size={28} weight="fill" />
          </div>
        </div>
      </div>
    </section>
  );
}
