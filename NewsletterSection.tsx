import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
        alert('✅ Thank you for subscribing! You\'ll receive updates on FFM platform improvements and industry insights.');
      }, 2000);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-t border-gray-700/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
              Stay Informed
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Get updates on fractional facilities management, vendor network enhancements, cost optimization strategies, and FFM platform improvements delivered to your inbox.
            </p>
          </div>
          
          <div className="flex-1 max-w-md w-full">
            <form onSubmit={handleSubmit} className="flex gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your work email"
                  className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubscribed}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 border-2 ${
                  isSubscribed
                    ? 'bg-green-500 text-white border-green-500'
                    : 'bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white shadow-lg hover:shadow-teal-500/25 border-slate-800 hover:border-teal-500 hover:text-slate-900'
                }`}
              >
                <Mail size={20} />
                <span>{isSubscribed ? 'Subscribed!' : 'Subscribe'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;