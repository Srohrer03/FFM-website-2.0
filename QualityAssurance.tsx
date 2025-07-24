import React from 'react';
import { CheckCircle } from 'lucide-react';

const QualityAssurance: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
      <h3 className="text-xl font-semibold text-white mb-4">Quality Assurance & Payment</h3>
      <div className="space-y-4">
        <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="text-green-400" size={20} />
            <span className="text-white font-medium">Work Completed Successfully</span>
          </div>
          <div className="text-gray-400 text-sm">
            HVAC system repaired and tested. Temperature now stable at 72°F
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-700/20 rounded-lg">
            <div className="text-teal-400 font-medium mb-2">Quality Rating</div>
            <div className="flex items-center space-x-2">
              <div className="text-yellow-400">★★★★★</div>
              <span className="text-white">5.0/5</span>
            </div>
            <div className="text-gray-400 text-sm mt-1">Excellent work, professional service</div>
          </div>
          <div className="p-4 bg-gray-700/20 rounded-lg">
            <div className="text-teal-400 font-medium mb-2">Payment Status</div>
            <div className="text-green-400 font-semibold">Paid: $2,850</div>
            <div className="text-gray-400 text-sm mt-1">Processed securely via platform</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityAssurance;