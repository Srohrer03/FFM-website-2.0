import React from 'react';
import { DollarSign, Shield, TrendingUp, Brain, CheckCircle } from 'lucide-react';

const ValuePropositionsSection = () => {
  const propositions = [
    {
      icon: DollarSign,
      title: 'Transparent Flat-Fee Model',
      description: 'Predictable monthly costs with zero hidden fees. Our clients save an average of 30% compared to traditional FM companies.',
      benefits: [
        'No markup on vendor services',
        'Fixed monthly pricing',
        'Complete cost breakdown'
      ]
    },
    {
      icon: Shield,
      title: 'Pre-Vetted Vendor Ecosystem',
      description: 'Access our network of 750+ thoroughly screened, licensed, and continuously monitored service professionals.',
      benefits: [
        'Rigorous 12-point vetting process',
        'Ongoing performance monitoring',
        '24/7 emergency response network',
        'Trusted Vendor Badge Program for top performers'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Smart Escrow & Protection',
      description: 'Revolutionary escrow system protects your investment with milestone-based payments and quality guarantees.',
      benefits: [
        'Funds protected until completion',
        'Quality assurance built-in',
        'Dispute resolution support'
      ]
    },
    {
      icon: Brain,
      title: 'AI-Powered Optimization',
      description: 'Machine learning algorithms optimize vendor selection, predict maintenance needs, and reduce costs automatically.',
      benefits: [
        'Predictive maintenance alerts',
        'Intelligent vendor matching',
        'Cost optimization recommendations'
      ]
    }
  ];

  return (
    <section id="value-props" className="py-20 bg-slate-900 border-t border-gray-700/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-light text-white mb-4">
            Why Leading Facilities Choose FFM
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {propositions.map((prop, index) => {
            const IconComponent = prop.icon;
            return (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/30 hover:border-teal-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-500/10 relative overflow-hidden"
              >
                {/* Gradient border effect on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-teal-500/25">
                  <IconComponent className="text-slate-900" size={28} />
                </div>
                
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {prop.title}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {prop.description}
                </p>
                
                <div className="space-y-3">
                  {prop.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center space-x-3">
                      <CheckCircle className="text-teal-400 flex-shrink-0" size={16} />
                      <span className="text-teal-400 font-medium text-sm">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionsSection;