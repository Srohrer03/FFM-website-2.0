import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Thermometer, Droplets, Wind, Zap, AlertTriangle, CheckCircle, 
  Activity, TrendingUp, TrendingDown, Wifi, WifiOff, Settings, 
  Calendar, Clock, FileText, Bell, Filter, Search, Download,
  BarChart3, LineChart, PieChart, RefreshCw, MapPin, Building,
  Wrench, Eye, X, Plus, Edit, Trash2, Power, PowerOff
} from 'lucide-react';
import Logo from './Logo';

interface IoTDevice {
  id: string;
  name: string;
  type: 'hvac' | 'leak_detector' | 'air_quality' | 'smart_meter' | 'temperature' | 'humidity' | 'security';
  location: string;
  building: string;
  status: 'online' | 'offline' | 'warning' | 'critical' | 'maintenance';
  lastReading: {
    value: number;
    unit: string;
    timestamp: string;
  };
  thresholds: {
    min: number;
    max: number;
    critical_min: number;
    critical_max: number;
  };
  battery?: number;
  connectivity: 'wifi' | 'ethernet' | 'cellular' | 'lora';
  signalStrength: number;
  alerts: IoTAlert[];
  historicalData: HistoricalReading[];
  maintenanceSchedule?: {
    lastMaintenance: string;
    nextMaintenance: string;
    frequency: string;
  };
}

interface IoTAlert {
  id: string;
  deviceId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: 'threshold' | 'offline' | 'battery' | 'maintenance' | 'anomaly';
  message: string;
  timestamp: string;
  acknowledged: boolean;
  autoWorkOrder?: string;
  resolvedAt?: string;
}

interface HistoricalReading {
  timestamp: string;
  value: number;
  status: string;
}

interface WorkOrderGeneration {
  alertId: string;
  workOrderId: string;
  deviceName: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  assignedVendor: string;
  estimatedCost: number;
  createdAt: string;
}

