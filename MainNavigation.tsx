import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SystemDemoMenu from './SystemDemoMenu';
import AdminPortalMenu from './AdminPortalMenu';

const MainNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'contact') {
      const footer = document.querySelector('footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMobileMenuOpen(false);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 100;
      const targetPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/98' : 'bg-slate-900/95'
      } backdrop-blur-lg border-b border-gray-700/20`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center"></div>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-teal-400 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-80 bg-slate-900 shadow-xl overflow-y-auto">
            <div className="pt-20 px-6">
              <nav className="flex flex-col space-y-1">
                {/* Main Navigation */}
                <div className="mb-6">
                  <h3 className="text-teal-400 font-semibold mb-3 text-sm uppercase tracking-wide">Navigation</h3>
                  <button 
                    onClick={() => scrollToSection('value-props')}
                    className="w-full bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900 mb-2"
                  >
                    Services & Features
                  </button>
                  <button 
                    onClick={() => scrollToSection('security-section')}
                    className="w-full bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900 mb-2"
                  >
                    Security & Compliance
                  </button>
                  <button 
                    onClick={() => scrollToSection('platform-preview')}
                    className="w-full bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900 mb-2"
                  >
                    Platform Preview
                  </button>
                  <button 
                    onClick={() => scrollToSection('testimonials')}
                    className="w-full bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900 mb-2"
                  >
                    Success Stories
                  </button>
                  <button 
                    onClick={() => scrollToSection('cost-calculator')}
                    className="w-full bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900 mb-2"
                  >
                    ROI Calculator
                  </button>
                  <button 
                    onClick={() => scrollToSection('faq-section')}
                    className="w-full bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900 mb-2"
                  >
                    FAQ
                  </button>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="w-full bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900 mb-2"
                  >
                    Contact
                  </button>
                </div>

                {/* Portal Access */}
                <div className="mb-6">
                  <h3 className="text-teal-400 font-semibold mb-3 text-sm uppercase tracking-wide">Portal Access</h3>
                  <button 
                    onClick={() => {
                      navigate('/client-portal');
                      window.scrollTo(0, 0);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-lg transition-all duration-300 font-semibold mb-3 hover:from-blue-600 hover:to-blue-700"
                  >
                    👤 Client Portal
                  </button>
                  <button
                    onClick={() => {
                      navigate('/vendor-portal');
                      window.scrollTo(0, 0);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-lg transition-all duration-300 font-semibold hover:from-green-600 hover:to-green-700"
                  >
                    🔧 Vendor Portal
                  </button>
                </div>

                {/* System Demos */}
                <SystemDemoMenu onClose={() => setIsMobileMenuOpen(false)} />

                {/* Admin Portal */}
                <AdminPortalMenu onClose={() => setIsMobileMenuOpen(false)} />

                {/* Onboarding */}
                <div className="mb-6">
                  <h3 className="text-teal-400 font-semibold mb-3 text-sm uppercase tracking-wide">Get Started</h3>
                  <button 
                    onClick={() => {
                      const event = new CustomEvent('startClientOnboarding');
                      window.dispatchEvent(event);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-3 rounded-lg transition-all duration-300 font-semibold mb-3 hover:from-purple-600 hover:to-purple-700"
                  >
                    🚀 Client Onboarding
                  </button>
                  <button
                    onClick={() => {
                      const event = new CustomEvent('startVendorOnboarding');
                      window.dispatchEvent(event);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-lg transition-all duration-300 font-semibold hover:from-orange-600 hover:to-orange-700"
                  >
                    💼 Vendor Onboarding
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainNavigation;