import React from 'react';
import { Clock, DollarSign, Shield } from 'lucide-react';

const ProcessBenefits: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
      <h3 className="text-xl font-semibold text-white mb-4">Process Benefits</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-3 p-4 bg-teal-500/10 rounded-lg border border-teal-500/20">
          <Clock className="text-teal-400" size={24} />
          <div>
            <div className="text-white font-medium">Faster Response</div>
            <div className="text-gray-400 text-sm">Average 2-hour vendor response time</div>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-4 bg-teal-500/10 rounded-lg border border-teal-500/20">
          <DollarSign className="text-teal-400" size={24} />
          <div>
            <div className="text-white font-medium">Cost Savings</div>
            <div className="text-gray-400 text-sm">Competitive bidding reduces costs by 15-30%</div>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-4 bg-teal-500/10 rounded-lg border border-teal-500/20">
          <Shield className="text-teal-400" size={24} />
          <div>
            <div className="text-white font-medium">Quality Assurance</div>
            <div className="text-gray-400 text-sm">Pre-vetted vendors with verified credentials</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessBenefits;