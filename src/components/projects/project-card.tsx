import { ArrowRight } from '@phosphor-icons/react';

import Button from '../ui/button';
import { Link } from '@tanstack/react-router';

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
      to={link}
      className="bg-[#f4f4f4] rounded-2xl p-6 flex flex-col gap-4 h-[500px]"
    >
      <div className="flex flex-col gap-4 items-center mt-3">
        <h2 className="text-2xl font-bold text-neutral-800">{title}</h2>
        <p className="text-neutral-400 font-semibold text-xl">{description}</p>
        <div>
          <Button icon={<ArrowRight />} variant="secondary" />
        </div>
      </div>
      <img src={image} alt={title} />
    </Link>
  );
}
