import React, { useEffect, useRef, useState } from 'react';

const StatsDisplay = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    { number: 500, suffix: '+', label: 'Properties Managed' },
    { number: 2400, suffix: '+', label: 'Projects Completed' },
    { number: 50, suffix: 'M+', label: 'Client Savings Generated', prefix: '$' },
    { number: 750, suffix: '+', label: 'Vetted Vendors' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const AnimatedNumber = ({ number, suffix, prefix = '' }: { number: number; suffix: string; prefix?: string }) => {
    const [displayNumber, setDisplayNumber] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      const duration = 2000;
      const steps = 60;
      const increment = number / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
          setDisplayNumber(number);
          clearInterval(timer);
        } else {
          setDisplayNumber(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, [isVisible, number]);

    return (
      <span className="text-5xl lg:text-6xl font-black text-white">
        {prefix}{displayNumber.toLocaleString()}{suffix}
      </span>
    );
  };

  return (
    <section ref={sectionRef} className="bg-gradient-to-r from-teal-500 to-teal-600 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="transform hover:scale-105 transition-transform duration-300">
              <AnimatedNumber 
                number={stat.number} 
                suffix={stat.suffix} 
                prefix={stat.prefix} 
              />
              <div className="text-white/90 text-lg font-medium mt-2 tracking-wide uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsDisplay;