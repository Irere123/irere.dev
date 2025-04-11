import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = {
  default:
    'bg-[#f4f4f4] transition-all duration-300 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors rounded-3xl py-2 px-4',
  primary:
    'bg-blue-500 hover:bg-blue-600 transition-colors rounded-3xl py-2 px-4 text-white',
  secondary:
    'bg-white hover:bg-white hover:shadow transition-shadow rounded-3xl py-2 px-4 disabled:text-neutral-400',
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  variant?: keyof typeof buttonVariants;
  className?: string;
}

export default function Button({
  icon,
  className,
  variant = 'default',
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(buttonVariants.default, buttonVariants[variant], className)}
      {...props}
    >
      {icon}
    </button>
  );
}
