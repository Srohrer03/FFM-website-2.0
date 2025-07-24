import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, TrendingUp, Calendar, DollarSign, FileText, 
  Plus, Edit, Eye, Download, Filter, Search, Clock,
  CheckCircle, AlertTriangle, BarChart3, Target, Zap
} from 'lucide-react';
import Logo from './Logo';

interface CapExProject {
  id: string;
  name: string;
  description: string;
  category: 'HVAC Upgrade' | 'Roof Replacement' | 'Elevator Modernization' | 'Building Renovation' | 'Technology Infrastructure' | 'Energy Efficiency';
  status: 'Planning' | 'Approved' | 'In Progress' | 'On Hold' | 'Completed' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  estimatedCost: number;
  approvedBudget: number;
  actualCost: number;
  estimatedStartDate: string;
  estimatedEndDate: string;
  actualStartDate?: string;
  actualEndDate?: string;
  roi: number;
  paybackPeriod: number;
  energySavings?: number;
  maintenanceSavings?: number;
  property: string;
  requestedBy: string;
  approvedBy?: string;
  assignedVendor?: string;
  phases: ProjectPhase[];
  documents: string[];
  riskFactors: string[];
  businessJustification: string;
}

interface ProjectPhase {
  id: string;
  name: string;
  description: string;
  estimatedCost: number;
  estimatedDuration: number;
  dependencies: string[];
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Delayed';
  startDate?: string;
  endDate?: string;
}

