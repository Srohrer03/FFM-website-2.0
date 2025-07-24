import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, FileText, Calendar, Wrench, DollarSign, Users, AlertTriangle, Clock, TrendingUp, CheckCircle, Shield, Activity, Thermometer, Droplets, Wind, Zap } from 'lucide-react';
import Logo from './Logo';

const ClientPortal = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="bg-slate-800 border-b border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="transform scale-75 origin-left">
              <Logo />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Client Portal Dashboard</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">Secure Session Active</span>
                <span className="text-xs text-gray-400">• MFA Verified • SSL Encrypted</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900"
          >
            ← Back to Home
          </button>
        </div>
        <div className="mt-4 text-xs text-gray-400 bg-slate-900/50 p-2 rounded border border-gray-700/30">
          <strong className="text-teal-400">Demo Mode:</strong> This is a demonstration interface. In production, this portal would require secure authentication with MFA, role-based access controls, and session management.
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* IoT Monitoring Overview */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Activity className="mr-2 text-teal-400" size={20} />
              IoT Device Status
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-center space-x-2">
                  <Thermometer className="text-green-400" size={16} />
                  <span>HVAC Systems</span>
                </div>
                <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">4 Online</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                <div className="flex items-center space-x-2">
                  <Droplets className="text-red-400" size={16} />
                  <span>Leak Detectors</span>
                </div>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">1 Alert</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-center space-x-2">
                  <Wind className="text-green-400" size={16} />
                  <span>Air Quality</span>
                </div>
                <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">Normal</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-center space-x-2">
                  <Zap className="text-green-400" size={16} />
                  <span>Smart Meters</span>
                </div>
                <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">3 Active</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/iot-monitoring')}
              className="w-full mt-4 bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900"
            >
              View IoT Dashboard
            </button>
          </div>

          {/* R&M Budget Tracker */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <DollarSign className="mr-2 text-teal-400" size={20} />
              R&M Budget Tracker
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <span>HVAC Systems</span>
                <span className="bg-yellow-500 text-black px-2 py-1 rounded text-sm">82% Used</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                <span>Plumbing</span>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">104% Over</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <span>Electrical</span>
                <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">64% Used</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/rm-budget-tracker')}
              className="w-full mt-4 bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900"
            >
              View Budget Tracker
            </button>
          </div>

          {/* Multi-Property Overview */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileText className="mr-2 text-teal-400" size={20} />
              Multi-Property Overview
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <span>Warehouse A</span>
                <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">Active</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <span>Office B</span>
                <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">Active</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <span>Retail C</span>
                <span className="bg-yellow-500 text-black px-2 py-1 rounded text-sm">Maintenance</span>
              </div>
            </div>
          </div>

          {/* PM Calendar */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="mr-2 text-teal-400" size={20} />
              PM Calendar
            </h2>
            <div className="grid grid-cols-5 gap-2 text-sm">
              <div className="text-center font-medium text-gray-400">Mon 7/7</div>
              <div className="text-center font-medium text-gray-400">Tue 7/8</div>
              <div className="text-center font-medium text-gray-400">Wed 7/9</div>
              <div className="text-center font-medium text-gray-400">Thu 7/10</div>
              <div className="text-center font-medium text-gray-400">Fri 7/11</div>
              <div className="text-center p-2 bg-blue-500/20 rounded">Inspection</div>
              <div className="text-center p-2 bg-green-500/20 rounded">Preventive</div>
              <div className="text-center p-2 bg-blue-500/20 rounded">Inspection</div>
              <div className="text-center p-2 bg-red-500/20 rounded">Repair</div>
              <div className="text-center p-2 bg-green-500/20 rounded">PM Scheduled</div>
            </div>
          </div>

          {/* Work Order Management */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Wrench className="mr-2 text-teal-400" size={20} />
              Work Orders
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <div>
                  <div className="font-medium">#45 - Repair</div>
                  <div className="text-sm text-gray-400">HVAC System</div>
                </div>
                <span className="bg-orange-500 text-white px-2 py-1 rounded text-sm">Open</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <div>
                  <div className="font-medium">#46 - Inspection</div>
                  <div className="text-sm text-gray-400">Fire Safety</div>
                </div>
                <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">Closed</span>
              </div>
            </div>
          </div>

          {/* Budget Metrics */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <DollarSign className="mr-2 text-teal-400" size={20} />
              Budget Overview
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Monthly Budget</span>
                <span className="text-2xl font-bold text-teal-400">$12,500</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Spent This Month</span>
                <span className="text-xl font-semibold text-white">$8,750</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-teal-500 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <div className="text-sm text-gray-400">70% utilized</div>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <AlertTriangle className="mr-2 text-teal-400" size={20} />
              Emergency Contacts
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                <span>John Doe</span>
                <span className="text-red-400 font-mono">555-1234</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                <span>Jane Smith</span>
                <span className="text-red-400 font-mono">555-5678</span>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <TrendingUp className="mr-2 text-teal-400" size={20} />
              Performance Metrics
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Avg Response Time</span>
                <span className="text-xl font-semibold text-green-400">2.3 hrs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">PM Compliance</span>
                <span className="text-xl font-semibold text-green-400">95%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Vendor Rating</span>
                <span className="text-xl font-semibold text-yellow-400">4.8/5</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="md:col-span-2 lg:col-span-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Clock className="mr-2 text-teal-400" size={20} />
              Recent Activity & Messages
            </h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <CheckCircle className="text-green-400" size={20} />
                <div>
                  <div className="font-medium">Work order #45 completed</div>
                  <div className="text-sm text-gray-400">2025-07-01 - HVAC maintenance finished by Arctic Air Solutions</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <Users className="text-blue-400" size={20} />
                <div>
                  <div className="font-medium">Message from Vendor XYZ</div>
                  <div className="text-sm text-gray-400">2025-06-28 - "Scheduled maintenance completed successfully"</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <AlertTriangle className="text-yellow-400" size={20} />
                <div>
                  <div className="font-medium">Budget alert: 75% utilized</div>
                  <div className="text-sm text-gray-400">2025-06-25 - Monthly budget approaching threshold</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        {/* Escrow Balance & Flow */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Shield className="mr-2 text-teal-400" size={20} />
            Escrow Balance & Flow
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Current Balance</span>
              <span className="text-2xl font-bold text-teal-400">$45,750</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Pending Release</span>
                <span className="text-yellow-400">$12,500</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Available</span>
                <span className="text-green-400">$33,250</span>
              </div>
            </div>
            <div className="bg-teal-500/10 p-3 rounded-lg border border-teal-500/20">
              <div className="text-sm text-teal-400 font-medium mb-1">Recent Flow</div>
              <div className="text-xs text-gray-400 space-y-1">
                <div className="flex justify-between">
                  <span>HVAC Project #45</span>
                  <span className="text-green-400">+$8,500</span>
                </div>
                <div className="flex justify-between">
                  <span>Plumbing Repair #43</span>
                  <span className="text-red-400">-$2,750</span>
                </div>
              </div>
            </div>
          </div>
        </div>

    </div>
  );
};

export default ClientPortal;