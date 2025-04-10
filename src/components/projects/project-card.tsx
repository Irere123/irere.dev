'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';

import Button from '../ui/button';

export interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  link,
}: ProjectCardProps) {
  return (
    <Link
      href={link}
      className="bg-[#f4f4f4] rounded-2xl p-6 flex flex-col gap-4 h-[500px]"
    >
      <div className="flex flex-col gap-4 items-center mt-3">
        <h2 className="text-2xl font-bold text-neutral-800">{title}</h2>
        <p className="text-neutral-400 font-semibold text-xl">{description}</p>
        <div>
          <Button icon={<ArrowRight />} variant="secondary" />
        </div>
      </div>
      <Image src={image} alt={title} width={100} height={100} />
    </Link>
  );
}
