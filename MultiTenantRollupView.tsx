import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Building, TrendingUp, DollarSign, BarChart3, 
  Users, MapPin, Calendar, Eye, Download, Filter,
  Search, AlertTriangle, CheckCircle, Clock, Target
} from 'lucide-react';
import Logo from './Logo';

interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  type: 'Office' | 'Retail' | 'Industrial' | 'Mixed Use' | 'Warehouse';
  squareFootage: number;
  yearBuilt: number;
  tenantCount: number;
  occupancyRate: number;
  monthlyRevenue: number;
  operatingExpenses: number;
  maintenanceCosts: number;
  energyCosts: number;
  managementCompany: string;
  propertyManager: string;
  lastInspection: string;
  workOrdersThisMonth: number;
  emergencyCallsThisMonth: number;
  tenantSatisfactionScore: number;
  maintenanceCompliance: number;
  budgetVariance: number;
  status: 'Excellent' | 'Good' | 'Fair' | 'Needs Attention' | 'Critical';
}

interface PortfolioSummary {
  totalProperties: number;
  totalSquareFootage: number;
  totalRevenue: number;
  totalOperatingExpenses: number;
  totalMaintenanceCosts: number;
  averageOccupancy: number;
  averageTenantSatisfaction: number;
  totalWorkOrders: number;
  totalEmergencyCalls: number;
  portfolioNOI: number;
}

