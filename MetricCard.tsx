import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'purple' | 'yellow' | 'red' | 'teal';
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'stable';
  };
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'blue',
  trend
}) => {
  const colorClasses = {
    blue: 'from-blue-500/10 to-blue-600/10 border-blue-500/20 text-blue-400',
    green: 'from-green-500/10 to-green-600/10 border-green-500/20 text-green-400',
    purple: 'from-purple-500/10 to-purple-600/10 border-purple-500/20 text-purple-400',
    yellow: 'from-yellow-500/10 to-yellow-600/10 border-yellow-500/20 text-yellow-400',
    red: 'from-red-500/10 to-red-600/10 border-red-500/20 text-red-400',
    teal: 'from-teal-500/10 to-teal-600/10 border-teal-500/20 text-teal-400'
  };

  const getTrendColor = (direction: string) => {
    switch (direction) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} p-6 rounded-xl border`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">{title}</h3>
        <Icon size={24} />
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      {subtitle && (
        <div className={`text-sm mt-1 ${colorClasses[color].split(' ')[3]}`}>
          {subtitle}
        </div>
      )}
      {trend && (
        <div className={`text-xs mt-1 ${getTrendColor(trend.direction)}`}>
          {trend.value}
        </div>
      )}
    </div>
  );
};

export default MetricCard;