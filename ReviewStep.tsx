import React, { useEffect } from 'react';
import { User, Mail, Phone, DollarSign, MapPin, Camera, Video, Clock, CheckCircle } from 'lucide-react';
import { useScopeBuilder } from './ScopeBuilderContext';
import { PriceEstimate } from './types';

const ReviewStep: React.FC = () => {
  const { state, updateScopeData, dispatch } = useScopeBuilder();
  const { scopeData, priceEstimate, isSubmitting } = state;

  React.useEffect(() => {
    const handleAutoFill = () => {
      updateScopeData({
        contactInfo: {
          name: 'Sarah Johnson',
          email: 'sarah.johnson@metroproperties.com',
          phone: '(555) 123-4567'
        }
      });
    };
    
    window.addEventListener('autoFillContact', handleAutoFill);
    return () => window.removeEventListener('autoFillContact', handleAutoFill);
  }, []);

  // Mock price estimation
  useEffect(() => {
    const fetchPriceEstimate = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const baseRates = {
        plumbing: { low: 150, high: 400 },
        electrical: { low: 200, high: 500 },
        hvac: { low: 300, high: 800 },
        general: { low: 100, high: 300 },
        security: { low: 250, high: 600 },
        flooring: { low: 200, high: 600 },
        painting: { low: 150, high: 450 },
        landscaping: { low: 100, high: 350 }
      };

      const severityMultiplier = {
        Routine: 1.0,
        Soon: 1.2,
        Urgent: 1.5
      };

      const base = baseRates[scopeData.issueType as keyof typeof baseRates] || { low: 150, high: 400 };
      const multiplier = severityMultiplier[scopeData.urgency];

      const estimate: PriceEstimate = {
        low: Math.round(base.low * multiplier),
        high: Math.round(base.high * multiplier),
        confidence: 85,
        factors: [
          `${scopeData.issueType} repair`,
          `${scopeData.urgency} urgency`,
          scopeData.photos.length > 0 ? 'Visual documentation provided' : 'No photos provided',
          scopeData.urgency === 'Urgent' ? 'Priority service' : 'Standard service'
        ],
        breakdown: {
          labor: Math.round(base.low * multiplier * 0.6),
          materials: Math.round(base.low * multiplier * 0.3),
          overhead: Math.round(base.low * multiplier * 0.1)
        }
      };

      dispatch({ type: 'SET_PRICE_ESTIMATE', payload: estimate });
    };

    if (scopeData.issueType && scopeData.urgency) {
      fetchPriceEstimate();
    }
  }, [scopeData.issueType, scopeData.urgency, dispatch]);

  const handleSubmit = async () => {
    dispatch({ type: 'SET_SUBMITTING', payload: true });
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const scopeId = `SCOPE-${Date.now()}`;
    
    alert(`🎯 Scope Submitted Successfully!\n\n📋 Scope ID: ${scopeId}\n• Issue: ${scopeData.issueType} - ${scopeData.subCategory}\n• Location: ${scopeData.location}\n• Urgency: ${scopeData.urgency}\n• Photos: ${scopeData.photos.length}\n\n👷 Next Steps:\n• Professional scoper assigned\n• On-site scoping within 24 hours\n• 3-4 vendor bids expected\n• Track progress in My Bids section`);
    
    dispatch({ type: 'SET_SUBMITTING', payload: false });
    dispatch({ type: 'RESET_SCOPE' });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const isComplete = scopeData.issueType && scopeData.location && scopeData.description && 
                   scopeData.contactInfo.name && scopeData.contactInfo.email;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Review & Submit</h2>
        <p className="text-gray-400 text-lg">Verify your information before submitting</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Scope Summary */}
        <div className="space-y-6">
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Issue Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Type:</span>
                <span className="text-white font-medium">{scopeData.issueType} - {scopeData.subCategory}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Urgency:</span>
                <span className={`font-medium ${
                  scopeData.urgency === 'Urgent' ? 'text-red-400' :
                  scopeData.urgency === 'Soon' ? 'text-yellow-400' :
                  'text-green-400'
                }`}>
                  {scopeData.urgency}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-400">Location:</span>
                <span className="text-white font-medium text-right">{scopeData.location}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Description</h3>
            <p className="text-gray-300 leading-relaxed">{scopeData.description}</p>
          </div>

          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Documentation</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <Camera className="mx-auto mb-2 text-blue-400" size={24} />
                <div className="text-white font-medium">{scopeData.photos.length}</div>
                <div className="text-blue-300 text-sm">Photos</div>
              </div>
              <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <Video className="mx-auto mb-2 text-purple-400" size={24} />
                <div className="text-white font-medium">{scopeData.videoClip ? '1' : '0'}</div>
                <div className="text-purple-300 text-sm">Video</div>
              </div>
            </div>
            {scopeData.annotations.length > 0 && (
              <div className="mt-4 text-center">
                <span className="text-teal-400 font-medium">{scopeData.annotations.length} annotations added</span>
              </div>
            )}
          </div>
        </div>

        {/* Contact & Pricing */}
        <div className="space-y-6">
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={scopeData.contactInfo.name}
                  onChange={(e) => updateScopeData({
                    contactInfo: { ...scopeData.contactInfo, name: e.target.value }
                  })}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  value={scopeData.contactInfo.email}
                  onChange={(e) => updateScopeData({
                    contactInfo: { ...scopeData.contactInfo, email: e.target.value }
                  })}
                  placeholder="your.email@company.com"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={scopeData.contactInfo.phone}
                  onChange={(e) => updateScopeData({
                    contactInfo: { ...scopeData.contactInfo, phone: e.target.value }
                  })}
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Price Estimate */}
          {priceEstimate && (
            <div className="bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-xl p-6 border border-teal-500/30">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <DollarSign className="mr-2 text-teal-400" size={20} />
                Estimated Cost Range
              </h3>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-teal-400 mb-2">
                  {formatCurrency(priceEstimate.low)} - {formatCurrency(priceEstimate.high)}
                </div>
                <div className="text-gray-400 text-sm">
                  {priceEstimate.confidence}% confidence based on similar projects
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-gray-300 font-medium text-sm">Factors considered:</h4>
                {priceEstimate.factors.map((factor, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">{factor}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-teal-500/10 rounded-lg border border-teal-500/20">
                <div className="text-teal-400 text-sm font-medium">💡 Note</div>
                <div className="text-teal-300 text-sm">
                  Final pricing determined after professional scoping and vendor bids
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !isComplete}
            className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
              isSubmitting || !isComplete
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg hover:shadow-teal-500/25 hover:-translate-y-1'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting Scope...</span>
              </div>
            ) : !isComplete ? (
              'Complete required fields to submit'
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle size={20} />
                <span>Submit Scope for Professional Review</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Completion Status */}
      {isComplete && (
        <div className="text-center animate-in fade-in duration-500">
          <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/30 rounded-full px-6 py-3">
            <CheckCircle className="text-green-400" size={16} />
            <span className="text-green-400 font-medium">Ready to submit</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewStep;