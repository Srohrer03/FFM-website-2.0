import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, MessageSquare, Ticket, Calendar, Bot, User, 
  Clock, AlertTriangle, CheckCircle, Send, Phone, Mail,
  FileText, Search, Filter, Eye, Plus, Edit, Star,
  Zap, Users, Target, TrendingUp, Award, Shield
} from 'lucide-react';
import Logo from './Logo';

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  category: 'Technical' | 'Billing' | 'General' | 'Emergency' | 'Feature Request';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Waiting for Customer' | 'Resolved' | 'Closed';
  submittedBy: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  slaDeadline: string;
  responses: TicketResponse[];
  attachments: string[];
  tags: string[];
}

interface TicketResponse {
  id: string;
  author: string;
  role: 'customer' | 'support' | 'ai';
  message: string;
  timestamp: string;
  isInternal: boolean;
  attachments?: string[];
}

interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'ai' | 'human';
  timestamp: string;
  isHandoff?: boolean;
  agentName?: string;
}

interface ScheduledMeeting {
  id: string;
  type: 'Demo' | 'Consultation' | 'Onboarding' | 'Training' | 'Strategic Review';
  title: string;
  description: string;
  scheduledDate: string;
  duration: number;
  attendees: string[];
  meetingLink?: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'Rescheduled';
  notes?: string;
  followUpRequired: boolean;
}

