import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'white' | 'teal' | 'blue';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'teal',
  text
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    white: 'border-white border-t-transparent',
    teal: 'border-teal-400 border-t-transparent',
    blue: 'border-blue-400 border-t-transparent'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className={`${sizeClasses[size]} border-2 ${colorClasses[color]} rounded-full animate-spin`} />
      {text && <span className="text-gray-400 text-sm">{text}</span>}
    </div>
  );
};

export default LoadingSpinner;