'use client';

import { GithubLogo, LinkedinLogo, Pencil, XLogo } from '@phosphor-icons/react';

export default function Footer() {
  return (
    <footer className="sm:hidden flex w-full p-6 rounded-t-md justify-evenly">
      <a
        href={'https://linkedin.com/in/irere-emmanuel'}
        target="_blank"
        className="hover:scale-110 hover:-rotate-3 transition-transform duration-300"
      >
        <LinkedinLogo size={35} weight="fill" />
      </a>
      <a
        href={'https://github.com/irere123'}
        target="_blank"
        className="hover:scale-110 hover:rotate-3 transition-transform duration-300"
      >
        <GithubLogo size={35} weight="fill" />
      </a>
      <a
        href={'https://x.com/irere_emmanuel'}
        target="_blank"
        className="hover:scale-110 hover:rotate-3 transition-transform duration-300"
      >
        <XLogo size={32} />
      </a>
      <a
        href={'https://blog.irere.dev'}
        target="_blank"
        className="hover:scale-110 hover:rotate-3 transition-transform duration-300"
      >
        <Pencil size={32} />
      </a>
    </footer>
  );
}
