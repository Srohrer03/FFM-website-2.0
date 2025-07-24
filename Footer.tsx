import React from 'react';
import { Phone, Mail, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';
import Logo from './Logo';
import Button from './common/Button';

const Footer = () => {
  const handleDemo = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      alert(`✅ Demo Scheduled Successfully!\n\nHi John, thank you for your interest in FFM!\n\n📅 Demo Details:\n• Company: Acme Corp\n• Preferred Time: Afternoon\n• Contact: john.doe@acme.com\n\n📧 Next Steps:\n• Confirmation email sent\n• Calendar invite within 30 minutes\n• Pre-demo materials delivered\n• Dedicated solutions consultant assigned\n\nWe'll showcase how FFM can save your organization 25-40% on facilities management costs!`);
    }, 800);
  };

  const handleRFP = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      alert(`🚀 RFP Submitted Successfully!\n\nThank you Jane!\n\n📋 RFP Summary:\n• Organization: Enterprise Solutions\n• Budget Range: $100,000 - $250,000\n• Contact: jane.smith@enterprise.org\n\n⏰ Response Timeline:\n• Initial review: 24 hours\n• Detailed proposal: 3-5 business days\n• Technical presentation: Within 1 week\n• Custom pricing: 5-7 business days\n\nRFP ID: FFM-${Date.now()}\n\nOur team will contact you within 24 hours to discuss your specific requirements!`);
    }, 800);
  };

  return (
    <footer className="bg-slate-900 border-t border-gray-700/20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div id="contact" className="mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <Logo />
            </div>
            <p className="text-gray-400 mb-6">
              Fractional Facilities Management
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-teal-500/10 border border-teal-500 rounded-full flex items-center justify-center text-teal-400 hover:bg-teal-500 hover:text-slate-900 transition-all duration-300">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-teal-500/10 border border-teal-500 rounded-full flex items-center justify-center text-teal-400 hover:bg-teal-500 hover:text-slate-900 transition-all duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-teal-500/10 border border-teal-500 rounded-full flex items-center justify-center text-teal-400 hover:bg-teal-500 hover:text-slate-900 transition-all duration-300">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone size={18} />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail size={18} />
                <span>info@ffm-platform.com</span>
              </div>
              <div className="flex items-start space-x-3 text-gray-400">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>123 Business Ave, Suite 100<br/>Oklahoma City, OK 73102</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Quick Links</h4>
            <div className="space-y-3">
              <a href="#privacy" className="block text-gray-400 hover:text-teal-400 transition-colors">Privacy Policy</a>
              <a href="#terms" className="block text-gray-400 hover:text-teal-400 transition-colors">Terms of Service</a>
              <a href="#faq" className="block text-gray-400 hover:text-teal-400 transition-colors">FAQ</a>
              <a href="#support" className="block text-gray-400 hover:text-teal-400 transition-colors">Support</a>
            </div>
          </div>

          {/* Get Started */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Get Started</h4>
            <div className="space-y-3">
              <Button
                variant="primary"
                onClick={handleDemo}
                className="w-full"
              >
                Schedule Demo
              </Button>
              <Button
                variant="primary"
                onClick={handleRFP}
                className="w-full"
              >
                Submit RFP
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700/50 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Fractional Facilities Management. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;