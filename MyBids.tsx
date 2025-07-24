import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Eye, Clock, CheckCircle, DollarSign, Star,
  User, Calendar, MapPin, Camera, Video, FileText,
  Filter, Search, RefreshCw, Download
} from 'lucide-react';
import { ScopeStatus, VendorBid } from './ScopeBuilder/types';
import Logo from './Logo';

const MyBids: React.FC = () => {
  const navigate = useNavigate();
  const [selectedScope, setSelectedScope] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock scope submissions and bids
  const mockScopes: ScopeStatus[] = [
    {
      scopeId: 'SCOPE-1705934400000',
      status: 'completed',
      assignedScoper: 'Mike Rodriguez - Senior Scoper',
      scopingScheduled: '2024-01-22 10:00:00',
      bidsReceived: 3,
      bidsExpected: 3,
      estimatedCompletion: '2024-01-24 17:00:00',
      bids: [
        {
          id: 'BID-001',
          vendorName: 'FastFlow Plumbing',
          vendorRating: 4.8,
          price: 285,
          eta: 'Same day service',
          warranty: '1 year parts & labor',
          description: 'Kitchen faucet replacement with high-quality Moen fixture. Includes shutoff valve inspection and leak testing.',
          certifications: ['Licensed Plumber', 'Insured', 'Bonded'],
          submittedAt: '2024-01-23 14:30:00'
        },
        {
          id: 'BID-002',
          vendorName: 'ProFlow Plumbing',
          vendorRating: 4.6,
          price: 320,
          eta: 'Next business day',
          warranty: '2 year parts & labor',
          description: 'Premium faucet replacement with Delta fixture. Includes water pressure optimization and 2-year extended warranty.',
          certifications: ['Master Plumber', 'Insured', 'EPA Certified'],
          submittedAt: '2024-01-23 15:45:00'
        },
        {
          id: 'BID-003',
          vendorName: 'AquaTech Services',
          vendorRating: 4.7,
          price: 250,
          eta: 'Within 2 days',
          warranty: '6 months parts & labor',
          description: 'Standard faucet replacement with quality Kohler fixture. Professional installation with cleanup included.',
          certifications: ['Licensed Plumber', 'Insured'],
          submittedAt: '2024-01-23 16:20:00'
        }
      ]
    },
    {
      scopeId: 'SCOPE-1705848000000',
      status: 'bidding',
      assignedScoper: 'Sarah Chen - Electrical Specialist',
      scopingScheduled: '2024-01-21 14:00:00',
      bidsReceived: 2,
      bidsExpected: 4,
      estimatedCompletion: '2024-01-25 12:00:00',
      bids: [
        {
          id: 'BID-004',
          vendorName: 'PowerTech Electrical',
          vendorRating: 4.9,
          price: 450,
          eta: 'Tomorrow morning',
          warranty: '1 year parts & labor',
          description: 'Outlet replacement and circuit testing. Includes GFCI upgrade for bathroom safety compliance.',
          certifications: ['Master Electrician', 'Insured', 'OSHA Certified'],
          submittedAt: '2024-01-24 09:15:00'
        },
        {
          id: 'BID-005',
          vendorName: 'Bright Electric Co',
          vendorRating: 4.5,
          price: 380,
          eta: 'Within 3 days',
          warranty: '6 months parts & labor',
          description: 'Standard outlet replacement with code compliance verification. Professional installation guaranteed.',
          certifications: ['Licensed Electrician', 'Insured'],
          submittedAt: '2024-01-24 11:30:00'
        }
      ]
    },
    {
      scopeId: 'SCOPE-1705761600000',
      status: 'scoping',
      assignedScoper: 'David Wilson - HVAC Specialist',
      scopingScheduled: '2024-01-25 09:00:00',
      bidsReceived: 0,
      bidsExpected: 3,
      estimatedCompletion: '2024-01-26 16:00:00',
      bids: []
    },
    {
      scopeId: 'SCOPE-1705675200000',
      status: 'submitted',
      bidsReceived: 0,
      bidsExpected: 3,
      bids: []
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'submitted': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'scoping': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'bidding': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'completed': 'bg-green-500/20 text-green-400 border-green-500/30'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const selectBid = (scopeId: string, bidId: string) => {
    const scope = mockScopes.find(s => s.scopeId === scopeId);
    const bid = scope?.bids.find(b => b.id === bidId);
    
    if (bid) {
      alert(`✅ Bid Selected Successfully!\n\n👷 Vendor: ${bid.vendorName}\n💰 Price: ${formatCurrency(bid.price)}\n⏰ ETA: ${bid.eta}\n🛡️ Warranty: ${bid.warranty}\n\n📋 Next Steps:\n• Work order created automatically\n• Vendor notified and will contact you\n• Project tracking available\n• Payment held in escrow until completion\n\n📧 Confirmation email sent with vendor contact details`);
    }
  };

  const filteredScopes = mockScopes.filter(scope => {
    const matchesStatus = filterStatus === 'all' || scope.status === filterStatus;
    const matchesSearch = scope.scopeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (scope.assignedScoper && scope.assignedScoper.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const renderScopeList = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search scopes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Status</option>
            <option value="submitted">Submitted</option>
            <option value="scoping">Scoping</option>
            <option value="bidding">Bidding</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate('/scope-builder')}
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
          >
            + New Scope
          </button>
          <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors">
            <RefreshCw size={16} className="inline mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Scope Cards */}
      <div className="space-y-4">
        {filteredScopes.map((scope) => (
          <div key={scope.scopeId} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30 hover:border-teal-500/50 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Scope #{scope.scopeId}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>Submitted: {new Date(parseInt(scope.scopeId.split('-')[1])).toLocaleDateString()}</span>
                  {scope.assignedScoper && (
                    <>
                      <span>•</span>
                      <span>Scoper: {scope.assignedScoper}</span>
                    </>
                  )}
                </div>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(scope.status)}`}>
                {scope.status.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="text-lg font-bold text-blue-400">{scope.bidsReceived}</div>
                <div className="text-xs text-blue-300">Bids Received</div>
              </div>
              <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <div className="text-lg font-bold text-purple-400">{scope.bidsExpected}</div>
                <div className="text-xs text-purple-300">Bids Expected</div>
              </div>
              <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <div className="text-lg font-bold text-yellow-400">
                  {scope.estimatedCompletion ? new Date(scope.estimatedCompletion).toLocaleDateString() : 'TBD'}
                </div>
                <div className="text-xs text-yellow-300">Est. Completion</div>
              </div>
              <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="text-lg font-bold text-green-400">
                  {scope.bids.length > 0 ? formatCurrency(Math.min(...scope.bids.map(b => b.price))) : 'TBD'}
                </div>
                <div className="text-xs text-green-300">Lowest Bid</div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">
                {scope.status === 'submitted' && 'Awaiting scoper assignment'}
                {scope.status === 'scoping' && `Scoping scheduled: ${scope.scopingScheduled ? new Date(scope.scopingScheduled).toLocaleString() : 'TBD'}`}
                {scope.status === 'bidding' && `${scope.bidsReceived}/${scope.bidsExpected} bids received`}
                {scope.status === 'completed' && 'All bids received - ready for selection'}
              </div>
              <button
                onClick={() => setSelectedScope(scope.scopeId)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Eye size={16} className="inline mr-1" />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderScopeDetails = () => {
    const scope = mockScopes.find(s => s.scopeId === selectedScope);
    if (!scope) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedScope(null)}
            className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors"
          >
            <Home size={20} />
            <span>Back to My Scopes</span>
          </button>
          <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors">
            <Download size={16} className="inline mr-2" />
            Export Report
          </button>
        </div>

        {/* Scope Header */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">Scope #{scope.scopeId}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>Submitted: {new Date(parseInt(scope.scopeId.split('-')[1])).toLocaleDateString()}</span>
                {scope.assignedScoper && (
                  <>
                    <span>•</span>
                    <span>Scoper: {scope.assignedScoper}</span>
                  </>
                )}
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(scope.status)}`}>
              {scope.status.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="text-lg font-bold text-blue-400">{scope.bidsReceived}</div>
              <div className="text-xs text-blue-300">Bids Received</div>
            </div>
            <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="text-lg font-bold text-purple-400">{scope.bidsExpected}</div>
              <div className="text-xs text-purple-300">Bids Expected</div>
            </div>
            <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <div className="text-lg font-bold text-yellow-400">
                {scope.estimatedCompletion ? new Date(scope.estimatedCompletion).toLocaleDateString() : 'TBD'}
              </div>
              <div className="text-xs text-yellow-300">Est. Completion</div>
            </div>
            <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="text-lg font-bold text-green-400">
                {scope.bids.length > 0 ? `${Math.round((scope.bidsReceived / scope.bidsExpected) * 100)}%` : '0%'}
              </div>
              <div className="text-xs text-green-300">Progress</div>
            </div>
          </div>
        </div>

        {/* Bid Comparison */}
        {scope.bids.length > 0 && (
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h3 className="text-xl font-semibold text-white mb-4">Vendor Bids Comparison</h3>
            <div className="space-y-4">
              {scope.bids.map((bid) => (
                <div key={bid.id} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30 hover:border-teal-500/50 transition-all duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-white font-semibold mb-1">{bid.vendorName}</h4>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center space-x-1">
                          <Star className="text-yellow-400" size={14} />
                          <span className="text-yellow-400 font-medium">{bid.vendorRating}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-400 text-sm">ETA: {bid.eta}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-400 text-sm">Warranty: {bid.warranty}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{bid.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-teal-400">{formatCurrency(bid.price)}</div>
                      <button
                        onClick={() => selectBid(scope.scopeId, bid.id)}
                        className="mt-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
                      >
                        Select Bid
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {bid.certifications.map((cert, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Status Timeline */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <h3 className="text-xl font-semibold text-white mb-4">Status Timeline</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle size={16} className="text-white" />
              </div>
              <div>
                <div className="text-white font-medium">Scope Submitted</div>
                <div className="text-gray-400 text-sm">
                  {new Date(parseInt(scope.scopeId.split('-')[1])).toLocaleString()}
                </div>
              </div>
            </div>
            
            {scope.assignedScoper && (
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  scope.status !== 'submitted' ? 'bg-green-500' : 'bg-gray-600'
                }`}>
                  <User size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">Scoper Assigned</div>
                  <div className="text-gray-400 text-sm">{scope.assignedScoper}</div>
                </div>
              </div>
            )}
            
            {scope.scopingScheduled && (
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  scope.status === 'bidding' || scope.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                }`}>
                  <Calendar size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">Scoping Scheduled</div>
                  <div className="text-gray-400 text-sm">
                    {new Date(scope.scopingScheduled).toLocaleString()}
                  </div>
                </div>
              </div>
            )}
            
            {scope.bidsReceived > 0 && (
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  scope.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                }`}>
                  <DollarSign size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">Bids Received</div>
                  <div className="text-gray-400 text-sm">
                    {scope.bidsReceived} of {scope.bidsExpected} bids received
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="bg-slate-800 border-b border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="transform scale-75 origin-left">
              <Logo />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">My Scope Submissions & Bids</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">Track Scoping Progress • Compare Vendor Bids • Select Best Option</span>
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
          <strong className="text-teal-400">Bid Management:</strong> Track your scope submissions from professional scoping through vendor bidding to final selection. Compare bids, ratings, and warranties to make informed decisions.
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {selectedScope ? renderScopeDetails() : renderScopeList()}
      </div>
    </div>
  );
};

export default MyBids;