const UserSupportSystem = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('chatbot');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isHumanAgent, setIsHumanAgent] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Mock support tickets
  const mockSupportTickets: SupportTicket[] = [
    {
      id: 'TKT-2024-001',
      title: 'Unable to access vendor portal dashboard',
      description: 'Getting a 403 error when trying to access the vendor portal dashboard. This started happening after the latest update.',
      category: 'Technical',
      priority: 'High',
      status: 'In Progress',
      submittedBy: 'Arctic Air Solutions',
      assignedTo: 'Sarah Chen - Technical Support',
      createdAt: '2024-01-21 09:15:00',
      updatedAt: '2024-01-21 14:30:00',
      slaDeadline: '2024-01-22 09:15:00',
      responses: [
        {
          id: 'RESP-001',
          author: 'Arctic Air Solutions',
          role: 'customer',
          message: 'We are unable to access our vendor portal dashboard. Getting a 403 Forbidden error consistently.',
          timestamp: '2024-01-21 09:15:00',
          isInternal: false
        },
        {
          id: 'RESP-002',
          author: 'Sarah Chen',
          role: 'support',
          message: 'Thank you for reporting this issue. I can see the 403 errors in our logs. This appears to be related to a recent security update. I\'m escalating this to our development team for immediate resolution.',
          timestamp: '2024-01-21 10:30:00',
          isInternal: false
        },
        {
          id: 'RESP-003',
          author: 'Dev Team',
          role: 'support',
          message: 'Internal note: Security policy update affected vendor role permissions. Fix deployed to staging.',
          timestamp: '2024-01-21 13:45:00',
          isInternal: true
        },
        {
          id: 'RESP-004',
          author: 'Sarah Chen',
          role: 'support',
          message: 'Good news! We\'ve identified and fixed the issue. The problem was with our recent security update affecting vendor permissions. The fix has been deployed. Please try accessing your portal now and let us know if you still experience any issues.',
          timestamp: '2024-01-21 14:30:00',
          isInternal: false
        }
      ],
      attachments: ['error_screenshot.png', 'browser_console_log.txt'],
      tags: ['portal_access', 'vendor', '403_error', 'security_update']
    },
    {
      id: 'TKT-2024-002',
      title: 'Invoice payment processing delay',
      description: 'Our invoice submitted 5 days ago is still showing as "Under Review" status. Need urgent payment processing.',
      category: 'Billing',
      priority: 'Critical',
      status: 'Waiting for Customer',
      submittedBy: 'FastFlow Plumbing',
      assignedTo: 'Mike Rodriguez - Billing Support',
      createdAt: '2024-01-20 11:20:00',
      updatedAt: '2024-01-21 16:45:00',
      slaDeadline: '2024-01-21 11:20:00',
      responses: [
        {
          id: 'RESP-005',
          author: 'FastFlow Plumbing',
          role: 'customer',
          message: 'Our invoice INV-2024-156 for $2,850 has been under review for 5 days. We need this processed urgently for cash flow.',
          timestamp: '2024-01-20 11:20:00',
          isInternal: false
        },
        {
          id: 'RESP-006',
          author: 'Mike Rodriguez',
          role: 'support',
          message: 'I\'ve located your invoice and can see it\'s pending client approval. The client has requested additional documentation for the emergency repair work. Could you please provide: 1) Before/after photos, 2) Parts receipt, 3) Time log for the work performed?',
          timestamp: '2024-01-21 09:30:00',
          isInternal: false
        },
        {
          id: 'RESP-007',
          author: 'Mike Rodriguez',
          role: 'support',
          message: 'Following up on the additional documentation request. Once you provide these items, I can expedite the approval process with the client.',
          timestamp: '2024-01-21 16:45:00',
          isInternal: false
        }
      ],
      attachments: ['invoice_INV-2024-156.pdf'],
      tags: ['billing', 'invoice', 'payment_delay', 'documentation']
    },
    {
      id: 'TKT-2024-003',
      title: 'Request for preventive maintenance scheduling feature',
      description: 'Would like to request a feature to automatically schedule preventive maintenance based on equipment age and usage patterns.',
      category: 'Feature Request',
      priority: 'Medium',
      status: 'Open',
      submittedBy: 'Metro Properties LLC',
      assignedTo: 'Product Team',
      createdAt: '2024-01-19 14:30:00',
      updatedAt: '2024-01-19 15:15:00',
      slaDeadline: '2024-01-26 14:30:00',
      responses: [
        {
          id: 'RESP-008',
          author: 'Metro Properties LLC',
          role: 'customer',
          message: 'We would love to see an automated preventive maintenance scheduling feature that considers equipment age, usage patterns, and manufacturer recommendations to optimize our maintenance calendar.',
          timestamp: '2024-01-19 14:30:00',
          isInternal: false
        },
        {
          id: 'RESP-009',
          author: 'Product Team',
          role: 'support',
          message: 'Thank you for this excellent feature request! This aligns perfectly with our Q2 roadmap. We\'re actually already developing an AI-powered preventive maintenance system that will include automatic scheduling based on the criteria you mentioned. I\'ll add your specific requirements to our development backlog and keep you updated on progress.',
          timestamp: '2024-01-19 15:15:00',
          isInternal: false
        }
      ],
      attachments: [],
      tags: ['feature_request', 'preventive_maintenance', 'automation', 'ai']
    },
    {
      id: 'TKT-2024-004',
      title: 'Emergency response time exceeded SLA',
      description: 'Emergency HVAC failure response took 4 hours, exceeding our 2-hour SLA. Need explanation and process improvement.',
      category: 'Emergency',
      priority: 'High',
      status: 'Resolved',
      submittedBy: 'Downtown Office Complex',
      assignedTo: 'Operations Manager',
      createdAt: '2024-01-18 08:45:00',
      updatedAt: '2024-01-19 10:20:00',
      slaDeadline: '2024-01-18 12:45:00',
      responses: [
        {
          id: 'RESP-010',
          author: 'Downtown Office Complex',
          role: 'customer',
          message: 'We had an emergency HVAC failure yesterday at 6:00 AM. The vendor didn\'t arrive until 10:00 AM, which exceeded our 2-hour emergency SLA. This caused significant tenant discomfort and complaints.',
          timestamp: '2024-01-18 08:45:00',
          isInternal: false
        },
        {
          id: 'RESP-011',
          author: 'Operations Manager',
          role: 'support',
          message: 'I sincerely apologize for this SLA breach. I\'ve investigated the incident and found that our primary HVAC vendor was handling another emergency. Our backup vendor was contacted but had a delayed response due to a scheduling conflict. We\'ve implemented the following improvements: 1) Added a third backup vendor, 2) Enhanced our emergency escalation protocol, 3) Improved real-time vendor availability tracking.',
          timestamp: '2024-01-18 16:30:00',
          isInternal: false
        },
        {
          id: 'RESP-012',
          author: 'Downtown Office Complex',
          role: 'customer',
          message: 'Thank you for the detailed explanation and the process improvements. We appreciate the proactive steps taken to prevent future occurrences.',
          timestamp: '2024-01-19 10:20:00',
          isInternal: false
        }
      ],
      attachments: ['incident_report.pdf', 'sla_analysis.xlsx'],
      tags: ['emergency', 'sla_breach', 'hvac', 'response_time']
    }
  ];

  // Mock scheduled meetings
  const mockScheduledMeetings: ScheduledMeeting[] = [
    {
      id: 'MTG-001',
      type: 'Demo',
      title: 'FFM Platform Demo - Acme Corporation',
      description: 'Comprehensive platform demonstration focusing on cost savings and vendor management features.',
      scheduledDate: '2024-01-25 14:00:00',
      duration: 60,
      attendees: ['John Smith - Acme Corp', 'Sarah Johnson - Acme Corp', 'FFM Sales Team'],
      meetingLink: 'https://ffm.zoom.us/j/123456789',
      status: 'Scheduled',
      followUpRequired: true
    },
    {
      id: 'MTG-002',
      type: 'Consultation',
      title: 'Strategic Consultation - Metro Properties',
      description: 'Quarterly strategic review and performance analysis session.',
      scheduledDate: '2024-01-24 10:00:00',
      duration: 90,
      attendees: ['Mike Chen - Metro Properties', 'FFM Strategic Advisor'],
      meetingLink: 'https://ffm.zoom.us/j/987654321',
      status: 'Scheduled',
      followUpRequired: true
    },
    {
      id: 'MTG-003',
      type: 'Training',
      title: 'Vendor Portal Training - Arctic Air Solutions',
      description: 'Training session on new vendor portal features and work order management.',
      scheduledDate: '2024-01-22 15:30:00',
      duration: 45,
      attendees: ['Arctic Air Solutions Team', 'FFM Training Specialist'],
      status: 'Completed',
      notes: 'Training completed successfully. Team is now fully onboarded with new features.',
      followUpRequired: false
    }
  ];

  // Initialize chat with welcome message
  useEffect(() => {
    if (chatMessages.length === 0) {
      setChatMessages([
        {
          id: 'welcome',
          message: 'Hello! I\'m the FFM AI Assistant. I can help you with platform questions, troubleshooting, scheduling demos, or connect you with a human agent. How can I assist you today?',
          sender: 'ai',
          timestamp: new Date().toISOString()
        }
      ]);
    }
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const getStatusColor = (status: string) => {
    const colors = {
      'Open': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'In Progress': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Waiting for Customer': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Resolved': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Closed': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      'Scheduled': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Completed': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Cancelled': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Rescheduled': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'Low': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'High': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Critical': 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const sendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: currentMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = '';
      const message = currentMessage.toLowerCase();

      if (message.includes('demo') || message.includes('schedule')) {
        aiResponse = 'I\'d be happy to help you schedule a demo! Our platform demonstrations typically last 60 minutes and cover cost savings, vendor management, and security features. Would you prefer this week or next week? I can also connect you with our sales team for immediate scheduling.';
      } else if (message.includes('pricing') || message.includes('cost')) {
        aiResponse = 'Our flat-fee pricing model eliminates hidden costs and markups. Pricing is based on your facility size and complexity. Most clients save 25-40% compared to traditional facility management. Would you like me to schedule a consultation to discuss specific pricing for your needs?';
      } else if (message.includes('vendor') || message.includes('network')) {
        aiResponse = 'Our vendor network includes 750+ pre-vetted professionals across all trades. Each vendor undergoes rigorous screening including license verification, insurance validation, and background checks. We also have our Trusted Vendor Badge Program recognizing top performers. What specific trade or service are you interested in?';
      } else if (message.includes('security') || message.includes('compliance')) {
        aiResponse = 'FFM maintains enterprise-grade security with SOC 2 Type II certification, bank-level encryption, and multi-factor authentication. We\'re also GDPR compliant and PCI DSS certified. All data is encrypted at rest and in transit. Would you like more details about our security measures?';
      } else if (message.includes('human') || message.includes('agent') || message.includes('person')) {
        setIsHumanAgent(true);
        aiResponse = 'I\'m connecting you with a human support agent now. Please hold while I transfer your conversation...';
        
        setTimeout(() => {
          const handoffMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            message: 'Hi! I\'m Sarah from FFM Support. I\'ve reviewed your conversation with our AI assistant. How can I help you today?',
            sender: 'human',
            timestamp: new Date().toISOString(),
            isHandoff: true,
            agentName: 'Sarah Chen'
          };
          setChatMessages(prev => [...prev, handoffMessage]);
        }, 2000);
      } else if (message.includes('problem') || message.includes('issue') || message.includes('error')) {
        aiResponse = 'I\'m sorry to hear you\'re experiencing an issue. To better assist you, could you please describe: 1) What specific problem you\'re encountering, 2) When it started happening, 3) Any error messages you\'re seeing? I can also create a support ticket for you or connect you with a technical specialist.';
      } else {
        aiResponse = 'Thank you for your message. I can help you with platform questions, scheduling demos, troubleshooting issues, or connect you with a human agent. Could you please provide more details about what you\'d like assistance with?';
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: aiResponse,
        sender: isHumanAgent ? 'human' : 'ai',
        timestamp: new Date().toISOString(),
        agentName: isHumanAgent ? 'Sarah Chen' : undefined
      };

      setChatMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const createTicket = () => {
    alert('🎫 Support Ticket Created!\n\nTicket ID: TKT-2024-005\nPriority: Medium\nSLA: 24 hours\n\n✅ Confirmation email sent\n📧 You\'ll receive updates via email\n🔔 Track progress in your dashboard\n\nOur support team will respond within 4 hours.');
  };

  const scheduleDemo = () => {
    alert('📅 Demo Scheduled Successfully!\n\n🎯 Demo Details:\n• Type: Platform Demonstration\n• Duration: 60 minutes\n• Date: Tomorrow 2:00 PM\n• Format: Video conference\n\n📧 Calendar invite sent\n📋 Pre-demo materials will be shared\n👥 Dedicated solutions consultant assigned\n\nWe\'ll showcase how FFM can save your organization 25-40% on facilities management costs!');
  };

  const filteredTickets = mockSupportTickets.filter(ticket => {
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const renderChatbot = () => (
    <div className="space-y-6">
      {/* AI Chatbot Interface */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-700/30 h-96 flex flex-col">
        <div className="p-4 border-b border-gray-700/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
              {isHumanAgent ? <User className="text-white" size={20} /> : <Bot className="text-white" size={20} />}
            </div>
            <div>
              <h3 className="text-white font-semibold">
                {isHumanAgent ? 'Human Support Agent' : 'FFM AI Assistant'}
              </h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">
                  {isHumanAgent ? 'Sarah Chen - Online' : 'AI Online'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {chatMessages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-teal-500 text-white' 
                  : message.sender === 'human'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  : 'bg-gray-700/50 text-gray-300'
              }`}>
                {message.isHandoff && (
                  <div className="text-xs text-blue-400 mb-1">🔄 Transferred to human agent</div>
                )}
                {message.agentName && (
                  <div className="text-xs text-blue-400 mb-1">{message.agentName}</div>
                )}
                <p className="text-sm">{message.message}</p>
                <div className="text-xs opacity-70 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-700/50 text-gray-300 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 border-t border-gray-700/30">
          <div className="flex space-x-2">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            />
            <button
              onClick={sendMessage}
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={scheduleDemo}
          className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 hover:bg-blue-500/20 transition-colors text-left"
        >
          <Calendar className="text-blue-400 mb-2" size={24} />
          <h4 className="text-white font-semibold mb-1">Schedule Demo</h4>
          <p className="text-gray-400 text-sm">Book a personalized platform demonstration</p>
        </button>

        <button
          onClick={createTicket}
          className="p-4 bg-green-500/10 rounded-lg border border-green-500/20 hover:bg-green-500/20 transition-colors text-left"
        >
          <Ticket className="text-green-400 mb-2" size={24} />
          <h4 className="text-white font-semibold mb-1">Create Ticket</h4>
          <p className="text-gray-400 text-sm">Submit a support request with SLA tracking</p>
        </button>

        <button
          onClick={() => setIsHumanAgent(true)}
          className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20 hover:bg-purple-500/20 transition-colors text-left"
        >
          <User className="text-purple-400 mb-2" size={24} />
          <h4 className="text-white font-semibold mb-1">Human Agent</h4>
          <p className="text-gray-400 text-sm">Connect with a live support specialist</p>
        </button>
      </div>

      {/* AI Capabilities */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-4">AI Assistant Capabilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-teal-400" size={16} />
              <span className="text-gray-300">Platform navigation and feature explanations</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-teal-400" size={16} />
              <span className="text-gray-300">Troubleshooting common issues</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-teal-400" size={16} />
              <span className="text-gray-300">Demo and consultation scheduling</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-teal-400" size={16} />
              <span className="text-gray-300">Pricing and service information</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-teal-400" size={16} />
              <span className="text-gray-300">Vendor network and capabilities</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-teal-400" size={16} />
              <span className="text-gray-300">Seamless handoff to human agents</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTicketSystem = () => (
    <div className="space-y-6">
      {selectedTicket ? (
        <div className="space-y-6">
          {(() => {
            const ticket = mockSupportTickets.find(t => t.id === selectedTicket);
            if (!ticket) return null;

            return (
              <>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    <Home size={20} />
                    <span>Back to Tickets</span>
                  </button>
                  <div className="flex items-center space-x-2">
                    <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors">
                      <Edit size={16} className="inline mr-2" />
                      Edit Ticket
                    </button>
                    <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors">
                      <FileText size={16} className="inline mr-2" />
                      Export
                    </button>
                  </div>
                </div>

                {/* Ticket Header */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-semibold text-white mb-2">{ticket.title}</h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>ID: {ticket.id}</span>
                        <span>•</span>
                        <span>Created: {new Date(ticket.createdAt).toLocaleString()}</span>
                        <span>•</span>
                        <span>Updated: {new Date(ticket.updatedAt).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div className="text-lg font-bold text-blue-400">{ticket.category}</div>
                      <div className="text-xs text-blue-300">Category</div>
                    </div>
                    <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="text-lg font-bold text-green-400">{ticket.assignedTo}</div>
                      <div className="text-xs text-green-300">Assigned To</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <div className="text-lg font-bold text-yellow-400">
                        {new Date(ticket.slaDeadline).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-yellow-300">SLA Deadline</div>
                    </div>
                  </div>
                </div>

                {/* Ticket Description */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
                  <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                  <p className="text-gray-300 leading-relaxed">{ticket.description}</p>
                  
                  {ticket.attachments.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-gray-300 font-medium mb-2">Attachments:</h4>
                      <div className="flex flex-wrap gap-2">
                        {ticket.attachments.map((file, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded text-sm">
                            📎 {file}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {ticket.tags.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-gray-300 font-medium mb-2">Tags:</h4>
                      <div className="flex flex-wrap gap-2">
                        {ticket.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-teal-500/20 text-teal-400 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Conversation Thread */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
                  <h3 className="text-lg font-semibold text-white mb-4">Conversation</h3>
                  <div className="space-y-4">
                    {ticket.responses.map((response) => (
                      <div key={response.id} className={`p-4 rounded-lg border ${
                        response.role === 'customer' ? 'bg-teal-500/10 border-teal-500/20 ml-8' :
                        response.isInternal ? 'bg-purple-500/10 border-purple-500/20 mr-8' :
                        'bg-blue-500/10 border-blue-500/20 mr-8'
                      }`}>
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center space-x-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              response.role === 'customer' ? 'bg-teal-500' :
                              response.isInternal ? 'bg-purple-500' :
                              'bg-blue-500'
                            }`}>
                              {response.role === 'customer' ? <User size={16} /> : <MessageSquare size={16} />}
                            </div>
                            <span className="font-medium text-white">{response.author}</span>
                            {response.isInternal && (
                              <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                                INTERNAL
                              </span>
                            )}
                          </div>
                          <span className="text-gray-400 text-sm">{new Date(response.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-gray-300">{response.message}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add Response */}
                  <div className="mt-6 p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
                    <textarea
                      placeholder="Add a response..."
                      rows={3}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 mb-3"
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="internal" className="w-4 h-4 text-teal-500 bg-gray-700 border-gray-600 rounded focus:ring-teal-500" />
                        <label htmlFor="internal" className="text-gray-300 text-sm">Internal note</label>
                      </div>
                      <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors">
                        <Send size={16} className="inline mr-2" />
                        Send Response
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search tickets..."
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
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Waiting for Customer">Waiting for Customer</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
              >
                <option value="all">All Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <button
              onClick={createTicket}
              className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
            >
              <Plus size={16} />
              <span>New Ticket</span>
            </button>
          </div>

          {/* SLA Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-xl border border-blue-500/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-blue-400 font-semibold">Open Tickets</h3>
                <Ticket className="text-blue-400" size={24} />
              </div>
              <div className="text-2xl font-bold text-white">
                {mockSupportTickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length}
              </div>
              <div className="text-sm text-blue-300 mt-1">Active support requests</div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-6 rounded-xl border border-green-500/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-green-400 font-semibold">SLA Compliance</h3>
                <CheckCircle className="text-green-400" size={24} />
              </div>
              <div className="text-2xl font-bold text-white">94%</div>
              <div className="text-sm text-green-300 mt-1">This month</div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 p-6 rounded-xl border border-yellow-500/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-yellow-400 font-semibold">Avg Response</h3>
                <Clock className="text-yellow-400" size={24} />
              </div>
              <div className="text-2xl font-bold text-white">2.3h</div>
              <div className="text-sm text-yellow-300 mt-1">First response time</div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-6 rounded-xl border border-purple-500/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-purple-400 font-semibold">Satisfaction</h3>
                <Star className="text-purple-400" size={24} />
              </div>
              <div className="text-2xl font-bold text-white">4.8/5</div>
              <div className="text-sm text-purple-300 mt-1">Customer rating</div>
            </div>
          </div>

          {/* Tickets List */}
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <div key={ticket.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30 hover:border-teal-500/50 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-white mb-2">{ticket.title}</h4>
                    <p className="text-gray-400 mb-3">{ticket.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>ID: {ticket.id}</span>
                      <span>•</span>
                      <span>Category: {ticket.category}</span>
                      <span>•</span>
                      <span>Submitted by: {ticket.submittedBy}</span>
                      <span>•</span>
                      <span>Assigned to: {ticket.assignedTo}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>SLA: {new Date(ticket.slaDeadline).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{ticket.responses.length} responses</span>
                  </div>
                  <button
                    onClick={() => setSelectedTicket(ticket.id)}
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
      )}
    </div>
  );

  const renderScheduling = () => (
    <div className="space-y-6">
      {/* Scheduling Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-xl border border-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-blue-400 font-semibold">Scheduled</h3>
            <Calendar className="text-blue-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">
            {mockScheduledMeetings.filter(m => m.status === 'Scheduled').length}
          </div>
          <div className="text-sm text-blue-300 mt-1">Upcoming meetings</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-6 rounded-xl border border-green-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-green-400 font-semibold">Completed</h3>
            <CheckCircle className="text-green-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">
            {mockScheduledMeetings.filter(m => m.status === 'Completed').length}
          </div>
          <div className="text-sm text-green-300 mt-1">This month</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-6 rounded-xl border border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-purple-400 font-semibold">Avg Duration</h3>
            <Clock className="text-purple-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">
            {Math.round(mockScheduledMeetings.reduce((acc, m) => acc + m.duration, 0) / mockScheduledMeetings.length)}min
          </div>
          <div className="text-sm text-purple-300 mt-1">Per meeting</div>
        </div>
      </div>

      {/* Quick Scheduling */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-4">Quick Scheduling</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={scheduleDemo}
            className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 hover:bg-blue-500/20 transition-colors text-left"
          >
            <Calendar className="text-blue-400 mb-2" size={24} />
            <h4 className="text-white font-semibold mb-1">Platform Demo</h4>
            <p className="text-gray-400 text-sm">60 min • Features overview</p>
          </button>

          <button
            onClick={scheduleDemo}
            className="p-4 bg-green-500/10 rounded-lg border border-green-500/20 hover:bg-green-500/20 transition-colors text-left"
          >
            <Users className="text-green-400 mb-2" size={24} />
            <h4 className="text-white font-semibold mb-1">Consultation</h4>
            <p className="text-gray-400 text-sm">90 min • Strategic planning</p>
          </button>

          <button
            onClick={scheduleDemo}
            className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20 hover:bg-purple-500/20 transition-colors text-left"
          >
            <Target className="text-purple-400 mb-2" size={24} />
            <h4 className="text-white font-semibold mb-1">Onboarding</h4>
            <p className="text-gray-400 text-sm">120 min • Implementation</p>
          </button>

          <button
            onClick={scheduleDemo}
            className="p-4 bg-teal-500/10 rounded-lg border border-teal-500/20 hover:bg-teal-500/20 transition-colors text-left"
          >
            <Award className="text-teal-400 mb-2" size={24} />
            <h4 className="text-white font-semibold mb-1">Training</h4>
            <p className="text-gray-400 text-sm">45 min • Feature training</p>
          </button>
        </div>
      </div>

      {/* Scheduled Meetings */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-4">Scheduled Meetings</h3>
        <div className="space-y-4">
          {mockScheduledMeetings.map((meeting) => (
            <div key={meeting.id} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-white font-semibold mb-1">{meeting.title}</h4>
                  <p className="text-gray-400 text-sm mb-2">{meeting.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Type: {meeting.type}</span>
                    <span>•</span>
                    <span>Duration: {meeting.duration} minutes</span>
                    <span>•</span>
                    <span>Attendees: {meeting.attendees.length}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(meeting.status)}`}>
                  {meeting.status}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  📅 {new Date(meeting.scheduledDate).toLocaleString()}
                </div>
                <div className="flex items-center space-x-2">
                  {meeting.meetingLink && meeting.status === 'Scheduled' && (
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
                      Join Meeting
                    </button>
                  )}
                  <button className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-sm transition-colors">
                    View Details
                  </button>
                </div>
              </div>
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
              <h1 className="text-2xl font-semibold">User Support System</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">AI Chatbot • Human Handoff • SLA Tracking • Demo Scheduling</span>
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
          <strong className="text-teal-400">Comprehensive Support:</strong> Integrated AI chatbot with seamless human handoff, support ticket system with SLA tracking, and scheduling tools for demos and consultations.
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { id: 'chatbot', label: 'AI Chatbot', icon: Bot },
            { id: 'tickets', label: 'Support Tickets', icon: Ticket },
            { id: 'scheduling', label: 'Demo Scheduling', icon: Calendar }
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
        {activeTab === 'chatbot' && renderChatbot()}
        {activeTab === 'tickets' && renderTicketSystem()}
        {activeTab === 'scheduling' && renderScheduling()}
      </div>
    </div>
  );
};

export default UserSupportSystem;