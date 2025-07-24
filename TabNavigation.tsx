import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string | number;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 border-2 ${
              activeTab === tab.id
                ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/25 border-teal-500'
                : 'bg-slate-800 text-white hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 border-slate-800 hover:border-teal-500 hover:text-slate-900'
            }`}
          >
            <IconComponent size={20} />
            <span className="hidden sm:inline">{tab.label}</span>
            {tab.badge && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default TabNavigation;