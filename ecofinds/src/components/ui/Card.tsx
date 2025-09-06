'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
}) => {
  return (
    <div
      className={cn(
        'bg-[var(--color-card)] border border-[var(--color-border)]',
        'rounded-2xl p-6 shadow-soft transition-all duration-200',
        hover && 'hover:shadow-lg hover:-translate-y-1 cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
};