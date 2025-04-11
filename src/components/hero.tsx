import {
  ArrowRight,
  GithubLogo,
  LinkedinLogo,
  XLogo,
  Pencil,
} from '@phosphor-icons/react';

import Button from './ui/button';
import { Link, useRouter } from '@tanstack/react-router';

export default function Hero() {
  const router = useRouter();
  return (
    <section className="max-w-[880px] mx-auto sm:flex flex-col hidden">
      <p className="text-lg text-neutral-800 dark:text-neutral-200 mb-3 font-medium">
        Irere&apos;s Portfolio
      </p>
      <div className="grid md:grid-cols-3 gap-3 sm:grid-cols-2 h-[450px]">
        <div className="flex flex-col gap-3 h-full">
          <div className="flex flex-col flex-1 bg-[#f4f4f4] dark:bg-neutral-900 rounded-2xl p-4">
            <div className="flex flex-1">
              <p>Pic</p>
            </div>
            <div className="flex flex-col text-center gap-2 justify-center items-center">
              <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
                Software Engineer
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 font-semibold">
                Open-Source & Paid
              </p>
            </div>
          </div>
          <Link
            to={'/about'}
            className="bg-[#f4f4f4] dark:bg-neutral-900 rounded-2xl p-4 flex flex-col justify-center items-center gap-2 hover:rotate-3 transition-transform duration-300 cursor-pointer"
          >
            <h2 className="text-2xl font-medium text-neutral-800 dark:text-neutral-200">
              About me
            </h2>
            <Button
              icon={<ArrowRight size={20} weight="bold" />}
              variant="secondary"
              onClick={() => router.navigate({ to: '/about' })}
            />
          </Link>
        </div>
        <div className="relative flex flex-col gap-3 h-full bg-[#f4f4f4] dark:bg-neutral-900 rounded-2xl group cursor-pointer">
          <div className="relative flex flex-1 flex-col gap-2 items-center px-6 pt-16">
            <img
              src="/images/phone.webp"
              alt="Mentor AI"
              width={160}
              height={100}
              className="group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col gap-3 justify-between items-center z-20 absolute bottom-0 rounded-b-2xl w-full bg-[#f4f4f4] dark:bg-neutral-900 p-3">
            <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
              Projects
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 font-semibold">
              AI, Web, and more...
            </p>
            <div>
              <Button
                icon={<ArrowRight size={20} />}
                variant="secondary"
                onClick={() => router.navigate({ to: '/projects' })}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 h-full">
          <div className="flex flex-col gap-3 flex-1 bg-[#f4f4f4] dark:bg-neutral-900 rounded-2xl p-4 hover:-rotate-2 transition-transform duration-300 cursor-pointer">
            <div className="flex flex-1">
              <p>Pic</p>
            </div>
            <div className="flex flex-col text-center gap-2 justify-center items-center">
              <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
                Services I offer
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 font-semibold">
                I could help you with a few things...
              </p>
              <div>
                <Button
                  icon={<ArrowRight size={20} />}
                  variant="secondary"
                  onClick={() => router.navigate({ to: '/services' })}
                />
              </div>
            </div>
          </div>
          <div className="bg-[#f4f4f4] dark:bg-neutral-900 rounded-2xl px-4 py-6 flex items-center justify-evenly gap-2 cursor-pointer hover:rotate-3 transition-transform duration-300">
            <a href={'https://linkedin.com/in/irere-emmanuel'} target="_blank">
              <LinkedinLogo size={32} weight="fill" />
            </a>
            <a href={'https://github.com/irere123'} target="_blank">
              <GithubLogo size={28} weight="fill" />
            </a>
            <a href={'https://x.com/irere_emmanuel'} target="_blank">
              <XLogo size={32} />
            </a>
            <a href={'https://blog.irere.dev'} target="_blank">
              <Pencil size={32} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
