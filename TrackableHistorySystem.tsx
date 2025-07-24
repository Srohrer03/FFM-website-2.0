import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Clock, Search, Filter, Eye, Download, 
  Activity, User, Wrench, AlertTriangle, CheckCircle,
  Calendar, FileText, Settings, TrendingUp, BarChart3,
  MapPin, Phone, Mail, Tag, Zap
} from 'lucide-react';
import Logo from './Logo';

interface HistoryEvent {
  id: string;
  timestamp: string;
  eventType: 'work_order' | 'maintenance' | 'asset_scan' | 'vendor_activity' | 'system_alert' | 'user_action' | 'compliance' | 'emergency';
  title: string;
  description: string;
  actor: string;
  actorRole: 'client' | 'vendor' | 'ffm' | 'system' | 'tenant';
  location?: string;
  assetId?: string;
  workOrderId?: string;
  vendorId?: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Completed' | 'In Progress' | 'Pending' | 'Failed' | 'Cancelled';
  metadata: {
    cost?: number;
    duration?: number;
    category?: string;
    tags?: string[];
    attachments?: string[];
  };
}

const TrackableHistorySystem = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('timeline');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterActor, setFilterActor] = useState('all');
  const [dateRange, setDateRange] = useState('30');

  // Mock comprehensive history data
  const mockHistoryEvents: HistoryEvent[] = [
    {
      id: 'HIST-001',
      timestamp: '2024-01-21 14:30:00',
      eventType: 'work_order',
      title: 'Work Order Completed - HVAC Repair',
      description: 'Emergency HVAC repair completed successfully. System restored to full operation.',
      actor: 'Arctic Air Solutions',
      actorRole: 'vendor',
      location: 'Building A - Floor 3',
      assetId: 'AST-001',
      workOrderId: 'WO-2024-156',
      vendorId: 'VEN-001',
      priority: 'High',
      status: 'Completed',
      metadata: {
        cost: 2850,
        duration: 4.5,
        category: 'HVAC',
        tags: ['emergency', 'repair', 'hvac'],
        attachments: ['completion_report.pdf', 'before_after_photos.zip']
      }
    },
    {
      id: 'HIST-002',
      timestamp: '2024-01-21 10:15:00',
      eventType: 'asset_scan',
      title: 'QR Code Scanned - Emergency Generator',
      description: 'Maintenance technician scanned QR code for routine inspection.',
      actor: 'Mike Rodriguez',
      actorRole: 'vendor',
      location: 'Building A - Basement',
      assetId: 'AST-002',
      priority: 'Medium',
      status: 'Completed',
      metadata: {
        category: 'Electrical',
        tags: ['qr_scan', 'inspection', 'generator']
      }
    },
    {
      id: 'HIST-003',
      timestamp: '2024-01-21 09:45:00',
      eventType: 'system_alert',
      title: 'Warranty Expiration Alert',
      description: 'Emergency Generator warranty expires in 30 days. Renewal required.',
      actor: 'FFM System',
      actorRole: 'system',
      assetId: 'AST-002',
      priority: 'Medium',
      status: 'Pending',
      metadata: {
        category: 'Warranty',
        tags: ['warranty', 'expiration', 'alert']
      }
    },
    {
      id: 'HIST-004',
      timestamp: '2024-01-20 16:20:00',
      eventType: 'vendor_activity',
      title: 'Vendor Bid Submitted',
      description: 'FastFlow Plumbing submitted competitive bid for kitchen sink repair.',
      actor: 'FastFlow Plumbing',
      actorRole: 'vendor',
      workOrderId: 'WO-2024-155',
      vendorId: 'VEN-003',
      priority: 'Medium',
      status: 'Completed',
      metadata: {
        cost: 450,
        category: 'Plumbing',
        tags: ['bid', 'plumbing', 'competitive']
      }
    },
    {
      id: 'HIST-005',
      timestamp: '2024-01-20 11:30:00',
      eventType: 'maintenance',
      title: 'Preventive Maintenance Scheduled',
      description: 'Monthly HVAC filter replacement scheduled for Building A.',
      actor: 'FFM Maintenance Scheduler',
      actorRole: 'ffm',
      location: 'Building A - Mechanical Room',
      assetId: 'AST-001',
      priority: 'Low',
      status: 'Pending',
      metadata: {
        cost: 450,
        category: 'HVAC',
        tags: ['preventive', 'scheduled', 'filters']
      }
    },
    {
      id: 'HIST-006',
      timestamp: '2024-01-19 14:15:00',
      eventType: 'user_action',
      title: 'Tenant Repair Request Submitted',
      description: 'Sarah Johnson submitted repair request for kitchen sink leak.',
      actor: 'Sarah Johnson',
      actorRole: 'tenant',
      location: 'Apt 3B - Kitchen',
      priority: 'High',
      status: 'Completed',
      metadata: {
        category: 'Plumbing',
        tags: ['tenant_request', 'leak', 'kitchen']
      }
    },
    {
      id: 'HIST-007',
      timestamp: '2024-01-18 08:00:00',
      eventType: 'compliance',
      title: 'Fire Safety Inspection Completed',
      description: 'Monthly fire extinguisher inspection completed successfully.',
      actor: 'SafeGuard Fire Protection',
      actorRole: 'vendor',
      location: 'All Buildings',
      priority: 'Critical',
      status: 'Completed',
      metadata: {
        cost: 300,
        duration: 4,
        category: 'Fire Safety',
        tags: ['compliance', 'fire_safety', 'inspection']
      }
    },
    {
      id: 'HIST-008',
      timestamp: '2024-01-17 13:45:00',
      eventType: 'emergency',
      title: 'Emergency Response - Power Outage',
      description: 'Emergency generator activated during power outage. Full backup power restored.',
      actor: 'Emergency Response Team',
      actorRole: 'ffm',
      location: 'Building A',
      assetId: 'AST-002',
      priority: 'Critical',
      status: 'Completed',
      metadata: {
        duration: 2.5,
        category: 'Emergency',
        tags: ['emergency', 'power_outage', 'generator']
      }
    }
  ];

  const getEventTypeColor = (eventType: string) => {
    const colors = {
      'work_order': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'maintenance': 'bg-green-500/20 text-green-400 border-green-500/30',
      'asset_scan': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'vendor_activity': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'system_alert': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'user_action': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
      'compliance': 'bg-red-500/20 text-red-400 border-red-500/30',
      'emergency': 'bg-red-600/20 text-red-300 border-red-600/30'
    };
    return colors[eventType as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const getEventIcon = (eventType: string) => {
    const icons = {
      'work_order': FileText,
      'maintenance': Wrench,
      'asset_scan': Activity,
      'vendor_activity': User,
      'system_alert': AlertTriangle,
      'user_action': User,
      'compliance': CheckCircle,
      'emergency': Zap
    };
    return icons[eventType as keyof typeof icons] || Activity;
  };

  const filteredEvents = mockHistoryEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.actor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || event.eventType === filterType;
    const matchesActor = filterActor === 'all' || event.actorRole === filterActor;
    
    // Date range filter
    const eventDate = new Date(event.timestamp);
    const now = new Date();
    const daysAgo = parseInt(dateRange);
    const cutoffDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
    const matchesDate = eventDate >= cutoffDate;
    
    return matchesSearch && matchesType && matchesActor && matchesDate;
  });

  const exportHistory = () => {
    alert(`📊 History Export Started!\n\nGenerating comprehensive trackable history report:\n• ${filteredEvents.length} events included\n• Date range: Last ${dateRange} days\n• Format: CSV with full metadata\n• Includes: Timestamps, actors, costs, attachments\n\nReport will be available for download shortly.`);
  };

  const renderTimeline = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Events</option>
            <option value="work_order">Work Orders</option>
            <option value="maintenance">Maintenance</option>
            <option value="asset_scan">Asset Scans</option>
            <option value="vendor_activity">Vendor Activity</option>
            <option value="system_alert">System Alerts</option>
            <option value="user_action">User Actions</option>
            <option value="compliance">Compliance</option>
            <option value="emergency">Emergency</option>
          </select>
          <select
            value={filterActor}
            onChange={(e) => setFilterActor(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Actors</option>
            <option value="client">Client</option>
            <option value="vendor">Vendor</option>
            <option value="ffm">FFM</option>
            <option value="system">System</option>
            <option value="tenant">Tenant</option>
          </select>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
        </div>
        <button
          onClick={exportHistory}
          className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
        >
          <Download size={16} />
          <span>Export History</span>
        </button>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-700"></div>
        <div className="space-y-6">
          {filteredEvents.map((event, index) => {
            const IconComponent = getEventIcon(event.eventType);
            return (
              <div key={event.id} className="relative flex items-start space-x-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${getEventTypeColor(event.eventType)} bg-slate-900 z-10`}>
                  <IconComponent size={20} />
                </div>
                <div className="flex-1 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30 hover:border-teal-500/50 transition-all duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-white font-semibold mb-1">{event.title}</h4>
                      <p className="text-gray-400 text-sm mb-2">{event.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{new Date(event.timestamp).toLocaleString()}</span>
                        <span>•</span>
                        <span>By: {event.actor}</span>
                        {event.location && (
                          <>
                            <span>•</span>
                            <span>{event.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getEventTypeColor(event.eventType)}`}>
                        {event.eventType.replace('_', ' ').toUpperCase()}
                      </span>
                      {event.metadata.cost && (
                        <span className="text-teal-400 font-medium">
                          ${event.metadata.cost.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {event.metadata.tags && event.metadata.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {event.metadata.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      {event.workOrderId && <span>WO: {event.workOrderId}</span>}
                      {event.assetId && <span>Asset: {event.assetId}</span>}
                      {event.metadata.duration && <span>Duration: {event.metadata.duration}h</span>}
                    </div>
                    <button
                      onClick={() => setSelectedEvent(event.id)}
                      className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      <Eye size={14} className="inline mr-1" />
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-xl border border-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-blue-400 font-semibold">Total Events</h3>
            <Activity className="text-blue-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{mockHistoryEvents.length}</div>
          <div className="text-sm text-blue-300 mt-1">Last 30 days</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-6 rounded-xl border border-green-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-green-400 font-semibold">Work Orders</h3>
            <FileText className="text-green-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">
            {mockHistoryEvents.filter(e => e.eventType === 'work_order').length}
          </div>
          <div className="text-sm text-green-300 mt-1">Completed</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-6 rounded-xl border border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-purple-400 font-semibold">Asset Scans</h3>
            <Activity className="text-purple-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">
            {mockHistoryEvents.filter(e => e.eventType === 'asset_scan').length}
          </div>
          <div className="text-sm text-purple-300 mt-1">QR code scans</div>
        </div>

        <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 p-6 rounded-xl border border-red-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-red-400 font-semibold">Emergencies</h3>
            <Zap className="text-red-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">
            {mockHistoryEvents.filter(e => e.eventType === 'emergency').length}
          </div>
          <div className="text-sm text-red-300 mt-1">Emergency responses</div>
        </div>
      </div>

      {/* Event Type Breakdown */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-4">Event Type Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(
            mockHistoryEvents.reduce((acc, event) => {
              acc[event.eventType] = (acc[event.eventType] || 0) + 1;
              return acc;
            }, {} as Record<string, number>)
          ).map(([type, count]) => (
            <div key={type} className="flex justify-between items-center p-3 bg-gray-700/20 rounded-lg">
              <span className="text-white capitalize">{type.replace('_', ' ')}</span>
              <span className="text-teal-400 font-semibold">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actor Activity */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-4">Actor Activity</h3>
        <div className="space-y-3">
          {Object.entries(
            mockHistoryEvents.reduce((acc, event) => {
              if (!acc[event.actor]) {
                acc[event.actor] = { count: 0, role: event.actorRole };
              }
              acc[event.actor].count++;
              return acc;
            }, {} as Record<string, { count: number; role: string }>)
          ).map(([actor, data]) => (
            <div key={actor} className="flex justify-between items-center p-3 bg-gray-700/20 rounded-lg">
              <div>
                <span className="text-white font-medium">{actor}</span>
                <span className="text-gray-400 text-sm ml-2">({data.role})</span>
              </div>
              <span className="text-teal-400 font-semibold">{data.count} events</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="bg-slate-800 border-b border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="transform scale-75 origin-left">
              <Logo />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Trackable History System</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">Complete Audit Trail • Real-Time Tracking • Advanced Analytics</span>
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
          <strong className="text-teal-400">Comprehensive Tracking:</strong> Complete audit trail of all facility activities including work orders, maintenance, asset scans, vendor activities, system alerts, and emergency responses.
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { id: 'timeline', label: 'Event Timeline', icon: Clock },
            { id: 'analytics', label: 'Analytics Dashboard', icon: BarChart3 }
          ].map((tab) => {
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

        {/* Content */}
        {activeTab === 'timeline' && renderTimeline()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
};

export default TrackableHistorySystem;