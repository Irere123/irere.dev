import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = {
  default:
    'bg-neutral-100 hover:bg-neutral-200 transition-colors rounded-3xl py-2 px-4',
  primary:
    'bg-blue-500 hover:bg-blue-600 transition-colors rounded-3xl py-2 px-4 text-white',
  secondary:
    'bg-white hover:bg-white hover:shadow transition-shadow rounded-3xl py-2 px-4',
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  variant?: keyof typeof buttonVariants;
}

export default function Button({
  icon,
  variant = 'default',
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(buttonVariants.default, buttonVariants[variant])}
      {...props}
    >
      {icon}
    </button>
  );
}
