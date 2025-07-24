import React from 'react';
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Step } from './types';

interface ProgressTimelineProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepIndex: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const ProgressTimeline: React.FC<ProgressTimelineProps> = ({
  steps,
  currentStep,
  onStepClick,
  onNext,
  onPrevious
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Work Order Lifecycle</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={onPrevious}
            disabled={currentStep === 0}
            className="flex items-center space-x-2 bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>
          <button
            onClick={onNext}
            disabled={currentStep === steps.length - 1}
            className="flex items-center space-x-2 bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center cursor-pointer" onClick={() => onStepClick(index)}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                index <= currentStep 
                  ? 'bg-teal-500 border-teal-500 text-white' 
                  : 'bg-gray-700 border-gray-600 text-gray-400'
              }`}>
                {index < currentStep ? (
                  <CheckCircle size={20} />
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
              </div>
              <div className={`mt-2 text-center max-w-24 transition-colors duration-300 ${
                index <= currentStep ? 'text-white' : 'text-gray-400'
              }`}>
                <div className="text-xs font-medium">{step.title}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-700 -z-10">
          <div 
            className="h-full bg-teal-500 transition-all duration-500"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTimeline;