import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { ScopeBuilderProvider, useScopeBuilder } from './ScopeBuilder/ScopeBuilderContext';
import StepIndicator from './ScopeBuilder/StepIndicator';
import IssueTypeStep from './ScopeBuilder/IssueTypeStep';
import LocationStep from './ScopeBuilder/LocationStep';
import MediaStep from './ScopeBuilder/MediaStep';
import ReviewStep from './ScopeBuilder/ReviewStep';
import LivePreviewPanel from './ScopeBuilder/LivePreviewPanel';
import Logo from './Logo';

const ScopeBuilderContent: React.FC = () => {
  const navigate = useNavigate();
  const { state, nextStep, prevStep, isCurrentStepValid, goToStep } = useScopeBuilder();
  const { currentStep } = state;

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <IssueTypeStep />;
      case 1:
        return <LocationStep />;
      case 2:
        return <MediaStep />;
      case 3:
        return <ReviewStep />;
      default:
        return <IssueTypeStep />;
    }
  };

  const handleNext = () => {
    if (currentStep === 3) {
      // Handle submission in ReviewStep
      return;
    }
    nextStep();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="bg-slate-800 border-b border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="transform scale-75 origin-left">
              <Logo />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Intelligent Scope Builder</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">Guided Issue Documentation • AI Cost Estimation • Professional Scoping</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900"
          >
            ← Back to Home
          </button>
        </div>
        <div className="mt-4 text-xs text-gray-400 bg-slate-900/50 p-2 rounded border border-gray-700/30">
          <strong className="text-teal-400">Smart Scoping:</strong> Guided wizard for structured issue documentation with photo annotation, video capture, and AI-powered cost estimation. Replaces manual scoping with intelligent automation.
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <StepIndicator
              currentStep={currentStep}
              totalSteps={4}
              onNext={handleNext}
              onPrevious={prevStep}
              canProceed={isCurrentStepValid()}
              onStepClick={goToStep}
            />
            
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-8 rounded-xl border border-gray-700/30">
              {renderCurrentStep()}
            </div>
          </div>

          {/* Live Preview Panel */}
          <div className="lg:col-span-1">
            <LivePreviewPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

const ScopeBuilder: React.FC = () => {
  return (
    <ScopeBuilderProvider>
      <ScopeBuilderContent />
    </ScopeBuilderProvider>
  );
};

export default ScopeBuilder;