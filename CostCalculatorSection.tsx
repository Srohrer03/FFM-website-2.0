import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

const CostCalculatorSection = () => {
  const [formData, setFormData] = useState({
    sqft: '',
    currentSpend: '',
    facilityType: ''
  });
  const [result, setResult] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const sqft = parseFloat(formData.sqft) || 0;
    const currentSpend = parseFloat(formData.currentSpend) || 0;
    const facilityType = formData.facilityType;
    
    if (sqft <= 0 || currentSpend <= 0 || !facilityType) {
      setResult('<div class="text-orange-400 text-center">Please fill in all fields with valid values.</div>');
      return;
    }
    
    const baseRate: { [key: string]: number } = {
      office: 0.12,
      warehouse: 0.08,
      retail: 0.15,
      manufacturing: 0.10,
      healthcare: 0.18,
      mixed: 0.13
    };
    
    const rate = baseRate[facilityType] || 0.12;
    const estimatedAnnualFee = sqft * rate;
    const potentialSavings = currentSpend - estimatedAnnualFee;
    const savingsPercentage = ((potentialSavings / currentSpend) * 100).toFixed(1);
    
    if (potentialSavings > 0) {
      setResult(`
        <div class="text-center">
          <div class="text-3xl font-bold text-teal-400 mb-4">
            Potential Annual Savings: $${potentialSavings.toLocaleString()}
          </div>
          <div class="text-xl text-green-400 mb-4">
            That's ${savingsPercentage}% savings!
          </div>
          <div class="text-gray-400 mb-4">
            Your FFM flat fee: $${estimatedAnnualFee.toLocaleString()} vs Current spend: $${currentSpend.toLocaleString()}
          </div>
          <div class="text-sm text-gray-500 italic">
            *Estimate based on ${facilityType} facility type. Actual savings may vary.
          </div>
        </div>
      `);
    } else {
      setResult(`
        <div class="text-orange-400 text-center">
          <div class="mb-4">
            Your current spending appears optimized for a ${facilityType} facility.
          </div>
          <div class="text-sm">
            Let's discuss how FFM can still add value through vendor management and process optimization.
          </div>
        </div>
      `);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="cost-calculator" className="py-20 bg-slate-900 border-t border-gray-700/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-light text-white mb-4">
            Calculate Your Potential Savings
          </h2>
          <p className="text-xl text-gray-400">
            See how much you could save with our flat-fee model
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/30 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="sqft" className="block text-gray-300 font-semibold mb-2 uppercase tracking-wide text-sm">
                    Total Square Footage
                  </label>
                  <input
                    type="number"
                    id="sqft"
                    name="sqft"
                    value={formData.sqft}
                    onChange={handleInputChange}
                    placeholder="e.g., 50,000"
                    className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label htmlFor="currentSpend" className="block text-gray-300 font-semibold mb-2 uppercase tracking-wide text-sm">
                    Current Annual Spend
                  </label>
                  <input
                    type="number"
                    id="currentSpend"
                    name="currentSpend"
                    value={formData.currentSpend}
                    onChange={handleInputChange}
                    placeholder="e.g., 120,000"
                    className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label htmlFor="facilityType" className="block text-gray-300 font-semibold mb-2 uppercase tracking-wide text-sm">
                    Facility Type
                  </label>
                  <select
                    id="facilityType"
                    name="facilityType"
                    value={formData.facilityType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300"
                  >
                    <option value="">Select Type</option>
                    <option value="office">Office Building</option>
                    <option value="warehouse">Warehouse/Distribution</option>
                    <option value="retail">Retail Space</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="healthcare">Healthcare Facility</option>
                    <option value="mixed">Mixed Use</option>
                  </select>
                </div>
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 hover:-translate-y-1 inline-flex items-center space-x-2 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900"
                >
                  <Calculator size={20} />
                  <span>Calculate Savings</span>
                </button>
              </div>
            </form>
            
            {result && (
              <div className="mt-8 p-6 bg-teal-500/10 border border-teal-500/20 rounded-xl">
                <div dangerouslySetInnerHTML={{ __html: result }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostCalculatorSection;