import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Users, Building, Wrench, Activity, FileText, AlertTriangle, 
  MessageSquare, Star, Shield, Clock, DollarSign, Eye, Search, Filter,
  Download, Bell, CheckCircle, X, Phone, Mail, MapPin, Calendar,
  TrendingUp, BarChart3, Settings, RefreshCw, Award, Zap
} from 'lucide-react';
import Logo from './Logo';

const FFMAdminPortal = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data for All Clients
  const mockClients = [
    {
      id: 'CLI-001',
      companyName: 'Metro Properties LLC',
      contactPerson: 'John Smith',
      email: 'john.smith@metroprop.com',
      phone: '(555) 123-4567',
      address: '123 Business Ave, Oklahoma City, OK 73102',
      totalBudget: 450000,
      totalSpent: 342000,
      facilitiesCount: 3,
      activeWorkOrders: 12,
      status: 'Active',
      joinDate: '2023-01-15',
      lastActivity: '2024-01-25 14:30:00',
      facilities: [
        { name: 'Downtown Office Tower', sqft: 125000, type: 'Office', budget: 180000, spent: 145000 },
        { name: 'Suburban Warehouse', sqft: 85000, type: 'Warehouse', budget: 120000, spent: 98000 },
        { name: 'Retail Shopping Center', sqft: 95000, type: 'Retail', budget: 150000, spent: 99000 }
      ]
    },
    {
      id: 'CLI-002',
      companyName: 'Industrial Holdings Inc',
      contactPerson: 'Sarah Johnson',
      email: 'sarah.j@industrial.com',
      phone: '(555) 234-5678',
      address: '456 Industrial Blvd, Tulsa, OK 74101',
      totalBudget: 680000,
      totalSpent: 521000,
      facilitiesCount: 5,
      activeWorkOrders: 18,
      status: 'Active',
      joinDate: '2022-08-20',
      lastActivity: '2024-01-24 09:15:00',
      facilities: [
        { name: 'Manufacturing Plant A', sqft: 200000, type: 'Manufacturing', budget: 250000, spent: 195000 },
        { name: 'Manufacturing Plant B', sqft: 180000, type: 'Manufacturing', budget: 220000, spent: 178000 },
        { name: 'Admin Building', sqft: 45000, type: 'Office', budget: 80000, spent: 62000 },
        { name: 'Warehouse Complex', sqft: 150000, type: 'Warehouse', budget: 90000, spent: 68000 },
        { name: 'Research Facility', sqft: 35000, type: 'Laboratory', budget: 40000, spent: 18000 }
      ]
    },
    {
      id: 'CLI-003',
      companyName: 'Healthcare Systems Group',
      contactPerson: 'Dr. Michael Chen',
      email: 'mchen@healthsys.org',
      phone: '(555) 345-6789',
      address: '789 Medical Center Dr, Oklahoma City, OK 73104',
      totalBudget: 320000,
      totalSpent: 278000,
      facilitiesCount: 2,
      activeWorkOrders: 8,
      status: 'Active',
      joinDate: '2023-03-10',
      lastActivity: '2024-01-25 11:45:00',
      facilities: [
        { name: 'Main Medical Center', sqft: 180000, type: 'Healthcare', budget: 220000, spent: 198000 },
        { name: 'Outpatient Clinic', sqft: 65000, type: 'Healthcare', budget: 100000, spent: 80000 }
      ]
    }
  ];

  // Mock Data for All Vendors
  const mockVendors = [
    {
      id: 'VEN-001',
      companyName: 'Arctic Air Solutions',
      contactPerson: 'Mike Rodriguez',
      email: 'mike@arcticair.com',
      phone: '(555) 111-2222',
      category: 'HVAC',
      rating: 4.9,
      totalEarnings: 125000,
      completedJobs: 127,
      activeJobs: 5,
      responseTime: '2.3 hours',
      status: 'Approved',
      joinDate: '2022-01-15',
      lastActivity: '2024-01-25 16:20:00',
      certifications: ['EPA Certified', 'NATE Certified', 'OSHA 30'],
      insuranceExpiry: '2024-12-31',
      licenseExpiry: '2025-06-30'
    },
    {
      id: 'VEN-002',
      companyName: 'FastFlow Plumbing',
      contactPerson: 'Lisa Thompson',
      email: 'lisa@fastflow.com',
      phone: '(555) 222-3333',
      category: 'Plumbing',
      rating: 4.7,
      totalEarnings: 89000,
      completedJobs: 156,
      activeJobs: 3,
      responseTime: '1.8 hours',
      status: 'Approved',
      joinDate: '2022-03-20',
      lastActivity: '2024-01-24 14:15:00',
      certifications: ['Master Plumber', 'Backflow Certified', 'OSHA 10'],
      insuranceExpiry: '2024-11-15',
      licenseExpiry: '2025-03-20'
    },
    {
      id: 'VEN-003',
      companyName: 'Bright Electric Co',
      contactPerson: 'David Park',
      email: 'david@brightelectric.com',
      phone: '(555) 333-4444',
      category: 'Electrical',
      rating: 4.8,
      totalEarnings: 67000,
      completedJobs: 89,
      activeJobs: 2,
      responseTime: '3.1 hours',
      status: 'Approved',
      joinDate: '2022-05-10',
      lastActivity: '2024-01-23 10:30:00',
      certifications: ['Licensed Electrician', 'Solar Certified', 'OSHA 30'],
      insuranceExpiry: '2024-10-20',
      licenseExpiry: '2025-05-10'
    }
  ];

  // Mock Data for Platform Health Metrics
  const mockPlatformHealth = {
    systemUptime: 99.97,
    activeUsers: 1247,
    totalTransactions: 15678,
    avgResponseTime: 245,
    errorRate: 0.03,
    databaseHealth: 98.5,
    apiHealth: 99.2,
    storageUsage: 67.8,
    bandwidthUsage: 45.2,
    securityAlerts: 2,
    backupStatus: 'Completed',
    lastBackup: '2024-01-25 02:00:00',
    recentAlerts: [
      { id: 1, type: 'Warning', message: 'High CPU usage detected on server-03', timestamp: '2024-01-25 14:15:00' },
      { id: 2, type: 'Info', message: 'Database backup completed successfully', timestamp: '2024-01-25 02:00:00' },
      { id: 3, type: 'Critical', message: 'Failed login attempts from IP 192.168.1.100', timestamp: '2024-01-24 23:45:00' }
    ]
  };

  // Mock Data for User Logs
  const mockUserLogs = [
    {
      id: 'LOG-001',
      userId: 'USR-001',
      userName: 'John Smith',
      userType: 'Client',
      action: 'Created Work Order',
      details: 'WO-2024-001 - HVAC Repair',
      ipAddress: '192.168.1.45',
      timestamp: '2024-01-25 14:30:00',
      status: 'Success',
      sessionId: 'SES-12345',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: 'LOG-002',
      userId: 'USR-002',
      userName: 'Mike Rodriguez',
      userType: 'Vendor',
      action: 'Submitted Bid',
      details: 'Bid $2,850 for WO-2024-001',
      ipAddress: '10.0.0.23',
      timestamp: '2024-01-25 15:45:00',
      status: 'Success',
      sessionId: 'SES-67890',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    },
    {
      id: 'LOG-003',
      userId: 'USR-003',
      userName: 'Sarah Johnson',
      userType: 'Client',
      action: 'Login Failed',
      details: 'Invalid password attempt',
      ipAddress: '172.16.0.100',
      timestamp: '2024-01-25 09:15:00',
      status: 'Failed',
      sessionId: 'SES-11111',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15'
    }
  ];

  // Mock Data for Document Compliance
  const mockDocuments = [
    {
      id: 'DOC-001',
      vendorId: 'VEN-001',
      vendorName: 'Arctic Air Solutions',
      documentType: 'General Liability Insurance',
      status: 'Valid',
      issueDate: '2024-01-01',
      expiryDate: '2024-12-31',
      daysUntilExpiry: 340,
      policyNumber: 'GL-2024-001',
      coverageAmount: 2000000,
      autoRenewal: true,
      lastVerified: '2024-01-15',
      complianceScore: 100
    },
    {
      id: 'DOC-002',
      vendorId: 'VEN-001',
      vendorName: 'Arctic Air Solutions',
      documentType: 'EPA Certification',
      status: 'Expiring Soon',
      issueDate: '2022-06-15',
      expiryDate: '2024-06-15',
      daysUntilExpiry: 142,
      certificationNumber: 'EPA-HVAC-2022-001',
      coverageAmount: null,
      autoRenewal: false,
      lastVerified: '2024-01-10',
      complianceScore: 85
    },
    {
      id: 'DOC-003',
      vendorId: 'VEN-002',
      vendorName: 'FastFlow Plumbing',
      documentType: 'Master Plumber License',
      status: 'Valid',
      issueDate: '2023-03-20',
      expiryDate: '2025-03-20',
      daysUntilExpiry: 419,
      licenseNumber: 'MPL-2023-456',
      coverageAmount: null,
      autoRenewal: true,
      lastVerified: '2024-01-20',
      complianceScore: 100
    }
  ];

  // Mock Data for PM Health
  const mockPMTasks = [
    {
      id: 'PM-001',
      taskName: 'HVAC Filter Replacement',
      facility: 'Downtown Office Tower',
      client: 'Metro Properties LLC',
      vendor: 'Arctic Air Solutions',
      frequency: 'Monthly',
      lastCompleted: '2024-01-15',
      nextDue: '2024-02-15',
      status: 'Due Soon',
      healthScore: 95,
      complianceRate: 98,
      avgCompletionTime: 2.5,
      cost: 450,
      priority: 'High'
    },
    {
      id: 'PM-002',
      taskName: 'Fire Extinguisher Inspection',
      facility: 'Manufacturing Plant A',
      client: 'Industrial Holdings Inc',
      vendor: 'SafeGuard Fire Protection',
      frequency: 'Monthly',
      lastCompleted: '2024-01-10',
      nextDue: '2024-02-10',
      status: 'Scheduled',
      healthScore: 100,
      complianceRate: 100,
      avgCompletionTime: 4.0,
      cost: 300,
      priority: 'Critical'
    },
    {
      id: 'PM-003',
      taskName: 'Elevator Safety Inspection',
      facility: 'Main Medical Center',
      client: 'Healthcare Systems Group',
      vendor: 'SafeLift Services',
      frequency: 'Quarterly',
      lastCompleted: '2023-11-15',
      nextDue: '2024-02-15',
      status: 'Overdue',
      healthScore: 75,
      complianceRate: 85,
      avgCompletionTime: 6.0,
      cost: 1200,
      priority: 'Critical'
    }
  ];

  // Mock Data for Escalation Queue
  const mockEscalations = [
    {
      id: 'ESC-001',
      title: 'Critical HVAC System Failure',
      client: 'Metro Properties LLC',
      facility: 'Downtown Office Tower',
      priority: 'Critical',
      status: 'Open',
      assignedTo: 'FFM Manager - Alex Thompson',
      createdDate: '2024-01-25 08:30:00',
      slaDeadline: '2024-01-25 20:30:00',
      timeRemaining: '4h 15m',
      description: 'Complete HVAC system failure affecting 500+ tenants. Temperature rising rapidly.',
      escalationLevel: 2,
      clientContact: 'John Smith - (555) 123-4567',
      vendorContact: 'Arctic Air Solutions - Mike Rodriguez',
      estimatedResolution: '2024-01-25 18:00:00'
    },
    {
      id: 'ESC-002',
      title: 'Water Leak Emergency',
      client: 'Industrial Holdings Inc',
      facility: 'Manufacturing Plant A',
      priority: 'High',
      status: 'In Progress',
      assignedTo: 'FFM Manager - Sarah Davis',
      createdDate: '2024-01-24 16:45:00',
      slaDeadline: '2024-01-25 16:45:00',
      timeRemaining: '2h 30m',
      description: 'Major water leak in production area causing equipment damage and safety concerns.',
      escalationLevel: 1,
      clientContact: 'Sarah Johnson - (555) 234-5678',
      vendorContact: 'FastFlow Plumbing - Lisa Thompson',
      estimatedResolution: '2024-01-25 14:00:00'
    },
    {
      id: 'ESC-003',
      title: 'Electrical Power Outage',
      client: 'Healthcare Systems Group',
      facility: 'Main Medical Center',
      priority: 'Critical',
      status: 'Resolved',
      assignedTo: 'FFM Manager - Mike Wilson',
      createdDate: '2024-01-23 14:20:00',
      slaDeadline: '2024-01-24 02:20:00',
      timeRemaining: 'Completed',
      description: 'Partial power outage affecting critical medical equipment in ICU.',
      escalationLevel: 3,
      clientContact: 'Dr. Michael Chen - (555) 345-6789',
      vendorContact: 'Bright Electric Co - David Park',
      estimatedResolution: '2024-01-23 22:30:00'
    }
  ];

  // Mock Data for Dispute & Rating Review Queue
  const mockDisputes = [
    {
      id: 'DIS-001',
      workOrderId: 'WO-2024-015',
      disputeType: 'Quality of Work',
      status: 'Under Review',
      submittedBy: 'Client',
      client: {
        name: 'Metro Properties LLC',
        contact: 'John Smith',
        rating: 2,
        complaint: 'Work was not completed to specifications. Multiple issues found during inspection.'
      },
      vendor: {
        name: 'Arctic Air Solutions',
        contact: 'Mike Rodriguez',
        rating: 5,
        response: 'Work was completed according to agreed specifications. Client changed requirements mid-project.'
      },
      amount: 2850,
      submittedDate: '2024-01-24 10:30:00',
      mediator: 'FFM Mediator - Jennifer Lee',
      evidence: ['inspection_report.pdf', 'original_specs.pdf', 'photos.zip'],
      timeline: [
        { date: '2024-01-24 10:30:00', event: 'Dispute submitted by client', actor: 'John Smith' },
        { date: '2024-01-24 14:15:00', event: 'Vendor response received', actor: 'Mike Rodriguez' },
        { date: '2024-01-25 09:00:00', event: 'Mediator assigned', actor: 'System' }
      ]
    },
    {
      id: 'DIS-002',
      workOrderId: 'WO-2024-008',
      disputeType: 'Billing Dispute',
      status: 'Resolved',
      submittedBy: 'Vendor',
      client: {
        name: 'Industrial Holdings Inc',
        contact: 'Sarah Johnson',
        rating: 4,
        complaint: 'Additional charges were not pre-approved and seem excessive.'
      },
      vendor: {
        name: 'FastFlow Plumbing',
        contact: 'Lisa Thompson',
        rating: 4,
        response: 'Additional work was necessary due to unforeseen complications. Client was notified.'
      },
      amount: 1200,
      submittedDate: '2024-01-20 15:45:00',
      mediator: 'FFM Mediator - Robert Kim',
      evidence: ['additional_work_photos.jpg', 'client_approval_email.pdf'],
      resolution: 'Partial refund of $300 agreed upon. Additional work was justified but communication could have been better.',
      resolvedDate: '2024-01-23 16:30:00',
      timeline: [
        { date: '2024-01-20 15:45:00', event: 'Dispute submitted by vendor', actor: 'Lisa Thompson' },
        { date: '2024-01-21 09:30:00', event: 'Client response received', actor: 'Sarah Johnson' },
        { date: '2024-01-22 11:00:00', event: 'Mediator assigned', actor: 'System' },
        { date: '2024-01-23 16:30:00', event: 'Dispute resolved', actor: 'Robert Kim' }
      ]
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Approved': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Valid': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Scheduled': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Due Soon': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Expiring Soon': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Overdue': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Critical': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Open': 'bg-red-500/20 text-red-400 border-red-500/30',
      'In Progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Under Review': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Resolved': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Success': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Failed': 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return colors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Platform Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-xl border border-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-blue-400 font-semibold">Client Organizations</h3>
            <Users className="text-blue-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">13</div>
          <div className="text-sm text-blue-300 mt-1">Total facilities managed</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-6 rounded-xl border border-green-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-green-400 font-semibold">Active Vendors</h3>
            <Wrench className="text-green-400" size={24} />
          </div>
          <div className="text-3xl font-bold text-white">
            {mockClients.reduce((acc, client) => acc + client.facilitiesCount, 0)}
          </div>
          <div className="text-2xl font-bold text-white">127</div>
          <div className="text-sm text-green-300 mt-1">Vetted service providers</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-6 rounded-xl border border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-yellow-400 font-semibold">Work Orders</h3>
            <FileText className="text-yellow-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">2,847</div>
          <div className="text-sm text-yellow-300 mt-1">Completed this month</div>
        </div>

        <div className="bg-gradient-to-br from-teal-500/10 to-teal-600/10 p-6 rounded-xl border border-teal-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-teal-400 font-semibold">Platform Health</h3>
            <Activity className="text-teal-400" size={24} />
          </div>
          <div className="text-3xl font-bold text-white">{mockPlatformHealth.systemUptime}%</div>
          <div className="text-sm text-teal-300 mt-1">System uptime</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <button
            onClick={() => setActiveSection('clients')}
            className="flex flex-col items-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
          >
            <Users className="text-blue-400 mb-2" size={24} />
            <span className="text-white text-sm">Clients</span>
          </button>
          <button
            onClick={() => setActiveSection('vendors')}
            className="flex flex-col items-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
          >
            <Wrench className="text-purple-400 mb-2" size={24} />
            <span className="text-white text-sm">Vendors</span>
          </button>
          <button
            onClick={() => setActiveSection('platform-health')}
            className="flex flex-col items-center p-4 bg-teal-500/10 rounded-lg border border-teal-500/20 hover:bg-teal-500/20 transition-colors"
          >
            <Activity className="text-teal-400 mb-2" size={24} />
            <span className="text-white text-sm">Platform Health</span>
          </button>
          <button
            onClick={() => setActiveSection('user-logs')}
            className="flex flex-col items-center p-4 bg-green-500/10 rounded-lg border border-green-500/20 hover:bg-green-500/20 transition-colors"
          >
            <FileText className="text-green-400 mb-2" size={24} />
            <span className="text-white text-sm">User Logs</span>
          </button>
          <button
            onClick={() => setActiveSection('escalations')}
            className="flex flex-col items-center p-4 bg-red-500/10 rounded-lg border border-red-500/20 hover:bg-red-500/20 transition-colors"
          >
            <AlertTriangle className="text-red-400 mb-2" size={24} />
            <span className="text-white text-sm">Escalations</span>
          </button>
          <button
            onClick={() => setActiveSection('disputes')}
            className="flex flex-col items-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20 hover:bg-yellow-500/20 transition-colors"
          >
            <MessageSquare className="text-yellow-400 mb-2" size={24} />
            <span className="text-white text-sm">Disputes</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Escalations</h3>
          <div className="space-y-3">
            {mockEscalations.slice(0, 3).map((escalation) => (
              <div key={escalation.id} className="p-3 bg-gray-700/20 rounded-lg border border-gray-700/30">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-white text-sm">{escalation.title}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(escalation.status)}`}>
                    {escalation.status}
                  </span>
                </div>
                <p className="text-gray-400 text-xs">{escalation.client} - {escalation.facility}</p>
                <p className="text-gray-500 text-xs mt-1">SLA: {escalation.timeRemaining}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Disputes</h3>
          <div className="space-y-3">
            {mockDisputes.slice(0, 3).map((dispute) => (
              <div key={dispute.id} className="p-3 bg-gray-700/20 rounded-lg border border-gray-700/30">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-white text-sm">{dispute.disputeType}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(dispute.status)}`}>
                    {dispute.status}
                  </span>
                </div>
                <p className="text-gray-400 text-xs">{dispute.client.name} vs {dispute.vendor.name}</p>
                <p className="text-gray-500 text-xs mt-1">Amount: {formatCurrency(dispute.amount)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderClients = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">All Clients & Facilities</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            />
          </div>
          <button className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {selectedItem ? (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedItem(null)}
            className="text-teal-400 hover:text-teal-300 transition-colors"
          >
            ← Back to All Clients
          </button>
          
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">{selectedItem.companyName}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>Client ID: {selectedItem.id}</span>
                  <span>•</span>
                  <span>Joined: {new Date(selectedItem.joinDate).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>Last Activity: {new Date(selectedItem.lastActivity).toLocaleString()}</span>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(selectedItem.status)}`}>
                {selectedItem.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-teal-400 font-semibold mb-3">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Users className="text-gray-400" size={16} />
                    <span className="text-white">{selectedItem.contactPerson}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="text-gray-400" size={16} />
                    <span className="text-white">{selectedItem.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="text-gray-400" size={16} />
                    <span className="text-white">{selectedItem.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="text-gray-400" size={16} />
                    <span className="text-white">{selectedItem.address}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-teal-400 font-semibold mb-3">Financial Overview</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Budget:</span>
                    <span className="text-white font-semibold">{formatCurrency(selectedItem.totalBudget)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Spent:</span>
                    <span className="text-white font-semibold">{formatCurrency(selectedItem.totalSpent)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Remaining:</span>
                    <span className="text-green-400 font-semibold">{formatCurrency(selectedItem.totalBudget - selectedItem.totalSpent)}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-teal-500 h-2 rounded-full"
                      style={{ width: `${(selectedItem.totalSpent / selectedItem.totalBudget) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-400 text-center">
                    {((selectedItem.totalSpent / selectedItem.totalBudget) * 100).toFixed(1)}% utilized
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-teal-400 font-semibold mb-3">Client Facilities</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedItem.facilities.map((facility, index) => (
                  <div key={index} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
                    <h5 className="font-semibold text-white mb-2">{facility.name}</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="text-white">{facility.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Size:</span>
                        <span className="text-white">{facility.sqft.toLocaleString()} sq ft</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Budget:</span>
                        <span className="text-white">{formatCurrency(facility.budget)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Spent:</span>
                        <span className="text-white">{formatCurrency(facility.spent)}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                        <div 
                          className="bg-teal-500 h-1 rounded-full"
                          style={{ width: `${(facility.spent / facility.budget) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {mockClients.filter(client => 
            client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((client) => (
            <div key={client.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">{client.companyName}</h3>
                  <p className="text-gray-400">{client.contactPerson} • {client.email}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(client.status)}`}>
                    {client.status}
                  </span>
                  <button
                    onClick={() => setSelectedItem(client)}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Eye size={16} />
                    <span>View Details</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-lg font-bold text-blue-400">{client.facilitiesCount}</div>
                  <div className="text-xs text-blue-300">Facilities</div>
                </div>
                <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="text-lg font-bold text-green-400">{formatCurrency(client.totalBudget)}</div>
                  <div className="text-xs text-green-300">Total Budget</div>
                </div>
                <div className="text-center p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                  <div className="text-lg font-bold text-red-400">{formatCurrency(client.totalSpent)}</div>
                  <div className="text-xs text-red-300">Total Spent</div>
                </div>
                <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="text-lg font-bold text-yellow-400">{client.activeWorkOrders}</div>
                  <div className="text-xs text-yellow-300">Active WOs</div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-teal-400 font-semibold mb-2">Facilities Overview</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {client.facilities.map((facility, index) => (
                    <div key={index} className="p-2 bg-gray-700/20 rounded text-sm">
                      <div className="font-medium text-white">{facility.name}</div>
                      <div className="text-gray-400">{facility.type} • {facility.sqft.toLocaleString()} sq ft</div>
                      <div className="text-teal-400">{formatCurrency(facility.spent)} / {formatCurrency(facility.budget)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>Joined: {new Date(client.joinDate).toLocaleDateString()}</span>
                <span>Last Activity: {new Date(client.lastActivity).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderVendors = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">All Vendors</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            />
          </div>
          <button className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {selectedItem ? (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedItem(null)}
            className="text-teal-400 hover:text-teal-300 transition-colors"
          >
            ← Back to All Vendors
          </button>
          
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">{selectedItem.companyName}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>Vendor ID: {selectedItem.id}</span>
                  <span>•</span>
                  <span>Category: {selectedItem.category}</span>
                  <span>•</span>
                  <span>Joined: {new Date(selectedItem.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-400" size={16} />
                  <span className="text-yellow-400 font-semibold">{selectedItem.rating}</span>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(selectedItem.status)}`}>
                  {selectedItem.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-teal-400 font-semibold mb-3">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Users className="text-gray-400" size={16} />
                    <span className="text-white">{selectedItem.contactPerson}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="text-gray-400" size={16} />
                    <span className="text-white">{selectedItem.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="text-gray-400" size={16} />
                    <span className="text-white">{selectedItem.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wrench className="text-gray-400" size={16} />
                    <span className="text-white">{selectedItem.category}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-teal-400 font-semibold mb-3">Performance Metrics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Earnings:</span>
                    <span className="text-white font-semibold">{formatCurrency(selectedItem.totalEarnings)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Completed Jobs:</span>
                    <span className="text-white font-semibold">{selectedItem.completedJobs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Active Jobs:</span>
                    <span className="text-white font-semibold">{selectedItem.activeJobs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg Response:</span>
                    <span className="text-white font-semibold">{selectedItem.responseTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rating:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-400" size={14} />
                      <span className="text-yellow-400 font-semibold">{selectedItem.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-teal-400 font-semibold mb-3">Certifications</h4>
                <div className="space-y-2">
                  {selectedItem.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Award className="text-green-400" size={14} />
                      <span className="text-gray-300 text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-teal-400 font-semibold mb-3">Document Status</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Insurance Expiry:</span>
                    <span className="text-white text-sm">{new Date(selectedItem.insuranceExpiry).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">License Expiry:</span>
                    <span className="text-white text-sm">{new Date(selectedItem.licenseExpiry).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Last Activity:</span>
                    <span className="text-white text-sm">{new Date(selectedItem.lastActivity).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {mockVendors.filter(vendor => 
            vendor.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vendor.category.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((vendor) => (
            <div key={vendor.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">{vendor.companyName}</h3>
                  <p className="text-gray-400">{vendor.contactPerson} • {vendor.category}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400" size={16} />
                    <span className="text-yellow-400 font-semibold">{vendor.rating}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(vendor.status)}`}>
                    {vendor.status}
                  </span>
                  <button
                    onClick={() => setSelectedItem(vendor)}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Eye size={16} />
                    <span>View Details</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="text-lg font-bold text-green-400">{formatCurrency(vendor.totalEarnings)}</div>
                  <div className="text-xs text-green-300">Total Earnings</div>
                </div>
                <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-lg font-bold text-blue-400">{vendor.completedJobs}</div>
                  <div className="text-xs text-blue-300">Completed Jobs</div>
                </div>
                <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="text-lg font-bold text-yellow-400">{vendor.activeJobs}</div>
                  <div className="text-xs text-yellow-300">Active Jobs</div>
                </div>
                <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="text-lg font-bold text-purple-400">{vendor.responseTime}</div>
                  <div className="text-xs text-purple-300">Avg Response</div>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>Joined: {new Date(vendor.joinDate).toLocaleDateString()}</span>
                <span>Last Activity: {new Date(vendor.lastActivity).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderPlatformHealth = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">Platform Health Metrics</h2>
        <button className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors">
          <RefreshCw size={16} />
          <span>Refresh</span>
        </button>
      </div>

      {selectedItem ? (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedItem(null)}
            className="text-teal-400 hover:text-teal-300 transition-colors"
          >
            ← Back to Platform Health
          </button>
          
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h3 className="text-2xl font-semibold text-white mb-6">Detailed System Performance</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-teal-400 font-semibold mb-3">Current Status</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">System Uptime:</span>
                    <span className="text-green-400 font-semibold">{mockPlatformHealth.systemUptime}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Active Users:</span>
                    <span className="text-white font-semibold">{mockPlatformHealth.activeUsers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Transactions:</span>
                    <span className="text-white font-semibold">{mockPlatformHealth.totalTransactions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg Response Time:</span>
                    <span className="text-white font-semibold">{mockPlatformHealth.avgResponseTime}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Error Rate:</span>
                    <span className="text-green-400 font-semibold">{mockPlatformHealth.errorRate}%</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-teal-400 font-semibold mb-3">Performance History</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">24h Average Uptime:</span>
                    <span className="text-green-400 font-semibold">99.95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">7d Average Uptime:</span>
                    <span className="text-green-400 font-semibold">99.92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">30d Average Uptime:</span>
                    <span className="text-green-400 font-semibold">99.89%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Peak Users (24h):</span>
                    <span className="text-white font-semibold">1,456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Peak Response Time:</span>
                    <span className="text-yellow-400 font-semibold">892ms</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-teal-400 font-semibold mb-3">Alert Configuration</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <h5 className="text-yellow-400 font-medium mb-2">Warning Thresholds</h5>
                  <div className="text-sm space-y-1">
                    <div>Response Time: &gt; 500ms</div>
                    <div>Error Rate: &gt; 1%</div>
                    <div>CPU Usage: &gt; 80%</div>
                  </div>
                </div>
                <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                  <h5 className="text-red-400 font-medium mb-2">Critical Thresholds</h5>
                  <div className="text-sm space-y-1">
                    <div>Response Time: &gt; 1000ms</div>
                    <div>Error Rate: &gt; 5%</div>
                    <div>CPU Usage: &gt; 95%</div>
                  </div>
                </div>
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <h5 className="text-blue-400 font-medium mb-2">Notification Settings</h5>
                  <div className="text-sm space-y-1">
                    <div>Email: Enabled</div>
                    <div>SMS: Enabled</div>
                    <div>Slack: Enabled</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-teal-400 font-semibold mb-3">Recent System Events</h4>
              <div className="space-y-2">
                {mockPlatformHealth.recentAlerts.map((alert) => (
                  <div key={alert.id} className={`p-3 rounded-lg border ${
                    alert.type === 'Critical' ? 'bg-red-500/10 border-red-500/20' :
                    alert.type === 'Warning' ? 'bg-yellow-500/10 border-yellow-500/20' :
                    'bg-blue-500/10 border-blue-500/20'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          alert.type === 'Critical' ? 'bg-red-500 text-white' :
                          alert.type === 'Warning' ? 'bg-yellow-500 text-black' :
                          'bg-blue-500 text-white'
                        }`}>
                          {alert.type}
                        </span>
                        <p className="text-white mt-1">{alert.message}</p>
                      </div>
                      <span className="text-gray-400 text-xs">{new Date(alert.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-6 rounded-xl border border-green-500/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-green-400 font-semibold">System Uptime</h3>
                <Activity className="text-green-400" size={24} />
              </div>
              <div className="text-3xl font-bold text-white">{mockPlatformHealth.systemUptime}%</div>
              <div className="text-sm text-green-300 mt-1">Last 30 days</div>
              <button
                onClick={() => setSelectedItem(mockPlatformHealth)}
                className="mt-3 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                View Details
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-xl border border-blue-500/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-blue-400 font-semibold">Active Users</h3>
                <Users className="text-blue-400" size={24} />
              </div>
              <div className="text-3xl font-bold text-white">{mockPlatformHealth.activeUsers.toLocaleString()}</div>
              <div className="text-sm text-blue-300 mt-1">Currently online</div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-6 rounded-xl border border-purple-500/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-purple-400 font-semibold">Response Time</h3>
                <Clock className="text-purple-400" size={24} />
              </div>
              <div className="text-3xl font-bold text-white">{mockPlatformHealth.avgResponseTime}ms</div>
              <div className="text-sm text-purple-300 mt-1">Average response</div>
            </div>

            <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 p-6 rounded-xl border border-red-500/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-red-400 font-semibold">Security Alerts</h3>
                <Shield className="text-red-400" size={24} />
              </div>
              <div className="text-3xl font-bold text-white">{mockPlatformHealth.securityAlerts}</div>
              <div className="text-sm text-red-300 mt-1">Active alerts</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
              <h3 className="text-xl font-semibold text-white mb-4">System Health</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Database Health</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-gray-700 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${mockPlatformHealth.databaseHealth}%` }}></div>
                    </div>
                    <span className="text-green-400 font-semibold">{mockPlatformHealth.databaseHealth}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">API Health</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-gray-700 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${mockPlatformHealth.apiHealth}%` }}></div>
                    </div>
                    <span className="text-green-400 font-semibold">{mockPlatformHealth.apiHealth}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Storage Usage</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-gray-700 rounded-full">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${mockPlatformHealth.storageUsage}%` }}></div>
                    </div>
                    <span className="text-yellow-400 font-semibold">{mockPlatformHealth.storageUsage}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
              <h3 className="text-xl font-semibold text-white mb-4">Recent Alerts</h3>
              <div className="space-y-3">
                {mockPlatformHealth.recentAlerts.slice(0, 3).map((alert) => (
                  <div key={alert.id} className={`p-3 rounded-lg border ${
                    alert.type === 'Critical' ? 'bg-red-500/10 border-red-500/20' :
                    alert.type === 'Warning' ? 'bg-yellow-500/10 border-yellow-500/20' :
                    'bg-blue-500/10 border-blue-500/20'
                  }`}>
                    <div className="flex justify-between items-start mb-1">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        alert.type === 'Critical' ? 'bg-red-500 text-white' :
                        alert.type === 'Warning' ? 'bg-yellow-500 text-black' :
                        'bg-blue-500 text-white'
                      }`}>
                        {alert.type}
                      </span>
                      <span className="text-gray-400 text-xs">{new Date(alert.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="text-white text-sm">{alert.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderUserLogs = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">User Activity Logs</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            />
          </div>
          <button className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {selectedItem ? (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedItem(null)}
            className="text-teal-400 hover:text-teal-300 transition-colors"
          >
            ← Back to User Logs
          </button>
          
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h3 className="text-2xl font-semibold text-white mb-6">Log Entry Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-teal-400 font-semibold mb-3">User Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">User ID:</span>
                    <span className="text-white font-mono">{selectedItem.userId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">User Name:</span>
                    <span className="text-white">{selectedItem.userName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">User Type:</span>
                    <span className="text-white">{selectedItem.userType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Session ID:</span>
                    <span className="text-white font-mono">{selectedItem.sessionId}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-teal-400 font-semibold mb-3">Session Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">IP Address:</span>
                    <span className="text-white font-mono">{selectedItem.ipAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Timestamp:</span>
                    <span className="text-white">{new Date(selectedItem.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(selectedItem.status)}`}>
                      {selectedItem.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-teal-400 font-semibold mb-3">Action Details</h4>
              <div className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
                <div className="mb-2">
                  <span className="text-gray-400">Action:</span>
                  <span className="text-white ml-2 font-semibold">{selectedItem.action}</span>
                </div>
                <div className="mb-2">
                  <span className="text-gray-400">Details:</span>
                  <span className="text-white ml-2">{selectedItem.details}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-teal-400 font-semibold mb-3">Technical Information</h4>
              <div className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
                <div className="mb-2">
                  <span className="text-gray-400">User Agent:</span>
                  <div className="text-white text-sm font-mono mt-1 break-all">{selectedItem.userAgent}</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <span className="text-gray-400">Request Method:</span>
                    <span className="text-white ml-2 font-mono">POST</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Response Time:</span>
                    <span className="text-white ml-2">245ms</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Status Code:</span>
                    <span className="text-green-400 ml-2 font-mono">200</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Content Type:</span>
                    <span className="text-white ml-2 font-mono">application/json</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-teal-400 font-semibold mb-3">Request/Response Payload</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-gray-400 mb-2">Request Payload:</h5>
                  <div className="p-3 bg-gray-800/50 rounded border border-gray-700/30 font-mono text-sm text-gray-300">
                    {JSON.stringify({
                      action: selectedItem.action,
                      userId: selectedItem.userId,
                      timestamp: selectedItem.timestamp,
                      details: selectedItem.details
                    }, null, 2)}
                  </div>
                </div>
                <div>
                  <h5 className="text-gray-400 mb-2">Response Payload:</h5>
                  <div className="p-3 bg-gray-800/50 rounded border border-gray-700/30 font-mono text-sm text-gray-300">
                    {JSON.stringify({
                      status: selectedItem.status,
                      message: "Action completed successfully",
                      timestamp: selectedItem.timestamp,
                      responseTime: "245ms"
                    }, null, 2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {mockUserLogs.filter(log => 
            log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.userType.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((log) => (
            <div key={log.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{log.userName}</h3>
                  <p className="text-gray-400">{log.userType} • {log.action}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(log.status)}`}>
                    {log.status}
                  </span>
                  <button
                    onClick={() => setSelectedItem(log)}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Eye size={16} />
                    <span>View Details</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-sm font-bold text-blue-400">{log.userId}</div>
                  <div className="text-xs text-blue-300">User ID</div>
                </div>
                <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="text-sm font-bold text-green-400">{log.ipAddress}</div>
                  <div className="text-xs text-green-300">IP Address</div>
                </div>
                <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="text-sm font-bold text-purple-400">{log.sessionId}</div>
                  <div className="text-xs text-purple-300">Session ID</div>
                </div>
                <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="text-sm font-bold text-yellow-400">{new Date(log.timestamp).toLocaleTimeString()}</div>
                  <div className="text-xs text-yellow-300">Time</div>
                </div>
              </div>

              <div className="bg-gray-700/20 p-3 rounded-lg border border-gray-700/30">
                <div className="text-white font-medium mb-1">Action Details:</div>
                <div className="text-gray-300 text-sm">{log.details}</div>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-400 mt-4">
                <span>Timestamp: {new Date(log.timestamp).toLocaleString()}</span>
                <span>Log ID: {log.id}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderDocumentCompliance = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">Document Compliance</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            />
          </div>
          <button className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {selectedItem ? (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedItem(null)}
            className="text-teal-400 hover:text-teal-300 transition-colors"
          >
            ← Back to Document Compliance
          </button>
          
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h3 className="text-2xl font-semibold text-white mb-6">Document Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-teal-400 font-semibold mb-3">Document Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Document ID:</span>
                    <span className="text-white font-mono">{selectedItem.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Vendor:</span>
                    <span className="text-white">{selectedItem.vendorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Document Type:</span>
                    <span className="text-white">{selectedItem.documentType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(selectedItem.status)}`}>
                      {selectedItem.status}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-teal-400 font-semibold mb-3">Compliance Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Issue Date:</span>
                    <span className="text-white">{new Date(selectedItem.issueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Expiry Date:</span>
                    <span className="text-white">{new Date(selectedItem.expiryDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Days Until Expiry:</span>
                    <span className={`font-semibold ${
                      selectedItem.daysUntilExpiry < 30 ? 'text-red-400' :
                      selectedItem.daysUntilExpiry < 90 ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      {selectedItem.daysUntilExpiry} days
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Compliance Score:</span>
                    <span className="text-teal-400 font-semibold">{selectedItem.complianceScore}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-teal-400 font-semibold mb-3">Document Numbers</h4>
                <div className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
                  {selectedItem.policyNumber && (
                    <div className="mb-2">
                      <span className="text-gray-400">Policy Number:</span>
                      <span className="text-white ml-2 font-mono">{selectedItem.policyNumber}</span>
                    </div>
                  )}
                  {selectedItem.certificationNumber && (
                    <div className="mb-2">
                      <span className="text-gray-400">Certification Number:</span>
                      <span className="text-white ml-2 font-mono">{selectedItem.certificationNumber}</span>
                    </div>
                  )}
                  {selectedItem.licenseNumber && (
                    <div className="mb-2">
                      <span className="text-gray-400">License Number:</span>
                      <span className="text-white ml-2 font-mono">{selectedItem.licenseNumber}</span>
                    </div>
                  )}
                  {selectedItem.coverageAmount && (
                    <div>
                      <span className="text-gray-400">Coverage Amount:</span>
                      <span className="text-white ml-2">{formatCurrency(selectedItem.coverageAmount)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-teal-400 font-semibold mb-3">Renewal Information</h4>
                <div className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
                  <div className="mb-2">
                    <span className="text-gray-400">Auto Renewal:</span>
                    <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                      selectedItem.autoRenewal ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {selectedItem.autoRenewal ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span className="text-gray-400">Last Verified:</span>
                    <span className="text-white ml-2">{new Date(selectedItem.lastVerified).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Next Review:</span>
                    <span className="text-white ml-2">
                      {new Date(new Date(selectedItem.expiryDate).getTime() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-teal-400 font-semibold mb-3">Renewal History</h4>
              <div className="space-y-2">
                <div className="p-3 bg-gray-700/20 rounded-lg border border-gray-700/30">
                  <div className="flex justify-between items-center">
                    <span className="text-white">Renewal reminder sent</span>
                    <span className="text-gray-400 text-sm">2024-01-15 09:00:00</span>
                  </div>
                </div>
                <div className="p-3 bg-gray-700/20 rounded-lg border border-gray-700/30">
                  <div className="flex justify-between items-center">
                    <span className="text-white">Document verified by admin</span>
                    <span className="text-gray-400 text-sm">2024-01-10 14:30:00</span>
                  </div>
                </div>
                <div className="p-3 bg-gray-700/20 rounded-lg border border-gray-700/30">
                  <div className="flex justify-between items-center">
                    <span className="text-white">Document uploaded by vendor</span>
                    <span className="text-gray-400 text-sm">2024-01-01 10:15:00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                Approve Document
              </button>
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors">
                Request Update
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                Flag for Review
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {mockDocuments.filter(doc => 
            doc.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.documentType.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((doc) => (
            <div key={doc.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{doc.documentType}</h3>
                  <p className="text-gray-400">{doc.vendorName}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(doc.status)}`}>
                    {doc.status}
                  </span>
                  <button
                    onClick={() => setSelectedItem(doc)}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Eye size={16} />
                    <span>View Details</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-sm font-bold text-blue-400">{new Date(doc.issueDate).toLocaleDateString()}</div>
                  <div className="text-xs text-blue-300">Issue Date</div>
                </div>
                <div className="text-center p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                  <div className="text-sm font-bold text-red-400">{new Date(doc.expiryDate).toLocaleDateString()}</div>
                  <div className="text-xs text-red-300">Expiry Date</div>
                </div>
                <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="text-sm font-bold text-yellow-400">{doc.daysUntilExpiry} days</div>
                  <div className="text-xs text-yellow-300">Until Expiry</div>
                </div>
                <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="text-sm font-bold text-green-400">{doc.complianceScore}%</div>
                  <div className="text-xs text-green-300">Compliance</div>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>Last Verified: {new Date(doc.lastVerified).toLocaleDateString()}</span>
                <span>Auto Renewal: {doc.autoRenewal ? 'Enabled' : 'Disabled'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderPMHealth = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">PM Health</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search PM tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            />
          </div>
          <button className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {selectedItem ? (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedItem(null)}
            className="text-teal-400 hover:text-teal-300 transition-colors"
          >
            ← Back to PM Health
          </button>
          
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h3 className="text-2xl font-semibold text-white mb-6">PM Task Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-teal-400 font-semibold mb-3">Task Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Task ID:</span>
                    <span className="text-white font-mono">{selectedItem.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Task Name:</span>
                    <span className="text-white">{selectedItem.taskName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Facility:</span>
                    <span className="text-white">{selectedItem.facility}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Client:</span>
                    <span className="text-white">{selectedItem.client}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Vendor:</span>
                    <span className="text-white">{selectedItem.vendor}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-teal-400 font-semibold mb-3">Schedule Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Frequency:</span>
                    <span className="text-white">{selectedItem.frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Completed:</span>
                    <span className="text-white">{new Date(selectedItem.lastCompleted).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Next Due:</span>
                    <span className="text-white">{new Date(selectedItem.nextDue).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(selectedItem.status)}`}>
                      {selectedItem.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Priority:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(selectedItem.priority)}`}>
                      {selectedItem.priority}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="text-2xl font-bold text-green-400">{selectedItem.healthScore}%</div>
                <div className="text-sm text-green-300">Health Score</div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${selectedItem.healthScore}%` }}></div>
                </div>
              </div>
              <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="text-2xl font-bold text-blue-400">{selectedItem.complianceRate}%</div>
                <div className="text-sm text-blue-300">Compliance Rate</div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${selectedItem.complianceRate}%` }}></div>
                </div>
              </div>
              <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <div className="text-2xl font-bold text-purple-400">{selectedItem.avgCompletionTime}h</div>
                <div className="text-sm text-purple-300">Avg Completion</div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-teal-400 font-semibold mb-3">Performance History</h4>
              <div className="space-y-2">
                <div className="p-3 bg-gray-700/20 rounded-lg border border-gray-700/30">
                  <div className="flex justify-between items-center">
                    <span className="text-white">Task completed on time</span>
                    <span className="text-gray-400 text-sm">2024-01-15 14:30:00</span>
                  </div>
                  <div className="text-green-400 text-sm">Duration: 2.5 hours • Cost: {formatCurrency(selectedItem.cost)}</div>
                </div>
                <div className="p-3 bg-gray-700/20 rounded-lg border border-gray-700/30">
                  <div className="flex justify-between items-center">
                    <span className="text-white">Task completed on time</span>
                    <span className="text-gray-400 text-sm">2023-12-15 10:15:00</span>
                  </div>
                  <div className="text-green-400 text-sm">Duration: 2.0 hours • Cost: {formatCurrency(selectedItem.cost - 50)}</div>
                </div>
                <div className="p-3 bg-gray-700/20 rounded-lg border border-gray-700/30">
                  <div className="flex justify-between items-center">
                    <span className="text-white">Task completed late</span>
                    <span className="text-gray-400 text-sm">2023-11-15 16:45:00</span>
                  </div>
                  <div className="text-yellow-400 text-sm">Duration: 3.5 hours • Cost: {formatCurrency(selectedItem.cost + 100)} • Delayed by 2 days</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-teal-400 font-semibold mb-3">Upcoming Schedule</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <h5 className="text-blue-400 font-medium mb-2">Next Occurrence</h5>
                  <div className="text-white">{new Date(selectedItem.nextDue).toLocaleDateString()}</div>
                  <div className="text-gray-400 text-sm">Vendor: {selectedItem.vendor}</div>
                </div>
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <h5 className="text-green-400 font-medium mb-2">Following Occurrence</h5>
                  <div className="text-white">
                    {new Date(new Date(selectedItem.nextDue).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </div>
                  <div className="text-gray-400 text-sm">Auto-scheduled</div>
                </div>
                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <h5 className="text-purple-400 font-medium mb-2">Annual Review</h5>
                  <div className="text-white">
                    {new Date(new Date(selectedItem.nextDue).getTime() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </div>
                  <div className="text-gray-400 text-sm">Contract renewal</div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                Mark Complete
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Reschedule
              </button>
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors">
                Assign Vendor
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                Cancel Task
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {mockPMTasks.filter(task => 
            task.taskName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.facility.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.vendor.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((task) => (
            <div key={task.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{task.taskName}</h3>
                  <p className="text-gray-400">{task.facility} • {task.client}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <button
                    onClick={() => setSelectedItem(task)}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Eye size={16} />
                    <span>View Details</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="text-lg font-bold text-green-400">{task.healthScore}%</div>
                  <div className="text-xs text-green-300">Health Score</div>
                </div>
                <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-lg font-bold text-blue-400">{task.complianceRate}%</div>
                  <div className="text-xs text-blue-300">Compliance</div>
                </div>
                <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="text-lg font-bold text-purple-400">{task.avgCompletionTime}h</div>
                  <div className="text-xs text-purple-300">Avg Time</div>
                </div>
                <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="text-lg font-bold text-yellow-400">{formatCurrency(task.cost)}</div>
                  <div className="text-xs text-yellow-300">Cost</div>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>Vendor: {task.vendor}</span>
                <span>Frequency: {task.frequency}</span>
                <span>Next Due: {new Date(task.nextDue).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderEscalations = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">Escalation Queue</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search escalations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            />
          </div>
          <button className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {selectedItem ? (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedItem(null)}
            className="text-teal-400 hover:text-teal-300 transition-colors"
          >
            ← Back to Escalation Queue
          </button>
          
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">{selectedItem.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>Escalation ID: {selectedItem.id}</span>
                  <span>•</span>
                  <span>Level {selectedItem.escalationLevel}</span>
                  <span>•</span>
                  <span>Created: {new Date(selectedItem.createdDate).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(selectedItem.priority)}`}>
                  {selectedItem.priority}
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(selectedItem.status)}`}>
                  {selectedItem.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-teal-400 font-semibold mb-3">Client Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Client:</span>
                    <span className="text-white">{selectedItem.client}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Facility:</span>
                    <span className="text-white">{selectedItem.facility}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Contact:</span>
                    <span className="text-white">{selectedItem.clientContact}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Vendor Contact:</span>
                    <span className="text-white">{selectedItem.vendorContact}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-teal-400 font-semibold mb-3">SLA Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">SLA Deadline:</span>
                    <span className="text-white">{new Date(selectedItem.slaDeadline).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Time Remaining:</span>
                    <span className={`font-semibold ${
                      selectedItem.timeRemaining === 'Completed' ? 'text-green-400' :
                      selectedItem.timeRemaining.includes('h') && parseInt(selectedItem.timeRemaining) < 2 ? 'text-red-400' :
                      'text-yellow-400'
                    }`}>
                      {selectedItem.timeRemaining}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Assigned To:</span>
                    <span className="text-white">{selectedItem.assignedTo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Est. Resolution:</span>
                    <span className="text-white">{new Date(selectedItem.estimatedResolution).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-teal-400 font-semibold mb-3">Issue Description</h4>
              <div className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
                <p className="text-white">{selectedItem.description}</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-teal-400 font-semibold mb-3">Escalation Timeline</h4>
              <div className="space-y-3">
                <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">Escalation Created</span>
                    <span className="text-gray-400 text-sm">{new Date(selectedItem.createdDate).toLocaleString()}</span>
                  </div>
                  <div className="text-red-400 text-sm">Priority: {selectedItem.priority} • Level {selectedItem.escalationLevel}</div>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">Assigned to {selectedItem.assignedTo}</span>
                    <span className="text-gray-400 text-sm">{new Date(new Date(selectedItem.createdDate).getTime() + 15 * 60 * 1000).toLocaleString()}</span>
                  </div>
                  <div className="text-blue-400 text-sm">Auto-assigned based on availability and expertise</div>
                </div>
                <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">Client and vendor contacted</span>
                    <span className="text-gray-400 text-sm">{new Date(new Date(selectedItem.createdDate).getTime() + 30 * 60 * 1000).toLocaleString()}</span>
                  </div>
                  <div className="text-yellow-400 text-sm">Emergency response protocol initiated</div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                Mark Resolved
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Update Status
              </button>
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors">
                Escalate Further
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                Assign to Different Manager
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {mockEscalations.filter(escalation => 
            escalation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            escalation.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
            escalation.facility.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((escalation) => (
            <div key={escalation.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{escalation.title}</h3>
                  <p className="text-gray-400">{escalation.client} • {escalation.facility}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(escalation.priority)}`}>
                    {escalation.priority}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(escalation.status)}`}>
                    {escalation.status}
                  </span>
                  <button
                    onClick={() => setSelectedItem(escalation)}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Eye size={16} />
                    <span>View Details</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                  <div className="text-sm font-bold text-red-400">Level {escalation.escalationLevel}</div>
                  <div className="text-xs text-red-300">Escalation</div>
                </div>
                <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="text-sm font-bold text-yellow-400">{escalation.timeRemaining}</div>
                  <div className="text-xs text-yellow-300">Time Left</div>
                </div>
                <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-sm font-bold text-blue-400">{escalation.assignedTo.split(' - ')[1]}</div>
                  <div className="text-xs text-blue-300">Assigned To</div>
                </div>
                <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="text-sm font-bold text-green-400">{new Date(escalation.estimatedResolution).toLocaleDateString()}</div>
                  <div className="text-xs text-green-300">Est. Resolution</div>
                </div>
              </div>

              <div className="bg-gray-700/20 p-3 rounded-lg border border-gray-700/30 mb-4">
                <div className="text-white font-medium mb-1">Issue Description:</div>
                <div className="text-gray-300 text-sm">{escalation.description}</div>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>Created: {new Date(escalation.createdDate).toLocaleString()}</span>
                <span>SLA Deadline: {new Date(escalation.slaDeadline).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderDisputes = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">Dispute & Rating Review Queue</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search disputes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            />
          </div>
          <button className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {selectedItem ? (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedItem(null)}
            className="text-teal-400 hover:text-teal-300 transition-colors"
          >
            ← Back to Dispute Queue
          </button>
          
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">{selectedItem.disputeType}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>Dispute ID: {selectedItem.id}</span>
                  <span>•</span>
                  <span>Work Order: {selectedItem.workOrderId}</span>
                  <span>•</span>
                  <span>Amount: {formatCurrency(selectedItem.amount)}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(selectedItem.status)}`}>
                  {selectedItem.status}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {selectedItem.submittedBy}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <h4 className="text-blue-400 font-semibold mb-3 flex items-center">
                  <Users className="mr-2" size={16} />
                  Client Position
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span className="text-white">{selectedItem.client.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Contact:</span>
                    <span className="text-white">{selectedItem.client.contact}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rating Given:</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`${i < selectedItem.client.rating ? 'text-yellow-400' : 'text-gray-600'}`} size={14} />
                      ))}
                      <span className="text-white ml-1">{selectedItem.client.rating}/5</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-blue-500/5 rounded border border-blue-500/10">
                  <div className="text-blue-400 font-medium mb-1">Client Statement:</div>
                  <div className="text-gray-300 text-sm">{selectedItem.client.complaint}</div>
                </div>
              </div>

              <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <h4 className="text-green-400 font-semibold mb-3 flex items-center">
                  <Wrench className="mr-2" size={16} />
                  Vendor Position
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span className="text-white">{selectedItem.vendor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Contact:</span>
                    <span className="text-white">{selectedItem.vendor.contact}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rating Given:</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`${i < selectedItem.vendor.rating ? 'text-yellow-400' : 'text-gray-600'}`} size={14} />
                      ))}
                      <span className="text-white ml-1">{selectedItem.vendor.rating}/5</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-green-500/5 rounded border border-green-500/10">
                  <div className="text-green-400 font-medium mb-1">Vendor Response:</div>
                  <div className="text-gray-300 text-sm">{selectedItem.vendor.response}</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-teal-400 font-semibold mb-3">Mediation Information</h4>
              <div className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-400">Mediator:</span>
                    <span className="text-white ml-2">{selectedItem.mediator}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Submitted:</span>
                    <span className="text-white ml-2">{new Date(selectedItem.submittedDate).toLocaleString()}</span>
                  </div>
                  {selectedItem.resolvedDate && (
                    <div className="md:col-span-2">
                      <span className="text-gray-400">Resolved:</span>
                      <span className="text-white ml-2">{new Date(selectedItem.resolvedDate).toLocaleString()}</span>
                    </div>
                  )}
                </div>
                {selectedItem.resolution && (
                  <div className="mt-3 p-3 bg-teal-500/10 rounded border border-teal-500/20">
                    <div className="text-teal-400 font-medium mb-1">Resolution:</div>
                    <div className="text-gray-300 text-sm">{selectedItem.resolution}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-teal-400 font-semibold mb-3">Evidence & Documentation</h4>
              <div className="flex flex-wrap gap-2">
                {selectedItem.evidence.map((file, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded text-sm border border-gray-600/30">
                    📎 {file}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-teal-400 font-semibold mb-3">Dispute Timeline</h4>
              <div className="space-y-3">
                {selectedItem.timeline.map((event, index) => (
                  <div key={index} className="p-3 bg-gray-700/20 rounded-lg border border-gray-700/30">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{event.event}</span>
                      <span className="text-gray-400 text-sm">{new Date(event.date).toLocaleString()}</span>
                    </div>
                    <div className="text-gray-400 text-sm">By: {event.actor}</div>
                  </div>
                ))}
              </div>
            </div>

            {selectedItem.status !== 'Resolved' && (
              <div className="flex space-x-4">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Resolve in Favor of Client
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Resolve in Favor of Vendor
                </button>
                <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Partial Resolution
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Request More Information
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {mockDisputes.filter(dispute => 
            dispute.disputeType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dispute.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dispute.vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((dispute) => (
            <div key={dispute.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{dispute.disputeType}</h3>
                  <p className="text-gray-400">{dispute.client.name} vs {dispute.vendor.name}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(dispute.status)}`}>
                    {dispute.status}
                  </span>
                  <button
                    onClick={() => setSelectedItem(dispute)}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Eye size={16} />
                    <span>View Details</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                  <div className="text-lg font-bold text-red-400">{formatCurrency(dispute.amount)}</div>
                  <div className="text-xs text-red-300">Dispute Amount</div>
                </div>
                <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-lg font-bold text-blue-400 flex items-center justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`${i < dispute.client.rating ? 'text-yellow-400' : 'text-gray-600'}`} size={12} />
                    ))}
                  </div>
                  <div className="text-xs text-blue-300">Client Rating</div>
                </div>
                <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="text-lg font-bold text-green-400 flex items-center justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`${i < dispute.vendor.rating ? 'text-yellow-400' : 'text-gray-600'}`} size={12} />
                    ))}
                  </div>
                  <div className="text-xs text-green-300">Vendor Rating</div>
                </div>
                <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="text-lg font-bold text-purple-400">{dispute.mediator.split(' - ')[1]}</div>
                  <div className="text-xs text-purple-300">Mediator</div>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>Work Order: {dispute.workOrderId}</span>
                <span>Submitted: {new Date(dispute.submittedDate).toLocaleDateString()}</span>
                {dispute.resolvedDate && <span>Resolved: {new Date(dispute.resolvedDate).toLocaleDateString()}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'clients':
        return renderClients();
      case 'vendors':
        return renderVendors();
      case 'platform-health':
        return renderPlatformHealth();
      case 'user-logs':
        return renderUserLogs();
      case 'document-compliance':
        return renderDocumentCompliance();
      case 'pm-health':
        return renderPMHealth();
      case 'escalations':
        return renderEscalations();
      case 'disputes':
        return renderDisputes();
      default:
        return renderDashboard();
    }
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
              <h1 className="text-2xl font-semibold">FFM Admin Portal</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">Admin Access</span>
                <span className="text-xs text-gray-400">• Full Platform Control • System Monitoring</span>
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
          <strong className="text-teal-400">FFM Admin Only:</strong> This portal provides comprehensive oversight of all clients, facilities, vendors, platform health, user activity, compliance, escalations, and dispute resolution across the entire FFM ecosystem.
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'clients', label: 'Clients', icon: Users },
            { id: 'vendors', label: 'Vendors', icon: Wrench },
            { id: 'platform-health', label: 'Platform Health', icon: Activity },
            { id: 'user-logs', label: 'User Logs', icon: FileText },
            { id: 'document-compliance', label: 'Document Compliance', icon: Shield },
            { id: 'pm-health', label: 'PM Health', icon: CheckCircle },
            { id: 'escalations', label: 'Escalation Queue', icon: AlertTriangle },
            { id: 'disputes', label: 'Dispute & Rating Review', icon: MessageSquare }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSection(tab.id);
                  setSelectedItem(null);
                  setSearchTerm('');
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 border-2 text-sm ${
                  activeSection === tab.id
                    ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/25 border-teal-500'
                    : 'bg-slate-800 text-white hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 border-slate-800 hover:border-teal-500 hover:text-slate-900'
                }`}
              >
                <IconComponent size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default FFMAdminPortal;