const IoTMonitoringSystem = () => {
  const navigate = useNavigate();
  const [selectedBuilding, setSelectedBuilding] = useState('all');
  const [selectedDeviceType, setSelectedDeviceType] = useState('all');
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [alertFilter, setAlertFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Mock IoT devices data
  const mockDevices: IoTDevice[] = [
    {
      id: 'HVAC-001',
      name: 'Main HVAC Unit - Zone A',
      type: 'hvac',
      location: 'Mechanical Room A',
      building: 'Main Building',
      status: 'warning',
      lastReading: {
        value: 72.5,
        unit: '°F',
        timestamp: '2024-01-15 14:23:00'
      },
      thresholds: {
        min: 68,
        max: 75,
        critical_min: 60,
        critical_max: 85
      },
      connectivity: 'ethernet',
      signalStrength: 95,
      alerts: [
        {
          id: 'ALT-001',
          deviceId: 'HVAC-001',
          severity: 'medium',
          type: 'threshold',
          message: 'Temperature approaching upper threshold (72.5°F)',
          timestamp: '2024-01-15 14:23:00',
          acknowledged: false
        }
      ],
      historicalData: [
        { timestamp: '2024-01-15 14:00:00', value: 71.2, status: 'normal' },
        { timestamp: '2024-01-15 14:15:00', value: 72.1, status: 'normal' },
        { timestamp: '2024-01-15 14:23:00', value: 72.5, status: 'warning' }
      ],
      maintenanceSchedule: {
        lastMaintenance: '2024-01-01',
        nextMaintenance: '2024-04-01',
        frequency: 'Quarterly'
      }
    },
    {
      id: 'LEAK-001',
      name: 'Water Leak Sensor - Basement',
      type: 'leak_detector',
      location: 'Basement Storage',
      building: 'Main Building',
      status: 'critical',
      lastReading: {
        value: 1,
        unit: 'detected',
        timestamp: '2024-01-15 14:25:00'
      },
      thresholds: {
        min: 0,
        max: 0,
        critical_min: 0,
        critical_max: 0
      },
      battery: 85,
      connectivity: 'wifi',
      signalStrength: 78,
      alerts: [
        {
          id: 'ALT-002',
          deviceId: 'LEAK-001',
          severity: 'critical',
          type: 'threshold',
          message: 'WATER LEAK DETECTED - Immediate action required',
          timestamp: '2024-01-15 14:25:00',
          acknowledged: false,
          autoWorkOrder: 'WO-2024-003'
        }
      ],
      historicalData: [
        { timestamp: '2024-01-15 14:00:00', value: 0, status: 'normal' },
        { timestamp: '2024-01-15 14:20:00', value: 0, status: 'normal' },
        { timestamp: '2024-01-15 14:25:00', value: 1, status: 'critical' }
      ]
    },
    {
      id: 'AQ-001',
      name: 'Air Quality Monitor - Office Floor 3',
      type: 'air_quality',
      location: 'Floor 3 - Open Office',
      building: 'Main Building',
      status: 'online',
      lastReading: {
        value: 45,
        unit: 'AQI',
        timestamp: '2024-01-15 14:22:00'
      },
      thresholds: {
        min: 0,
        max: 50,
        critical_min: 0,
        critical_max: 100
      },
      battery: 92,
      connectivity: 'wifi',
      signalStrength: 88,
      alerts: [],
      historicalData: [
        { timestamp: '2024-01-15 14:00:00', value: 42, status: 'normal' },
        { timestamp: '2024-01-15 14:15:00', value: 44, status: 'normal' },
        { timestamp: '2024-01-15 14:22:00', value: 45, status: 'normal' }
      ]
    },
    {
      id: 'METER-001',
      name: 'Smart Electric Meter - Main Panel',
      type: 'smart_meter',
      location: 'Electrical Room',
      building: 'Main Building',
      status: 'online',
      lastReading: {
        value: 245.7,
        unit: 'kWh',
        timestamp: '2024-01-15 14:24:00'
      },
      thresholds: {
        min: 0,
        max: 500,
        critical_min: 0,
        critical_max: 600
      },
      connectivity: 'ethernet',
      signalStrength: 100,
      alerts: [],
      historicalData: [
        { timestamp: '2024-01-15 14:00:00', value: 240.2, status: 'normal' },
        { timestamp: '2024-01-15 14:15:00', value: 243.1, status: 'normal' },
        { timestamp: '2024-01-15 14:24:00', value: 245.7, status: 'normal' }
      ]
    },
    {
      id: 'TEMP-001',
      name: 'Temperature Sensor - Server Room',
      type: 'temperature',
      location: 'Server Room',
      building: 'Main Building',
      status: 'online',
      lastReading: {
        value: 68.2,
        unit: '°F',
        timestamp: '2024-01-15 14:23:30'
      },
      thresholds: {
        min: 65,
        max: 75,
        critical_min: 60,
        critical_max: 80
      },
      battery: 78,
      connectivity: 'wifi',
      signalStrength: 92,
      alerts: [],
      historicalData: [
        { timestamp: '2024-01-15 14:00:00', value: 67.8, status: 'normal' },
        { timestamp: '2024-01-15 14:15:00', value: 68.0, status: 'normal' },
        { timestamp: '2024-01-15 14:23:30', value: 68.2, status: 'normal' }
      ]
    },
    {
      id: 'HVAC-002',
      name: 'HVAC Unit - Zone B',
      type: 'hvac',
      location: 'Mechanical Room B',
      building: 'Warehouse',
      status: 'offline',
      lastReading: {
        value: 0,
        unit: '°F',
        timestamp: '2024-01-15 13:45:00'
      },
      thresholds: {
        min: 65,
        max: 78,
        critical_min: 55,
        critical_max: 85
      },
      connectivity: 'wifi',
      signalStrength: 0,
      alerts: [
        {
          id: 'ALT-003',
          deviceId: 'HVAC-002',
          severity: 'high',
          type: 'offline',
          message: 'Device offline for 38 minutes - Connection lost',
          timestamp: '2024-01-15 13:45:00',
          acknowledged: false,
          autoWorkOrder: 'WO-2024-004'
        }
      ],
      historicalData: [
        { timestamp: '2024-01-15 13:30:00', value: 72.1, status: 'normal' },
        { timestamp: '2024-01-15 13:40:00', value: 71.8, status: 'normal' },
        { timestamp: '2024-01-15 13:45:00', value: 0, status: 'offline' }
      ]
    }
  ];

  // Mock auto-generated work orders
  const mockAutoWorkOrders: WorkOrderGeneration[] = [
    {
      alertId: 'ALT-002',
      workOrderId: 'WO-2024-003',
      deviceName: 'Water Leak Sensor - Basement',
      priority: 'critical',
      description: 'Emergency water leak detected in basement storage area. Immediate plumbing response required.',
      assignedVendor: 'Emergency Plumbing 24/7',
      estimatedCost: 850,
      createdAt: '2024-01-15 14:25:30'
    },
    {
      alertId: 'ALT-003',
      workOrderId: 'WO-2024-004',
      deviceName: 'HVAC Unit - Zone B',
      priority: 'high',
      description: 'HVAC monitoring device offline in Warehouse Zone B. Connectivity and system check required.',
      assignedVendor: 'Arctic Air Solutions',
      estimatedCost: 350,
      createdAt: '2024-01-15 13:50:00'
    }
  ];

  // Auto-refresh simulation
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
      }, 30000); // Update every 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const getDeviceIcon = (type: string) => {
    const icons = {
      'hvac': Thermometer,
      'leak_detector': Droplets,
      'air_quality': Wind,
      'smart_meter': Zap,
      'temperature': Thermometer,
      'humidity': Droplets,
      'security': Eye
    };
    return icons[type as keyof typeof icons] || Activity;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'online': 'bg-green-500/20 text-green-400 border-green-500/30',
      'offline': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      'warning': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'critical': 'bg-red-500/20 text-red-400 border-red-500/30',
      'maintenance': 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const getAlertSeverityColor = (severity: string) => {
    const colors = {
      'low': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'high': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'critical': 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return colors[severity as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const getConnectivityIcon = (connectivity: string, signalStrength: number) => {
    if (signalStrength === 0) return <WifiOff className="text-red-400" size={16} />;
    return <Wifi className={`${signalStrength > 70 ? 'text-green-400' : signalStrength > 40 ? 'text-yellow-400' : 'text-red-400'}`} size={16} />;
  };

  const filteredDevices = mockDevices.filter(device => {
    const matchesBuilding = selectedBuilding === 'all' || device.building === selectedBuilding;
    const matchesType = selectedDeviceType === 'all' || device.type === selectedDeviceType;
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBuilding && matchesType && matchesSearch;
  });

  const allAlerts = mockDevices.flatMap(device => 
    device.alerts.map(alert => ({ ...alert, deviceName: device.name, deviceLocation: device.location }))
  );

  const filteredAlerts = allAlerts.filter(alert => {
    if (alertFilter === 'all') return true;
    if (alertFilter === 'unacknowledged') return !alert.acknowledged;
    return alert.severity === alertFilter;
  });

  const acknowledgeAlert = (alertId: string) => {
    alert(`Alert ${alertId} acknowledged!\n\nAlert has been marked as acknowledged and will be tracked for resolution.`);
  };

  const generateWorkOrder = (alertId: string, deviceName: string) => {
    alert(`🔧 Work Order Auto-Generated!\n\nAlert: ${alertId}\nDevice: ${deviceName}\n\nWork order has been automatically created and assigned to the appropriate vendor based on device type and alert severity.`);
  };

  const exportData = (type: string) => {
    alert(`📊 ${type} Export Started!\n\nGenerating comprehensive report with:\n• Device status and readings\n• Historical data trends\n• Alert summaries\n• Performance metrics\n\nReport will be available for download shortly.`);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-6 rounded-xl border border-green-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-green-400 font-semibold">Online Devices</h3>
            <CheckCircle className="text-green-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">
            {mockDevices.filter(d => d.status === 'online').length}
          </div>
          <div className="text-sm text-green-300 mt-1">
            {Math.round((mockDevices.filter(d => d.status === 'online').length / mockDevices.length) * 100)}% operational
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 p-6 rounded-xl border border-red-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-red-400 font-semibold">Critical Alerts</h3>
            <AlertTriangle className="text-red-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">
            {allAlerts.filter(a => a.severity === 'critical').length}
          </div>
          <div className="text-sm text-red-300 mt-1">Require immediate attention</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-xl border border-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-blue-400 font-semibold">Auto Work Orders</h3>
            <Wrench className="text-blue-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{mockAutoWorkOrders.length}</div>
          <div className="text-sm text-blue-300 mt-1">Generated today</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-6 rounded-xl border border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-purple-400 font-semibold">Data Points</h3>
            <Activity className="text-purple-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">
            {mockDevices.reduce((acc, device) => acc + device.historicalData.length, 0)}
          </div>
          <div className="text-sm text-purple-300 mt-1">Collected today</div>
        </div>
      </div>

      {/* Recent Critical Alerts */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <AlertTriangle className="mr-2 text-red-400" size={20} />
          Critical Alerts Requiring Immediate Action
        </h3>
        
        <div className="space-y-3">
          {allAlerts.filter(alert => alert.severity === 'critical').map((alert) => (
            <div key={alert.id} className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-white">{alert.deviceName}</h4>
                  <p className="text-gray-400 text-sm">{alert.deviceLocation}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getAlertSeverityColor(alert.severity)}`}>
                    {alert.severity.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500">{new Date(alert.timestamp).toLocaleString()}</span>
                </div>
              </div>
              
              <p className="text-red-300 mb-3">{alert.message}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {alert.autoWorkOrder && (
                    <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">
                      Auto WO: {alert.autoWorkOrder}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => acknowledgeAlert(alert.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded text-sm transition-colors"
                  >
                    Acknowledge
                  </button>
                  {!alert.autoWorkOrder && (
                    <button
                      onClick={() => generateWorkOrder(alert.id, alert.deviceName)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Generate WO
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {allAlerts.filter(alert => alert.severity === 'critical').length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <CheckCircle className="mx-auto mb-2" size={48} />
              <p>No critical alerts at this time</p>
            </div>
          )}
        </div>
      </div>

      {/* Auto-Generated Work Orders */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Wrench className="mr-2 text-blue-400" size={20} />
          Auto-Generated Work Orders
        </h3>
        
        <div className="space-y-3">
          {mockAutoWorkOrders.map((wo) => (
            <div key={wo.workOrderId} className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-white">{wo.workOrderId}</h4>
                  <p className="text-blue-400 text-sm">{wo.deviceName}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${
                    wo.priority === 'critical' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                    wo.priority === 'high' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                    'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                  }`}>
                    {wo.priority.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-3">{wo.description}</p>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  <span>Vendor: {wo.assignedVendor}</span>
                  <span className="mx-2">•</span>
                  <span>Est. Cost: ${wo.estimatedCost}</span>
                </div>
                <div className="text-xs text-gray-500">
                  Created: {new Date(wo.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDevices = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search devices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            />
          </div>
          <select
            value={selectedBuilding}
            onChange={(e) => setSelectedBuilding(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Buildings</option>
            <option value="Main Building">Main Building</option>
            <option value="Warehouse">Warehouse</option>
          </select>
          <select
            value={selectedDeviceType}
            onChange={(e) => setSelectedDeviceType(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Types</option>
            <option value="hvac">HVAC</option>
            <option value="leak_detector">Leak Detectors</option>
            <option value="air_quality">Air Quality</option>
            <option value="smart_meter">Smart Meters</option>
            <option value="temperature">Temperature</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              autoRefresh ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
            }`}
          >
            <RefreshCw size={16} />
            <span>Auto Refresh</span>
          </button>
          <span className="text-xs text-gray-500">
            Last update: {lastUpdate.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Device Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDevices.map((device) => {
          const IconComponent = getDeviceIcon(device.type);
          return (
            <div
              key={device.id}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30 hover:border-teal-500/50 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedDevice(device.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{device.name}</h3>
                    <p className="text-gray-400 text-sm">{device.location}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(device.status)}`}>
                  {device.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Current Reading:</span>
                  <span className="text-white font-semibold">
                    {device.lastReading.value} {device.lastReading.unit}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Connectivity:</span>
                  <div className="flex items-center space-x-2">
                    {getConnectivityIcon(device.connectivity, device.signalStrength)}
                    <span className="text-white text-sm">{device.signalStrength}%</span>
                  </div>
                </div>

                {device.battery && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Battery:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            device.battery > 50 ? 'bg-green-500' :
                            device.battery > 20 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${device.battery}%` }}
                        ></div>
                      </div>
                      <span className="text-white text-sm">{device.battery}%</span>
                    </div>
                  </div>
                )}

                {device.alerts.length > 0 && (
                  <div className="pt-2 border-t border-gray-700/50">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="text-red-400" size={16} />
                      <span className="text-red-400 text-sm">
                        {device.alerts.length} active alert{device.alerts.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                )}

                <div className="text-xs text-gray-500 text-center">
                  Last update: {new Date(device.lastReading.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDevices.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <Activity className="mx-auto mb-4" size={48} />
          <p>No devices found matching your filters</p>
        </div>
      )}
    </div>
  );

  const renderAlerts = () => (
    <div className="space-y-6">
      {/* Alert Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <select
            value={alertFilter}
            onChange={(e) => setAlertFilter(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Alerts</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
            <option value="unacknowledged">Unacknowledged</option>
          </select>
        </div>
        <button
          onClick={() => exportData('Alert Report')}
          className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
        >
          <Download size={16} />
          <span>Export Alerts</span>
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div key={alert.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-white font-semibold mb-1">{alert.deviceName}</h3>
                <p className="text-gray-400 text-sm">{alert.deviceLocation}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getAlertSeverityColor(alert.severity)}`}>
                  {alert.severity.toUpperCase()}
                </span>
                {alert.acknowledged && (
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                    ACKNOWLEDGED
                  </span>
                )}
              </div>
            </div>

            <p className="text-gray-300 mb-4">{alert.message}</p>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>Type: {alert.type}</span>
                <span>•</span>
                <span>Time: {new Date(alert.timestamp).toLocaleString()}</span>
                {alert.autoWorkOrder && (
                  <>
                    <span>•</span>
                    <span className="text-blue-400">Auto WO: {alert.autoWorkOrder}</span>
                  </>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {!alert.acknowledged && (
                  <button
                    onClick={() => acknowledgeAlert(alert.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded text-sm transition-colors"
                  >
                    Acknowledge
                  </button>
                )}
                {!alert.autoWorkOrder && (
                  <button
                    onClick={() => generateWorkOrder(alert.id, alert.deviceName)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Generate WO
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredAlerts.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Bell className="mx-auto mb-4" size={48} />
            <p>No alerts found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderAnalytics = () => {
    // Mock Performance Data
    const mockPerformanceData = {
      deviceTrends: [
        { device: 'HVAC-001', efficiency: 94, uptime: 98.5, energyUsage: 245.7 },
        { device: 'LEAK-001', batteryLife: 85, signalStrength: 78, alertsTriggered: 1 },
        { device: 'AQ-001', accuracy: 96, batteryLife: 92, dataPoints: 1440 },
        { device: 'SMART-001', efficiency: 89, uptime: 99.2, energyUsage: 156.3 },
        { device: 'SMART-002', efficiency: 91, uptime: 97.8, energyUsage: 178.9 },
        { device: 'SMART-003', efficiency: 93, uptime: 98.1, energyUsage: 134.2 }
      ],
      alertDistribution: [
        { severity: 'Critical', count: 2, percentage: 8.3, color: '#ef4444' },
        { severity: 'High', count: 5, percentage: 20.8, color: '#f97316' },
        { severity: 'Medium', count: 12, percentage: 50.0, color: '#eab308' },
        { severity: 'Low', count: 5, percentage: 20.9, color: '#22c55e' }
      ],
      alertTrends: [
        { date: '2024-01-15', critical: 1, high: 2, medium: 8, low: 3 },
        { date: '2024-01-16', critical: 0, high: 3, medium: 6, low: 4 },
        { date: '2024-01-17', critical: 2, high: 1, medium: 9, low: 2 },
        { date: '2024-01-18', critical: 1, high: 4, medium: 7, low: 5 },
        { date: '2024-01-19', critical: 0, high: 2, medium: 10, low: 1 },
        { date: '2024-01-20', critical: 1, high: 3, medium: 8, low: 3 }
      ],
      performanceMetrics: {
        devicesMonitored: 8,
        dataPointsCollected: 45680,
        systemUptime: 99.2,
        averageResponseTime: 1.3,
        alertsResolved: 156,
        energyEfficiencyScore: 92,
        predictiveAccuracy: 94.7,
        maintenanceReduction: 23
      },
      energyData: {
        totalConsumption: 2847.6,
        peakUsage: 456.8,
        offPeakUsage: 234.2,
        efficiencyRating: 'A+',
        costSavings: 18750,
        carbonReduction: 12.4,
        renewablePercentage: 34,
        monthlyTrend: [
          { month: 'Jan', consumption: 2650, cost: 3180 },
          { month: 'Feb', consumption: 2480, cost: 2976 },
          { month: 'Mar', consumption: 2720, cost: 3264 },
          { month: 'Apr', consumption: 2590, cost: 3108 },
          { month: 'May', consumption: 2840, cost: 3408 },
          { month: 'Jun', consumption: 3120, cost: 3744 }
        ]
      },
      maintenanceSchedule: [
        { device: 'HVAC-001', task: 'Filter Replacement', priority: 'High', dueDate: '2024-01-25', type: 'Preventive' },
        { device: 'LEAK-001', task: 'Battery Replacement', priority: 'Medium', dueDate: '2024-01-28', type: 'Maintenance' },
        { device: 'AQ-001', task: 'Sensor Calibration', priority: 'Low', dueDate: '2024-02-02', type: 'Calibration' },
        { device: 'SMART-001', task: 'Firmware Update', priority: 'Medium', dueDate: '2024-01-30', type: 'Update' },
        { device: 'SMART-002', task: 'Connection Check', priority: 'Low', dueDate: '2024-02-05', type: 'Inspection' },
        { device: 'HVAC-001', task: 'System Inspection', priority: 'High', dueDate: '2024-02-10', type: 'Inspection' }
      ]
    };

    return (
      <div className="space-y-6">
        {/* Analytics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-xl border border-blue-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-blue-400 font-semibold">System Uptime</h3>
              <TrendingUp className="text-blue-400" size={24} />
            </div>
            <div className="text-2xl font-bold text-white">99.2%</div>
            <div className="text-sm text-blue-300 mt-1">Last 30 days</div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-6 rounded-xl border border-green-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-green-400 font-semibold">Energy Efficiency</h3>
              <BarChart3 className="text-green-400" size={24} />
            </div>
            <div className="text-2xl font-bold text-white">+12%</div>
            <div className="text-sm text-green-300 mt-1">Improvement this month</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-6 rounded-xl border border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-purple-400 font-semibold">Cost Savings</h3>
              <TrendingDown className="text-purple-400" size={24} />
            </div>
            <div className="text-2xl font-bold text-white">$2,340</div>
            <div className="text-sm text-purple-300 mt-1">Saved this month</div>
          </div>
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <LineChart className="mr-2 text-teal-400" size={20} />
              Device Performance Trends
            </h3>
            
            <div className="space-y-4">
              {mockPerformanceData.deviceTrends.map((device, index) => (
                <div key={index} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-white font-semibold">{device.device}</h4>
                    <span className={`px-2 py-1 rounded text-xs ${
                      device.device === 'HVAC-002' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                    }`}>
                      {device.device === 'HVAC-002' ? 'OFFLINE' : 'ONLINE'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    {device.efficiency && (
                      <div>
                        <div className="text-gray-400">Efficiency</div>
                        <div className="text-teal-400 font-semibold">{device.efficiency}%</div>
                      </div>
                    )}
                    {device.uptime !== undefined && (
                      <div>
                        <div className="text-gray-400">Uptime</div>
                        <div className="text-teal-400 font-semibold">{device.uptime}%</div>
                      </div>
                    )}
                    {device.batteryLife && (
                      <div>
                        <div className="text-gray-400">Battery</div>
                        <div className="text-teal-400 font-semibold">{device.batteryLife}%</div>
                      </div>
                    )}
                    {device.energyUsage && (
                      <div>
                        <div className="text-gray-400">Energy Usage</div>
                        <div className="text-teal-400 font-semibold">{device.energyUsage} kWh</div>
                      </div>
                    )}
                    {device.signalStrength && (
                      <div>
                        <div className="text-gray-400">Signal</div>
                        <div className="text-teal-400 font-semibold">{device.signalStrength}%</div>
                      </div>
                    )}
                    {device.accuracy && (
                      <div>
                        <div className="text-gray-400">Accuracy</div>
                        <div className="text-teal-400 font-semibold">{device.accuracy}%</div>
                      </div>
                    )}
                    {device.lastContact && (
                      <div>
                        <div className="text-gray-400">Last Contact</div>
                        <div className="text-red-400 font-semibold">{device.lastContact}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-teal-500/10 rounded-lg border border-teal-500/20">
              <h4 className="text-teal-400 font-semibold mb-2">Performance Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-white font-bold">94.2%</div>
                  <div className="text-gray-400">Avg Efficiency</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold">96.8%</div>
                  <div className="text-gray-400">Avg Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold">83.5%</div>
                  <div className="text-gray-400">Avg Battery</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold">8</div>
                  <div className="text-gray-400">Total Alerts</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <PieChart className="mr-2 text-teal-400" size={20} />
              Alert Distribution
            </h3>
            
            <div className="space-y-4">
              {mockPerformanceData.alertDistribution.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: alert.color }}
                    ></div>
                    <span className="text-white font-medium">{alert.severity}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-400">{alert.count} alerts</span>
                    <span className="text-teal-400 font-semibold">{alert.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gray-700/20 rounded-lg">
              <h4 className="text-white font-semibold mb-3">Alert Trends (Last 30 Days)</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">Total Alerts</div>
                  <div className="text-white font-bold">8</div>
                </div>
                <div>
                  <div className="text-gray-400">Avg Response Time</div>
                  <div className="text-white font-bold">12 min</div>
                </div>
                <div>
                  <div className="text-gray-400">Auto-Resolved</div>
                  <div className="text-green-400 font-bold">62.5%</div>
                </div>
                <div>
                  <div className="text-gray-400">Escalated</div>
                  <div className="text-red-400 font-bold">12.5%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <h3 className="text-xl font-semibold text-white mb-4">Data Export & Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => exportData('Device Performance Report')}
              className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 p-6 rounded-lg transition-colors border border-blue-500/30"
            >
              <FileText className="mx-auto mb-2" size={24} />
              <div className="font-semibold">Performance Report</div>
              <div className="text-sm opacity-80 mb-3">Device metrics & trends</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Devices Monitored:</span>
                  <span className="text-blue-300">6</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Points:</span>
                  <span className="text-blue-300">8,640</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Uptime:</span>
                  <span className="text-green-400">96.8%</span>
                </div>
                <div className="flex justify-between">
                  <span>Performance Score:</span>
                  <span className="text-green-400">94.2/100</span>
                </div>
              </div>
            </button>
            <button
              onClick={() => exportData('Energy Usage Report')}
              className="bg-green-500/20 hover:bg-green-500/30 text-green-400 p-6 rounded-lg transition-colors border border-green-500/30"
            >
              <Zap className="mx-auto mb-2" size={24} />
              <div className="font-semibold">Energy Report</div>
              <div className="text-sm opacity-80 mb-3">Usage & efficiency data</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Total Consumption:</span>
                  <span className="text-green-300">{mockPerformanceData.energyData.totalConsumption} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span>Peak Usage:</span>
                  <span className="text-yellow-400">{mockPerformanceData.energyData.peakUsage} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span>Efficiency:</span>
                  <span className="text-green-400">{mockPerformanceData.performanceMetrics.energyEfficiencyScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Cost Savings:</span>
                  <span className="text-green-400">${mockPerformanceData.energyData.costSavings}</span>
                </div>
              </div>
            </button>
            <button
              onClick={() => exportData('Maintenance Schedule')}
              className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 p-6 rounded-lg transition-colors border border-purple-500/30"
            >
              <Calendar className="mx-auto mb-2" size={24} />
              <div className="font-semibold">Maintenance Schedule</div>
              <div className="text-sm opacity-80 mb-3">Upcoming & overdue tasks</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Scheduled Tasks:</span>
                  <span className="text-purple-300">{mockPerformanceData.maintenanceSchedule.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Due This Month:</span>
                  <span className="text-yellow-400">3</span>
                </div>
                <div className="flex justify-between">
                  <span>High Priority:</span>
                  <span className="text-red-400">1</span>
                </div>
                <div className="flex justify-between">
                  <span>Completion Rate:</span>
                  <span className="text-green-400">94%</span>
                </div>
              </div>
            </button>
          </div>
          
          {/* Detailed Maintenance Schedule */}
          <div className="mt-6 bg-gray-700/20 p-4 rounded-lg border border-gray-700/30">
            <h4 className="text-white font-semibold mb-4">Upcoming Maintenance Tasks</h4>
            <div className="space-y-3">
              {mockPerformanceData.maintenanceSchedule.map((task, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-800/50 rounded">
                  <div>
                    <div className="text-white font-medium">{task.device}</div>
                    <div className="text-gray-400 text-sm">{task.task}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-teal-400 font-semibold">{new Date(task.dueDate).toLocaleDateString()}</div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      task.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                      task.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDeviceDetail = () => {
    const device = mockDevices.find(d => d.id === selectedDevice);
    if (!device) return null;

    const IconComponent = getDeviceIcon(device.type);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedDevice(null)}
            className="text-teal-400 hover:text-teal-300 transition-colors"
          >
            ← Back to Devices
          </button>
          <div className="flex items-center space-x-2">
            <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors">
              <Settings size={16} className="inline mr-2" />
              Configure
            </button>
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors">
              <Download size={16} className="inline mr-2" />
              Export Data
            </button>
          </div>
        </div>

        {/* Device Header */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl flex items-center justify-center">
                <IconComponent className="text-white" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">{device.name}</h2>
                <p className="text-gray-400">{device.location} • {device.building}</p>
                <p className="text-sm text-gray-500">Device ID: {device.id}</p>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-lg font-medium border ${getStatusColor(device.status)}`}>
              {device.status.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-teal-500/10 rounded-lg border border-teal-500/20">
              <div className="text-2xl font-bold text-teal-400">
                {device.lastReading.value} {device.lastReading.unit}
              </div>
              <div className="text-sm text-teal-300">Current Reading</div>
            </div>
            <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">{device.signalStrength}%</div>
              <div className="text-sm text-blue-300">Signal Strength</div>
            </div>
            {device.battery && (
              <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="text-2xl font-bold text-green-400">{device.battery}%</div>
                <div className="text-sm text-green-300">Battery Level</div>
              </div>
            )}
          </div>
        </div>

        {/* Device Alerts */}
        {device.alerts.length > 0 && (
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <AlertTriangle className="mr-2 text-red-400" size={20} />
              Active Alerts
            </h3>
            <div className="space-y-3">
              {device.alerts.map((alert) => (
                <div key={alert.id} className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getAlertSeverityColor(alert.severity)}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">{new Date(alert.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-red-300 mb-3">{alert.message}</p>
                  <div className="flex items-center justify-between">
                    {alert.autoWorkOrder && (
                      <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">
                        Auto WO: {alert.autoWorkOrder}
                      </span>
                    )}
                    <button
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded text-sm transition-colors"
                    >
                      Acknowledge
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Historical Data */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Activity className="mr-2 text-teal-400" size={20} />
            Historical Data
          </h3>
          <div className="space-y-2">
            {device.historicalData.slice(-10).reverse().map((reading, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-700/20 rounded">
                <span className="text-white">
                  {reading.value} {device.lastReading.unit}
                </span>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    reading.status === 'normal' ? 'bg-green-500/20 text-green-400' :
                    reading.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                    reading.status === 'critical' ? 'bg-red-500/20 text-red-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {reading.status}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {new Date(reading.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Schedule */}
        {device.maintenanceSchedule && (
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Calendar className="mr-2 text-teal-400" size={20} />
              Maintenance Schedule
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="text-lg font-bold text-blue-400">
                  {new Date(device.maintenanceSchedule.lastMaintenance).toLocaleDateString()}
                </div>
                <div className="text-sm text-blue-300">Last Maintenance</div>
              </div>
              <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <div className="text-lg font-bold text-yellow-400">
                  {new Date(device.maintenanceSchedule.nextMaintenance).toLocaleDateString()}
                </div>
                <div className="text-sm text-yellow-300">Next Maintenance</div>
              </div>
              <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="text-lg font-bold text-green-400">
                  {device.maintenanceSchedule.frequency}
                </div>
                <div className="text-sm text-green-300">Frequency</div>
              </div>
            </div>
          </div>
        )}
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
              <h1 className="text-2xl font-semibold">IoT Monitoring System</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">Live Device Monitoring</span>
                <span className="text-xs text-gray-400">• MQTT/REST Integration • Auto Work Orders</span>
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
          <strong className="text-teal-400">Demo Mode:</strong> This interface demonstrates real-time IoT device monitoring with live status updates, critical alert management, and automatic work order generation from device alerts.
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { id: 'overview', label: 'System Overview', icon: BarChart3 },
            { id: 'devices', label: 'Live Device Status', icon: Activity },
            { id: 'alerts', label: 'Alert Management', icon: AlertTriangle },
            { id: 'analytics', label: 'Data Analytics', icon: TrendingUp }
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
        {selectedDevice ? renderDeviceDetail() : (
          <>
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'devices' && renderDevices()}
            {activeTab === 'alerts' && renderAlerts()}
            {activeTab === 'analytics' && renderAnalytics()}
          </>
        )}
      </div>
    </div>
  );
};

export default IoTMonitoringSystem;