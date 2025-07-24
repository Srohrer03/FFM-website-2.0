import React from 'react';
import { CheckCircle } from 'lucide-react';

const ClientReview: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
      <h3 className="text-xl font-semibold text-white mb-4">Client Review & Selection</h3>
      <div className="space-y-4">
        <div className="p-4 bg-teal-500/10 rounded-lg border border-teal-500/20">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="text-teal-400" size={20} />
            <span className="text-white font-medium">Selected: Arctic Air Solutions</span>
          </div>
          <div className="text-gray-400 text-sm">
            Selected based on: Highest rating (4.9), fastest response time (2.3 hours), competitive bid ($2,850)
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gray-700/20 rounded-lg">
            <div className="text-teal-400 font-bold">4.9/5</div>
            <div className="text-gray-400 text-sm">Rating</div>
          </div>
          <div className="text-center p-3 bg-gray-700/20 rounded-lg">
            <div className="text-teal-400 font-bold">127</div>
            <div className="text-gray-400 text-sm">Completed Jobs</div>
          </div>
          <div className="text-center p-3 bg-gray-700/20 rounded-lg">
            <div className="text-teal-400 font-bold">2.3h</div>
            <div className="text-gray-400 text-sm">Avg Response</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientReview;