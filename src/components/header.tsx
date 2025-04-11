import { ArrowLeft, At, Moon, SealCheck, Numpad } from '@phosphor-icons/react';

import useScroll from '@/hooks/use-scroll';
import Button from './ui/button';
import { useRouter, useLocation } from '@tanstack/react-router';

export default function Header() {
  const isScrolled = useScroll();
  const router = useRouter();
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <header
      className={`flex items-center justify-between px-4 py-2 sticky top-0 bg-transparent z-50 ${isScrolled ? 'sm:bg-transparent bg-white' : ''}`}
    >
      {isHome && (
        <div className="sm:hidden flex">
          <Button icon={<Numpad size={24} />} />
        </div>
      )}
      {!isHome && (
        <Button
          icon={<ArrowLeft size={20} />}
          onClick={() => router.navigate({ to: '/' })}
          className="hover:shadow transition-shadow"
        />
      )}
      {isHome && (
        <div
          className={`relative flex items-center transition-all duration-300 gap-4 ${isScrolled ? 'sm:h-10 sm:w-10 h-14 w-14' : 'h-14 w-14'}`}
        >
          <img
            src="/avatar.png"
            alt="Irere Emmanuel"
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
