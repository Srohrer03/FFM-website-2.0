import React from 'react';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'priority' | 'category';
  size?: 'sm' | 'md' | 'lg';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  variant = 'default',
  size = 'md' 
}) => {
  const getStatusColor = (status: string, variant: string) => {
    if (variant === 'priority') {
      const colors = {
        'Low': 'bg-green-500/20 text-green-400 border-green-500/30',
        'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        'High': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
        'Critical': 'bg-red-500/20 text-red-400 border-red-500/30',
        'Emergency': 'bg-red-600/20 text-red-300 border-red-600/30'
      };
      return colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }

    if (variant === 'category') {
      const colors = {
        'HVAC': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        'Plumbing': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
        'Electrical': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        'Security': 'bg-red-500/20 text-red-400 border-red-500/30',
        'Cleaning': 'bg-green-500/20 text-green-400 border-green-500/30',
        'General': 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      };
      return colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }

    // Default status colors
    const colors = {
      'Active': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Completed': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'In Progress': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Cancelled': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Draft': 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span className={`${sizeClasses[size]} rounded-full font-medium border ${getStatusColor(status, variant)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;