'use client';

import { ArrowLeft, At, Moon, SealCheck } from '@phosphor-icons/react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import useScroll from '@/hooks/use-scroll';
import Button from './ui/button';

export default function Header() {
  const isScrolled = useScroll();
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === '/';

  return (
    <header
      className={`flex items-center justify-between px-4 py-2 sticky top-0 bg-transparent z-50 ${isScrolled ? 'bg-transparent' : ''}`}
    >
      {!isHome && (
        <Button
          icon={<ArrowLeft size={20} />}
          onClick={() => router.back()}
          className="hover:shadow transition-shadow"
        />
      )}
      {isHome && (
        <div
          className={`relative flex items-center gap-4 ${isScrolled ? 'h-10 w-10' : 'h-14 w-14'}`}
        >
          <Image
            src="/avatar.png"
            alt="Irere Emmanuel"
            fill
            className="rounded-full"
          />
          <SealCheck
            weight="fill"
            size={24}
            className="absolute text-blue-400 -bottom-1.5 -right-1"
          />
        </div>
      )}
      <div className="flex items-center gap-2">
        <Button icon={<At size={20} />} />
        <Button icon={<Moon size={20} />} />
      </div>
    </header>
  );
}
