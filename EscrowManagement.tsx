import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Shield, DollarSign, Clock, AlertTriangle, CheckCircle, 
  FileText, Download, Eye, X, Upload, MessageSquare, Calendar,
  TrendingUp, Users, Filter, Search, RefreshCw, Target
} from 'lucide-react';
import Logo from './Logo';

interface EscrowProject {
  id: string;
  name: string;
  vendor: string;
  client: string;
  totalAmount: number;
  fundedAmount: number;
  releasedAmount: number;
  pendingAmount: number;
  disputedAmount: number;
  status: 'active' | 'completed' | 'disputed' | 'cancelled';
  createdAt: string;
  milestones: Milestone[];
  invoices: Invoice[];
  transactions: Transaction[];
  disputes: Dispute[];
}

interface Milestone {
  id: string;
  name: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'completed' | 'approved' | 'paid';
  completedAt?: string;
  approvedAt?: string;
  paidAt?: string;
}

interface Invoice {
  id: string;
  milestoneId: string;
  vendorName: string;
  amount: number;
  description: string;
  submittedAt: string;
  status: 'submitted' | 'under_review' | 'approved' | 'paid' | 'disputed';
  attachments: string[];
  reviewNotes?: string;
}

interface Transaction {
  id: string;
  type: 'deposit' | 'release' | 'dispute' | 'refund';
  amount: number;
  description: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  reference: string;
}

interface Dispute {
  id: string;
  invoiceId: string;
  reason: string;
  description: string;
  amount: number;
  submittedBy: 'client' | 'vendor';
  status: 'open' | 'under_review' | 'resolved' | 'escalated';
  createdAt: string;
  messages: DisputeMessage[];
}

interface DisputeMessage {
  id: string;
  author: string;
  role: 'client' | 'vendor' | 'mediator';
  message: string;
  timestamp: string;
  attachments?: string[];
}

const EscrowManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState('all');
  const [showTriggerRules, setShowTriggerRules] = useState(false);

  // Mock data for demonstration
  const mockProjects: EscrowProject[] = [
    {
      id: 'ESC-2024-001',
      name: 'HVAC System Replacement - Building A',
      vendor: 'Arctic Air Solutions',
      client: 'Metro Properties LLC',
      totalAmount: 15000,
      fundedAmount: 15000,
      releasedAmount: 7500,
      pendingAmount: 7500,
      disputedAmount: 0,
      status: 'active',
      createdAt: '2024-01-10',
      milestones: [
        {
          id: 'M-001',
          name: 'Equipment Delivery',
          description: 'HVAC equipment delivered and inspected',
          amount: 7500,
          dueDate: '2024-01-15',
          status: 'paid',
          completedAt: '2024-01-14',
          approvedAt: '2024-01-15',
          paidAt: '2024-01-15'
        },
        {
          id: 'M-002',
          name: 'Installation Complete',
          description: 'Full HVAC system installation and testing',
          amount: 7500,
          dueDate: '2024-01-20',
          status: 'approved',
          completedAt: '2024-01-19',
          approvedAt: '2024-01-20'
        }
      ],
      invoices: [
        {
          id: 'INV-001',
          milestoneId: 'M-001',
          vendorName: 'Arctic Air Solutions',
          amount: 7500,
          description: 'HVAC Equipment - Units and Components',
          submittedAt: '2024-01-14 10:30 AM',
          status: 'paid',
          attachments: ['equipment_receipt.pdf', 'delivery_confirmation.jpg'],
          reviewNotes: 'Equipment verified and matches specifications'
        },
        {
          id: 'INV-002',
          milestoneId: 'M-002',
          vendorName: 'Arctic Air Solutions',
          amount: 7500,
          description: 'HVAC Installation Labor and Testing',
          submittedAt: '2024-01-19 04:45 PM',
          status: 'approved',
          attachments: ['installation_photos.zip', 'test_results.pdf'],
          reviewNotes: 'Installation completed successfully, all tests passed'
        }
      ],
      transactions: [
        {
          id: 'TXN-001',
          type: 'deposit',
          amount: 15000,
          description: 'Initial project funding',
          timestamp: '2024-01-10 09:00 AM',
          status: 'completed',
          reference: 'DEP-15000-001'
        },
        {
          id: 'TXN-002',
          type: 'release',
          amount: 7500,
          description: 'Milestone 1 payment - Equipment Delivery',
          timestamp: '2024-01-15 02:30 PM',
          status: 'completed',
          reference: 'REL-7500-001'
        }
      ],
      disputes: []
    },
    {
      id: 'ESC-2024-002',
      name: 'Emergency Plumbing Repair - Unit 3B',
      vendor: 'FastFlow Plumbing',
      client: 'Metro Properties LLC',
      totalAmount: 850,
      fundedAmount: 850,
      releasedAmount: 0,
      pendingAmount: 0,
      disputedAmount: 850,
      status: 'disputed',
      createdAt: '2024-01-12',
      milestones: [
        {
          id: 'M-003',
          name: 'Emergency Repair',
          description: 'Fix burst pipe and water damage cleanup',
          amount: 850,
          dueDate: '2024-01-12',
          status: 'completed',
          completedAt: '2024-01-12'
        }
      ],
      invoices: [
        {
          id: 'INV-003',
          milestoneId: 'M-003',
          vendorName: 'FastFlow Plumbing',
          amount: 850,
          description: 'Emergency pipe repair and cleanup',
          submittedAt: '2024-01-12 06:30 PM',
          status: 'disputed',
          attachments: ['repair_photos.jpg', 'parts_receipt.pdf'],
          reviewNotes: 'Quality concerns raised by tenant'
        }
      ],
      transactions: [
        {
          id: 'TXN-003',
          type: 'deposit',
          amount: 850,
          description: 'Emergency repair funding',
          timestamp: '2024-01-12 08:00 AM',
          status: 'completed',
          reference: 'DEP-850-002'
        }
      ],
      disputes: [
        {
          id: 'DIS-001',
          invoiceId: 'INV-003',
          reason: 'Quality of Work',
          description: 'Tenant reports leak has returned within 24 hours. Requesting re-inspection and proper repair.',
          amount: 850,
          submittedBy: 'client',
          status: 'under_review',
          createdAt: '2024-01-13 10:15 AM',
          messages: [
            {
              id: 'MSG-001',
              author: 'Metro Properties LLC',
              role: 'client',
              message: 'The repair appears to have failed. Tenant called this morning reporting water leak has returned.',
              timestamp: '2024-01-13 10:15 AM'
            },
            {
              id: 'MSG-002',
              author: 'FastFlow Plumbing',
              role: 'vendor',
              message: 'We will return today to inspect and provide warranty repair at no additional cost.',
              timestamp: '2024-01-13 11:30 AM'
            }
          ]
        }
      ]
    },
    {
      id: 'ESC-2024-003',
      name: 'Roof Repair - Main Building',
      vendor: 'Summit Roofing Co',
      client: 'Downtown Office Complex',
      totalAmount: 12500,
      fundedAmount: 12500,
      releasedAmount: 12500,
      pendingAmount: 0,
      disputedAmount: 0,
      status: 'completed',
      createdAt: '2024-01-05',
      milestones: [
        {
          id: 'M-004',
          name: 'Material Procurement',
          description: 'Roofing materials delivered to site',
          amount: 5000,
          dueDate: '2024-01-08',
          status: 'paid',
          completedAt: '2024-01-07',
          approvedAt: '2024-01-08',
          paidAt: '2024-01-08'
        },
        {
          id: 'M-005',
          name: 'Roof Repair Completion',
          description: 'Complete roof repair with 5-year warranty',
          amount: 7500,
          dueDate: '2024-01-12',
          status: 'paid',
          completedAt: '2024-01-11',
          approvedAt: '2024-01-12',
          paidAt: '2024-01-12'
        }
      ],
      invoices: [
        {
          id: 'INV-004',
          milestoneId: 'M-004',
          vendorName: 'Summit Roofing Co',
          amount: 5000,
          description: 'Roofing materials and supplies',
          submittedAt: '2024-01-07 02:00 PM',
          status: 'paid',
          attachments: ['materials_invoice.pdf', 'delivery_receipt.pdf']
        },
        {
          id: 'INV-005',
          milestoneId: 'M-005',
          vendorName: 'Summit Roofing Co',
          amount: 7500,
          description: 'Roof repair labor and completion',
          submittedAt: '2024-01-11 05:15 PM',
          status: 'paid',
          attachments: ['completion_photos.zip', 'warranty_certificate.pdf']
        }
      ],
      transactions: [
        {
          id: 'TXN-004',
          type: 'deposit',
          amount: 12500,
          description: 'Roof repair project funding',
          timestamp: '2024-01-05 11:00 AM',
          status: 'completed',
          reference: 'DEP-12500-003'
        },
        {
          id: 'TXN-005',
          type: 'release',
          amount: 5000,
          description: 'Materials milestone payment',
          timestamp: '2024-01-08 03:30 PM',
          status: 'completed',
          reference: 'REL-5000-002'
        },
        {
          id: 'TXN-006',
          type: 'release',
          amount: 7500,
          description: 'Final completion payment',
          timestamp: '2024-01-12 04:45 PM',
          status: 'completed',
          reference: 'REL-7500-003'
        }
      ],
      disputes: []
    }
  ];

  // Mock client-specific escrow trigger rules
  const mockEscrowTriggerRules = {
    'Metro Properties LLC': {
      autoRelease: {
        enabled: true,
        conditions: [
          'Work completion verified by client',
          'Photo documentation provided',
          'No quality issues reported within 24 hours'
        ],
        maxAmount: 5000,
        requiresApproval: false
      },
      milestoneRules: {
        materialDelivery: {
          releasePercentage: 50,
          requiresInspection: true,
          holdPeriod: 0
        },
        workCompletion: {
          releasePercentage: 50,
          requiresInspection: true,
          holdPeriod: 24 // hours
        }
      },
      disputeEscalation: {
        autoEscalateAfter: 72, // hours
        requiresMediation: true,
        maxDisputeAmount: 10000
      }
    },
    'Downtown Office Complex': {
      autoRelease: {
        enabled: false,
        conditions: [],
        maxAmount: 0,
        requiresApproval: true
      },
      milestoneRules: {
        materialDelivery: {
          releasePercentage: 30,
          requiresInspection: true,
          holdPeriod: 48
        },
        workCompletion: {
          releasePercentage: 70,
          requiresInspection: true,
          holdPeriod: 72
        }
      },
      disputeEscalation: {
        autoEscalateAfter: 48,
        requiresMediation: false,
        maxDisputeAmount: 25000
      }
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'active': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'completed': 'bg-green-500/20 text-green-400 border-green-500/30',
      'disputed': 'bg-red-500/20 text-red-400 border-red-500/30',
      'cancelled': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      'pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'approved': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
      'paid': 'bg-green-600/20 text-green-300 border-green-600/30',
      'submitted': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'under_review': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'open': 'bg-red-400/20 text-red-300 border-red-400/30',
      'resolved': 'bg-green-400/20 text-green-300 border-green-400/30'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const exportTransactionLog = (projectId: string) => {
    const project = mockProjects.find(p => p.id === projectId);
    if (!project) return;

    const csvContent = [
      ['Date', 'Type', 'Amount', 'Description', 'Status', 'Reference'],
      ...project.transactions.map(txn => [
        txn.timestamp,
        txn.type.toUpperCase(),
        txn.amount.toString(),
        txn.description,
        txn.status.toUpperCase(),
        txn.reference
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `escrow_log_${projectId}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const approveInvoice = (invoiceId: string) => {
    alert(`✅ Invoice ${invoiceId} approved!\n\nPayment will be released from escrow within 24 hours.\nVendor will be notified automatically.`);
  };

  const disputeInvoice = (invoiceId: string) => {
    alert(`⚠️ Dispute initiated for Invoice ${invoiceId}\n\nFunds have been held in escrow.\nDispute resolution process started.\nBoth parties will be notified.`);
  };

  const resolveDispute = (disputeId: string) => {
    alert(`✅ Dispute ${disputeId} resolved!\n\nResolution terms have been applied.\nFunds released according to agreement.\nAll parties notified.`);
  };

  const filteredProjects = mockProjects.filter(project => {
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesClient = selectedClient === 'all' || project.client === selectedClient;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesClient && matchesSearch;
  });

  const totalStats = mockProjects.reduce((acc, project) => ({
    totalFunded: acc.totalFunded + project.fundedAmount,
    totalReleased: acc.totalReleased + project.releasedAmount,
    totalPending: acc.totalPending + project.pendingAmount,
    totalDisputed: acc.totalDisputed + project.disputedAmount
  }), { totalFunded: 0, totalReleased: 0, totalPending: 0, totalDisputed: 0 });

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-xl border border-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-blue-400 font-semibold">Total Funded</h3>
            <DollarSign className="text-blue-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{formatCurrency(totalStats.totalFunded)}</div>
          <div className="text-sm text-blue-300 mt-1">Across {mockProjects.length} projects</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-6 rounded-xl border border-green-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-green-400 font-semibold">Released</h3>
            <CheckCircle className="text-green-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{formatCurrency(totalStats.totalReleased)}</div>
          <div className="text-sm text-green-300 mt-1">
            {((totalStats.totalReleased / totalStats.totalFunded) * 100).toFixed(1)}% of total
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 p-6 rounded-xl border border-yellow-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-yellow-400 font-semibold">Pending</h3>
            <Clock className="text-yellow-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{formatCurrency(totalStats.totalPending)}</div>
          <div className="text-sm text-yellow-300 mt-1">Awaiting approval</div>
        </div>

        <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 p-6 rounded-xl border border-red-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-red-400 font-semibold">Disputed</h3>
            <AlertTriangle className="text-red-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{formatCurrency(totalStats.totalDisputed)}</div>
          <div className="text-sm text-red-300 mt-1">Requires resolution</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects..."
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
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="disputed">Disputed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Clients</option>
            <option value="Metro Properties LLC">Metro Properties LLC</option>
            <option value="Downtown Office Complex">Downtown Office Complex</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowTriggerRules(!showTriggerRules)}
            className="flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
          >
            <Target size={16} />
            <span>Trigger Rules</span>
          </button>
          <button className="flex items-center space-x-2 bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900">
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Client-Specific Escrow Trigger Rules */}
      {showTriggerRules && (
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <Target className="mr-2 text-purple-400" size={20} />
              Client-Specific Escrow Trigger Rules
            </h3>
            <button
              onClick={() => setShowTriggerRules(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(mockEscrowTriggerRules).map(([clientName, rules]) => (
              <div key={clientName} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
                <h4 className="text-lg font-semibold text-white mb-4">{clientName}</h4>
                
                <div className="space-y-4">
                  <div className="p-3 bg-blue-500/10 rounded border border-blue-500/20">
                    <h5 className="text-blue-400 font-medium mb-2">Auto-Release Settings</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Enabled:</span>
                        <span className={rules.autoRelease.enabled ? 'text-green-400' : 'text-red-400'}>
                          {rules.autoRelease.enabled ? 'Yes' : 'No'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Max Amount:</span>
                        <span className="text-white">{formatCurrency(rules.autoRelease.maxAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Requires Approval:</span>
                        <span className={rules.autoRelease.requiresApproval ? 'text-yellow-400' : 'text-green-400'}>
                          {rules.autoRelease.requiresApproval ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-green-500/10 rounded border border-green-500/20">
                    <h5 className="text-green-400 font-medium mb-2">Milestone Rules</h5>
                    <div className="space-y-2 text-sm">
                      <div>
                        <div className="text-white font-medium">Material Delivery:</div>
                        <div className="text-gray-400">Release: {rules.milestoneRules.materialDelivery.releasePercentage}% • Hold: {rules.milestoneRules.materialDelivery.holdPeriod}h</div>
                      </div>
                      <div>
                        <div className="text-white font-medium">Work Completion:</div>
                        <div className="text-gray-400">Release: {rules.milestoneRules.workCompletion.releasePercentage}% • Hold: {rules.milestoneRules.workCompletion.holdPeriod}h</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-red-500/10 rounded border border-red-500/20">
                    <h5 className="text-red-400 font-medium mb-2">Dispute Escalation</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Auto-Escalate After:</span>
                        <span className="text-white">{rules.disputeEscalation.autoEscalateAfter}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Max Dispute Amount:</span>
                        <span className="text-white">{formatCurrency(rules.disputeEscalation.maxDisputeAmount)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors font-semibold">
              Configure New Client Rules
            </button>
          </div>
        </div>
      )}

      {/* Projects List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30 hover:border-teal-500/50 transition-all duration-300">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">{project.name}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>ID: {project.id}</span>
                  <span>•</span>
                  <span>Vendor: {project.vendor}</span>
                  <span>•</span>
                  <span>Client: {project.client}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                  {project.status.toUpperCase()}
                </span>
                <button
                  onClick={() => setSelectedProject(project.id)}
                  className="bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900"
                >
                  <Eye size={16} className="inline mr-2" />
                  View Details
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="text-lg font-bold text-blue-400">{formatCurrency(project.totalAmount)}</div>
                <div className="text-xs text-blue-300">Total</div>
              </div>
              <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="text-lg font-bold text-green-400">{formatCurrency(project.releasedAmount)}</div>
                <div className="text-xs text-green-300">Released</div>
              </div>
              <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <div className="text-lg font-bold text-yellow-400">{formatCurrency(project.pendingAmount)}</div>
                <div className="text-xs text-yellow-300">Pending</div>
              </div>
              <div className="text-center p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                <div className="text-lg font-bold text-red-400">{formatCurrency(project.disputedAmount)}</div>
                <div className="text-xs text-red-300">Disputed</div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">
                Created: {new Date(project.createdAt).toLocaleDateString()}
              </div>
              <button
                onClick={() => exportTransactionLog(project.id)}
                className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors"
              >
                <Download size={16} />
                <span>Export Log</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProjectDetails = () => {
    const project = mockProjects.find(p => p.id === selectedProject);
    if (!project) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedProject(null)}
            className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors"
          >
            <X size={20} />
            <span>Back to Overview</span>
          </button>
          <button
            onClick={() => exportTransactionLog(project.id)}
            className="flex items-center space-x-2 bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900"
          >
            <Download size={16} />
            <span>Export Transaction Log</span>
          </button>
        </div>

        {/* Project Header */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">{project.name}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>ID: {project.id}</span>
                <span>•</span>
                <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
              {project.status.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-teal-400 font-semibold mb-3">Project Parties</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Users className="text-gray-400" size={16} />
                  <span className="text-gray-400">Client:</span>
                  <span className="text-white">{project.client}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="text-gray-400" size={16} />
                  <span className="text-gray-400">Vendor:</span>
                  <span className="text-white">{project.vendor}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-teal-400 font-semibold mb-3">Financial Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-lg font-bold text-blue-400">{formatCurrency(project.totalAmount)}</div>
                  <div className="text-xs text-blue-300">Total</div>
                </div>
                <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="text-lg font-bold text-green-400">{formatCurrency(project.releasedAmount)}</div>
                  <div className="text-xs text-green-300">Released</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Calendar className="mr-2 text-teal-400" size={20} />
            Project Milestones
          </h3>
          <div className="space-y-4">
            {project.milestones.map((milestone) => (
              <div key={milestone.id} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-white">{milestone.name}</h4>
                    <p className="text-gray-400 text-sm">{milestone.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-teal-400">{formatCurrency(milestone.amount)}</div>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(milestone.status)}`}>
                      {milestone.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>Due: {new Date(milestone.dueDate).toLocaleDateString()}</span>
                  {milestone.completedAt && (
                    <span>Completed: {new Date(milestone.completedAt).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Invoices */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <FileText className="mr-2 text-teal-400" size={20} />
            Invoice Management
          </h3>
          <div className="space-y-4">
            {project.invoices.map((invoice) => (
              <div key={invoice.id} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-white">{invoice.id}</h4>
                    <p className="text-gray-400 text-sm">{invoice.description}</p>
                    <p className="text-gray-500 text-xs">Submitted: {invoice.submittedAt}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-teal-400">{formatCurrency(invoice.amount)}</div>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                      {invoice.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>

                {invoice.attachments.length > 0 && (
                  <div className="mb-3">
                    <h5 className="text-sm font-medium text-gray-300 mb-2">Attachments:</h5>
                    <div className="flex flex-wrap gap-2">
                      {invoice.attachments.map((file, index) => (
                        <span key={index} className="bg-gray-600/50 text-gray-300 px-2 py-1 rounded text-xs">
                          {file}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {invoice.reviewNotes && (
                  <div className="mb-3 p-3 bg-teal-500/10 rounded border border-teal-500/20">
                    <h5 className="text-sm font-medium text-teal-400 mb-1">Review Notes:</h5>
                    <p className="text-gray-300 text-sm">{invoice.reviewNotes}</p>
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  {invoice.status === 'submitted' && (
                    <>
                      <button
                        onClick={() => approveInvoice(invoice.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Approve & Pay
                      </button>
                      <button
                        onClick={() => disputeInvoice(invoice.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Dispute
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setSelectedInvoice(invoice.id)}
                    className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disputes */}
        {project.disputes.length > 0 && (
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <AlertTriangle className="mr-2 text-red-400" size={20} />
              Active Disputes
            </h3>
            <div className="space-y-4">
              {project.disputes.map((dispute) => (
                <div key={dispute.id} className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-white">{dispute.reason}</h4>
                      <p className="text-gray-400 text-sm">{dispute.description}</p>
                      <p className="text-gray-500 text-xs">
                        Submitted by {dispute.submittedBy} on {new Date(dispute.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-red-400">{formatCurrency(dispute.amount)}</div>
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(dispute.status)}`}>
                        {dispute.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h5 className="text-sm font-medium text-gray-300 mb-2">Recent Messages:</h5>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {dispute.messages.slice(-2).map((message) => (
                        <div key={message.id} className="p-2 bg-gray-800/50 rounded text-sm">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-white">{message.author}</span>
                            <span className="text-xs text-gray-500">{message.timestamp}</span>
                          </div>
                          <p className="text-gray-300">{message.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => resolveDispute(dispute.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Mark Resolved
                    </button>
                    <button className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-sm transition-colors">
                      View Full Thread
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transaction History */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <TrendingUp className="mr-2 text-teal-400" size={20} />
            Transaction History
          </h3>
          <div className="space-y-3">
            {project.transactions.map((transaction) => (
              <div key={transaction.id} className="flex justify-between items-center p-3 bg-gray-700/20 rounded-lg border border-gray-700/30">
                <div>
                  <div className="font-medium text-white">{transaction.description}</div>
                  <div className="text-sm text-gray-400">
                    {transaction.timestamp} • Ref: {transaction.reference}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${
                    transaction.type === 'deposit' ? 'text-blue-400' :
                    transaction.type === 'release' ? 'text-green-400' :
                    transaction.type === 'dispute' ? 'text-red-400' :
                    'text-yellow-400'
                  }`}>
                    {transaction.type === 'deposit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(transaction.status)}`}>
                    {transaction.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
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
              <h1 className="text-2xl font-semibold">Escrow Account Management</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">Client-Vendor Direct • FFM No Payment Role</span>
                <span className="text-xs text-gray-400">• Bank-Level Security</span>
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
          <strong className="text-teal-400">Demo Mode:</strong> This interface demonstrates client-vendor direct escrow management. FFM facilitates but does not handle payments. All transactions are between clients and vendors with milestone-based releases.
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {selectedProject ? renderProjectDetails() : renderOverview()}
      </div>
    </div>
  );
};

export default EscrowManagement;