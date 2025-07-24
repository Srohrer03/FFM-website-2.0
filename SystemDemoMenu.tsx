import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SystemDemoMenuProps {
  onClose: () => void;
}

const SystemDemoMenu: React.FC<SystemDemoMenuProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const demoItems = [
    { path: '/preventative-maintenance', label: '🗓️ Preventative Maintenance', description: 'Automated scheduling and tracking' },
    { path: '/work-orders', label: '📋 Work Order System', description: 'Complete workflow management' },
    { path: '/work-order-walkthrough', label: '🎬 Work Order Demo', description: 'Interactive process walkthrough' },
    { path: '/escrow-management', label: '🛡️ Escrow Management', description: 'Secure payment protection' },
    { path: '/iot-monitoring', label: '📡 IoT Monitoring System', description: 'Real-time facility monitoring' },
    { path: '/rm-budget-tracker', label: '💰 R&M Budget Tracker', description: 'Budget tracking and alerts' },
    { path: '/document-management', label: '📄 Document Management', description: 'Centralized document storage' },
    { path: '/asset-lifecycle', label: '📦 Asset Lifecycle Management', description: 'Complete asset tracking' },
    { path: '/tenant-repair', label: '🏠 Tenant Repair Interface', description: 'Direct tenant communication' },
    { path: '/trackable-history', label: '📊 Trackable History System', description: 'Complete audit trail' },
    { path: '/facility-health-reports', label: '📈 Facility Health Reports', description: 'Executive reporting' },
    { path: '/knowledge-base', label: '📚 Knowledge Base Library', description: 'SOPs and best practices' },
    { path: '/ai-vendor-optimization', label: '🤖 AI Vendor Optimization', description: 'Machine learning insights' },
    { path: '/strategic-advisory', label: '📞 Strategic Advisory Calls', description: 'Expert consultation' },
    { path: '/facility-walkthrough', label: '📱 Facility Walkthrough App', description: 'Mobile issue logging' },
    { path: '/trusted-vendor-badges', label: '🏆 Trusted Vendor Badges', description: 'Quality recognition program' },
    { path: '/capex-workspace', label: '💼 CapEx Workspace', description: 'Capital project planning' },
    { path: '/multi-tenant-rollup', label: '🏢 Multi-Tenant Rollup View', description: 'Portfolio management' },
    { path: '/user-support', label: '🤖 User Support System', description: 'Intelligent help system' },
    { path: '/scope-builder', label: '🎯 Intelligent Scope Builder', description: 'AI-powered scoping' },
    { path: '/my-bids', label: '📊 My Scope Submissions & Bids', description: 'Bid tracking and selection' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
    onClose();
  };

  return (
    <div className="mb-6">
      <h3 className="text-teal-400 font-semibold mb-3 text-sm uppercase tracking-wide">System Demos</h3>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {demoItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            className="w-full bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900 text-left"
          >
            <div className="font-medium">{item.label}</div>
            <div className="text-xs text-gray-400 mt-1">{item.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SystemDemoMenu;