const CapExWorkspace = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock CapEx projects data
  const mockCapExProjects: CapExProject[] = [
    {
      id: 'CAPEX-001',
      name: 'Building A HVAC System Replacement',
      description: 'Complete replacement of aging HVAC system with energy-efficient units to reduce operating costs and improve tenant comfort.',
      category: 'HVAC Upgrade',
      status: 'Approved',
      priority: 'High',
      estimatedCost: 450000,
      approvedBudget: 475000,
      actualCost: 0,
      estimatedStartDate: '2024-03-01',
      estimatedEndDate: '2024-05-15',
      roi: 285,
      paybackPeriod: 4.2,
      energySavings: 85000,
      maintenanceSavings: 25000,
      property: 'Metro Office Complex - Building A',
      requestedBy: 'Mike Chen - Facilities Director',
      approvedBy: 'Sarah Johnson - CFO',
      assignedVendor: 'Arctic Air Solutions',
      phases: [
        {
          id: 'PH-001',
          name: 'Design & Engineering',
          description: 'System design, engineering drawings, and permit applications',
          estimatedCost: 45000,
          estimatedDuration: 3,
          dependencies: [],
          status: 'Not Started'
        },
        {
          id: 'PH-002',
          name: 'Equipment Procurement',
          description: 'Order and receive all HVAC equipment and materials',
          estimatedCost: 275000,
          estimatedDuration: 4,
          dependencies: ['PH-001'],
          status: 'Not Started'
        },
        {
          id: 'PH-003',
          name: 'Installation Phase 1',
          description: 'Remove old equipment and install new units (Floors 1-3)',
          estimatedCost: 65000,
          estimatedDuration: 3,
          dependencies: ['PH-002'],
          status: 'Not Started'
        },
        {
          id: 'PH-004',
          name: 'Installation Phase 2',
          description: 'Complete installation (Floors 4-6) and system integration',
          estimatedCost: 65000,
          estimatedDuration: 3,
          dependencies: ['PH-003'],
          status: 'Not Started'
        }
      ],
      documents: ['hvac_assessment_report.pdf', 'energy_audit_2024.pdf', 'vendor_proposals.zip'],
      riskFactors: [
        'Weather delays during installation',
        'Potential asbestos in old ductwork',
        'Tenant disruption during business hours'
      ],
      businessJustification: 'Current HVAC system is 18 years old and operating at 60% efficiency. Replacement will reduce energy costs by $85,000 annually and maintenance costs by $25,000 annually, providing 285% ROI over 10 years.'
    },
    {
      id: 'CAPEX-002',
      name: 'Roof Replacement - Building B',
      description: 'Complete roof replacement including waterproofing membrane and insulation upgrade for improved energy efficiency.',
      category: 'Roof Replacement',
      status: 'Planning',
      priority: 'Medium',
      estimatedCost: 285000,
      approvedBudget: 0,
      actualCost: 0,
      estimatedStartDate: '2024-04-01',
      estimatedEndDate: '2024-06-30',
      roi: 180,
      paybackPeriod: 8.5,
      energySavings: 35000,
      maintenanceSavings: 15000,
      property: 'Metro Office Complex - Building B',
      requestedBy: 'Mike Chen - Facilities Director',
      phases: [
        {
          id: 'PH-005',
          name: 'Roof Assessment',
          description: 'Comprehensive roof condition assessment and structural analysis',
          estimatedCost: 15000,
          estimatedDuration: 2,
          dependencies: [],
          status: 'In Progress'
        },
        {
          id: 'PH-006',
          name: 'Design & Permits',
          description: 'Roofing design, material selection, and permit acquisition',
          estimatedCost: 25000,
          estimatedDuration: 4,
          dependencies: ['PH-005'],
          status: 'Not Started'
        },
        {
          id: 'PH-007',
          name: 'Material Procurement',
          description: 'Order roofing materials and schedule delivery',
          estimatedCost: 145000,
          estimatedDuration: 3,
          dependencies: ['PH-006'],
          status: 'Not Started'
        },
        {
          id: 'PH-008',
          name: 'Roof Installation',
          description: 'Remove old roof and install new roofing system',
          estimatedCost: 100000,
          estimatedDuration: 8,
          dependencies: ['PH-007'],
          status: 'Not Started'
        }
      ],
      documents: ['roof_inspection_report.pdf', 'structural_analysis.pdf'],
      riskFactors: [
        'Weather dependency for installation',
        'Potential structural issues discovered',
        'Material cost fluctuations'
      ],
      businessJustification: 'Current roof is 22 years old with multiple leak repairs. Replacement will eliminate maintenance issues and improve energy efficiency by 15%, saving $35,000 annually in energy costs.'
    },
    {
      id: 'CAPEX-003',
      name: 'Elevator Modernization Program',
      description: 'Modernize all 4 elevators with new control systems, safety features, and energy-efficient motors.',
      category: 'Elevator Modernization',
      status: 'In Progress',
      priority: 'Critical',
      estimatedCost: 320000,
      approvedBudget: 340000,
      actualCost: 125000,
      estimatedStartDate: '2024-01-15',
      estimatedEndDate: '2024-04-30',
      actualStartDate: '2024-01-20',
      roi: 220,
      paybackPeriod: 6.8,
      energySavings: 18000,
      maintenanceSavings: 45000,
      property: 'Metro Office Complex - Building A',
      requestedBy: 'Mike Chen - Facilities Director',
      approvedBy: 'Sarah Johnson - CFO',
      assignedVendor: 'SafeLift Services',
      phases: [
        {
          id: 'PH-009',
          name: 'Elevator 1 Modernization',
          description: 'Complete modernization of Elevator 1 including new control system',
          estimatedCost: 80000,
          estimatedDuration: 4,
          dependencies: [],
          status: 'Completed',
          startDate: '2024-01-20',
          endDate: '2024-02-15'
        },
        {
          id: 'PH-010',
          name: 'Elevator 2 Modernization',
          description: 'Complete modernization of Elevator 2',
          estimatedCost: 80000,
          estimatedDuration: 4,
          dependencies: ['PH-009'],
          status: 'In Progress',
          startDate: '2024-02-16'
        },
        {
          id: 'PH-011',
          name: 'Elevator 3 Modernization',
          description: 'Complete modernization of Elevator 3',
          estimatedCost: 80000,
          estimatedDuration: 4,
          dependencies: ['PH-010'],
          status: 'Not Started'
        },
        {
          id: 'PH-012',
          name: 'Elevator 4 & Final Testing',
          description: 'Complete modernization of Elevator 4 and system-wide testing',
          estimatedCost: 80000,
          estimatedDuration: 4,
          dependencies: ['PH-011'],
          status: 'Not Started'
        }
      ],
      documents: ['elevator_assessment.pdf', 'modernization_plan.pdf', 'safety_compliance.pdf'],
      riskFactors: [
        'Extended tenant disruption',
        'Code compliance changes',
        'Supply chain delays for specialized parts'
      ],
      businessJustification: 'Elevators are 25 years old and require frequent repairs. Modernization will reduce maintenance costs by $45,000 annually and improve energy efficiency by 30%.'
    },
    {
      id: 'CAPEX-004',
      name: 'LED Lighting Retrofit - All Buildings',
      description: 'Replace all fluorescent and incandescent lighting with LED fixtures for energy savings and improved lighting quality.',
      category: 'Energy Efficiency',
      status: 'Completed',
      priority: 'Medium',
      estimatedCost: 125000,
      approvedBudget: 130000,
      actualCost: 118500,
      estimatedStartDate: '2023-09-01',
      estimatedEndDate: '2023-11-30',
      actualStartDate: '2023-09-05',
      actualEndDate: '2023-11-22',
      roi: 420,
      paybackPeriod: 2.8,
      energySavings: 65000,
      maintenanceSavings: 12000,
      property: 'Metro Office Complex - All Buildings',
      requestedBy: 'Mike Chen - Facilities Director',
      approvedBy: 'Sarah Johnson - CFO',
      assignedVendor: 'PowerTech Electrical',
      phases: [
        {
          id: 'PH-013',
          name: 'Building A Retrofit',
          description: 'LED retrofit for all floors in Building A',
          estimatedCost: 45000,
          estimatedDuration: 3,
          dependencies: [],
          status: 'Completed',
          startDate: '2023-09-05',
          endDate: '2023-10-02'
        },
        {
          id: 'PH-014',
          name: 'Building B Retrofit',
          description: 'LED retrofit for all floors in Building B',
          estimatedCost: 35000,
          estimatedDuration: 3,
          dependencies: ['PH-013'],
          status: 'Completed',
          startDate: '2023-10-03',
          endDate: '2023-10-28'
        },
        {
          id: 'PH-015',
          name: 'Common Areas & Exterior',
          description: 'LED retrofit for lobbies, parking, and exterior lighting',
          estimatedCost: 45000,
          estimatedDuration: 2,
          dependencies: ['PH-014'],
          status: 'Completed',
          startDate: '2023-10-29',
          endDate: '2023-11-22'
        }
      ],
      documents: ['lighting_audit.pdf', 'energy_savings_analysis.pdf', 'completion_report.pdf'],
      riskFactors: [
        'Tenant disruption during installation',
        'Compatibility issues with existing fixtures',
        'Utility rebate processing delays'
      ],
      businessJustification: 'LED retrofit will reduce energy consumption by 60% and maintenance costs by 80%, providing $65,000 annual energy savings and $12,000 maintenance savings.'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'Planning': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Approved': 'bg-green-500/20 text-green-400 border-green-500/30',
      'In Progress': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'On Hold': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Completed': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
      'Cancelled': 'bg-red-500/20 text-red-400 border-red-500/30'
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const filteredProjects = mockCapExProjects.filter(project => {
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || project.category === filterCategory;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const totalCapExBudget = mockCapExProjects.reduce((acc, project) => acc + project.approvedBudget, 0);
  const totalEstimatedCost = mockCapExProjects.reduce((acc, project) => acc + project.estimatedCost, 0);
  const totalActualCost = mockCapExProjects.reduce((acc, project) => acc + project.actualCost, 0);
  const totalROI = mockCapExProjects.reduce((acc, project) => acc + (project.roi * project.approvedBudget / 100), 0);

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-xl border border-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-blue-400 font-semibold">Total CapEx Budget</h3>
            <DollarSign className="text-blue-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{formatCurrency(totalCapExBudget)}</div>
          <div className="text-sm text-blue-300 mt-1">Approved projects</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-6 rounded-xl border border-green-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-green-400 font-semibent">Projected ROI</h3>
            <TrendingUp className="text-green-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{formatCurrency(totalROI)}</div>
          <div className="text-sm text-green-300 mt-1">10-year value</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-6 rounded-xl border border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-purple-400 font-semibold">Active Projects</h3>
            <BarChart3 className="text-purple-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">
            {mockCapExProjects.filter(p => p.status === 'In Progress' || p.status === 'Approved').length}
          </div>
          <div className="text-sm text-purple-300 mt-1">In progress/approved</div>
        </div>

        <div className="bg-gradient-to-br from-teal-500/10 to-teal-600/10 p-6 rounded-xl border border-teal-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-teal-400 font-semibold">Avg Payback</h3>
            <Clock className="text-teal-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">
            {(mockCapExProjects.reduce((acc, p) => acc + p.paybackPeriod, 0) / mockCapExProjects.length).toFixed(1)} yrs
          </div>
          <div className="text-sm text-teal-300 mt-1">Average period</div>
        </div>
      </div>

      {/* Project Pipeline */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-6">CapEx Project Pipeline</h3>
        <div className="space-y-4">
          {mockCapExProjects.map((project) => (
            <div key={project.id} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30 hover:border-teal-500/50 transition-all duration-300">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-1">{project.name}</h4>
                  <p className="text-gray-400 text-sm mb-2">{project.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Property: {project.property}</span>
                    <span>•</span>
                    <span>ROI: {project.roi}%</span>
                    <span>•</span>
                    <span>Payback: {project.paybackPeriod} years</span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(project.priority)}`}>
                    {project.priority}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-teal-400 font-semibold">{formatCurrency(project.estimatedCost)}</span>
                  <span className="text-gray-400">Est. Start: {new Date(project.estimatedStartDate).toLocaleDateString()}</span>
                </div>
                <button
                  onClick={() => setSelectedProject(project.id)}
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

      {/* ROI Analysis */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-6">ROI Analysis by Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(
            mockCapExProjects.reduce((acc, project) => {
              if (!acc[project.category]) {
                acc[project.category] = { totalCost: 0, totalROI: 0, count: 0 };
              }
              acc[project.category].totalCost += project.estimatedCost;
              acc[project.category].totalROI += project.roi;
              acc[project.category].count += 1;
              return acc;
            }, {} as Record<string, { totalCost: number; totalROI: number; count: number }>)
          ).map(([category, data]) => (
            <div key={category} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
              <h4 className="text-white font-semibold mb-2">{category}</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Total Investment:</span>
                  <span className="text-white">{formatCurrency(data.totalCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Avg ROI:</span>
                  <span className="text-teal-400 font-semibold">{Math.round(data.totalROI / data.count)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Projects:</span>
                  <span className="text-white">{data.count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjectPlanning = () => (
    <div className="space-y-6">
      {/* Filters */}
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
            <option value="Planning">Planning</option>
            <option value="Approved">Approved</option>
            <option value="In Progress">In Progress</option>
            <option value="On Hold">On Hold</option>
            <option value="Completed">Completed</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Categories</option>
            <option value="HVAC Upgrade">HVAC Upgrade</option>
            <option value="Roof Replacement">Roof Replacement</option>
            <option value="Elevator Modernization">Elevator Modernization</option>
            <option value="Energy Efficiency">Energy Efficiency</option>
          </select>
        </div>
        <button className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold">
          <Plus size={16} />
          <span>New CapEx Project</span>
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30 hover:border-teal-500/50 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-white mb-2">{project.name}</h4>
                <p className="text-gray-400 mb-3">{project.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Category: {project.category}</span>
                  <span>•</span>
                  <span>Property: {project.property}</span>
                  <span>•</span>
                  <span>Requested by: {project.requestedBy}</span>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(project.priority)}`}>
                  {project.priority}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="text-lg font-bold text-blue-400">{formatCurrency(project.estimatedCost)}</div>
                <div className="text-xs text-blue-300">Estimated Cost</div>
              </div>
              <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="text-lg font-bold text-green-400">{project.roi}%</div>
                <div className="text-xs text-green-300">ROI</div>
              </div>
              <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <div className="text-lg font-bold text-purple-400">{project.paybackPeriod} yrs</div>
                <div className="text-xs text-purple-300">Payback Period</div>
              </div>
              <div className="text-center p-3 bg-teal-500/10 rounded-lg border border-teal-500/20">
                <div className="text-lg font-bold text-teal-400">
                  {new Date(project.estimatedStartDate).toLocaleDateString()}
                </div>
                <div className="text-xs text-teal-300">Est. Start Date</div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>Duration: {Math.ceil((new Date(project.estimatedEndDate).getTime() - new Date(project.estimatedStartDate).getTime()) / (1000 * 60 * 60 * 24 * 7))} weeks</span>
                <span>•</span>
                <span>Phases: {project.phases.length}</span>
                {project.energySavings && (
                  <>
                    <span>•</span>
                    <span className="text-green-400">Energy Savings: {formatCurrency(project.energySavings)}/yr</span>
                  </>
                )}
              </div>
              <button
                onClick={() => setSelectedProject(project.id)}
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

  const renderProjectDetails = () => {
    const project = mockCapExProjects.find(p => p.id === selectedProject);
    if (!project) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedProject(null)}
            className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors"
          >
            <Home size={20} />
            <span>Back to Project Planning</span>
          </button>
          <div className="flex items-center space-x-2">
            <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors">
              <Edit size={16} className="inline mr-2" />
              Edit Project
            </button>
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors">
              <Download size={16} className="inline mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Project Header */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">{project.name}</h2>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>ID: {project.id}</span>
                <span>•</span>
                <span>Category: {project.category}</span>
                <span>•</span>
                <span>Property: {project.property}</span>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
              <span className={`px-3 py-2 rounded-full text-sm font-medium border ${getPriorityColor(project.priority)}`}>
                {project.priority}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="text-lg font-bold text-blue-400">{formatCurrency(project.estimatedCost)}</div>
              <div className="text-xs text-blue-300">Estimated Cost</div>
            </div>
            <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="text-lg font-bold text-green-400">{project.roi}%</div>
              <div className="text-xs text-green-300">10-Year ROI</div>
            </div>
            <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="text-lg font-bold text-purple-400">{project.paybackPeriod} yrs</div>
              <div className="text-xs text-purple-300">Payback Period</div>
            </div>
            <div className="text-center p-3 bg-teal-500/10 rounded-lg border border-teal-500/20">
              <div className="text-lg font-bold text-teal-400">
                {Math.ceil((new Date(project.estimatedEndDate).getTime() - new Date(project.estimatedStartDate).getTime()) / (1000 * 60 * 60 * 24 * 7))} weeks
              </div>
              <div className="text-xs text-teal-300">Duration</div>
            </div>
          </div>
        </div>

        {/* Business Justification */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <h3 className="text-lg font-semibold text-white mb-4">Business Justification</h3>
          <p className="text-gray-300 leading-relaxed">{project.businessJustification}</p>
          
          {(project.energySavings || project.maintenanceSavings) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {project.energySavings && (
                <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="text-green-400 font-semibold">Annual Energy Savings</div>
                  <div className="text-2xl font-bold text-white">{formatCurrency(project.energySavings)}</div>
                </div>
              )}
              {project.maintenanceSavings && (
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-blue-400 font-semibold">Annual Maintenance Savings</div>
                  <div className="text-2xl font-bold text-white">{formatCurrency(project.maintenanceSavings)}</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Project Phases */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <h3 className="text-lg font-semibold text-white mb-4">Project Phases</h3>
          <div className="space-y-4">
            {project.phases.map((phase, index) => (
              <div key={phase.id} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-white font-semibold mb-1">Phase {index + 1}: {phase.name}</h4>
                    <p className="text-gray-400 text-sm mb-2">{phase.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Duration: {phase.estimatedDuration} weeks</span>
                      <span>•</span>
                      <span>Cost: {formatCurrency(phase.estimatedCost)}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(phase.status)}`}>
                    {phase.status}
                  </span>
                </div>
                
                {phase.dependencies.length > 0 && (
                  <div className="text-sm text-gray-400">
                    Dependencies: {phase.dependencies.join(', ')}
                  </div>
                )}
                
                {phase.startDate && (
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>Started: {new Date(phase.startDate).toLocaleDateString()}</span>
                    {phase.endDate && <span>Completed: {new Date(phase.endDate).toLocaleDateString()}</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Risk Factors */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <h3 className="text-lg font-semibold text-white mb-4">Risk Factors</h3>
          <div className="space-y-2">
            {project.riskFactors.map((risk, index) => (
              <div key={index} className="flex items-center space-x-2">
                <AlertTriangle className="text-yellow-400" size={16} />
                <span className="text-gray-300">{risk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <h3 className="text-lg font-semibold text-white mb-4">Project Documents</h3>
          <div className="space-y-2">
            {project.documents.map((doc, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-700/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <FileText className="text-blue-400" size={16} />
                  <span className="text-white">{doc}</span>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
                  <Download size={14} className="inline mr-1" />
                  Download
                </button>
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
              <h1 className="text-2xl font-semibold">Integrated CapEx Workspace</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">Future Project Planning • Cost Estimates • ROI Analysis • Timeline Management</span>
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
          <strong className="text-teal-400">CapEx Management:</strong> Comprehensive capital expenditure planning with future project timelines, detailed cost estimates, ROI analysis, and phase-based project management for strategic facility investments.
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { id: 'dashboard', label: 'CapEx Dashboard', icon: BarChart3 },
            { id: 'planning', label: 'Project Planning', icon: Calendar }
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
        {selectedProject ? renderProjectDetails() : (
          <>
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'planning' && renderProjectPlanning()}
          </>
        )}
      </div>
    </div>
  );
};

export default CapExWorkspace;