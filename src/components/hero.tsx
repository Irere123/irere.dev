'use client';

import {
  ArrowRight,
  GithubLogo,
  LinkedinLogo,
  XLogo,
  Pencil,
} from '@phosphor-icons/react';

import Button from './ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  const router = useRouter();
  return (
    <section className="max-w-[880px] mx-auto sm:flex flex-col hidden">
      <p className="text-lg text-neutral-600 mb-3">Irere&apos;s Portfolio</p>
      <div className="grid md:grid-cols-3 gap-3 sm:grid-cols-2 h-[450px]">
        <div className="flex flex-col gap-3 h-full">
          <div className="flex flex-col flex-1 bg-[#f4f4f4] rounded-2xl p-4">
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
          <Link
            href={'/about'}
            className="bg-[#f4f4f4] rounded-2xl p-4 flex flex-col justify-center items-center gap-2 hover:rotate-3 transition-transform duration-300 cursor-pointer"
          >
            <h2 className="text-2xl font-medium text-neutral-800">About me</h2>
            <Button
              icon={<ArrowRight size={20} weight="bold" />}
              variant="secondary"
              onClick={() => router.push('/about')}
            />
          </Link>
        </div>
        <div className="relative flex flex-col gap-3 h-full bg-[#f4f4f4] rounded-2xl group cursor-pointer">
          <div className="relative flex flex-1 flex-col gap-2 items-center px-6 pt-16">
            <Image
              src="/images/phone.webp"
              alt="Mentor AI"
              width={170}
              height={100}
              className="group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col gap-3 justify-between items-center z-20 absolute bottom-0 rounded-b-2xl w-full bg-[#f4f4f4] p-3">
            <h2 className="text-2xl font-semibold text-neutral-800">
              Projects
            </h2>
            <p className="text-neutral-500 font-semibold">
              AI, Web, and more...
            </p>
            <div>
              <Button
                icon={<ArrowRight size={20} />}
                variant="secondary"
                onClick={() => router.push('/projects')}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 h-full">
          <div className="flex flex-col gap-3 flex-1 bg-[#f4f4f4] rounded-2xl p-4 hover:-rotate-2 transition-transform duration-300 cursor-pointer">
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
                <Button
                  icon={<ArrowRight size={20} />}
                  variant="secondary"
                  onClick={() => router.push('/services')}
                />
              </div>
            </div>
          </div>
          <div className="bg-[#f4f4f4] rounded-2xl px-4 py-6 flex items-center justify-evenly gap-2 cursor-pointer hover:rotate-3 transition-transform duration-300">
            <Link
              href={'https://linkedin.com/in/irere-emmanuel'}
              target="_blank"
            >
              <LinkedinLogo size={32} weight="fill" />
            </Link>
            <Link href={'https://github.com/irere123'} target="_blank">
              <GithubLogo size={28} weight="fill" />
            </Link>
            <Link href={'https://x.com/irere_emmanuel'}>
              <XLogo size={32} />
            </Link>
            <Link href={'https://blog.irere.dev'}>
              <Pencil size={32} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
