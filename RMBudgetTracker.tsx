import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, DollarSign, TrendingUp, AlertTriangle, CheckCircle, 
  Filter, Search, Calendar, Building, Users, Wrench,
  BarChart3, PieChart, Download, Bell, Eye, ArrowUp, ArrowDown,
  Target, Activity, Clock, FileText, Settings, RefreshCw, X
} from 'lucide-react';
import Logo from './Logo';

interface BudgetCategory {
  id: string;
  name: string;
  annualBudget: number;
  monthlyBudget: number;
  spentToDate: number;
  monthlySpent: number;
  remaining: number;
  utilizationPercent: number;
  status: 'healthy' | 'warning' | 'critical' | 'exceeded';
  workOrders: WorkOrderBudget[];
  vendors: VendorSpend[];
  properties: PropertySpend[];
}

interface WorkOrderBudget {
  id: string;
  title: string;
  vendor: string;
  property: string;
  amount: number;
  date: string;
  status: 'completed' | 'in_progress' | 'pending';
  category: string;
  description: string;
}

interface VendorSpend {
  vendorName: string;
  totalSpent: number;
  workOrderCount: number;
  averageAmount: number;
}

interface PropertySpend {
  propertyName: string;
  totalSpent: number;
  workOrderCount: number;
  budgetAllocation: number;
}

