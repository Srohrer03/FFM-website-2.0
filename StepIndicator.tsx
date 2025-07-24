import React from 'react';
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canProceed: boolean;
  onStepClick: (stepIndex: number) => void;
}

const steps = [
  { title: 'Issue Type', description: 'What needs fixing?' },
  { title: 'Location', description: 'Where is the issue?' },
  { title: 'Media', description: 'Document with photos' },
  { title: 'Review', description: 'Review & submit' }
];

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  canProceed,
  onStepClick
}) => {
  
  const autoFillAllSteps = () => {
    // Trigger all auto-fill events in sequence
    const events = ['autoFillIssueType', 'autoFillLocation', 'autoFillMedia', 'autoFillContact'];
    
    events.forEach((eventName, index) => {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent(eventName));
      }, index * 500);
    });
    
    alert('🚀 Quick Demo Started!\n\n⚡ Auto-filling all steps:\n\n📋 Step 1: Issue Type (Plumbing Leak)\n📍 Step 2: Location & Description\n📸 Step 3: Photos & Annotations\n👤 Step 4: Contact Information\n\n✅ Complete scope will be ready in 2 seconds!');
  };

  const autoFillStep = (stepNumber: number) => {
    const events = ['autoFillIssueType', 'autoFillLocation', 'autoFillMedia', 'autoFillContact'];
    window.dispatchEvent(new CustomEvent(events[stepNumber - 1]));
  };

  return (
    <div className="mb-12">
      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            
            return (
              <div key={index} className="flex flex-col items-center cursor-pointer group" onClick={() => onStepClick(index)}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-teal-500 border-teal-500 text-white shadow-lg shadow-teal-500/25' 
                    : isCurrent
                    ? 'bg-teal-500 border-teal-500 text-white shadow-lg shadow-teal-500/25 scale-110'
                    : 'bg-gray-800 border-gray-600 text-gray-400 group-hover:border-gray-500'
                }`}>
                  {isCompleted ? (
                    <CheckCircle size={20} />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>
                <div className={`mt-3 text-center transition-colors duration-300 ${
                  isCompleted || isCurrent ? 'text-white' : 'text-gray-400'
                }`}>
                  <div className="text-sm font-medium">{step.title}</div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Progress Line */}
        <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-700 -z-10">
          <div 
            className="h-full bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-500 shadow-sm"
            style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={onPrevious}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              currentStep === 0 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 hover:border-gray-500'
            }`}
          >
            <ChevronLeft size={16} />
            <span>Back</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {/* Quick Demo Button */}
          <button
            onClick={autoFillAllSteps}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-purple-500/25"
          >
            🚀 Quick Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;