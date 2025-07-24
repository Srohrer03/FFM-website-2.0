import React from 'react';
import { Play, Shield, Award, Clock } from 'lucide-react';
import Button from '../common/Button';

const HeroSection = () => {
  const handleDemo = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      alert(`✅ Demo Scheduled Successfully!\n\nHi John, thank you for your interest in FFM!\n\n📅 Demo Details:\n• Company: Acme Corp\n• Preferred Time: Afternoon\n• Contact: john.doe@acme.com\n\n📧 Next Steps:\n• Confirmation email sent\n• Calendar invite within 30 minutes\n• Pre-demo materials delivered\n• Dedicated solutions consultant assigned\n\nWe'll showcase how FFM can save your organization 25-40% on facilities management costs!`);
    }, 800);
  };

  return (
    <section className="min-h-screen flex items-center justify-center text-center px-6 pt-20 pb-16 bg-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='rgba(148,163,184,0.1)' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-4xl mx-auto z-10 relative">
        {/* Hero Logo */}
        <div className="hero-logo mb-12">
          <img
            src="/ffm_logo.svg" 
            alt="FFM - Fractional Facilities Management" 
            className="mx-auto h-56 md:h-72 lg:h-96 w-auto"
          />
        </div>

        <h1 className="text-5xl lg:text-6xl font-light mb-6 text-white tracking-wide -mt-8">
          Facilities Management.<br/>
          <span style={{ color: '#c4c4c4' }}>Flat Fee Maximum value</span>
        </h1>

        <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          Transform your facility management with our transparent pricing, pre-vetted vendor network, and smart budget oversight. Join 500+ properties saving an average of 30% annually.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center mb-16">
          <Button
            variant="primary"
            size="lg"
            icon={Play}
            onClick={handleDemo}
          >
            Schedule Live Demo
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-8 text-gray-400">
          <div className="flex items-center space-x-3">
            <Shield className="text-teal-400" size={24} />
            <span className="font-medium">Enterprise Security & MFA</span>
          </div>
          <div className="flex items-center space-x-3">
            <Award className="text-teal-400" size={24} />
            <span className="font-medium">SOC 2 Type II Certified</span>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="text-teal-400" size={24} />
            <span className="font-medium">Bank-Level Encryption</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;