interface BudgetAlert {
  id: string;
  category: string;
  threshold: number;
  currentUtilization: number;
  severity: 'warning' | 'critical';
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

const RMBudgetTracker = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState('all');
  const [selectedTrade, setSelectedTrade] = useState('all');
  const [timeframe, setTimeframe] = useState('annual');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAlerts, setShowAlerts] = useState(true);

  // Mock R&M Budget Data
  const mockBudgetCategories: BudgetCategory[] = [
    {
      id: 'hvac',
      name: 'HVAC Systems',
      annualBudget: 120000,
      monthlyBudget: 10000,
      spentToDate: 98500,
      monthlySpent: 8750,
      remaining: 21500,
      utilizationPercent: 82.1,
      status: 'warning',
      workOrders: [
        {
          id: 'WO-2024-001',
          title: 'HVAC System Replacement - Building A',
          vendor: 'Arctic Air Solutions',
          property: 'Main Building',
          amount: 15000,
          date: '2024-01-10',
          status: 'completed',
          category: 'hvac',
          description: 'Complete HVAC system replacement with new energy-efficient units'
        },
        {
          id: 'WO-2024-015',
          title: 'Quarterly HVAC Maintenance',
          vendor: 'CoolTech HVAC',
          property: 'Warehouse B',
          amount: 2500,
          date: '2024-01-20',
          status: 'completed',
          category: 'hvac',
          description: 'Routine quarterly maintenance and filter replacement'
        },
        {
          id: 'WO-2024-023',
          title: 'Emergency AC Repair - Floor 3',
          vendor: 'Arctic Air Solutions',
          property: 'Office Complex',
          amount: 1200,
          date: '2024-01-25',
          status: 'in_progress',
          category: 'hvac',
          description: 'Emergency repair of AC unit serving floor 3 offices'
        }
      ],
      vendors: [
        { vendorName: 'Arctic Air Solutions', totalSpent: 45000, workOrderCount: 12, averageAmount: 3750 },
        { vendorName: 'CoolTech HVAC', totalSpent: 28500, workOrderCount: 15, averageAmount: 1900 },
        { vendorName: 'Climate Control Pro', totalSpent: 25000, workOrderCount: 8, averageAmount: 3125 }
      ],
      properties: [
        { propertyName: 'Main Building', totalSpent: 52000, workOrderCount: 18, budgetAllocation: 60000 },
        { propertyName: 'Warehouse B', totalSpent: 28500, workOrderCount: 12, budgetAllocation: 35000 },
        { propertyName: 'Office Complex', totalSpent: 18000, workOrderCount: 5, budgetAllocation: 25000 }
      ]
    },
    {
      id: 'plumbing',
      name: 'Plumbing Systems',
      annualBudget: 75000,
      monthlyBudget: 6250,
      spentToDate: 78200,
      monthlySpent: 6850,
      remaining: -3200,
      utilizationPercent: 104.3,
      status: 'exceeded',
      workOrders: [
        {
          id: 'WO-2024-008',
          title: 'Emergency Pipe Burst Repair',
          vendor: 'FastFlow Plumbing',
          property: 'Main Building',
          amount: 3500,
          date: '2024-01-12',
          status: 'completed',
          category: 'plumbing',
          description: 'Emergency repair of burst pipe in basement mechanical room'
        },
        {
          id: 'WO-2024-019',
          title: 'Bathroom Renovation - Floor 2',
          vendor: 'ProFlow Plumbing',
          property: 'Office Complex',
          amount: 8500,
          date: '2024-01-18',
          status: 'completed',
          category: 'plumbing',
          description: 'Complete bathroom renovation including new fixtures'
        }
      ],
      vendors: [
        { vendorName: 'FastFlow Plumbing', totalSpent: 35000, workOrderCount: 18, averageAmount: 1944 },
        { vendorName: 'ProFlow Plumbing', totalSpent: 28200, workOrderCount: 8, averageAmount: 3525 },
        { vendorName: 'AquaTech Services', totalSpent: 15000, workOrderCount: 12, averageAmount: 1250 }
      ],
      properties: [
        { propertyName: 'Main Building', totalSpent: 42000, workOrderCount: 22, budgetAllocation: 35000 },
        { propertyName: 'Office Complex', totalSpent: 24200, workOrderCount: 10, budgetAllocation: 25000 },
        { propertyName: 'Warehouse B', totalSpent: 12000, workOrderCount: 6, budgetAllocation: 15000 }
      ]
    },
    {
      id: 'electrical',
      name: 'Electrical Systems',
      annualBudget: 60000,
      monthlyBudget: 5000,
      spentToDate: 38500,
      monthlySpent: 3200,
      remaining: 21500,
      utilizationPercent: 64.2,
      status: 'healthy',
      workOrders: [
        {
          id: 'WO-2024-005',
          title: 'LED Lighting Upgrade',
          vendor: 'Bright Electric Co',
          property: 'Office Complex',
          amount: 12000,
          date: '2024-01-08',
          status: 'completed',
          category: 'electrical',
          description: 'Upgrade all office lighting to energy-efficient LED systems'
        },
        {
          id: 'WO-2024-012',
          title: 'Electrical Panel Maintenance',
          vendor: 'PowerTech Services',
          property: 'Main Building',
          amount: 850,
          date: '2024-01-15',
          status: 'completed',
          category: 'electrical',
          description: 'Annual electrical panel inspection and maintenance'
        }
      ],
      vendors: [
        { vendorName: 'Bright Electric Co', totalSpent: 22000, workOrderCount: 6, averageAmount: 3667 },
        { vendorName: 'PowerTech Services', totalSpent: 12500, workOrderCount: 15, averageAmount: 833 },
        { vendorName: 'Spark Solutions', totalSpent: 4000, workOrderCount: 8, averageAmount: 500 }
      ],
      properties: [
        { propertyName: 'Office Complex', totalSpent: 20000, workOrderCount: 8, budgetAllocation: 25000 },
        { propertyName: 'Main Building', totalSpent: 12500, workOrderCount: 12, budgetAllocation: 20000 },
        { propertyName: 'Warehouse B', totalSpent: 6000, workOrderCount: 9, budgetAllocation: 15000 }
      ]
    },
    {
      id: 'roofing',
      name: 'Roofing & Exterior',
      annualBudget: 45000,
      monthlyBudget: 3750,
      spentToDate: 28500,
      monthlySpent: 2375,
      remaining: 16500,
      utilizationPercent: 63.3,
      status: 'healthy',
      workOrders: [
        {
          id: 'WO-2024-003',
          title: 'Roof Repair & Waterproofing',
          vendor: 'Summit Roofing Co',
          property: 'Warehouse B',
          amount: 12500,
          date: '2024-01-05',
          status: 'completed',
          category: 'roofing',
          description: 'Roof repair and waterproofing with 5-year warranty'
        }
      ],
      vendors: [
        { vendorName: 'Summit Roofing Co', totalSpent: 18500, workOrderCount: 4, averageAmount: 4625 },
        { vendorName: 'TopShield Roofing', totalSpent: 10000, workOrderCount: 3, averageAmount: 3333 }
      ],
      properties: [
        { propertyName: 'Warehouse B', totalSpent: 18500, workOrderCount: 4, budgetAllocation: 25000 },
        { propertyName: 'Main Building', totalSpent: 10000, workOrderCount: 3, budgetAllocation: 20000 }
      ]
    },
    {
      id: 'cleaning',
      name: 'Cleaning & Janitorial',
      annualBudget: 36000,
      monthlyBudget: 3000,
      spentToDate: 31200,
      monthlySpent: 2600,
      remaining: 4800,
      utilizationPercent: 86.7,
      status: 'warning',
      workOrders: [
        {
          id: 'WO-2024-020',
          title: 'Deep Cleaning - All Floors',
          vendor: 'ProClean Facilities',
          property: 'Office Complex',
          amount: 2400,
          date: '2024-01-22',
          status: 'completed',
          category: 'cleaning',
          description: 'Monthly deep cleaning service for all office floors'
        }
      ],
      vendors: [
        { vendorName: 'ProClean Facilities', totalSpent: 24000, workOrderCount: 12, averageAmount: 2000 },
        { vendorName: 'Sparkle Clean Co', totalSpent: 7200, workOrderCount: 6, averageAmount: 1200 }
      ],
      properties: [
        { propertyName: 'Office Complex', totalSpent: 18000, workOrderCount: 9, budgetAllocation: 20000 },
        { propertyName: 'Main Building', totalSpent: 13200, workOrderCount: 9, budgetAllocation: 16000 }
      ]
    },
    {
      id: 'landscaping',
      name: 'Landscaping & Grounds',
      annualBudget: 24000,
      monthlyBudget: 2000,
      spentToDate: 15600,
      monthlySpent: 1300,
      remaining: 8400,
      utilizationPercent: 65.0,
      status: 'healthy',
      workOrders: [
        {
          id: 'WO-2024-025',
          title: 'Winter Landscaping Maintenance',
          vendor: 'GreenScape Solutions',
          property: 'Office Complex',
          amount: 800,
          date: '2024-01-28',
          status: 'pending',
          category: 'landscaping',
          description: 'Winter pruning and landscape maintenance'
        }
      ],
      vendors: [
        { vendorName: 'GreenScape Solutions', totalSpent: 12000, workOrderCount: 8, averageAmount: 1500 },
        { vendorName: 'Lawn Masters', totalSpent: 3600, workOrderCount: 6, averageAmount: 600 }
      ],
      properties: [
        { propertyName: 'Office Complex', totalSpent: 9600, workOrderCount: 8, budgetAllocation: 14000 },
        { propertyName: 'Main Building', totalSpent: 6000, workOrderCount: 6, budgetAllocation: 10000 }
      ]
    }
  ];

  // Mock Budget Alerts
  const mockBudgetAlerts: BudgetAlert[] = [
    {
      id: 'ALERT-001',
      category: 'Plumbing Systems',
      threshold: 100,
      currentUtilization: 104.3,
      severity: 'critical',
      message: 'Plumbing budget exceeded by $3,200. Immediate review required.',
      timestamp: '2024-01-25 14:30:00',
      acknowledged: false
    },
    {
      id: 'ALERT-002',
      category: 'Cleaning & Janitorial',
      threshold: 80,
      currentUtilization: 86.7,
      severity: 'warning',
      message: 'Cleaning budget at 86.7% utilization. Monitor remaining spend.',
      timestamp: '2024-01-24 09:15:00',
      acknowledged: false
    },
    {
      id: 'ALERT-003',
      category: 'HVAC Systems',
      threshold: 80,
      currentUtilization: 82.1,
      severity: 'warning',
      message: 'HVAC budget at 82.1% utilization. Approaching threshold.',
      timestamp: '2024-01-23 16:45:00',
      acknowledged: true
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'healthy': 'bg-green-500/20 text-green-400 border-green-500/30',
      'warning': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'critical': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'exceeded': 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const getUtilizationColor = (percent: number) => {
    if (percent >= 100) return 'bg-red-500';
    if (percent >= 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const acknowledgeAlert = (alertId: string) => {
    alert(`Alert ${alertId} acknowledged!\n\nAlert has been marked as acknowledged and will be tracked for resolution.`);
  };

  const exportBudgetReport = (type: string) => {
    alert(`📊 ${type} Export Started!\n\nGenerating comprehensive budget report with:\n• Category breakdowns\n• Vendor spending analysis\n• Property allocations\n• Work order details\n\nReport will be available for download shortly.`);
  };

  const filteredCategories = mockBudgetCategories.filter(category => {
    const matchesTrade = selectedTrade === 'all' || category.id === selectedTrade;
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTrade && matchesSearch;
  });

  const totalBudget = mockBudgetCategories.reduce((acc, cat) => acc + cat.annualBudget, 0);
  const totalSpent = mockBudgetCategories.reduce((acc, cat) => acc + cat.spentToDate, 0);
  const totalRemaining = totalBudget - totalSpent;
  const overallUtilization = (totalSpent / totalBudget) * 100;

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Budget Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-xl border border-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-blue-400 font-semibold">Total R&M Budget</h3>
            <Target className="text-blue-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{formatCurrency(totalBudget)}</div>
          <div className="text-sm text-blue-300 mt-1">Annual allocation</div>
        </div>

        <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 p-6 rounded-xl border border-red-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-red-400 font-semibold">Total Spent</h3>
            <TrendingUp className="text-red-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{formatCurrency(totalSpent)}</div>
          <div className="text-sm text-red-300 mt-1">{overallUtilization.toFixed(1)}% utilized</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-6 rounded-xl border border-green-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-green-400 font-semibold">Remaining Budget</h3>
            <DollarSign className="text-green-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{formatCurrency(totalRemaining)}</div>
          <div className="text-sm text-green-300 mt-1">Available to spend</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 p-6 rounded-xl border border-yellow-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-yellow-400 font-semibold">Active Alerts</h3>
            <AlertTriangle className="text-yellow-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">
            {mockBudgetAlerts.filter(a => !a.acknowledged).length}
          </div>
          <div className="text-sm text-yellow-300 mt-1">Require attention</div>
        </div>
      </div>

      {/* Budget Alerts */}
      {showAlerts && mockBudgetAlerts.filter(a => !a.acknowledged).length > 0 && (
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <Bell className="mr-2 text-red-400" size={20} />
              Budget Alerts
            </h3>
            <button
              onClick={() => setShowAlerts(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-3">
            {mockBudgetAlerts.filter(a => !a.acknowledged).map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border ${
                alert.severity === 'critical' ? 'bg-red-500/10 border-red-500/20' : 'bg-yellow-500/10 border-yellow-500/20'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-white">{alert.category}</h4>
                    <p className="text-sm text-gray-400">{new Date(alert.timestamp).toLocaleString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${
                    alert.severity === 'critical' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                  }`}>
                    {alert.currentUtilization.toFixed(1)}%
                  </span>
                </div>
                
                <p className={`mb-3 ${alert.severity === 'critical' ? 'text-red-300' : 'text-yellow-300'}`}>
                  {alert.message}
                </p>
                
                <button
                  onClick={() => acknowledgeAlert(alert.id)}
                  className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Acknowledge
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Visual Budget Tracker */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <BarChart3 className="mr-2 text-teal-400" size={20} />
          Visual Budget Tracker by Trade
        </h3>
        
        <div className="space-y-6">
          {filteredCategories.map((category) => (
            <div key={category.id} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h4 className="text-white font-semibold">{category.name}</h4>
                  <p className="text-gray-400 text-sm">
                    {formatCurrency(category.spentToDate)} of {formatCurrency(category.annualBudget)}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(category.status)}`}>
                    {category.utilizationPercent.toFixed(1)}%
                  </span>
                  <button
                    onClick={() => setSelectedCategory(category.id)}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    <Eye size={14} className="inline mr-1" />
                    Details
                  </button>
                </div>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
                <div 
                  className={`h-4 rounded-full transition-all duration-500 ${getUtilizationColor(category.utilizationPercent)}`}
                  style={{ width: `${Math.min(category.utilizationPercent, 100)}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Remaining: {formatCurrency(category.remaining)}</span>
                <span className="text-gray-400">{category.workOrders.length} work orders</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCategoryDetail = () => {
    const category = mockBudgetCategories.find(c => c.id === selectedCategory);
    if (!category) return null;

    return (
      <div className="space-y-6">
        <div className="flex justify-end">
          <button
            onClick={() => exportBudgetReport(`${category.name} Detail Report`)}
            className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
          >
            <Download size={16} />
            <span>Export Report</span>
          </button>
        </div>

        {/* Category Header */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">{category.name}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>Annual Budget: {formatCurrency(category.annualBudget)}</span>
                <span>•</span>
                <span>Monthly Budget: {formatCurrency(category.monthlyBudget)}</span>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-lg font-medium border ${getStatusColor(category.status)}`}>
              {category.utilizationPercent.toFixed(1)}%
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/20">
              <div className="text-2xl font-bold text-red-400">{formatCurrency(category.spentToDate)}</div>
              <div className="text-sm text-red-300">Total Spent</div>
            </div>
            <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">{formatCurrency(category.remaining)}</div>
              <div className="text-sm text-green-300">Remaining</div>
            </div>
            <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">{category.workOrders.length}</div>
              <div className="text-sm text-blue-300">Work Orders</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="w-full bg-gray-700 rounded-full h-6">
              <div 
                className={`h-6 rounded-full transition-all duration-500 ${getUtilizationColor(category.utilizationPercent)}`}
                style={{ width: `${Math.min(category.utilizationPercent, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>0%</span>
              <span className="text-yellow-400">80% Warning</span>
              <span className="text-red-400">100% Critical</span>
            </div>
          </div>
        </div>

        {/* Work Orders Drilldown */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Wrench className="mr-2 text-teal-400" size={20} />
            Work Orders Breakdown
          </h3>
          
          <div className="space-y-3">
            {category.workOrders.map((wo) => (
              <div key={wo.id} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-white">{wo.title}</h4>
                    <p className="text-gray-400 text-sm">{wo.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-teal-400">{formatCurrency(wo.amount)}</div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      wo.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      wo.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {wo.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>Vendor: {wo.vendor}</span>
                  <span>Property: {wo.property}</span>
                  <span>Date: {new Date(wo.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Back Button in Work Orders Section */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className="bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900"
            >
              ← Back to Budget Overview
            </button>
          </div>
        </div>

        {/* Vendor Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Users className="mr-2 text-teal-400" size={20} />
              Vendor Spending
            </h3>
            
            <div className="space-y-3">
              {category.vendors.map((vendor, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-700/20 rounded">
                  <div>
                    <div className="font-semibold text-white">{vendor.vendorName}</div>
                    <div className="text-sm text-gray-400">{vendor.workOrderCount} work orders</div>
                  </div>
                  <div className="text-right">
                    <div className="text-teal-400 font-semibold">{formatCurrency(vendor.totalSpent)}</div>
                    <div className="text-xs text-gray-400">Avg: {formatCurrency(vendor.averageAmount)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Building className="mr-2 text-teal-400" size={20} />
              Property Allocation
            </h3>
            
            <div className="space-y-3">
              {category.properties.map((property, index) => (
                <div key={index} className="p-3 bg-gray-700/20 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-semibold text-white">{property.propertyName}</div>
                    <div className="text-teal-400 font-semibold">{formatCurrency(property.totalSpent)}</div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-teal-500 h-2 rounded-full"
                      style={{ width: `${(property.totalSpent / property.budgetAllocation) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{property.workOrderCount} work orders</span>
                    <span>Budget: {formatCurrency(property.budgetAllocation)}</span>
                  </div>
                </div>
              ))}
            </div>
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
              <h1 className="text-2xl font-semibold">R&M Budget Tracking System</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">Real-Time Budget Monitoring</span>
                <span className="text-xs text-gray-400">• Auto-Alerts • Visual Analytics</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => navigate(-1)}
            className="bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900"
          >
            ← Back to Previous Page
          </button>
        </div>
        <div className="mt-4 text-xs text-gray-400 bg-slate-900/50 p-2 rounded border border-gray-700/30">
          <strong className="text-teal-400">Client Feature:</strong> This R&M budget tracker provides clients with comprehensive visibility into repair & maintenance spending with visual progress bars, auto-alerts at 80%/100% thresholds, and detailed drilldown capabilities by trade, vendor, and property.
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
              />
            </div>
            <select
              value={selectedTrade}
              onChange={(e) => setSelectedTrade(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
            >
              <option value="all">All Trades</option>
              <option value="hvac">HVAC Systems</option>
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="roofing">Roofing</option>
              <option value="cleaning">Cleaning</option>
              <option value="landscaping">Landscaping</option>
            </select>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
            >
              <option value="monthly">Monthly View</option>
              <option value="quarterly">Quarterly View</option>
              <option value="annual">Annual View</option>
            </select>
          </div>
          <button
            onClick={() => exportBudgetReport('Complete R&M Budget Report')}
            className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
          >
            <Download size={16} />
            <span>Export Report</span>
          </button>
        </div>

        {/* Content */}
        {selectedCategory ? renderCategoryDetail() : renderOverview()}
      </div>
    </div>
  );
};

export default RMBudgetTracker;