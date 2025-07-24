import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      content: "FFM transformed our facility management completely. We've saved over $180,000 in the first year alone, and the quality of service has never been better. Their vendor network is exceptional.",
      author: "Sarah Johnson",
      title: "VP Operations, Metro Distribution",
      company: "500,000 sq ft | Industrial",
      savings: "Saved $180K",
      type: "client"
    },
    {
      content: "The platform gives us complete visibility into all our facilities. Real-time tracking, budget management, and vendor performance - everything we need in one place. Game changer for our operations.",
      author: "Michael Chen",
      title: "Facilities Director, TechCorp",
      company: "1.2M sq ft | Office Complex",
      savings: "Saved $340K",
      type: "client"
    },
    {
      content: "Working with FFM has streamlined our entire workflow. The quality of vendors is consistently high, payments are seamless, and we've expanded to serve three new markets through their platform.",
      author: "Rodriguez HVAC Solutions",
      title: "Premium Vendor Partner",
      company: "15+ years experience",
      savings: "Top Rated",
      type: "vendor"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="testimonials" className="py-20 bg-slate-900 border-t border-gray-700/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-light text-white mb-4">
            Success Stories from Our Clients
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-8 lg:p-12 rounded-2xl border border-gray-700/30 shadow-2xl text-center">
                    <div className="mb-6">
                      <Quote className="text-teal-400 mx-auto opacity-70" size={32} />
                    </div>
                    
                    <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                      <div className="text-left">
                        <h4 className="text-white font-semibold text-lg mb-1">
                          {testimonial.author}
                        </h4>
                        <div className="text-teal-400 font-semibold mb-1">
                          {testimonial.title}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {testimonial.company}
                        </div>
                      </div>
                      
                      <div className={`px-4 py-2 rounded-full font-semibold text-sm ${
                        testimonial.type === 'vendor' 
                          ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                          : 'bg-gradient-to-r from-green-500 to-teal-500 text-white'
                      }`}>
                        {testimonial.savings}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border-2 border-slate-800 bg-slate-800 text-white hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 hover:border-teal-500 hover:text-slate-900 transition-all duration-300 flex items-center justify-center"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-teal-500' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border-2 border-slate-800 bg-slate-800 text-white hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 hover:border-teal-500 hover:text-slate-900 transition-all duration-300 flex items-center justify-center"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;