const MultiTenantRollupView = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('portfolio');
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  // Mock portfolio properties data
  const mockProperties: Property[] = [
    {
      id: 'PROP-001',
      name: 'Metro Office Tower',
      address: '123 Business Ave',
      city: 'Oklahoma City',
      state: 'OK',
      type: 'Office',
      squareFootage: 450000,
      yearBuilt: 2018,
      tenantCount: 45,
      occupancyRate: 94,
      monthlyRevenue: 285000,
      operatingExpenses: 125000,
      maintenanceCosts: 18500,
      energyCosts: 22000,
      managementCompany: 'Premier Property Management',
      propertyManager: 'Sarah Johnson',
      lastInspection: '2024-01-15',
      workOrdersThisMonth: 12,
      emergencyCallsThisMonth: 2,
      tenantSatisfactionScore: 4.6,
      maintenanceCompliance: 96,
      budgetVariance: -8.5,
      status: 'Excellent'
    },
    {
      id: 'PROP-002',
      name: 'Riverside Shopping Center',
      address: '456 Commerce Blvd',
      city: 'Tulsa',
      state: 'OK',
      type: 'Retail',
      squareFootage: 280000,
      yearBuilt: 2015,
      tenantCount: 28,
      occupancyRate: 87,
      monthlyRevenue: 195000,
      operatingExpenses: 89000,
      maintenanceCosts: 15200,
      energyCosts: 18500,
      managementCompany: 'Retail Realty Group',
      propertyManager: 'Mike Chen',
      lastInspection: '2024-01-10',
      workOrdersThisMonth: 18,
      emergencyCallsThisMonth: 1,
      tenantSatisfactionScore: 4.2,
      maintenanceCompliance: 89,
      budgetVariance: 12.3,
      status: 'Good'
    },
    {
      id: 'PROP-003',
      name: 'Industrial Park West',
      address: '789 Industrial Way',
      city: 'Norman',
      state: 'OK',
      type: 'Industrial',
      squareFootage: 650000,
      yearBuilt: 2012,
      tenantCount: 8,
      occupancyRate: 100,
      monthlyRevenue: 165000,
      operatingExpenses: 68000,
      maintenanceCosts: 22000,
      energyCosts: 15000,
      managementCompany: 'Industrial Properties LLC',
      propertyManager: 'David Rodriguez',
      lastInspection: '2024-01-08',
      workOrdersThisMonth: 8,
      emergencyCallsThisMonth: 0,
      tenantSatisfactionScore: 4.8,
      maintenanceCompliance: 98,
      budgetVariance: -5.2,
      status: 'Excellent'
    },
    {
      id: 'PROP-004',
      name: 'Downtown Mixed Use Complex',
      address: '321 Urban Plaza',
      city: 'Oklahoma City',
      state: 'OK',
      type: 'Mixed Use',
      squareFootage: 380000,
      yearBuilt: 2020,
      tenantCount: 52,
      occupancyRate: 91,
      monthlyRevenue: 245000,
      operatingExpenses: 115000,
      maintenanceCosts: 16800,
      energyCosts: 19500,
      managementCompany: 'Urban Development Corp',
      propertyManager: 'Emily Rodriguez',
      lastInspection: '2024-01-12',
      workOrdersThisMonth: 15,
      emergencyCallsThisMonth: 3,
      tenantSatisfactionScore: 4.4,
      maintenanceCompliance: 92,
      budgetVariance: 6.8,
      status: 'Good'
    },
    {
      id: 'PROP-005',
      name: 'Logistics Center East',
      address: '555 Distribution Dr',
      city: 'Edmond',
      state: 'OK',
      type: 'Warehouse',
      squareFootage: 850000,
      yearBuilt: 2010,
      tenantCount: 3,
      occupancyRate: 85,
      monthlyRevenue: 125000,
      operatingExpenses: 52000,
      maintenanceCosts: 28500,
      energyCosts: 12000,
      managementCompany: 'Logistics Realty Partners',
      propertyManager: 'Tom Wilson',
      lastInspection: '2023-12-20',
      workOrdersThisMonth: 25,
      emergencyCallsThisMonth: 4,
      tenantSatisfactionScore: 3.8,
      maintenanceCompliance: 78,
      budgetVariance: 18.7,
      status: 'Needs Attention'
    },
    {
      id: 'PROP-006',
      name: 'Heritage Office Park',
      address: '888 Corporate Way',
      city: 'Broken Arrow',
      state: 'OK',
      type: 'Office',
      squareFootage: 320000,
      yearBuilt: 2008,
      tenantCount: 35,
      occupancyRate: 78,
      monthlyRevenue: 185000,
      operatingExpenses: 95000,
      maintenanceCosts: 32000,
      energyCosts: 25000,
      managementCompany: 'Heritage Property Group',
      propertyManager: 'Lisa Anderson',
      lastInspection: '2023-11-15',
      workOrdersThisMonth: 35,
      emergencyCallsThisMonth: 6,
      tenantSatisfactionScore: 3.5,
      maintenanceCompliance: 72,
      budgetVariance: 28.4,
      status: 'Critical'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'Excellent': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Good': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Fair': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Needs Attention': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Critical': 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatSquareFootage = (sqft: number) => {
    return new Intl.NumberFormat('en-US').format(sqft);
  };

  const calculatePortfolioSummary = (): PortfolioSummary => {
    return {
      totalProperties: mockProperties.length,
      totalSquareFootage: mockProperties.reduce((acc, prop) => acc + prop.squareFootage, 0),
      totalRevenue: mockProperties.reduce((acc, prop) => acc + prop.monthlyRevenue, 0),
      totalOperatingExpenses: mockProperties.reduce((acc, prop) => acc + prop.operatingExpenses, 0),
      totalMaintenanceCosts: mockProperties.reduce((acc, prop) => acc + prop.maintenanceCosts, 0),
      averageOccupancy: mockProperties.reduce((acc, prop) => acc + prop.occupancyRate, 0) / mockProperties.length,
      averageTenantSatisfaction: mockProperties.reduce((acc, prop) => acc + prop.tenantSatisfactionScore, 0) / mockProperties.length,
      totalWorkOrders: mockProperties.reduce((acc, prop) => acc + prop.workOrdersThisMonth, 0),
      totalEmergencyCalls: mockProperties.reduce((acc, prop) => acc + prop.emergencyCallsThisMonth, 0),
      portfolioNOI: mockProperties.reduce((acc, prop) => acc + (prop.monthlyRevenue - prop.operatingExpenses), 0)
    };
  };

  const filteredProperties = mockProperties.filter(property => {
    const matchesType = filterType === 'all' || property.type === filterType;
    const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const portfolioSummary = calculatePortfolioSummary();

  const renderPortfolioOverview = () => (
    <div className="space-y-6">
      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-xl border border-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-blue-400 font-semibold">Total Properties</h3>
            <Building className="text-blue-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{portfolioSummary.totalProperties}</div>
          <div className="text-sm text-blue-300 mt-1">{formatSquareFootage(portfolioSummary.totalSquareFootage)} sq ft</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-6 rounded-xl border border-green-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-green-400 font-semibold">Monthly Revenue</h3>
            <DollarSign className="text-green-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{formatCurrency(portfolioSummary.totalRevenue)}</div>
          <div className="text-sm text-green-300 mt-1">Portfolio total</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-6 rounded-xl border border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-purple-400 font-semibold">Portfolio NOI</h3>
            <TrendingUp className="text-purple-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{formatCurrency(portfolioSummary.portfolioNOI)}</div>
          <div className="text-sm text-purple-300 mt-1">Net operating income</div>
        </div>

        <div className="bg-gradient-to-br from-teal-500/10 to-teal-600/10 p-6 rounded-xl border border-teal-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-teal-400 font-semibold">Avg Occupancy</h3>
            <Users className="text-teal-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{portfolioSummary.averageOccupancy.toFixed(1)}%</div>
          <div className="text-sm text-teal-300 mt-1">Across all properties</div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-6">Portfolio Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">{portfolioSummary.totalWorkOrders}</div>
            <div className="text-sm text-blue-300">Work Orders This Month</div>
            <div className="text-xs text-gray-400 mt-1">Across all properties</div>
          </div>
          <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <div className="text-2xl font-bold text-yellow-400">{portfolioSummary.totalEmergencyCalls}</div>
            <div className="text-sm text-yellow-300">Emergency Calls</div>
            <div className="text-xs text-gray-400 mt-1">This month</div>
          </div>
          <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">{portfolioSummary.averageTenantSatisfaction.toFixed(1)}</div>
            <div className="text-sm text-green-300">Avg Tenant Satisfaction</div>
            <div className="text-xs text-gray-400 mt-1">Out of 5.0</div>
          </div>
        </div>
      </div>

      {/* Property Status Overview */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-6">Property Status Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {['Excellent', 'Good', 'Fair', 'Needs Attention', 'Critical'].map((status) => {
            const count = mockProperties.filter(p => p.status === status).length;
            const percentage = (count / mockProperties.length) * 100;
            return (
              <div key={status} className="text-center p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
                <div className={`text-2xl font-bold ${
                  status === 'Excellent' ? 'text-green-400' :
                  status === 'Good' ? 'text-blue-400' :
                  status === 'Fair' ? 'text-yellow-400' :
                  status === 'Needs Attention' ? 'text-orange-400' :
                  'text-red-400'
                }`}>
                  {count}
                </div>
                <div className="text-sm text-gray-300">{status}</div>
                <div className="text-xs text-gray-400">{percentage.toFixed(0)}%</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Performers & Concerns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <h3 className="text-lg font-semibold text-white mb-4">Top Performing Properties</h3>
          <div className="space-y-3">
            {mockProperties
              .filter(p => p.status === 'Excellent')
              .slice(0, 3)
              .map((property) => (
                <div key={property.id} className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white font-medium">{property.name}</div>
                      <div className="text-green-400 text-sm">{property.occupancyRate}% occupied • {property.tenantSatisfactionScore}/5 satisfaction</div>
                    </div>
                    <div className="text-green-400 font-semibold">{formatCurrency(property.monthlyRevenue)}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <h3 className="text-lg font-semibold text-white mb-4">Properties Requiring Attention</h3>
          <div className="space-y-3">
            {mockProperties
              .filter(p => p.status === 'Needs Attention' || p.status === 'Critical')
              .map((property) => (
                <div key={property.id} className={`p-3 rounded-lg border ${
                  property.status === 'Critical' ? 'bg-red-500/10 border-red-500/20' : 'bg-orange-500/10 border-orange-500/20'
                }`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white font-medium">{property.name}</div>
                      <div className={`text-sm ${property.status === 'Critical' ? 'text-red-400' : 'text-orange-400'}`}>
                        {property.workOrdersThisMonth} work orders • {property.emergencyCallsThisMonth} emergencies
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(property.status)}`}>
                      {property.status}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPropertyDetails = () => (
    <div className="space-y-6">
      {/* Filters and View Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search properties..."
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
            <option value="all">All Types</option>
            <option value="Office">Office</option>
            <option value="Retail">Retail</option>
            <option value="Industrial">Industrial</option>
            <option value="Mixed Use">Mixed Use</option>
            <option value="Warehouse">Warehouse</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Status</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Needs Attention">Needs Attention</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              viewMode === 'grid' ? 'bg-teal-500 text-white' : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              viewMode === 'list' ? 'bg-teal-500 text-white' : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Properties Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div key={property.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30 hover:border-teal-500/50 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-white font-semibold mb-1">{property.name}</h4>
                  <p className="text-gray-400 text-sm">{property.address}, {property.city}, {property.state}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(property.status)}`}>
                  {property.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-lg font-bold text-blue-400">{property.occupancyRate}%</div>
                  <div className="text-xs text-blue-300">Occupancy</div>
                </div>
                <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="text-lg font-bold text-green-400">{formatCurrency(property.monthlyRevenue)}</div>
                  <div className="text-xs text-green-300">Monthly Revenue</div>
                </div>
                <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="text-lg font-bold text-purple-400">{property.tenantCount}</div>
                  <div className="text-xs text-purple-300">Tenants</div>
                </div>
                <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="text-lg font-bold text-yellow-400">{property.workOrdersThisMonth}</div>
                  <div className="text-xs text-yellow-300">Work Orders</div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  <span>{formatSquareFootage(property.squareFootage)} sq ft</span>
                  <span className="mx-2">•</span>
                  <span>{property.type}</span>
                </div>
                <button
                  onClick={() => setSelectedProperty(property.id)}
                  className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  <Eye size={14} className="inline mr-1" />
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <div key={property.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30 hover:border-teal-500/50 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-white mb-2">{property.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                    <span>{property.address}, {property.city}, {property.state}</span>
                    <span>•</span>
                    <span>{property.type}</span>
                    <span>•</span>
                    <span>{formatSquareFootage(property.squareFootage)} sq ft</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Manager: {property.propertyManager}</span>
                    <span>•</span>
                    <span>Built: {property.yearBuilt}</span>
                    <span>•</span>
                    <span>Last Inspection: {new Date(property.lastInspection).toLocaleDateString()}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(property.status)}`}>
                  {property.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-lg font-bold text-blue-400">{property.occupancyRate}%</div>
                  <div className="text-xs text-blue-300">Occupancy</div>
                </div>
                <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="text-lg font-bold text-green-400">{formatCurrency(property.monthlyRevenue)}</div>
                  <div className="text-xs text-green-300">Revenue</div>
                </div>
                <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="text-lg font-bold text-purple-400">{property.tenantSatisfactionScore}</div>
                  <div className="text-xs text-purple-300">Satisfaction</div>
                </div>
                <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="text-lg font-bold text-yellow-400">{property.workOrdersThisMonth}</div>
                  <div className="text-xs text-yellow-300">Work Orders</div>
                </div>
                <div className="text-center p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                  <div className="text-lg font-bold text-red-400">{property.emergencyCallsThisMonth}</div>
                  <div className="text-xs text-red-300">Emergencies</div>
                </div>
                <div className="text-center p-3 bg-teal-500/10 rounded-lg border border-teal-500/20">
                  <div className={`text-lg font-bold ${property.budgetVariance < 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {property.budgetVariance > 0 ? '+' : ''}{property.budgetVariance.toFixed(1)}%
                  </div>
                  <div className="text-xs text-teal-300">Budget Var</div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>NOI: {formatCurrency(property.monthlyRevenue - property.operatingExpenses)}</span>
                  <span>•</span>
                  <span>Maintenance: {formatCurrency(property.maintenanceCosts)}</span>
                  <span>•</span>
                  <span>Compliance: {property.maintenanceCompliance}%</span>
                </div>
                <button
                  onClick={() => setSelectedProperty(property.id)}
                  className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Eye size={16} className="inline mr-1" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderPropertyDetail = () => {
    const property = mockProperties.find(p => p.id === selectedProperty);
    if (!property) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedProperty(null)}
            className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors"
          >
            <Home size={20} />
            <span>Back to Portfolio</span>
          </button>
          <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold">
            <Download size={16} className="inline mr-2" />
            Export Property Report
          </button>
        </div>

        {/* Property Header */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">{property.name}</h2>
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="text-gray-400" size={16} />
                <span className="text-gray-400">{property.address}, {property.city}, {property.state}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Property ID: {property.id}</span>
                <span>•</span>
                <span>Type: {property.type}</span>
                <span>•</span>
                <span>Built: {property.yearBuilt}</span>
                <span>•</span>
                <span>Size: {formatSquareFootage(property.squareFootage)} sq ft</span>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(property.status)}`}>
              {property.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="text-lg font-bold text-blue-400">{property.occupancyRate}%</div>
              <div className="text-xs text-blue-300">Occupancy Rate</div>
            </div>
            <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="text-lg font-bold text-green-400">{formatCurrency(property.monthlyRevenue)}</div>
              <div className="text-xs text-green-300">Monthly Revenue</div>
            </div>
            <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="text-lg font-bold text-purple-400">{property.tenantCount}</div>
              <div className="text-xs text-purple-300">Total Tenants</div>
            </div>
            <div className="text-center p-3 bg-teal-500/10 rounded-lg border border-teal-500/20">
              <div className="text-lg font-bold text-teal-400">{property.tenantSatisfactionScore}</div>
              <div className="text-xs text-teal-300">Satisfaction Score</div>
            </div>
          </div>
        </div>

        {/* Financial Performance */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <h3 className="text-xl font-semibold text-white mb-4">Financial Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-green-400 mb-3">Revenue & NOI</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Monthly Revenue:</span>
                  <span className="text-white font-semibold">{formatCurrency(property.monthlyRevenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Operating Expenses:</span>
                  <span className="text-white font-semibold">{formatCurrency(property.operatingExpenses)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-700 pt-2">
                  <span className="text-gray-400">Net Operating Income:</span>
                  <span className="text-green-400 font-semibold">{formatCurrency(property.monthlyRevenue - property.operatingExpenses)}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-blue-400 mb-3">Operating Costs</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Maintenance Costs:</span>
                  <span className="text-white font-semibold">{formatCurrency(property.maintenanceCosts)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Energy Costs:</span>
                  <span className="text-white font-semibold">{formatCurrency(property.energyCosts)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-700 pt-2">
                  <span className="text-gray-400">Budget Variance:</span>
                  <span className={`font-semibold ${property.budgetVariance < 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {property.budgetVariance > 0 ? '+' : ''}{property.budgetVariance.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Operations & Maintenance */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <h3 className="text-xl font-semibold text-white mb-4">Operations & Maintenance</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <div className="text-2xl font-bold text-yellow-400">{property.workOrdersThisMonth}</div>
              <div className="text-sm text-yellow-300">Work Orders This Month</div>
            </div>
            <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/20">
              <div className="text-2xl font-bold text-red-400">{property.emergencyCallsThisMonth}</div>
              <div className="text-sm text-red-300">Emergency Calls</div>
            </div>
            <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">{property.maintenanceCompliance}%</div>
              <div className="text-sm text-green-300">Maintenance Compliance</div>
            </div>
          </div>
        </div>

        {/* Management Information */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <h3 className="text-xl font-semibold text-white mb-4">Management Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-teal-400 mb-3">Property Management</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Management Company:</span>
                  <span className="text-white">{property.managementCompany}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Property Manager:</span>
                  <span className="text-white">{property.propertyManager}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Inspection:</span>
                  <span className="text-white">{new Date(property.lastInspection).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-teal-400 mb-3">Property Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Property Type:</span>
                  <span className="text-white">{property.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Year Built:</span>
                  <span className="text-white">{property.yearBuilt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Square Footage:</span>
                  <span className="text-white">{formatSquareFootage(property.squareFootage)}</span>
                </div>
              </div>
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
              <h1 className="text-2xl font-semibold">Multi-Tenant Portfolio Rollup View</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">REIT Management • Corporate Portfolios • Multi-Property Analytics</span>
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
          <strong className="text-teal-400">Portfolio Management:</strong> Comprehensive multi-tenant rollup view for REITs and corporate portfolios with property-level performance metrics, financial analysis, and operational insights across entire property portfolios.
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { id: 'portfolio', label: 'Portfolio Overview', icon: BarChart3 },
            { id: 'properties', label: 'Property Details', icon: Building }
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
        {selectedProperty ? renderPropertyDetail() : (
          <>
            {activeTab === 'portfolio' && renderPortfolioOverview()}
            {activeTab === 'properties' && renderPropertyDetails()}
          </>
        )}
      </div>
    </div>
  );
};

export default MultiTenantRollupView;