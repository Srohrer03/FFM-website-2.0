import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  onClick,
  children,
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-lg border-2';
  
  const variantClasses = {
    primary: 'bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white shadow-lg hover:shadow-teal-500/25 border-slate-800 hover:border-teal-500 hover:text-slate-900',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-white border-slate-700',
    success: 'bg-green-500 hover:bg-green-600 text-white border-green-500',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500',
    danger: 'bg-red-500 hover:bg-red-600 text-white border-red-500'
  };

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  const disabledClasses = disabled || loading ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      )}
      {Icon && iconPosition === 'left' && !loading && (
        <Icon size={16} className="mr-2" />
      )}
      {children}
      {Icon && iconPosition === 'right' && !loading && (
        <Icon size={16} className="ml-2" />
      )}
    </button>
  );
};

export default Button;