import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Briefcase, Star, Calendar, FileCheck, TrendingUp, Clock, Award, AlertTriangle } from 'lucide-react';
import Logo from './Logo';

const VendorPortal = () => {
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
              <h1 className="text-2xl font-semibold">Vendor Portal Dashboard</h1>
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
          {/* Work Orders Overview */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Briefcase className="mr-2 text-teal-400" size={20} />
              Work Orders
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Received</span>
                <span className="text-2xl font-bold text-blue-400">10</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Completed</span>
                <span className="text-2xl font-bold text-green-400">8</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
              <div className="text-sm text-gray-400">80% completion rate</div>
            </div>
          </div>

          {/* Bid Status */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <TrendingUp className="mr-2 text-teal-400" size={20} />
              Bid Status
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Won</span>
                <span className="text-2xl font-bold text-green-400">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Pending</span>
                <span className="text-2xl font-bold text-yellow-400">3</span>
              </div>
              <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="text-lg font-semibold text-green-400">62.5% Win Rate</div>
              </div>
            </div>
          </div>

          {/* Performance Rating */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Star className="mr-2 text-teal-400" size={20} />
              Performance Rating
            </h2>
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold text-yellow-400">4.6</div>
              <div className="text-yellow-400 text-2xl">★★★★★</div>
              <div className="text-gray-400">Average Rating</div>
              <div className="text-sm text-green-400">+0.2 from last month</div>
            </div>
          </div>

          {/* Availability Calendar */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="mr-2 text-teal-400" size={20} />
              Availability Calendar
            </h2>
            <div className="grid grid-cols-5 gap-2 text-sm">
              <div className="text-center font-medium text-gray-400">Mon 7/7</div>
              <div className="text-center font-medium text-gray-400">Tue 7/8</div>
              <div className="text-center font-medium text-gray-400">Wed 7/9</div>
              <div className="text-center font-medium text-gray-400">Thu 7/10</div>
              <div className="text-center font-medium text-gray-400">Fri 7/11</div>
              <div className="text-center p-2 bg-green-500/20 rounded">Available</div>
              <div className="text-center p-2 bg-red-500/20 rounded">Busy</div>
              <div className="text-center p-2 bg-green-500/20 rounded">Available</div>
              <div className="text-center p-2 bg-red-500/20 rounded">Busy</div>
              <div className="text-center p-2 bg-green-500/20 rounded">Available</div>
            </div>
          </div>

          {/* Document Status */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileCheck className="mr-2 text-teal-400" size={20} />
              Document Status
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <span>License A</span>
                <div className="text-right">
                  <div className="text-green-400 font-medium">Valid</div>
                  <div className="text-xs text-gray-400">Exp: 2026-01-01</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <span>Insurance</span>
                <div className="text-right">
                  <div className="text-green-400 font-medium">Valid</div>
                  <div className="text-xs text-gray-400">Exp: 2025-12-15</div>
                </div>
              </div>
            </div>
          </div>

          {/* On-Time Performance */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Clock className="mr-2 text-teal-400" size={20} />
              On-Time Performance
            </h2>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">92%</div>
                <div className="text-gray-400">Overall On-Time Rate</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Project X</span>
                  <span className="text-green-400">95%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Project Y</span>
                  <span className="text-yellow-400">85%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Project Z</span>
                  <span className="text-green-400">98%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bid Invitations */}
          <div className="md:col-span-2 lg:col-span-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Award className="mr-2 text-teal-400" size={20} />
              Recent Bid Invitations & Opportunities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">HVAC Maintenance Contract</h3>
                  <span className="bg-yellow-500 text-black px-2 py-1 rounded text-sm">Pending</span>
                </div>
                <p className="text-gray-400 text-sm mb-3">Office Building - Downtown Location</p>
                <div className="flex justify-between items-center">
                  <span className="text-teal-400 font-medium">$15,000</span>
                  <button className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded text-sm transition-colors">
                    Submit Bid
                  </button>
                </div>
              </div>
              
              <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">Plumbing Emergency Response</h3>
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">Accepted</span>
                </div>
                <p className="text-gray-400 text-sm mb-3">Warehouse Facility - Industrial District</p>
                <div className="flex justify-between items-center">
                  <span className="text-teal-400 font-medium">$8,500</span>
                  <button className="bg-gray-600 text-gray-300 px-3 py-1 rounded text-sm cursor-not-allowed">
                    In Progress
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorPortal;