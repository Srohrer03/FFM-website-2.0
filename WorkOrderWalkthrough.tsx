import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import ProgressTimeline from './WorkOrderWalkthrough/ProgressTimeline';
import WorkOrderForm from './WorkOrderWalkthrough/WorkOrderForm';
import VendorMatching from './WorkOrderWalkthrough/VendorMatching';
import BidCollection from './WorkOrderWalkthrough/BidCollection';
import ClientReview from './WorkOrderWalkthrough/ClientReview';
import WorkOrderDispatch from './WorkOrderWalkthrough/WorkOrderDispatch';
import ProgressTracking from './WorkOrderWalkthrough/ProgressTracking';
import QualityAssurance from './WorkOrderWalkthrough/QualityAssurance';
import ProcessBenefits from './WorkOrderWalkthrough/ProcessBenefits';
import { FormData } from './WorkOrderWalkthrough/types';
import { mockVendors, steps } from './WorkOrderWalkthrough/mockData';

const WorkOrderWalkthrough = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    woNumber: '',
    description: '',
    priority: '',
    category: '',
    location: '',
    requestedBy: '',
    vendorCategory: '',
    preferredVendor: '',
    budget: '',
    dueDate: '',
    startDate: '',
    estimatedFinishDate: '',
    attachments: []
  });

  useEffect(() => {
    const generateWONumber = () => {
      const year = new Date().getFullYear();
      const randomNum = Math.floor(Math.random() * 9000) + 1000;
      return `WO-${year}-${randomNum}`;
    };
    
    if (!formData.woNumber) {
      setFormData(prev => ({
        ...prev,
        woNumber: generateWONumber()
      }));
    }
  }, [formData.woNumber]);

  const simulateFormFill = () => {
    setFormData({
      woNumber: formData.woNumber,
      description: 'Air conditioning unit on 3rd floor not cooling properly. Tenants reporting uncomfortable temperatures.',
      priority: 'High',
      category: 'HVAC',
      location: 'Building A - Floor 3 - East Wing',
      requestedBy: 'John Smith - Facilities Manager',
      vendorCategory: 'HVAC-Commercial',
      preferredVendor: 'No Preference',
      budget: '$3,000',
      dueDate: '2024-01-25',
      startDate: '2024-01-20',
      estimatedFinishDate: '2024-01-25',
      attachments: ['hvac_unit_photo.jpg', 'temperature_readings.pdf']
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <WorkOrderForm formData={formData} setFormData={setFormData} onAutoFill={simulateFormFill} />;
      case 1:
        return <VendorMatching />;
      case 2:
        return <BidCollection vendors={mockVendors} />;
      case 3:
        return <ClientReview />;
      case 4:
        return <WorkOrderDispatch />;
      case 5:
        return <ProgressTracking />;
      case 6:
        return <QualityAssurance />;
      default:
        return null;
    }
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
              <h1 className="text-2xl font-semibold">Work Order Process Walkthrough</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">Interactive Demo</span>
                <span className="text-xs text-gray-400">• Step-by-Step Process • Real-Time Simulation</span>
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
          <strong className="text-teal-400">Interactive Demo:</strong> This walkthrough demonstrates the complete work order lifecycle from creation to completion. Use the controls below to step through the process or watch it play automatically.
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <ProgressTimeline
          steps={steps}
          currentStep={currentStep}
          onStepClick={handleStepClick}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />

        <div className="mb-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-white mb-2">{steps[currentStep].title}</h3>
            <p className="text-gray-400">{steps[currentStep].description}</p>
          </div>
          {renderStepContent()}
        </div>

        <ProcessBenefits />
      </div>
    </div>
  );
};

export default WorkOrderWalkthrough;