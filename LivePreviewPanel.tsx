import React from 'react';
import { Camera, Video, MapPin, DollarSign, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { useScopeBuilder } from './ScopeBuilderContext';

const LivePreviewPanel: React.FC = () => {
  const { state } = useScopeBuilder();
  const { scopeData, priceEstimate } = state;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getCompletionPercentage = () => {
    const requiredFields = [
      !!scopeData.issueType,
      !!scopeData.subCategory,
      !!scopeData.location,
      !!scopeData.description,
      scopeData.photos.length > 0,
      !!scopeData.contactInfo.name,
      !!scopeData.contactInfo.email
    ];
    
    const completed = requiredFields.filter(Boolean).length;
    return Math.round((completed / requiredFields.length) * 100);
  };

  const completionPercentage = getCompletionPercentage();

  return (
    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-xl border border-gray-700/30 p-6 sticky top-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Scope Preview</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
          <span className="text-teal-400 text-sm font-medium">Live</span>
        </div>
      </div>
      
      {/* Completion Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400 text-sm">Completion</span>
          <span className="text-white font-medium">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Issue Type */}
        {scopeData.issueType && (
          <div className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="text-green-400" size={16} />
              <span className="text-gray-400 text-sm">Issue Type</span>
            </div>
            <div className="text-white font-medium">
              {scopeData.issueType}
              {scopeData.subCategory && ` - ${scopeData.subCategory}`}
            </div>
          </div>
        )}

        {/* Location */}
        {scopeData.location && (
          <div className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="text-blue-400" size={16} />
              <span className="text-gray-400 text-sm">Location</span>
            </div>
            <div className="text-white font-medium text-sm">{scopeData.location}</div>
            {scopeData.buildingArea && (
              <div className="text-gray-300 text-xs mt-1">{scopeData.buildingArea}</div>
            )}
          </div>
        )}

        {/* Urgency */}
        {scopeData.urgency && (
          <div className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="text-yellow-400" size={16} />
              <span className="text-gray-400 text-sm">Urgency</span>
            </div>
            <div className={`font-medium ${
              scopeData.urgency === 'Urgent' ? 'text-red-400' :
              scopeData.urgency === 'Soon' ? 'text-yellow-400' :
              'text-green-400'
            }`}>
              {scopeData.urgency}
            </div>
          </div>
        )}

        {/* Media Count */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20 text-center">
            <Camera className="mx-auto mb-1 text-blue-400" size={20} />
            <div className="text-white font-medium">{scopeData.photos.length}</div>
            <div className="text-blue-300 text-xs">Photos</div>
          </div>
          <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20 text-center">
            <Video className="mx-auto mb-1 text-purple-400" size={20} />
            <div className="text-white font-medium">{scopeData.videoClip ? '1' : '0'}</div>
            <div className="text-purple-300 text-xs">Video</div>
          </div>
        </div>

        {/* Annotations */}
        {scopeData.annotations.length > 0 && (
          <div className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
            <div className="text-gray-400 text-sm">Annotations</div>
            <div className="text-white font-medium">{scopeData.annotations.length} markers added</div>
          </div>
        )}

        {/* Price Estimate */}
        {priceEstimate && (
          <div className="p-4 bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-lg border border-teal-500/30">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="text-teal-400" size={16} />
              <span className="text-teal-400 text-sm">Estimated Cost</span>
            </div>
            <div className="text-white font-bold text-lg">
              {formatCurrency(priceEstimate.low)} - {formatCurrency(priceEstimate.high)}
            </div>
            <div className="text-teal-300 text-xs">
              {priceEstimate.confidence}% confidence
            </div>
          </div>
        )}

        {/* Contact Info */}
        {scopeData.contactInfo.name && (
          <div className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
            <div className="text-gray-400 text-sm">Contact</div>
            <div className="text-white font-medium">{scopeData.contactInfo.name}</div>
            {scopeData.contactInfo.email && (
              <div className="text-gray-300 text-sm">{scopeData.contactInfo.email}</div>
            )}
          </div>
        )}
      </div>

      {/* Status Indicator */}
      <div className="mt-6 pt-4 border-t border-gray-700/50">
        {completionPercentage === 100 ? (
          <div className="flex items-center space-x-2 text-green-400">
            <CheckCircle size={16} />
            <span className="text-sm font-medium">Ready to submit</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-yellow-400">
            <AlertTriangle size={16} />
            <span className="text-sm font-medium">Complete remaining fields</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePreviewPanel;