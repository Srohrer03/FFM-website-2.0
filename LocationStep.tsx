import React from 'react';
import { MapPin, Building, Clock, AlertTriangle } from 'lucide-react';
import { useScopeBuilder } from './ScopeBuilderContext';

const buildingAreas = [
  'Lobby/Reception', 'Office Space', 'Conference Room', 'Break Room/Kitchen', 
  'Restroom', 'Storage Room', 'Mechanical Room', 'Parking Garage',
  'Exterior/Grounds', 'Rooftop', 'Basement', 'Stairwell', 'Elevator'
];

const timeframes = [
  'ASAP', 'Within 24 hours', 'Within 3 days', 
  'Within 1 week', 'Within 2 weeks', 'Flexible timing'
];

const urgencyLevels = [
  { 
    id: 'Urgent', 
    name: 'Urgent', 
    description: 'Significant impact on operations',
    icon: '🚨',
    color: 'border-red-500 bg-red-500/10 text-red-400'
  },
  { 
    id: 'Soon', 
    name: 'Soon', 
    description: 'Should be addressed promptly',
    icon: '⚡',
    color: 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
  },
  { 
    id: 'Routine', 
    name: 'Routine', 
    description: 'Can be scheduled normally',
    icon: '📅',
    color: 'border-green-500 bg-green-500/10 text-green-400'
  }
];

const LocationStep: React.FC = () => {
  const { state, updateScopeData } = useScopeBuilder();
  const { scopeData } = state;

  React.useEffect(() => {
    const handleAutoFill = () => {
      updateScopeData({
        location: 'Building A, Floor 3, Unit 301 - Kitchen',
        buildingArea: 'Office Space',
        description: 'Kitchen sink has been leaking under the cabinet for the past 2 days. Water is pooling and may cause damage to the cabinet floor. The leak appears to be coming from the connection between the faucet and the supply line.',
        urgency: 'Urgent',
        preferredTimeframe: 'Within 24 hours',
        accessInstructions: 'Building manager has master key. Please call 30 minutes before arrival. Tenant works from home and will be available.'
      });
    };
    
    window.addEventListener('autoFillLocation', handleAutoFill);
    return () => window.removeEventListener('autoFillLocation', handleAutoFill);
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Where is the issue?</h2>
        <p className="text-gray-400 text-lg">Help vendors understand the location and urgency</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Location Details */}
        <div className="space-y-6">
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <MapPin className="mr-2 text-teal-400" size={20} />
              Location Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 font-medium mb-2">Specific Location</label>
                <input
                  type="text"
                  value={scopeData.location}
                  onChange={(e) => updateScopeData({ location: e.target.value })}
                  placeholder="Building, floor, room number"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-2">Area Type</label>
                <select
                  value={scopeData.buildingArea}
                  onChange={(e) => updateScopeData({ buildingArea: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                >
                  <option value="">Select area type</option>
                  {buildingAreas.map((area) => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-2">Issue Description</label>
                <textarea
                  value={scopeData.description}
                  onChange={(e) => updateScopeData({ description: e.target.value })}
                  placeholder="Describe what's happening, when it started, and any relevant details"
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Building className="mr-2 text-teal-400" size={20} />
              Access Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 font-medium mb-2">Preferred Timeframe</label>
                <select
                  value={scopeData.preferredTimeframe}
                  onChange={(e) => updateScopeData({ preferredTimeframe: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                >
                  <option value="">Select timeframe</option>
                  {timeframes.map((timeframe) => (
                    <option key={timeframe} value={timeframe}>{timeframe}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-2">Access Instructions</label>
                <textarea
                  value={scopeData.accessInstructions}
                  onChange={(e) => updateScopeData({ accessInstructions: e.target.value })}
                  placeholder="How should vendors access the area? Keys, codes, contact info, etc."
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Urgency Selection */}
        <div className="space-y-6">
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <AlertTriangle className="mr-2 text-teal-400" size={20} />
              Urgency Level
            </h3>
            
            <div className="space-y-3">
              {urgencyLevels.map((level) => {
                const isSelected = scopeData.urgency === level.id;
                
                return (
                  <button
                    key={level.id}
                    onClick={() => updateScopeData({ urgency: level.id as 'Routine' | 'Soon' | 'Urgent' })}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                      isSelected
                        ? level.color + ' shadow-lg'
                        : 'border-gray-700 bg-gray-800/30 text-gray-300 hover:border-gray-600 hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{level.icon}</span>
                      <div>
                        <div className="font-semibold text-lg">{level.name}</div>
                        <div className="text-sm opacity-80">{level.description}</div>
                      </div>
                      {isSelected && (
                        <div className="ml-auto">
                          <div className="w-6 h-6 bg-current rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-teal-500/10 rounded-xl p-6 border border-teal-500/30">
            <h4 className="text-teal-400 font-semibold mb-3 flex items-center">
              <Clock className="mr-2" size={16} />
              Pro Tips
            </h4>
            <ul className="text-sm text-teal-300 space-y-2">
              <li>• Be specific about the exact location</li>
              <li>• Include any safety concerns or hazards</li>
              <li>• Note if the issue affects daily operations</li>
              <li>• Mention any temporary fixes attempted</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      {scopeData.location && scopeData.description && scopeData.urgency && (
        <div className="text-center animate-in fade-in duration-500">
          <div className="inline-flex items-center space-x-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-6 py-3">
            <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
            <span className="text-teal-400 font-medium">Location details complete</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationStep;