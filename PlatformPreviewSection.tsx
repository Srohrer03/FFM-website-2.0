import React, { useState } from 'react';
import { BarChart3, CheckCircle, Users, Shield, TrendingUp, Clock, Bell, Smartphone, Star, DollarSign, AlertTriangle, Calendar, FileText, Phone, Mail, MapPin, Award, Zap, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PlatformPreviewSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: BarChart3 },
    { id: 'projects', label: 'Project Tracking', icon: CheckCircle },
    { id: 'vendors', label: 'Vendor Network', icon: Users },
    { id: 'budget', label: 'Budget Management', icon: Shield }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
              <h4 className="text-xl font-semibold text-white flex items-center space-x-2">
                <BarChart3 className="text-teal-400" size={24} />
                <span>Real-Time Dashboard</span>
              </h4>
              <div className="flex flex-wrap gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-400">$42,350</div>
                  <div className="text-sm text-gray-400">Budget Remaining</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-400">8</div>
                  <div className="text-sm text-gray-400">Active Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-400">98%</div>
                  <div className="text-sm text-gray-400">On-Time Completion</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-teal-500/10 rounded-lg border border-teal-500/20">
                <TrendingUp className="text-teal-400" size={20} />
                <span className="text-gray-300">Real-time budget tracking with alerts</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-teal-500/10 rounded-lg border border-teal-500/20">
                <Bell className="text-teal-400" size={20} />
                <span className="text-gray-300">Automated maintenance scheduling</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-teal-500/10 rounded-lg border border-teal-500/20">
                <Smartphone className="text-teal-400" size={20} />
                <span className="text-gray-300">Mobile walkthrough app for instant work orders</span>
              </div>
            </div>
          </div>
        );
      
      case 'projects':
        return (
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30">
            <h4 className="text-xl font-semibold text-white flex items-center space-x-2 mb-6">
              <CheckCircle className="text-teal-400" size={24} />
              <span>Project Management Hub</span>
            </h4>
            
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-4 bg-teal-500/5 rounded-lg border border-teal-500/10 hover:border-teal-500/30 transition-all">
                <div className="flex-1">
                  <h5 className="text-white font-semibold mb-1">HVAC System Replacement - Building A</h5>
                  <p className="text-gray-400 text-sm mb-2">Vendor: Arctic Air Solutions | Due: Jan 25, 2024</p>
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      In Progress
                    </span>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-orange-500/20 text-orange-400 border border-orange-500/30">
                      High
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2 mt-3 lg:mt-0">
                  <div className="text-right">
                    <div className="text-lg font-bold text-teal-400">75%</div>
                    <div className="text-xs text-gray-400">Complete</div>
                  </div>
                  <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full transition-all duration-500" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <button className="bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900">
                  View All Projects
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'vendors':
        return (
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30">
            <h4 className="text-xl font-semibold text-white flex items-center space-x-2 mb-6">
              <Users className="text-teal-400" size={24} />
              <span>Vendor Network Management</span>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-teal-500/5 rounded-lg border border-teal-500/10 text-center hover:border-teal-500/30 transition-all">
                <div className="flex justify-center items-center space-x-3 mb-3">
                  <span className="text-2xl font-bold text-teal-400">4.9</span>
                  <div className="text-teal-400">★★★★★</div>
                </div>
                <h5 className="text-white font-semibold mb-2">Arctic Air Solutions</h5>
                <p className="text-gray-400 text-sm mb-3">HVAC • 127 jobs completed</p>
                <div className="flex justify-center space-x-4 text-xs text-gray-400 mb-3">
                  <span>Response: 2.3h</span>
                  <span>•</span>
                  <span className="text-red-400">24/7 Emergency</span>
                </div>
                <div className="text-center px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-400">
                  Available
                </div>
              </div>
              
              <div className="p-4 bg-teal-500/5 rounded-lg border border-teal-500/10 text-center hover:border-teal-500/30 transition-all">
                <div className="flex justify-center items-center space-x-3 mb-3">
                  <span className="text-2xl font-bold text-teal-400">4.7</span>
                  <div className="text-teal-400">★★★★★</div>
                </div>
                <h5 className="text-white font-semibold mb-2">FastFlow Plumbing</h5>
                <p className="text-gray-400 text-sm mb-3">Plumbing • 89 jobs completed</p>
                <div className="flex justify-center space-x-4 text-xs text-gray-400 mb-3">
                  <span>Response: 3.1h</span>
                  <span>•</span>
                  <span className="text-red-400">24/7 Emergency</span>
                </div>
                <div className="text-center px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-400">
                  Available
                </div>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <button className="bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900">
                Browse Full Vendor Network (750+ Vendors)
              </button>
            </div>
          </div>
        );
      
      case 'budget':
        return (
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xl font-semibold text-white flex items-center space-x-2">
                <Shield className="text-teal-400" size={24} />
                <span>Smart Budget Management</span>
              </h4>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-700/20 p-6 rounded-lg border border-gray-700/30">
                <h5 className="text-teal-400 font-semibold mb-4">Budget Overview</h5>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Budget</span>
                    <span className="text-2xl font-bold text-white">$85,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Spent</span>
                    <span className="text-xl font-semibold text-red-400">$62,750</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Remaining</span>
                    <span className="text-xl font-semibold text-green-400">$22,250</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full" style={{ width: '74%' }}></div>
                  </div>
                  <div className="text-sm text-gray-400 text-center">74% utilized</div>
                </div>
              </div>
              
              <div className="bg-gray-700/20 p-6 rounded-lg border border-gray-700/30">
                <h5 className="text-teal-400 font-semibold mb-4">Category Breakdown</h5>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">HVAC</span>
                      <span className="text-gray-400 text-sm">$18,750 / $25,000</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">Plumbing</span>
                      <span className="text-gray-400 text-sm">$12,300 / $15,000</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">Electrical</span>
                      <span className="text-gray-400 text-sm">$8,900 / $12,000</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '74%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4 mt-6">
              <button className="bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900">
                <TrendingUp className="inline mr-2" size={16} />
                Generate Report
              </button>
              <button className="bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900">
                <AlertTriangle className="inline mr-2" size={16} />
                Set Budget Alerts
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section id="platform-preview" className="py-20 bg-slate-900 border-t border-gray-700/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-light text-white mb-4">
              Your Command Center for Facilities Management
            </h2>
            <p className="text-xl text-gray-400">
              Real-time visibility into every aspect of your facility operations
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 border-2 ${
                  activeTab === tab.id
                    ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/25 border-teal-500'
                    : 'bg-slate-800 text-white hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 border-slate-800 hover:border-teal-500 hover:text-slate-900'
                }`}
              >
                <IconComponent size={20} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-500">
          {renderTabContent()}
        </div>
      </div>
    </section>
  );
};

export default PlatformPreviewSection;