import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo';
import Button from '../common/Button';
import { Home } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  showBackButton?: boolean;
  backPath?: string;
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  description,
  showBackButton = true,
  backPath = '/',
  actions
}) => {
  const navigate = useNavigate();

  return (
    <header className="bg-slate-800 border-b border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="transform scale-75 origin-left">
            <Logo />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white">{title}</h1>
            {subtitle && (
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">{subtitle}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {actions}
          {showBackButton && (
            <Button
              variant="primary"
              icon={Home}
              onClick={() => navigate(backPath)}
            >
              ← Back to Home
            </Button>
          )}
        </div>
      </div>
      {description && (
        <div className="mt-4 text-xs text-gray-400 bg-slate-900/50 p-2 rounded border border-gray-700/30">
          <strong className="text-teal-400">System Info:</strong> {description}
        </div>
      )}
    </header>
  );
};

export default PageHeader;