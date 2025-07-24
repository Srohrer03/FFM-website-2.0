import React from 'react';
import { Clock, Wrench } from 'lucide-react';

const ProgressTracking: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
      <h3 className="text-xl font-semibold text-white mb-4">Real-Time Progress Tracking</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <Clock className="text-blue-400" size={20} />
          <div>
            <div className="text-white font-medium">Vendor En Route</div>
            <div className="text-gray-400 text-sm">ETA: 45 minutes</div>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
          <Wrench className="text-yellow-400" size={20} />
          <div>
            <div className="text-white font-medium">Work in Progress</div>
            <div className="text-gray-400 text-sm">Diagnosing HVAC system - 30% complete</div>
          </div>
        </div>
        <div className="p-4 bg-gray-700/20 rounded-lg">
          <div className="text-teal-400 font-medium mb-2">Live Updates</div>
          <div className="space-y-2 text-sm">
            <div className="text-gray-300">10:30 AM - Technician arrived on site</div>
            <div className="text-gray-300">10:45 AM - Initial diagnosis complete</div>
            <div className="text-gray-300">11:00 AM - Replacement part needed - ordering now</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;