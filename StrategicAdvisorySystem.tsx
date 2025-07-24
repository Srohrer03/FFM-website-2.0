import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Phone, Calendar, Users, TrendingUp, BarChart3,
  Clock, CheckCircle, Video, MessageSquare, FileText,
  Target, Award, Zap, Brain, DollarSign, AlertTriangle
} from 'lucide-react';
import Logo from './Logo';

interface AdvisoryCall {
  id: string;
  title: string;
  type: 'Monthly KPI Review' | 'Quarterly Strategy' | 'Annual Planning' | 'Emergency Consultation' | 'Custom Analysis';
  scheduledDate: string;
  duration: number;
  participants: string[];
  agenda: string[];
  status: 'Scheduled' | 'Completed' | 'In Progress' | 'Cancelled';
  meetingLink?: string;
  recordingUrl?: string;
  actionItems: ActionItem[];
  kpiReview?: KPIReview;
  recommendations: string[];
}

interface ActionItem {
  id: string;
  description: string;
  assignee: string;
  dueDate: string;
  status: 'Open' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
}

interface KPIReview {
  period: string;
  metrics: {
    name: string;
    current: number;
    target: number;
    trend: 'up' | 'down' | 'stable';
    status: 'on_track' | 'at_risk' | 'behind';
  }[];
  insights: string[];
  recommendations: string[];
}

