import React from 'react';
import { Wrench, Droplets, Zap, Wind, Shield, Hammer, Paintbrush, Scissors } from 'lucide-react';
import { useScopeBuilder } from './ScopeBuilderContext';

const issueCategories = [
  {
    id: 'plumbing',
    name: 'Plumbing',
    icon: Droplets,
    color: 'from-blue-500 to-blue-600',
    subCategories: ['Leak', 'Clog', 'No Water', 'Low Pressure', 'Toilet Issues', 'Faucet Problems']
  },
  {
    id: 'electrical',
    name: 'Electrical',
    icon: Zap,
    color: 'from-yellow-500 to-yellow-600',
    subCategories: ['No Power', 'Flickering Lights', 'Outlet Issues', 'Circuit Breaker', 'Wiring Problems', 'Switch Problems']
  },
  {
    id: 'hvac',
    name: 'HVAC',
    icon: Wind,
    color: 'from-green-500 to-green-600',
    subCategories: ['No Cooling', 'No Heating', 'Poor Airflow', 'Strange Noises', 'Thermostat Issues', 'Filter Problems']
  },
  {
    id: 'general',
    name: 'General',
    icon: Wrench,
    color: 'from-purple-500 to-purple-600',
    subCategories: ['Door Issues', 'Window Problems', 'Lock Issues', 'Hardware Replacement', 'Minor Repairs', 'Adjustments']
  },
  {
    id: 'security',
    name: 'Security',
    icon: Shield,
    color: 'from-red-500 to-red-600',
    subCategories: ['Access Control', 'Camera Issues', 'Alarm Problems', 'Key/Card Issues', 'Intercom Problems', 'Gate Issues']
  },
  {
    id: 'flooring',
    name: 'Flooring',
    icon: Hammer,
    color: 'from-amber-500 to-amber-600',
    subCategories: ['Carpet Issues', 'Tile Problems', 'Hardwood Issues', 'Vinyl Problems', 'Stains', 'Damage']
  },
  {
    id: 'painting',
    name: 'Painting',
    icon: Paintbrush,
    color: 'from-pink-500 to-pink-600',
    subCategories: ['Touch-up', 'Full Room', 'Exterior', 'Trim Work', 'Stain Coverage', 'Color Change']
  },
  {
    id: 'landscaping',
    name: 'Landscaping',
    icon: Scissors,
    color: 'from-emerald-500 to-emerald-600',
    subCategories: ['Lawn Care', 'Tree Service', 'Irrigation', 'Pest Control', 'Seasonal Cleanup', 'Plant Issues']
  }
];

const IssueTypeStep: React.FC = () => {
  const { state, updateScopeData } = useScopeBuilder();
  const { scopeData } = state;

  React.useEffect(() => {
    const handleAutoFill = () => {
      updateScopeData({
        issueType: 'plumbing',
        subCategory: 'Leak'
      });
    };
    
    window.addEventListener('autoFillIssueType', handleAutoFill);
    return () => window.removeEventListener('autoFillIssueType', handleAutoFill);
  }, []);

  const handleIssueTypeSelect = (issueType: string) => {
    updateScopeData({ issueType, subCategory: '' });
  };

  const handleSubCategorySelect = (subCategory: string) => {
    updateScopeData({ subCategory });
  };

  const selectedCategory = issueCategories.find(cat => cat.id === scopeData.issueType);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-3">What needs to be fixed?</h2>
        <p className="text-gray-400 text-lg">Select the type of issue you're experiencing</p>
      </div>

      {/* Main Categories */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-6">Issue Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {issueCategories.map((category) => {
            const IconComponent = category.icon;
            const isSelected = scopeData.issueType === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => handleIssueTypeSelect(category.id)}
                className={`group relative p-6 rounded-xl border-2 transition-all duration-300 ${
                  isSelected
                    ? 'border-teal-500 bg-teal-500/10 shadow-lg shadow-teal-500/20'
                    : 'border-gray-700 bg-gray-800/30 hover:border-gray-600 hover:bg-gray-800/50'
                }`}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="text-white" size={24} />
                </div>
                <div className="text-white font-medium">{category.name}</div>
                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-Categories */}
      {selectedCategory && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-xl font-semibold text-white mb-6">Specific Issue</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {selectedCategory.subCategories.map((subCat) => {
              const isSelected = scopeData.subCategory === subCat;
              
              return (
                <button
                  key={subCat}
                  onClick={() => handleSubCategorySelect(subCat)}
                  className={`p-4 rounded-lg border transition-all duration-300 text-left ${
                    isSelected
                      ? 'border-teal-500 bg-teal-500/10 text-teal-400 shadow-md'
                      : 'border-gray-700 bg-gray-800/30 text-gray-300 hover:border-gray-600 hover:bg-gray-800/50'
                  }`}
                >
                  <div className="font-medium">{subCat}</div>
                  {isSelected && (
                    <div className="text-teal-300 text-sm mt-1">Selected ✓</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      {scopeData.issueType && scopeData.subCategory && (
        <div className="text-center animate-in fade-in duration-500">
          <div className="inline-flex items-center space-x-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-6 py-3">
            <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
            <span className="text-teal-400 font-medium">Ready to continue</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueTypeStep;