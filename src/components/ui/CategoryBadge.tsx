import React from 'react';
import { CategoriaThematica } from '../../types';

interface CategoryBadgeProps {
  categoria: CategoriaThematica;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  active?: boolean;
  onClick?: () => void;
}

const CATEGORY_STYLES: Record<
  CategoriaThematica,
  { bg: string; text: string; border: string; activeBg: string; activeBorder: string }
> = {
  'Acadêmico': {
    bg: 'bg-sky-950/60',
    text: 'text-sky-300',
    border: 'border-sky-700/60',
    activeBg: 'bg-sky-600 text-white',
    activeBorder: 'border-sky-400',
  },
  'CACISO': {
    bg: 'bg-red-950/70',
    text: 'text-red-300 font-semibold',
    border: 'border-red-700/80',
    activeBg: 'bg-red-600 text-white',
    activeBorder: 'border-red-400',
  },
  'Assembleia': {
    bg: 'bg-amber-950/60',
    text: 'text-amber-300',
    border: 'border-amber-700/60',
    activeBg: 'bg-amber-600 text-white',
    activeBorder: 'border-amber-400',
  },
  'Mobilização': {
    bg: 'bg-rose-950/70',
    text: 'text-rose-300 font-semibold',
    border: 'border-rose-700/70',
    activeBg: 'bg-rose-600 text-white',
    activeBorder: 'border-rose-400',
  },
  'UFBA': {
    bg: 'bg-blue-950/60',
    text: 'text-blue-300',
    border: 'border-blue-700/60',
    activeBg: 'bg-blue-600 text-white',
    activeBorder: 'border-blue-400',
  },
  'São Lázaro': {
    bg: 'bg-emerald-950/60',
    text: 'text-emerald-300',
    border: 'border-emerald-700/60',
    activeBg: 'bg-emerald-600 text-white',
    activeBorder: 'border-emerald-400',
  },
  'Permanência': {
    bg: 'bg-orange-950/60',
    text: 'text-orange-300',
    border: 'border-orange-700/60',
    activeBg: 'bg-orange-600 text-white',
    activeBorder: 'border-orange-400',
  },
  'Formação': {
    bg: 'bg-purple-950/60',
    text: 'text-purple-300',
    border: 'border-purple-700/60',
    activeBg: 'bg-purple-600 text-white',
    activeBorder: 'border-purple-400',
  },
  'Cultura': {
    bg: 'bg-fuchsia-950/60',
    text: 'text-fuchsia-300',
    border: 'border-fuchsia-700/60',
    activeBg: 'bg-fuchsia-600 text-white',
    activeBorder: 'border-fuchsia-400',
  },
  'Movimentos e Lutas': {
    bg: 'bg-red-950/80',
    text: 'text-red-200 font-bold',
    border: 'border-red-600/80',
    activeBg: 'bg-red-700 text-white',
    activeBorder: 'border-red-500',
  },
  'Eventos': {
    bg: 'bg-teal-950/60',
    text: 'text-teal-300',
    border: 'border-teal-700/60',
    activeBg: 'bg-teal-600 text-white',
    activeBorder: 'border-teal-400',
  },
};

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  categoria,
  size = 'sm',
  interactive = false,
  active = false,
  onClick,
}) => {
  const style = CATEGORY_STYLES[categoria] || {
    bg: 'bg-neutral-800',
    text: 'text-neutral-200',
    border: 'border-neutral-700',
    activeBg: 'bg-neutral-100 text-neutral-900',
    activeBorder: 'border-white',
  };

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5 font-medium',
  }[size];

  const content = (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border tracking-wide whitespace-nowrap transition-all duration-200 ${sizeClasses} ${
        active ? `${style.activeBg} ${style.activeBorder} shadow-sm font-semibold` : `${style.bg} ${style.text} ${style.border}`
      } ${interactive ? 'hover:scale-105 cursor-pointer hover:brightness-125 select-none' : ''}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-white' : 'bg-current opacity-80'}`} />
      {categoria}
    </span>
  );

  if (interactive && onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-full"
      >
        {content}
      </button>
    );
  }

  return content;
};