const StrategicAdvisorySystem = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCall, setSelectedCall] = useState<string | null>(null);

  // Mock advisory calls data
  const mockAdvisoryCalls: AdvisoryCall[] = [
    {
      id: 'ADV-001',
      title: 'Q1 2024 Strategic Review & KPI Analysis',
      type: 'Quarterly Strategy',
      scheduledDate: '2024-02-15 14:00:00',
      duration: 90,
      participants: ['John Smith - CEO', 'Sarah Johnson - CFO', 'Mike Chen - Facilities Director', 'FFM Strategic Advisor'],
      agenda: [
        'Q1 Performance Review',
        'Budget Variance Analysis',
        'Vendor Performance Assessment',
        'Cost Optimization Opportunities',
        'Q2 Strategic Priorities',
        'Technology Investment ROI'
      ],
      status: 'Scheduled',
      meetingLink: 'https://ffm.zoom.us/j/123456789',
      actionItems: [
        {
          id: 'AI-001',
          description: 'Implement AI vendor optimization recommendations',
          assignee: 'Mike Chen',
          dueDate: '2024-03-01',
          status: 'Open',
          priority: 'High'
        },
        {
          id: 'AI-002',
          description: 'Review and approve preventive maintenance expansion',
          assignee: 'Sarah Johnson',
          dueDate: '2024-02-28',
          status: 'Open',
          priority: 'Medium'
        }
      ],
      kpiReview: {
        period: 'Q1 2024',
        metrics: [
          { name: 'Cost Savings', current: 180000, target: 150000, trend: 'up', status: 'on_track' },
          { name: 'Response Time (hours)', current: 2.1, target: 2.5, trend: 'down', status: 'on_track' },
          { name: 'Maintenance Compliance (%)', current: 96, target: 95, trend: 'up', status: 'on_track' },
          { name: 'Vendor Performance Score', current: 94, target: 90, trend: 'up', status: 'on_track' },
          { name: 'Budget Utilization (%)', current: 82, target: 85, trend: 'stable', status: 'on_track' },
          { name: 'Tenant Satisfaction', current: 91, target: 88, trend: 'up', status: 'on_track' }
        ],
        insights: [
          'Cost savings exceeded target by 20% through vendor optimization',
          'Response times improved 15% with new emergency protocols',
          'Preventive maintenance program showing strong ROI',
          'Vendor consolidation strategy delivering results'
        ],
        recommendations: [
          'Expand preventive maintenance to additional asset categories',
          'Implement IoT monitoring for predictive maintenance',
          'Consider vendor partnership expansion in high-performing categories'
        ]
      },
      recommendations: [
        'Increase preventive maintenance budget by $45K for 280% ROI',
        'Deploy IoT sensors across critical assets for $125K investment',
        'Consolidate with top-performing vendors for 15% additional savings'
      ]
    },
    {
      id: 'ADV-002',
      title: 'Monthly KPI Review - January 2024',
      type: 'Monthly KPI Review',
      scheduledDate: '2024-02-05 10:00:00',
      duration: 60,
      participants: ['Mike Chen - Facilities Director', 'FFM Account Manager', 'FFM Data Analyst'],
      agenda: [
        'January Performance Metrics',
        'Work Order Analysis',
        'Budget Tracking',
        'Vendor Performance Review',
        'February Priorities'
      ],
      status: 'Completed',
      recordingUrl: 'https://ffm.recordings.com/adv-002',
      actionItems: [
        {
          id: 'AI-003',
          description: 'Address elevator vendor performance issues',
          assignee: 'Mike Chen',
          dueDate: '2024-02-15',
          status: 'In Progress',
          priority: 'High'
        },
        {
          id: 'AI-004',
          description: 'Schedule HVAC preventive maintenance review',
          assignee: 'FFM Account Manager',
          dueDate: '2024-02-10',
          status: 'Completed',
          priority: 'Medium'
        }
      ],
      kpiReview: {
        period: 'January 2024',
        metrics: [
          { name: 'Work Orders Completed', current: 47, target: 45, trend: 'up', status: 'on_track' },
          { name: 'Average Response Time', current: 1.9, target: 2.0, trend: 'down', status: 'on_track' },
          { name: 'Budget Utilization', current: 74, target: 80, trend: 'stable', status: 'on_track' },
          { name: 'Vendor Performance', current: 92, target: 90, trend: 'up', status: 'on_track' }
        ],
        insights: [
          'Work order volume increased 12% due to winter weather',
          'Response times improved with new vendor protocols',
          'Budget utilization below target - opportunity for additional projects'
        ],
        recommendations: [
          'Prepare for increased HVAC maintenance in February',
          'Consider accelerating planned maintenance projects',
          'Review elevator vendor performance improvement plan'
        ]
      },
      recommendations: [
        'Implement elevator vendor improvement plan within 30 days',
        'Accelerate Q1 maintenance projects to utilize available budget',
        'Prepare winter weather emergency response protocols'
      ]
    },
    {
      id: 'ADV-003',
      title: 'Emergency Consultation - HVAC System Failure',
      type: 'Emergency Consultation',
      scheduledDate: '2024-01-28 16:30:00',
      duration: 30,
      participants: ['Mike Chen - Facilities Director', 'FFM Emergency Response Team', 'Arctic Air Solutions'],
      agenda: [
        'System Failure Assessment',
        'Emergency Response Coordination',
        'Temporary Solutions',
        'Replacement Timeline',
        'Cost Impact Analysis'
      ],
      status: 'Completed',
      recordingUrl: 'https://ffm.recordings.com/adv-003',
      actionItems: [
        {
          id: 'AI-005',
          description: 'Deploy temporary heating units',
          assignee: 'Arctic Air Solutions',
          dueDate: '2024-01-28',
          status: 'Completed',
          priority: 'High'
        },
        {
          id: 'AI-006',
          description: 'Order replacement HVAC components',
          assignee: 'Arctic Air Solutions',
          dueDate: '2024-01-29',
          status: 'Completed',
          priority: 'High'
        }
      ],
      recommendations: [
        'Implement redundant HVAC systems for critical areas',
        'Increase preventive maintenance frequency for aging units',
        'Consider HVAC system upgrade for improved reliability'
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'Scheduled': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Completed': 'bg-green-500/20 text-green-400 border-green-500/30',
      'In Progress': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Cancelled': 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const getMetricStatusColor = (status: string) => {
    const colors = {
      'on_track': 'text-green-400',
      'at_risk': 'text-yellow-400',
      'behind': 'text-red-400'
    };
    return colors[status as keyof typeof colors] || 'text-gray-400';
  };

  const scheduleCall = (type: string) => {
    alert(`📞 ${type} Scheduled!\n\n📅 Call Details:\n• Type: ${type}\n• Duration: 60-90 minutes\n• Participants: Client team + FFM Strategic Advisor\n• Format: Video conference with screen sharing\n\n📋 Agenda will include:\n• Performance review\n• KPI analysis\n• Strategic recommendations\n• Action item planning\n\n✅ Calendar invite and meeting materials will be sent 24 hours in advance.`);
  };

  const joinCall = (callId: string) => {
    const call = mockAdvisoryCalls.find(c => c.id === callId);
    if (!call) return;

    alert(`🎥 Joining Strategic Advisory Call\n\n📋 ${call.title}\n⏰ ${new Date(call.scheduledDate).toLocaleString()}\n👥 ${call.participants.length} participants\n\n🔗 Meeting Link: ${call.meetingLink}\n\n📝 Agenda and materials have been shared in advance.\nRecording will be available after the call.`);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-xl border border-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-blue-400 font-semibold">Total Calls</h3>
            <Phone className="text-blue-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{mockAdvisoryCalls.length}</div>
          <div className="text-sm text-blue-300 mt-1">This quarter</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-6 rounded-xl border border-green-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-green-400 font-semibold">Action Items</h3>
            <CheckCircle className="text-green-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">
            {mockAdvisoryCalls.reduce((acc, call) => acc + call.actionItems.length, 0)}
          </div>
          <div className="text-sm text-green-300 mt-1">Generated</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-6 rounded-xl border border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-purple-400 font-semibold">Avg Duration</h3>
            <Clock className="text-purple-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">
            {Math.round(mockAdvisoryCalls.reduce((acc, call) => acc + call.duration, 0) / mockAdvisoryCalls.length)}min
          </div>
          <div className="text-sm text-purple-300 mt-1">Per call</div>
        </div>

        <div className="bg-gradient-to-br from-teal-500/10 to-teal-600/10 p-6 rounded-xl border border-teal-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-teal-400 font-semibold">Recommendations</h3>
            <Target className="text-teal-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">
            {mockAdvisoryCalls.reduce((acc, call) => acc + call.recommendations.length, 0)}
          </div>
          <div className="text-sm text-teal-300 mt-1">Strategic insights</div>
        </div>
      </div>

      {/* Upcoming Calls */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Upcoming Strategic Advisory Calls</h3>
          <button
            onClick={() => scheduleCall('Custom Strategic Review')}
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
          >
            Schedule Call
          </button>
        </div>
        
        <div className="space-y-4">
          {mockAdvisoryCalls.filter(call => call.status === 'Scheduled').map((call) => (
            <div key={call.id} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-white font-semibold mb-1">{call.title}</h4>
                  <p className="text-gray-400 text-sm mb-2">{call.type} • {call.duration} minutes</p>
                  <div className="text-sm text-gray-500">
                    📅 {new Date(call.scheduledDate).toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(call.status)}`}>
                    {call.status}
                  </span>
                  <button
                    onClick={() => joinCall(call.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    <Video size={14} className="inline mr-1" />
                    Join Call
                  </button>
                </div>
              </div>
              
              <div className="mb-3">
                <h5 className="text-gray-300 font-medium mb-2">Participants:</h5>
                <div className="flex flex-wrap gap-2">
                  {call.participants.map((participant, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                      {participant}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="text-gray-300 font-medium mb-2">Agenda:</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {call.agenda.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Schedule Options */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-4">Schedule Strategic Advisory Call</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => scheduleCall('Monthly KPI Review')}
            className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 hover:bg-blue-500/20 transition-colors text-left"
          >
            <BarChart3 className="text-blue-400 mb-2" size={24} />
            <h4 className="text-white font-semibold mb-1">Monthly KPI Review</h4>
            <p className="text-gray-400 text-sm">60 min • Performance metrics analysis</p>
          </button>

          <button
            onClick={() => scheduleCall('Quarterly Strategy Session')}
            className="p-4 bg-green-500/10 rounded-lg border border-green-500/20 hover:bg-green-500/20 transition-colors text-left"
          >
            <TrendingUp className="text-green-400 mb-2" size={24} />
            <h4 className="text-white font-semibold mb-1">Quarterly Strategy</h4>
            <p className="text-gray-400 text-sm">90 min • Strategic planning session</p>
          </button>

          <button
            onClick={() => scheduleCall('Annual Planning Workshop')}
            className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20 hover:bg-purple-500/20 transition-colors text-left"
          >
            <Target className="text-purple-400 mb-2" size={24} />
            <h4 className="text-white font-semibold mb-1">Annual Planning</h4>
            <p className="text-gray-400 text-sm">120 min • Strategic roadmap development</p>
          </button>

          <button
            onClick={() => scheduleCall('Emergency Consultation')}
            className="p-4 bg-red-500/10 rounded-lg border border-red-500/20 hover:bg-red-500/20 transition-colors text-left"
          >
            <AlertTriangle className="text-red-400 mb-2" size={24} />
            <h4 className="text-white font-semibold mb-1">Emergency Consult</h4>
            <p className="text-gray-400 text-sm">30 min • Urgent strategic guidance</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderCallHistory = () => (
    <div className="space-y-6">
      {selectedCall ? (
        <div className="space-y-6">
          {(() => {
            const call = mockAdvisoryCalls.find(c => c.id === selectedCall);
            if (!call) return null;

            return (
              <>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setSelectedCall(null)}
                    className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    <Home size={20} />
                    <span>Back to Call History</span>
                  </button>
                  {call.recordingUrl && (
                    <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors">
                      <Video size={16} className="inline mr-2" />
                      View Recording
                    </button>
                  )}
                </div>

                {/* Call Details */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold text-white mb-2">{call.title}</h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>Type: {call.type}</span>
                        <span>•</span>
                        <span>Duration: {call.duration} minutes</span>
                        <span>•</span>
                        <span>Date: {new Date(call.scheduledDate).toLocaleString()}</span>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(call.status)}`}>
                      {call.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Participants</h3>
                      <div className="space-y-2">
                        {call.participants.map((participant, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Users className="text-gray-400" size={16} />
                            <span className="text-gray-300">{participant}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Agenda</h3>
                      <div className="space-y-2">
                        {call.agenda.map((item, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="text-teal-400" size={16} />
                            <span className="text-gray-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* KPI Review */}
                {call.kpiReview && (
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
                    <h3 className="text-xl font-semibold text-white mb-4">KPI Review - {call.kpiReview.period}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                      {call.kpiReview.metrics.map((metric, index) => (
                        <div key={index} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-gray-400 text-sm">{metric.name}</span>
                            <span className={`text-xs px-2 py-1 rounded ${getMetricStatusColor(metric.status)}`}>
                              {metric.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                          <div className="text-xl font-bold text-white mb-1">
                            {typeof metric.current === 'number' && metric.current > 1000 
                              ? `$${(metric.current / 1000).toFixed(0)}K`
                              : metric.current
                            }
                          </div>
                          <div className="text-sm text-gray-400">
                            Target: {typeof metric.target === 'number' && metric.target > 1000 
                              ? `$${(metric.target / 1000).toFixed(0)}K`
                              : metric.target
                            }
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-teal-400 mb-3">Key Insights</h4>
                        <div className="space-y-2">
                          {call.kpiReview.insights.map((insight, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <Brain className="text-teal-400 mt-1" size={16} />
                              <span className="text-gray-300 text-sm">{insight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-teal-400 mb-3">Recommendations</h4>
                        <div className="space-y-2">
                          {call.kpiReview.recommendations.map((rec, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <Target className="text-teal-400 mt-1" size={16} />
                              <span className="text-gray-300 text-sm">{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Items */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
                  <h3 className="text-xl font-semibold text-white mb-4">Action Items</h3>
                  <div className="space-y-3">
                    {call.actionItems.map((item) => (
                      <div key={item.id} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-medium">{item.description}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            item.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                            item.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-400">
                          <span>Assigned to: {item.assignee}</span>
                          <span>Due: {new Date(item.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strategic Recommendations */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
                  <h3 className="text-xl font-semibold text-white mb-4">Strategic Recommendations</h3>
                  <div className="space-y-3">
                    {call.recommendations.map((rec, index) => (
                      <div key={index} className="p-3 bg-teal-500/10 rounded-lg border border-teal-500/20">
                        <p className="text-teal-300">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      ) : (
        <div className="space-y-4">
          {mockAdvisoryCalls.map((call) => (
            <div key={call.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30 hover:border-teal-500/50 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-white mb-2">{call.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                    <span>Type: {call.type}</span>
                    <span>•</span>
                    <span>Duration: {call.duration} minutes</span>
                    <span>•</span>
                    <span>Participants: {call.participants.length}</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    📅 {new Date(call.scheduledDate).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(call.status)}`}>
                    {call.status}
                  </span>
                  {call.status === 'Scheduled' && (
                    <button
                      onClick={() => joinCall(call.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      <Video size={14} className="inline mr-1" />
                      Join
                    </button>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>{call.actionItems.length} action items</span>
                  <span>•</span>
                  <span>{call.recommendations.length} recommendations</span>
                  {call.recordingUrl && (
                    <>
                      <span>•</span>
                      <span className="text-blue-400">Recording available</span>
                    </>
                  )}
                </div>
                <button
                  onClick={() => setSelectedCall(call.id)}
                  className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
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
              <h1 className="text-2xl font-semibold">Strategic Advisory Calls</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">Custom KPI Reviews • Strategic Planning • Expert Consultation</span>
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
          <strong className="text-teal-400">Strategic Advisory:</strong> Regular strategic consultation calls with FFM experts for KPI reviews, performance analysis, and strategic planning sessions tailored to your facility management goals.
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { id: 'dashboard', label: 'Advisory Dashboard', icon: BarChart3 },
            { id: 'history', label: 'Call History & KPIs', icon: Phone }
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
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'history' && renderCallHistory()}
      </div>
    </div>
  );
};

export default StrategicAdvisorySystem;