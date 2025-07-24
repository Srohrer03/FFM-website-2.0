import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does the flat-fee model work?",
      answer: "Our flat-fee model provides complete cost transparency and predictability. Based on your facility size, complexity, and service requirements, we provide a fixed monthly fee that covers all management services. This includes vendor coordination, project management, emergency response, reporting, and our technology platform. No hidden costs, no surprise charges, no markup on vendor services."
    },
    {
      question: "What makes your vendor network special?",
      answer: "Every vendor in our network undergoes rigorous vetting including license verification, insurance validation, background checks, and performance testing. We maintain ongoing relationships with over 750 certified professionals nationwide, continuously monitoring their performance through client feedback and quality audits. This ensures you always get reliable, high-quality service from trusted professionals."
    },
    {
      question: "How does the escrow system protect my investments?",
      answer: "Our smart escrow system holds project funds until work is completed to your satisfaction. Vendors are paid only after project completion and your approval. This ensures quality workmanship, protects your budget, and provides leverage for addressing any issues. You maintain complete control over fund release while we handle all vendor coordination and project management."
    },
    {
      question: "What types of facilities do you serve?",
      answer: "We provide fractional facilities management services for all types of commercial and industrial facilities including office buildings, retail spaces, manufacturing facilities, warehouses, healthcare facilities, educational institutions, and mixed-use developments. Our vendor network and flat-fee model scales from single-building operations to multi-site portfolios."
    },
    {
      question: "How quickly can you respond to emergencies?",
      answer: "We provide 24/7 emergency response with guaranteed response times based on your service level agreement. Critical emergencies (safety, security, major system failures) receive immediate response within 30 minutes. Urgent issues are addressed within 2 hours, and standard requests within 4-8 hours. Our dispatch system automatically routes requests to the nearest qualified vendor in our network."
    },
    {
      question: "Can I track projects and expenses in real-time?",
      answer: "Yes, our proprietary platform provides real-time project tracking, budget monitoring, and comprehensive reporting. You can view project status, vendor performance, expense tracking, and detailed analytics through our client portal or mobile app. Automated notifications keep you informed of project milestones, budget utilization, and any issues requiring attention."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-20 bg-slate-900 border-t border-gray-700/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-light text-white mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-700/30 overflow-hidden transition-all duration-300 hover:border-teal-500/30"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-teal-500/5 transition-colors duration-300"
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="text-teal-400 transform rotate-0 transition-transform duration-300" size={24} />
                  ) : (
                    <Plus className="text-teal-400 transform rotate-0 transition-transform duration-300" size={24} />
                  )}
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-6 bg-teal-500/5">
                  <p className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;