import React from 'react';
import { Star } from 'lucide-react';
import { MockVendor } from './types';

interface BidCollectionProps {
  vendors: MockVendor[];
}

const BidCollection: React.FC<BidCollectionProps> = ({ vendors }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
      <h3 className="text-xl font-semibold text-white mb-4">Vendor Bid Collection</h3>
      <div className="space-y-4">
        {vendors.map((vendor, index) => (
          <div key={index} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-white font-semibold">{vendor.name}</h4>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Star className="text-yellow-400" size={14} />
                  <span>{vendor.rating}</span>
                  <span>•</span>
                  <span>{vendor.completedJobs} jobs</span>
                  <span>•</span>
                  <span>Response: {vendor.responseTime}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-teal-400">{vendor.bid}</div>
                <div className="text-sm text-green-400">{vendor.availability}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {vendor.certifications.map((cert, certIndex) => (
                <span key={certIndex} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BidCollection;