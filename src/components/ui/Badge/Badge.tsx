import React from 'react';
import { BadgeProps } from './Badge.types';

const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary' }) => {
  const baseClasses = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold';

  const variantClasses = {
    primary: 'bg-cyan-100 text-cyan-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    info: 'bg-sky-100 text-sky-800',
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </span>
  );
};

export default Badge;
