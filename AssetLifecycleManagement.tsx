import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Package, DollarSign, AlertTriangle, QrCode, 
  Calendar, FileText, Wrench, Shield, TrendingUp,
  Search, Filter, Eye, Download, Plus, Edit, Trash2
} from 'lucide-react';
import Logo from './Logo';

interface Asset {
  id: string;
  name: string;
  category: 'HVAC' | 'Plumbing' | 'Electrical' | 'Security' | 'Elevator' | 'General';
  manufacturer: string;
  model: string;
  serialNumber: string;
  location: string;
  purchaseDate: string;
  purchasePrice: number;
  currentValue: number;
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';
  warrantyExpiration?: string;
  warrantyProvider?: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
  qrCode: string;
  status: 'Active' | 'Maintenance' | 'Retired' | 'Disposed';
}

const AssetLifecycleManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock asset data
  const mockAssets: Asset[] = [
    {
      id: 'AST-001',
      name: 'Main HVAC Unit - Building A',
      category: 'HVAC',
      manufacturer: 'Carrier',
      model: 'WeatherExpert 48TCED',
      serialNumber: 'CV48001234',
      location: 'Building A - Rooftop',
      purchaseDate: '2020-03-15',
      purchasePrice: 45000,
      currentValue: 31500,
      condition: 'Good',
      warrantyExpiration: '2025-03-15',
      warrantyProvider: 'Carrier Corporation',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-04-15',
      qrCode: 'QR-AST-001',
      status: 'Active'
    },
    {
      id: 'AST-002',
      name: 'Emergency Generator',
      category: 'Electrical',
      manufacturer: 'Generac',
      model: 'RG027',
      serialNumber: 'GN027-5678',
      location: 'Building A - Basement',
      purchaseDate: '2019-08-20',
      purchasePrice: 25000,
      currentValue: 15000,
      condition: 'Excellent',
      warrantyExpiration: '2024-08-20',
      warrantyProvider: 'Generac Power Systems',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-07-10',
      qrCode: 'QR-AST-002',
      status: 'Active'
    },
    {
      id: 'AST-003',
      name: 'Main Water Heater',
      category: 'Plumbing',
      manufacturer: 'Rheem',
      model: 'G100-80',
      serialNumber: 'RH100-9876',
      location: 'Building A - Mechanical Room',
      purchaseDate: '2021-06-10',
      purchasePrice: 8500,
      currentValue: 6800,
      condition: 'Good',
      warrantyExpiration: '2031-06-10',
      warrantyProvider: 'Rheem Manufacturing',
      lastMaintenance: '2024-01-05',
      nextMaintenance: '2024-07-05',
      qrCode: 'QR-AST-003',
      status: 'Active'
    }
  ];

  const getConditionColor = (condition: string) => {
    const colors = {
      'Excellent': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Good': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Fair': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Poor': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Critical': 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return colors[condition as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const generateQRCode = (assetId: string) => {
    alert(`QR Code generated for asset ${assetId}!\n\nQR Code: QR-${assetId}\nThis QR code can be printed and attached to the asset for easy scanning and tracking.`);
  };

  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || asset.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const totalValue = mockAssets.reduce((sum, asset) => sum + asset.currentValue, 0);
  const warrantyAlerts = mockAssets.filter(asset => {
    if (!asset.warrantyExpiration) return false;
    const expDate = new Date(asset.warrantyExpiration);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 90 && daysUntilExpiry > 0;
  }).length;

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-xl border border-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-blue-400 font-semibold">Total Assets</h3>
            <Package className="text-blue-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{mockAssets.length}</div>
          <div className="text-sm text-blue-300 mt-1">Tracked assets</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-6 rounded-xl border border-green-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-green-400 font-semibold">Total Value</h3>
            <DollarSign className="text-green-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{formatCurrency(totalValue)}</div>
          <div className="text-sm text-green-300 mt-1">Current book value</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 p-6 rounded-xl border border-yellow-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-yellow-400 font-semibold">Warranty Alerts</h3>
            <AlertTriangle className="text-yellow-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{warrantyAlerts}</div>
          <div className="text-sm text-yellow-300 mt-1">Expiring soon</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-6 rounded-xl border border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-purple-400 font-semibold">QR Scans</h3>
            <QrCode className="text-purple-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">1,247</div>
          <div className="text-sm text-purple-300 mt-1">This month</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Asset Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <Wrench className="text-green-400" size={20} />
            <div>
              <div className="text-white font-medium">Maintenance completed on Main HVAC Unit</div>
              <div className="text-gray-400 text-sm">2 hours ago • Arctic Air Solutions</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <QrCode className="text-blue-400" size={20} />
            <div>
              <div className="text-white font-medium">QR Code scanned for Emergency Generator</div>
              <div className="text-gray-400 text-sm">4 hours ago • Maintenance Technician</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <AlertTriangle className="text-yellow-400" size={20} />
            <div>
              <div className="text-white font-medium">Warranty expiring soon for Emergency Generator</div>
              <div className="text-gray-400 text-sm">1 day ago • System Alert</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAssetRegistry = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Categories</option>
            <option value="HVAC">HVAC</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Security">Security</option>
            <option value="Elevator">Elevator</option>
            <option value="General">General</option>
          </select>
        </div>
        <button className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold">
          <Plus size={16} />
          <span>Add Asset</span>
        </button>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => (
          <div key={asset.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30 hover:border-teal-500/50 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-white font-semibold mb-1">{asset.name}</h4>
                <p className="text-gray-400 text-sm">{asset.manufacturer} {asset.model}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium border ${getConditionColor(asset.condition)}`}>
                {asset.condition}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Location:</span>
                <span className="text-white">{asset.location}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Current Value:</span>
                <span className="text-teal-400 font-medium">{formatCurrency(asset.currentValue)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Warranty:</span>
                <span className="text-white">
                  {asset.warrantyExpiration ? new Date(asset.warrantyExpiration).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => generateQRCode(asset.id)}
                className="flex items-center space-x-1 bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                <QrCode size={14} />
                <span>QR Code</span>
              </button>
              <button
                onClick={() => setSelectedAsset(asset.id)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                <Eye size={14} className="inline mr-1" />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAssetDetails = () => {
    const asset = mockAssets.find(a => a.id === selectedAsset);
    if (!asset) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedAsset(null)}
            className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors"
          >
            <Home size={20} />
            <span>Back to Registry</span>
          </button>
          <div className="flex items-center space-x-2">
            <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors">
              <Edit size={16} className="inline mr-2" />
              Edit Asset
            </button>
            <button
              onClick={() => generateQRCode(asset.id)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <QrCode size={16} className="inline mr-2" />
              Generate QR
            </button>
          </div>
        </div>

        {/* Asset Header */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">{asset.name}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>ID: {asset.id}</span>
                <span>•</span>
                <span>Serial: {asset.serialNumber}</span>
                <span>•</span>
                <span>QR: {asset.qrCode}</span>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getConditionColor(asset.condition)}`}>
              {asset.condition}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="text-lg font-bold text-blue-400">{formatCurrency(asset.purchasePrice)}</div>
              <div className="text-xs text-blue-300">Purchase Price</div>
            </div>
            <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="text-lg font-bold text-green-400">{formatCurrency(asset.currentValue)}</div>
              <div className="text-xs text-green-300">Current Value</div>
            </div>
            <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="text-lg font-bold text-purple-400">{asset.category}</div>
              <div className="text-xs text-purple-300">Category</div>
            </div>
            <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <div className="text-lg font-bold text-yellow-400">
                {asset.warrantyExpiration ? new Date(asset.warrantyExpiration).toLocaleDateString() : 'N/A'}
              </div>
              <div className="text-xs text-yellow-300">Warranty Expires</div>
            </div>
          </div>
        </div>

        {/* Asset Details */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <h3 className="text-xl font-semibold text-white mb-4">Asset Information</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <span className="text-gray-400">Manufacturer:</span>
                <p className="text-white">{asset.manufacturer}</p>
              </div>
              <div>
                <span className="text-gray-400">Model:</span>
                <p className="text-white">{asset.model}</p>
              </div>
              <div>
                <span className="text-gray-400">Location:</span>
                <p className="text-white">{asset.location}</p>
              </div>
              <div>
                <span className="text-gray-400">Purchase Date:</span>
                <p className="text-white">{new Date(asset.purchaseDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-gray-400">Status:</span>
                <p className="text-white">{asset.status}</p>
              </div>
              <div>
                <span className="text-gray-400">Warranty Provider:</span>
                <p className="text-white">{asset.warrantyProvider || 'N/A'}</p>
              </div>
              <div>
                <span className="text-gray-400">Last Maintenance:</span>
                <p className="text-white">
                  {asset.lastMaintenance ? new Date(asset.lastMaintenance).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <span className="text-gray-400">Next Maintenance:</span>
                <p className="text-white">
                  {asset.nextMaintenance ? new Date(asset.nextMaintenance).toLocaleDateString() : 'N/A'}
                </p>
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
              <h1 className="text-2xl font-semibold">Asset Lifecycle Management</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">QR Tracking • Warranty Management • Depreciation Monitoring</span>
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
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
            { id: 'registry', label: 'Asset Registry', icon: Package }
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
        {selectedAsset ? renderAssetDetails() : (
          <>
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'registry' && renderAssetRegistry()}
          </>
        )}
      </div>
    </div>
  );
};

export default AssetLifecycleManagement;