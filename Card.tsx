import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  gradient = true 
}) => {
  const baseClasses = 'p-6 rounded-xl border border-gray-700/30';
  const backgroundClasses = gradient 
    ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl'
    : 'bg-gray-800/50';
  const hoverClasses = hover 
    ? 'hover:border-teal-500/50 transition-all duration-300'
    : '';

  return (
    <div className={`${baseClasses} ${backgroundClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;