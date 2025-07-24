import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const VendorOnboardingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const steps = [
    'Trade Specialization',
    'Document Uploads',
    'Service Area',
    'Availability Calendar',
    'Agreement'
  ];

  const openModal = () => {
    setIsOpen(true);
    setCurrentStep(1);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      closeModal();
      alert('🎉 Vendor Onboarding Complete!\n\nWelcome to the FFM Vendor Network! Your application has been submitted successfully. Our team will review your credentials and contact you within 48 hours with next steps.');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className="text-2xl font-semibold text-white mb-2">Trade Specialization</h3>
            <p className="text-gray-400 mb-6">Tell us about your expertise and the services you provide.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Primary Trade</label>
                <select className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500">
                  <option value="">Select Primary Trade</option>
                  <option value="hvac">HVAC Services</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="roofing">Roofing</option>
                  <option value="cleaning">Cleaning Services</option>
                  <option value="landscaping">Landscaping</option>
                  <option value="security">Security Systems</option>
                  <option value="general">General Contracting</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Years of Experience</label>
                <input type="number" placeholder="e.g., 15" className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" />
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Company Description</label>
                <textarea rows={4} placeholder="Describe your company, specialties, and what sets you apart..." className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"></textarea>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-2xl font-semibold text-white mb-2">Document Uploads</h3>
            <p className="text-gray-400 mb-6">Upload your licenses, insurance certificates, and other required documents.</p>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-teal-500/30 rounded-lg p-8 text-center bg-teal-500/5 hover:bg-teal-500/10 transition-colors cursor-pointer">
                <div className="text-teal-400 mb-2">📄</div>
                <p className="text-gray-300">Business License & Certifications</p>
                <p className="text-sm text-gray-500">Upload your business license and trade certifications</p>
              </div>
              <div className="border-2 border-dashed border-teal-500/30 rounded-lg p-8 text-center bg-teal-500/5 hover:bg-teal-500/10 transition-colors cursor-pointer">
                <div className="text-teal-400 mb-2">🛡️</div>
                <p className="text-gray-300">Insurance Certificates</p>
                <p className="text-sm text-gray-500">General liability, workers comp, and other insurance docs</p>
              </div>
              <div className="border-2 border-dashed border-teal-500/30 rounded-lg p-8 text-center bg-teal-500/5 hover:bg-teal-500/10 transition-colors cursor-pointer">
                <div className="text-teal-400 mb-2">📋</div>
                <p className="text-gray-300">W-9 & Tax Documents</p>
                <p className="text-sm text-gray-500">Tax identification and W-9 forms</p>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-2xl font-semibold text-white mb-2">Service Area</h3>
            <p className="text-gray-400 mb-6">Define the geographic areas where you provide services.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Primary Service Area</label>
                <input type="text" placeholder="e.g., Oklahoma City Metro Area" className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" />
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Service Radius (miles)</label>
                <input type="number" placeholder="e.g., 50" className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" />
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Additional Service Areas</label>
                <textarea rows={3} placeholder="List any additional cities or regions you serve..." className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"></textarea>
              </div>
              <div className="flex items-center space-x-3">
                <input type="checkbox" id="emergency" className="w-5 h-5 text-teal-500 bg-gray-700 border-gray-600 rounded focus:ring-teal-500" />
                <label htmlFor="emergency" className="text-gray-300">Available for emergency calls (24/7)</label>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h3 className="text-2xl font-semibold text-white mb-2">Availability Calendar</h3>
            <p className="text-gray-400 mb-6">Set your typical availability and response times.</p>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Standard Operating Hours</label>
                <div className="grid grid-cols-2 gap-4">
                  <select className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500">
                    <option value="">Start Time</option>
                    <option value="6">6:00 AM</option>
                    <option value="7">7:00 AM</option>
                    <option value="8">8:00 AM</option>
                    <option value="9">9:00 AM</option>
                  </select>
                  <select className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500">
                    <option value="">End Time</option>
                    <option value="16">4:00 PM</option>
                    <option value="17">5:00 PM</option>
                    <option value="18">6:00 PM</option>
                    <option value="19">7:00 PM</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Response Time Commitment</label>
                <select className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500">
                  <option value="">Select Response Time</option>
                  <option value="immediate">Immediate (within 1 hour)</option>
                  <option value="same-day">Same Day (within 8 hours)</option>
                  <option value="next-day">Next Business Day</option>
                  <option value="48-hours">Within 48 hours</option>
                </select>
              </div>
              <div className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/20">
                <h4 className="text-teal-400 font-semibold mb-2">Working Days</h4>
                <div className="grid grid-cols-4 gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <label key={day} className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked={!['Sat', 'Sun'].includes(day)} className="w-4 h-4 text-teal-500 bg-gray-700 border-gray-600 rounded focus:ring-teal-500" />
                      <span className="text-gray-300 text-sm">{day}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <h3 className="text-2xl font-semibold text-white mb-2">Vendor Agreement</h3>
            <p className="text-gray-400 mb-6">Review and accept the FFM Vendor Partnership Agreement.</p>
            <div className="space-y-6">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700/30 max-h-64 overflow-y-auto">
                <h4 className="text-white font-semibold mb-4">FFM Vendor Partnership Agreement - Summary</h4>
                <div className="text-gray-300 text-sm space-y-3">
                  <p><strong>Payment Terms:</strong> Net 30 days after project completion and client approval</p>
                  <p><strong>Quality Standards:</strong> All work must meet industry standards and client specifications</p>
                  <p><strong>Response Requirements:</strong> Maintain committed response times for service requests</p>
                  <p><strong>Insurance Requirements:</strong> Maintain current general liability and workers compensation insurance</p>
                  <p><strong>Performance Monitoring:</strong> Regular performance reviews based on client feedback and metrics</p>
                  <p><strong>Termination:</strong> Either party may terminate with 30 days written notice</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <input type="checkbox" id="terms" className="w-5 h-5 text-teal-500 bg-gray-700 border-gray-600 rounded focus:ring-teal-500 mt-1" />
                  <label htmlFor="terms" className="text-gray-300">
                    I have read and agree to the FFM Vendor Partnership Agreement terms and conditions
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <input type="checkbox" id="background" className="w-5 h-5 text-teal-500 bg-gray-700 border-gray-600 rounded focus:ring-teal-500 mt-1" />
                  <label htmlFor="background" className="text-gray-300">
                    I consent to background checks and ongoing performance monitoring
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <input type="checkbox" id="communication" className="w-5 h-5 text-teal-500 bg-gray-700 border-gray-600 rounded focus:ring-teal-500 mt-1" />
                  <label htmlFor="communication" className="text-gray-300">
                    I agree to use the FFM platform for all project communication and updates
                  </label>
                </div>
              </div>

              <div className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/20">
                <h4 className="text-teal-400 font-semibold mb-2">Electronic Signature</h4>
                <input type="text" placeholder="Type your full legal name to sign" className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" />
                <p className="text-xs text-gray-400 mt-2">By typing your name above, you are providing your electronic signature</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Expose the openModal function globally so it can be called from Hero component
  React.useEffect(() => {
    const handleStartVendorOnboarding = () => {
      openModal();
    };
    
    window.addEventListener('startVendorOnboarding', handleStartVendorOnboarding);
    
    return () => {
      window.removeEventListener('startVendorOnboarding', handleStartVendorOnboarding);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 rounded-2xl border border-gray-700/30 w-full max-w-4xl max-h-[95vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 border-b border-gray-700/50">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-4 mb-2">
                <img 
                  src="/ffm_logo_manual.png" 
                  alt="FFM - Fractional Facilities Management" 
                  className="h-16 w-auto"
                />
                <div className="text-teal-400 font-semibold">VENDOR ONBOARDING</div>
              </div>
              <h2 className="text-2xl font-bold text-white">Vendor Onboarding Process</h2>
              <p className="text-gray-400">Step {currentStep} of {totalSteps}</p>
            </div>
            <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-800/50 p-4 border-b border-gray-700/30">
          <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`text-center ${
                  index + 1 === currentStep ? 'text-teal-400 font-semibold' : 
                  index + 1 < currentStep ? 'text-green-400' : 'text-gray-500'
                }`}
              >
                {index + 1 < currentStep ? <CheckCircle size={16} className="inline" /> : step}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto flex-1 min-h-0">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="bg-gray-800/50 p-6 border-t border-gray-700/30 flex justify-between items-center flex-shrink-0">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 border-2 ${
              currentStep === 1 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed border-gray-700' 
                : 'bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white border-slate-800 hover:border-teal-500 hover:text-slate-900'
            }`}
          >
            <ArrowLeft size={20} />
            <span>Previous</span>
          </button>

          <div className="text-gray-400">
            Step {currentStep} of {totalSteps}
          </div>

          <button
            onClick={nextStep}
            className="flex items-center space-x-2 bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900"
          >
            <span>{currentStep === totalSteps ? 'Submit Application' : 'Next'}</span>
            {currentStep === totalSteps ? <CheckCircle size={20} /> : <ArrowRight size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorOnboardingModal;