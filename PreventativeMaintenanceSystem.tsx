import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Calendar, AlertTriangle, TrendingUp, Users, Clock, 
  CheckCircle, X, Plus, Edit, Trash2, Bell, FileText, 
  BarChart3, Settings, Zap, Target, Shield, Brain,
  ChevronDown, ChevronRight, Filter, Search, Download
} from 'lucide-react';
import Logo from './Logo';

interface MaintenanceTask {
  id: string;
  title: string;
  description: string;
  category: 'HVAC' | 'Plumbing' | 'Electrical' | 'Fire Safety' | 'Elevator' | 'General';
  frequency: 'Weekly' | 'Monthly' | 'Quarterly' | 'Semi-Annual' | 'Annual';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  assignedVendor: string;
  backupVendors: string[];
  location: string;
  estimatedDuration: number; // in hours
  cost: number;
  lastCompleted?: string;
  nextDue: string;
  status: 'Scheduled' | 'Due Soon' | 'Overdue' | 'In Progress' | 'Completed' | 'Missed';
  compliance: {
    required: boolean;
    regulation: string;
    certificate: string;
  };
  alerts: {
    sevenDay: boolean;
    threeDay: boolean;
    sameDay: boolean;
    escalation: boolean;
  };
  history: MaintenanceHistory[];
}

interface MaintenanceHistory {
  id: string;
  completedDate: string;
  vendor: string;
  duration: number;
  cost: number;
  notes: string;
  rating: number;
  issues?: string;
}

interface AIForecast {
  missedTasksPrediction: {
    taskId: string;
    taskTitle: string;
    riskLevel: 'Low' | 'Medium' | 'High';
    probability: number;
    reasons: string[];
  }[];
  suggestedPM: {
    equipment: string;
    suggestedFrequency: string;
    reasoning: string;
    potentialSavings: number;
  }[];
  vendorPerformance: {
    vendor: string;
    reliabilityScore: number;
    avgResponseTime: number;
    recommendations: string[];
  }[];
}

const PreventativeMaintenanceSystem = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  const mockTasks: MaintenanceTask[] = [
    {
      id: 'PM-001',
      title: 'HVAC Filter Replacement - Building A',
      description: 'Replace all HVAC filters in main building air handling units',
      category: 'HVAC',
      frequency: 'Monthly',
      priority: 'High',
      assignedVendor: 'Arctic Air Solutions',
      backupVendors: ['CoolTech HVAC', 'Climate Control Pro'],
      location: 'Building A - Mechanical Room',
      estimatedDuration: 2,
      cost: 450,
      lastCompleted: '2024-01-15',
      nextDue: '2024-02-15',
      status: 'Due Soon',
      compliance: {
        required: true,
        regulation: 'ASHRAE 62.1',
        certificate: 'Indoor Air Quality Certificate'
      },
      alerts: {
        sevenDay: true,
        threeDay: true,
        sameDay: true,
        escalation: true
      },
      history: [
        {
          id: 'H-001',
          completedDate: '2024-01-15',
          vendor: 'Arctic Air Solutions',
          duration: 1.5,
          cost: 420,
          notes: 'All filters replaced successfully. Noted slight wear on Unit 3 housing.',
          rating: 5,
        }
      ]
    },
    {
      id: 'PM-002',
      title: 'Fire Extinguisher Inspection',
      description: 'Monthly inspection of all fire extinguishers per NFPA standards',
      category: 'Fire Safety',
      frequency: 'Monthly',
      priority: 'Critical',
      assignedVendor: 'SafeGuard Fire Protection',
      backupVendors: ['FireTech Services', 'Emergency Safety Co'],
      location: 'All Buildings - All Floors',
      estimatedDuration: 4,
      cost: 300,
      lastCompleted: '2024-01-10',
      nextDue: '2024-02-10',
      status: 'Scheduled',
      compliance: {
        required: true,
        regulation: 'NFPA 10',
        certificate: 'Fire Safety Compliance Certificate'
      },
      alerts: {
        sevenDay: true,
        threeDay: true,
        sameDay: true,
        escalation: true
      },
      history: [
        {
          id: 'H-002',
          completedDate: '2024-01-10',
          vendor: 'SafeGuard Fire Protection',
          duration: 3.5,
          cost: 280,
          notes: 'Inspected 47 fire extinguishers across all buildings. All units passed inspection. Replaced 2 expired units on Floor 3.',
          rating: 5,
        },
        {
          id: 'H-003',
          completedDate: '2023-12-10',
          vendor: 'SafeGuard Fire Protection',
          duration: 4.0,
          cost: 300,
          notes: 'Monthly inspection completed. All extinguishers operational. Updated inspection tags.',
          rating: 5,
        }
      ]
    },
    {
      id: 'PM-003',
      title: 'Elevator Safety Inspection',
      description: 'Quarterly elevator safety inspection and maintenance',
      category: 'Elevator',
      frequency: 'Quarterly',
      priority: 'Critical',
      assignedVendor: 'SafeLift Services',
      backupVendors: ['Elevator Experts Inc'],
      location: 'Building A - Elevators 1-4',
      estimatedDuration: 6,
      cost: 1200,
      lastCompleted: '2023-11-15',
      nextDue: '2024-02-15',
      status: 'Overdue',
      compliance: {
        required: true,
        regulation: 'ASME A17.1',
        certificate: 'Elevator Safety Certificate'
      },
      alerts: {
        sevenDay: true,
        threeDay: true,
        sameDay: true,
        escalation: true
      },
      history: [
        {
          id: 'H-004',
          completedDate: '2023-11-15',
          vendor: 'SafeLift Services',
          duration: 5.5,
          cost: 1150,
          notes: 'Quarterly safety inspection completed for all 4 elevators. Minor adjustment needed on Elevator 2 door sensors. All safety systems operational.',
          rating: 4,
          issues: 'Elevator 2 door sensor required calibration adjustment'
        },
        {
          id: 'H-005',
          completedDate: '2023-08-15',
          vendor: 'SafeLift Services',
          duration: 6.0,
          cost: 1200,
          notes: 'Full quarterly inspection and maintenance. Replaced worn cables on Elevator 1. All units certified for operation.',
          rating: 4,
        }
      ]
    },
    {
      id: 'PM-004',
      title: 'Plumbing System Maintenance',
      description: 'Semi-annual plumbing system inspection and maintenance',
      category: 'Plumbing',
      frequency: 'Semi-Annual',
      priority: 'Medium',
      assignedVendor: 'ProFlow Plumbing',
      backupVendors: ['FastFlow Plumbing', 'AquaTech Services'],
      location: 'All Buildings - Main Lines',
      estimatedDuration: 8,
      cost: 800,
      lastCompleted: '2023-09-01',
      nextDue: '2024-03-01',
      status: 'Scheduled',
      compliance: {
        required: false,
        regulation: '',
        certificate: ''
      },
      alerts: {
        sevenDay: true,
        threeDay: false,
        sameDay: false,
        escalation: false
      },
      history: [
        {
          id: 'H-006',
          completedDate: '2023-09-01',
          vendor: 'ProFlow Plumbing',
          duration: 7.5,
          cost: 750,
          notes: 'Semi-annual plumbing inspection completed. Cleaned main drain lines, inspected all fixtures. Recommended replacing aging pipes in Building B basement within 12 months.',
          rating: 4,
          issues: 'Aging pipes in Building B basement showing signs of corrosion'
        },
        {
          id: 'H-007',
          completedDate: '2023-03-01',
          vendor: 'ProFlow Plumbing',
          duration: 8.0,
          cost: 800,
          notes: 'Complete plumbing system maintenance. Pressure tested all lines, cleaned drains, inspected water heaters. All systems operational.',
          rating: 5,
        }
      ]
    },
    {
      id: 'PM-005',
      title: 'Electrical Panel Inspection',
      description: 'Annual electrical panel inspection and testing',
      category: 'Electrical',
      frequency: 'Annual',
      priority: 'High',
      assignedVendor: 'PowerTech Electrical',
      backupVendors: ['Bright Electric Co', 'Spark Solutions'],
      location: 'All Buildings - Electrical Rooms',
      estimatedDuration: 6,
      cost: 950,
      lastCompleted: '2023-03-15',
      nextDue: '2024-03-15',
      status: 'Scheduled',
      compliance: {
        required: true,
        regulation: 'NEC 110.14',
        certificate: 'Electrical Safety Certificate'
      },
      alerts: {
        sevenDay: true,
        threeDay: true,
        sameDay: true,
        escalation: true
      },
      history: [
        {
          id: 'H-008',
          completedDate: '2023-03-15',
          vendor: 'PowerTech Electrical',
          duration: 5.5,
          cost: 900,
          notes: 'Annual electrical panel inspection completed. All panels tested and certified. Tightened connections on Panel 3B. Updated labeling on all circuits.',
          rating: 5,
        }
      ]
    },
    {
      id: 'PM-006',
      title: 'Roof Inspection & Maintenance',
      description: 'Bi-annual roof inspection and preventive maintenance',
      category: 'General',
      frequency: 'Semi-Annual',
      priority: 'Medium',
      assignedVendor: 'Summit Roofing Co',
      backupVendors: ['TopShield Roofing', 'Apex Roofing'],
      location: 'All Buildings - Rooftops',
      estimatedDuration: 4,
      cost: 650,
      lastCompleted: '2023-10-15',
      nextDue: '2024-04-15',
      status: 'Scheduled',
      compliance: {
        required: false,
        regulation: '',
        certificate: ''
      },
      alerts: {
        sevenDay: true,
        threeDay: false,
        sameDay: false,
        escalation: false
      },
      history: [
        {
          id: 'H-009',
          completedDate: '2023-10-15',
          vendor: 'Summit Roofing Co',
          duration: 4.0,
          cost: 650,
          notes: 'Bi-annual roof inspection completed. Cleared debris from gutters, sealed minor cracks, inspected flashing. Roof in good condition overall.',
          rating: 5,
        }
      ]
    }
  ];

  const mockAIForecast: AIForecast = {
    missedTasksPrediction: [
      {
        taskId: 'PM-003',
        taskTitle: 'Elevator Safety Inspection',
        riskLevel: 'High',
        probability: 85,
        reasons: [
          'Task is already overdue by 2 weeks',
          'Vendor has 15% historical delay rate',
          'Critical compliance requirement'
        ]
      },
      {
        taskId: 'PM-001',
        taskTitle: 'HVAC Filter Replacement',
        riskLevel: 'Medium',
        probability: 35,
        reasons: [
          'Vendor has high workload this month',
          'Weather conditions may cause delays'
        ]
      }
    ],
    suggestedPM: [
      {
        equipment: 'Parking Lot Lighting',
        suggestedFrequency: 'Quarterly',
        reasoning: 'Recent increase in lighting failures suggests preventive maintenance needed',
        potentialSavings: 2400
      },
      {
        equipment: 'Roof Drainage System',
        suggestedFrequency: 'Semi-Annual',
        reasoning: 'Weather patterns indicate increased debris accumulation risk',
        potentialSavings: 1800
      }
    ],
    vendorPerformance: [
      {
        vendor: 'Arctic Air Solutions',
        reliabilityScore: 95,
        avgResponseTime: 2.3,
        recommendations: ['Excellent performance', 'Consider expanding scope']
      },
      {
        vendor: 'SafeLift Services',
        reliabilityScore: 78,
        avgResponseTime: 4.1,
        recommendations: ['Monitor closely', 'Consider backup vendor activation']
      }
    ]
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'Scheduled': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Due Soon': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Overdue': 'bg-red-500/20 text-red-400 border-red-500/30',
      'In Progress': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Completed': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Missed': 'bg-red-600/20 text-red-300 border-red-600/30'
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

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newDate: string) => {
    e.preventDefault();
    if (draggedTask) {
      // In a real app, this would update the task's due date
      alert(`Task ${draggedTask} rescheduled to ${newDate}`);
      setDraggedTask(null);
    }
  };

  const filteredTasks = mockTasks.filter(task => {
    const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  // Reset filters when switching to scheduler tab
  useEffect(() => {
    if (activeTab === 'scheduler') {
      setFilterCategory('all');
      setFilterStatus('all');
      setSearchTerm('');
    }
  }, [activeTab]);

  const exportComplianceReport = () => {
    alert('📊 Compliance Report Export Started!\n\n📋 Report Contents:\n• Fire Safety Compliance (NFPA 10) - Current\n• Elevator Safety (ASME A17.1) - Current\n• Electrical Safety (NEC 110.14) - Current\n• 47 Fire extinguishers inspected\n• 4 Elevators certified\n• All electrical panels tested\n\n📄 Format: PDF with certificates attached\n📧 Email: Sent to compliance@company.com\n💾 Download: Available in 2-3 minutes\n\n✅ Report ID: COMP-2024-001');
  };

  const scheduleTask = (taskId: string) => {
    const task = mockTasks.find(t => t.id === taskId);
    if (!task) return;
    
    alert(`📅 Task Scheduled Successfully!\n\n📋 Task: ${task.title}\n🏢 Location: ${task.location}\n👷 Vendor: ${task.assignedVendor}\n📅 Scheduled Date: ${new Date(task.nextDue).toLocaleDateString()}\n⏰ Duration: ${task.estimatedDuration} hours\n💰 Cost: ${formatCurrency(task.cost)}\n\n✅ Work order created and vendor notified\n📧 Calendar invite sent to all stakeholders\n🔔 Reminder alerts configured`);
  };

  const completeTask = (taskId: string) => {
    const task = mockTasks.find(t => t.id === taskId);
    if (!task) return;
    
    alert(`✅ Task Marked as Complete!\n\n📋 Task: ${task.title}\n👷 Vendor: ${task.assignedVendor}\n📅 Completion Date: ${new Date().toLocaleDateString()}\n⏰ Duration: ${task.estimatedDuration} hours\n💰 Final Cost: ${formatCurrency(task.cost)}\n\n📝 Next Steps:\n• Quality rating requested from client\n• Next occurrence scheduled automatically\n• Compliance certificate updated\n• Vendor payment processed`);
  };

  const rescheduleTask = (taskId: string) => {
    const task = mockTasks.find(t => t.id === taskId);
    if (!task) return;
    
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + 7);
    
    alert(`📅 Task Rescheduled!\n\n📋 Task: ${task.title}\n📅 Original Date: ${new Date(task.nextDue).toLocaleDateString()}\n📅 New Date: ${newDate.toLocaleDateString()}\n📝 Reason: Client request\n\n✅ Updates:\n• Vendor notified of schedule change\n• Calendar invites updated\n• Alert notifications adjusted\n• Compliance timeline updated`);
  };

  const generateWorkOrder = (taskId: string) => {
    const task = mockTasks.find(t => t.id === taskId);
    if (!task) return;
    
    const woNumber = `WO-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`;
    
    alert(`📋 Work Order Generated!\n\n🆔 Work Order: ${woNumber}\n📋 Task: ${task.title}\n🏢 Location: ${task.location}\n👷 Assigned Vendor: ${task.assignedVendor}\n📅 Scheduled: ${new Date(task.nextDue).toLocaleDateString()}\n⏰ Duration: ${task.estimatedDuration} hours\n💰 Budget: ${formatCurrency(task.cost)}\n\n📧 Notifications sent to:\n• ${task.assignedVendor}\n• Facilities Manager\n• Property Manager\n\n🔗 Work order tracking available in system`);
  };

  const addNewTask = () => {
    alert(`➕ Add New PM Task\n\n📋 Task Creation Form:\n• Task title and description\n• Category and priority selection\n• Frequency configuration\n• Vendor assignment\n• Location and duration\n• Compliance requirements\n• Alert settings\n\n✅ Features:\n• Template library available\n• Bulk task creation\n• Recurring schedule setup\n• Vendor auto-assignment\n• Compliance validation`);
  };

  const bulkSchedule = () => {
    alert(`📅 Bulk Schedule Operations\n\n🔧 Available Actions:\n• Schedule all overdue tasks\n• Reschedule by category\n• Vendor availability optimization\n• Seasonal schedule adjustment\n\n📊 Current Status:\n• 1 Overdue task (Elevator Inspection)\n• 3 Due within 30 days\n• 2 Scheduled for next quarter\n\n✅ Bulk operations will:\n• Optimize vendor schedules\n• Minimize facility disruption\n• Ensure compliance deadlines\n• Send consolidated notifications`);
  };

  const downloadCalendar = () => {
    alert(`📅 PM Calendar Download\n\n📄 Calendar Export Options:\n• iCal format (.ics)\n• Google Calendar integration\n• Outlook calendar sync\n• PDF schedule printout\n\n📋 Includes:\n• All scheduled PM tasks\n• Vendor assignments\n• Compliance deadlines\n• Alert reminders\n• Location details\n\n✅ Calendar file generated: PM_Schedule_2024.ics\n📧 Download link sent to your email`);
  };

  const viewCertificate = (taskId: string) => {
    const task = mockTasks.find(t => t.id === taskId);
    if (!task) return;

    const certificateData = {
      'PM-002': {
        title: 'Fire Safety Compliance Certificate',
        number: 'FSC-2024-001',
        issuedBy: 'SafeGuard Fire Protection',
        issuedDate: '2024-01-10',
        expiresDate: '2024-02-10',
        regulation: 'NFPA 10 - Standard for Portable Fire Extinguishers',
        scope: 'Monthly inspection of 47 fire extinguishers across all buildings',
        findings: 'All fire extinguishers operational and compliant. 2 units replaced due to expiration.',
        inspector: 'Mike Rodriguez - Certified Fire Safety Inspector',
        license: 'FSI-12345'
      },
      'PM-003': {
        title: 'Elevator Safety Certificate',
        number: 'ESC-2023-004',
        issuedBy: 'SafeLift Services',
        issuedDate: '2023-11-15',
        expiresDate: '2024-02-15',
        regulation: 'ASME A17.1 - Safety Code for Elevators and Escalators',
        scope: 'Quarterly safety inspection of 4 passenger elevators',
        findings: 'All elevators meet safety requirements. Minor door sensor adjustment on Unit 2.',
        inspector: 'David Chen - Licensed Elevator Inspector',
        license: 'ELI-67890'
      },
      'PM-005': {
        title: 'Electrical Safety Certificate',
        number: 'ELC-2023-003',
        issuedBy: 'PowerTech Electrical',
        issuedDate: '2023-03-15',
        expiresDate: '2024-03-15',
        regulation: 'NEC 110.14 - Electrical Connections',
        scope: 'Annual electrical panel inspection and testing',
        findings: 'All electrical panels tested and certified. Connections tightened on Panel 3B.',
        inspector: 'Sarah Wilson - Master Electrician',
        license: 'ME-54321'
      }
    };

    const cert = certificateData[taskId as keyof typeof certificateData];
    if (cert) {
      setSelectedCertificate(taskId);
    } else {
      alert('📄 Certificate Not Available\n\nThis task does not have an associated compliance certificate.');
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-xl border border-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-blue-400 font-semibold">Total Tasks</h3>
            <Calendar className="text-blue-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{mockTasks.length}</div>
          <div className="text-sm text-blue-300 mt-1">Active maintenance tasks</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 p-6 rounded-xl border border-yellow-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-yellow-400 font-semibold">Due Soon</h3>
            <Clock className="text-yellow-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">
            {mockTasks.filter(t => t.status === 'Due Soon').length}
          </div>
          <div className="text-sm text-yellow-300 mt-1">Next 7 days</div>
        </div>

        <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 p-6 rounded-xl border border-red-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-red-400 font-semibold">Overdue</h3>
            <AlertTriangle className="text-red-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">
            {mockTasks.filter(t => t.status === 'Overdue').length}
          </div>
          <div className="text-sm text-red-300 mt-1">Requires immediate attention</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-6 rounded-xl border border-green-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-green-400 font-semibold">Compliance</h3>
            <Shield className="text-green-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">
            {Math.round((mockTasks.filter(t => t.compliance.required && t.status !== 'Overdue').length / mockTasks.filter(t => t.compliance.required).length) * 100)}%
          </div>
          <div className="text-sm text-green-300 mt-1">Compliance rate</div>
        </div>
      </div>

      {/* AI Forecast Section */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Brain className="mr-2 text-teal-400" size={20} />
          AI Forecast & Recommendations
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Missed Tasks Prediction */}
          <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
            <h4 className="text-red-400 font-semibold mb-3">Risk of Missed Tasks</h4>
            <div className="space-y-3">
              {mockAIForecast.missedTasksPrediction.map((prediction, index) => (
                <div key={index} className="p-3 bg-red-500/5 rounded border border-red-500/10">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-white font-medium text-sm">{prediction.taskTitle}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      prediction.riskLevel === 'High' ? 'bg-red-500 text-white' :
                      prediction.riskLevel === 'Medium' ? 'bg-yellow-500 text-black' :
                      'bg-green-500 text-white'
                    }`}>
                      {prediction.probability}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {prediction.reasons[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested PM */}
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
            <h4 className="text-blue-400 font-semibold mb-3">Suggested New PM</h4>
            <div className="space-y-3">
              {mockAIForecast.suggestedPM.map((suggestion, index) => (
                <div key={index} className="p-3 bg-blue-500/5 rounded border border-blue-500/10">
                  <div className="text-white font-medium text-sm mb-1">{suggestion.equipment}</div>
                  <div className="text-blue-400 text-xs mb-1">{suggestion.suggestedFrequency}</div>
                  <div className="text-green-400 text-xs font-medium">
                    Potential savings: {formatCurrency(suggestion.potentialSavings)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vendor Performance */}
          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
            <h4 className="text-purple-400 font-semibold mb-3">Vendor Performance</h4>
            <div className="space-y-3">
              {mockAIForecast.vendorPerformance.map((vendor, index) => (
                <div key={index} className="p-3 bg-purple-500/5 rounded border border-purple-500/10">
                  <div className="text-white font-medium text-sm mb-1">{vendor.vendor}</div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Reliability:</span>
                    <span className={`font-medium ${
                      vendor.reliabilityScore >= 90 ? 'text-green-400' :
                      vendor.reliabilityScore >= 80 ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {vendor.reliabilityScore}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {vendor.recommendations[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Recent Tasks</h3>
          <button
            onClick={() => setActiveTab('scheduler')}
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
          >
            View All Tasks
          </button>
        </div>
        
        <div className="space-y-3">
          {mockTasks.slice(0, 3).map((task) => (
            <div key={task.id} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-white">{task.title}</h4>
                  <p className="text-gray-400 text-sm">{task.description}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>Due: {new Date(task.nextDue).toLocaleDateString()}</span>
                <span>Vendor: {task.assignedVendor}</span>
              </div>
              <div className="flex items-center space-x-2 mt-3">
                <button
                  onClick={() => scheduleTask(task.id)}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  <Calendar size={14} className="inline mr-1" />
                  Schedule
                </button>
                {task.status === 'In Progress' && (
                  <button
                    onClick={() => completeTask(task.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    <CheckCircle size={14} className="inline mr-1" />
                    Complete
                  </button>
                )}
                {(task.status === 'Scheduled' || task.status === 'Due Soon') && (
                  <button
                    onClick={() => rescheduleTask(task.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    <Clock size={14} className="inline mr-1" />
                    Reschedule
                  </button>
                )}
                {task.status === 'Overdue' && (
                  <button
                    onClick={() => generateWorkOrder(task.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    <FileText size={14} className="inline mr-1" />
                    Work Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderScheduler = () => (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search tasks..."
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
            <option value="Fire Safety">Fire Safety</option>
            <option value="Elevator">Elevator</option>
            <option value="General">General</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Due Soon">Due Soon</option>
            <option value="Overdue">Overdue</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={bulkSchedule}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
          >
            <Calendar size={16} className="inline mr-2" />
            Bulk Schedule
          </button>
          <button
            onClick={downloadCalendar}
            className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Download size={16} className="inline mr-2" />
            Export Calendar
          </button>
          <button
            onClick={addNewTask}
            className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
          >
            <Plus size={16} />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Drag & Drop Calendar View */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Calendar className="mr-2 text-teal-400" size={20} />
          Drag & Drop Scheduler
        </h3>
        
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="text-center font-medium text-gray-400 p-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2 min-h-96">
          {Array.from({ length: 35 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - date.getDay() + 1 + i);
            const dateStr = date.toISOString().split('T')[0];
            
            const tasksForDay = filteredTasks.filter(task => 
              task.nextDue.startsWith(dateStr)
            );
            
            return (
              <div
                key={i}
                className="border border-gray-700/30 rounded p-2 min-h-24 bg-gray-800/20"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, dateStr)}
              >
                <div className="text-xs text-gray-400 mb-1">
                  {date.getDate()}
                </div>
                <div className="space-y-1">
                  {tasksForDay.map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => handleDragStart(task.id)}
                      className={`p-1 rounded text-xs cursor-move border ${getStatusColor(task.status)}`}
                      onClick={() => setSelectedTask(task.id)}
                    >
                      {task.title.substring(0, 20)}...
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-4">All Tasks</h3>
        
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div key={task.id} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30 hover:border-teal-500/50 transition-all duration-300">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1">{task.title}</h4>
                  <p className="text-gray-400 text-sm mb-2">{task.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>Category: {task.category}</span>
                    <span>•</span>
                    <span>Frequency: {task.frequency}</span>
                    <span>•</span>
                    <span>Vendor: {task.assignedVendor}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  {task.compliance.required && (
                    <span className="px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      COMPLIANCE
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-400">Due: {new Date(task.nextDue).toLocaleDateString()}</span>
                  <span className="text-teal-400">{formatCurrency(task.cost)}</span>
                  <span className="text-gray-400">{task.estimatedDuration}h</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => viewCertificate(task.id)}
                    className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    View Details
                  </button>
                  <button className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded text-sm transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTaskDetails = () => {
    const task = mockTasks.find(t => t.id === selectedTask);
    if (!task) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedTask(null)}
            className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors"
          >
            <Home size={20} />
            <span>Back to Tasks</span>
          </button>
          <div className="flex items-center space-x-2">
            <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors">
              <Edit size={16} className="inline mr-2" />
              Edit Task
            </button>
            <button
              onClick={() => rescheduleTask(task.id)}
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Calendar size={16} className="inline mr-2" />
              Reschedule
            </button>
          </div>
        </div>

        {/* Task Header */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">{task.title}</h2>
              <p className="text-gray-400 mb-4">{task.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>Task ID: {task.id}</span>
                <span>•</span>
                <span>Category: {task.category}</span>
                <span>•</span>
                <span>Frequency: {task.frequency}</span>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
              <span className={`px-3 py-2 rounded-full text-sm font-medium border ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
              {task.compliance.required && (
                <span className="px-3 py-2 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  COMPLIANCE
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="text-lg font-bold text-blue-400">{formatCurrency(task.cost)}</div>
              <div className="text-xs text-blue-300">Estimated Cost</div>
            </div>
            <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="text-lg font-bold text-green-400">{task.estimatedDuration}h</div>
              <div className="text-xs text-green-300">Duration</div>
            </div>
            <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="text-lg font-bold text-purple-400">
                {task.lastCompleted ? new Date(task.lastCompleted).toLocaleDateString() : 'Never'}
              </div>
              <div className="text-xs text-purple-300">Last Completed</div>
            </div>
            <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <div className="text-lg font-bold text-yellow-400">
                {new Date(task.nextDue).toLocaleDateString()}
              </div>
              <div className="text-xs text-yellow-300">Next Due</div>
            </div>
          </div>
        </div>

        {/* Task Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h3 className="text-xl font-semibold text-white mb-4">Task Information</h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-400">Location:</span>
                <p className="text-white">{task.location}</p>
              </div>
              <div>
                <span className="text-gray-400">Assigned Vendor:</span>
                <p className="text-white">{task.assignedVendor}</p>
              </div>
              <div>
                <span className="text-gray-400">Backup Vendors:</span>
                <p className="text-white">{task.backupVendors.join(', ')}</p>
              </div>
              <div>
                <span className="text-gray-400">Estimated Duration:</span>
                <p className="text-white">{task.estimatedDuration} hours</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h3 className="text-xl font-semibold text-white mb-4">Compliance & Alerts</h3>
            <div className="space-y-3">
              {task.compliance.required ? (
                <div>
                  <span className="text-gray-400">Regulation:</span>
                  <p className="text-white">{task.compliance.regulation}</p>
                  <span className="text-gray-400">Certificate:</span>
                  <p className="text-white">{task.compliance.certificate}</p>
                </div>
              ) : (
                <div>
                  <span className="text-gray-400">Compliance:</span>
                  <p className="text-white">Not required</p>
                </div>
              )}
              <div>
                <span className="text-gray-400">Alert Settings:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {task.alerts.sevenDay && (
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">7-Day Alert</span>
                  )}
                  {task.alerts.threeDay && (
                    <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs">3-Day Alert</span>
                  )}
                  {task.alerts.sameDay && (
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">Same-Day Alert</span>
                  )}
                  {task.alerts.escalation && (
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">Escalation</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance History */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <h3 className="text-xl font-semibold text-white mb-4">Maintenance History</h3>
          {task.history.length > 0 ? (
            <div className="space-y-4">
              {task.history.map((record) => (
                <div key={record.id} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-white font-semibold">
                        Completed: {new Date(record.completedDate).toLocaleDateString()}
                      </h4>
                      <p className="text-gray-400 text-sm">Vendor: {record.vendor}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-teal-400 font-semibold">{formatCurrency(record.cost)}</div>
                      <div className="text-gray-400 text-sm">{record.duration}h duration</div>
                      <div className="flex items-center space-x-1 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={star <= record.rating ? 'text-yellow-400' : 'text-gray-600'}
                          >
                            ★
                          </span>
                        ))}
                        <span className="text-gray-400 text-sm ml-1">({record.rating}/5)</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="text-gray-400">Notes:</span>
                    <p className="text-gray-300 text-sm">{record.notes}</p>
                  </div>
                  {record.issues && (
                    <div className="p-2 bg-yellow-500/10 rounded border border-yellow-500/20">
                      <span className="text-yellow-400 text-sm font-medium">Issues Noted:</span>
                      <p className="text-yellow-300 text-sm">{record.issues}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Calendar className="mx-auto mb-2" size={48} />
              <p>No maintenance history available</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAlerts = () => (
    <div className="space-y-6">
      {/* Alert Configuration */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Bell className="mr-2 text-teal-400" size={20} />
          Alert Configuration
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
            <h4 className="text-yellow-400 font-semibold mb-3">7-Day Alerts</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Email Notifications</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-teal-500 bg-gray-700 border-gray-600 rounded focus:ring-teal-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">SMS Alerts</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-teal-500 bg-gray-700 border-gray-600 rounded focus:ring-teal-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Dashboard Notifications</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-teal-500 bg-gray-700 border-gray-600 rounded focus:ring-teal-500" />
              </div>
            </div>
          </div>

          <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
            <h4 className="text-orange-400 font-semibold mb-3">3-Day Alerts</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Email Notifications</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-teal-500 bg-gray-700 border-gray-600 rounded focus:ring-teal-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">SMS Alerts</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-teal-500 bg-gray-700 border-gray-600 rounded focus:ring-teal-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Vendor Notifications</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-teal-500 bg-gray-700 border-gray-600 rounded focus:ring-teal-500" />
              </div>
            </div>
          </div>

          <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
            <h4 className="text-red-400 font-semibold mb-3">Same-Day Alerts</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Urgent Email</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-teal-500 bg-gray-700 border-gray-600 rounded focus:ring-teal-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Phone Calls</span>
                <input type="checkbox" className="w-4 h-4 text-teal-500 bg-gray-700 border-gray-600 rounded focus:ring-teal-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Escalation Trigger</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-teal-500 bg-gray-700 border-gray-600 rounded focus:ring-teal-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-4">Active Alerts</h3>
        
        <div className="space-y-3">
          <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="text-red-400" size={20} />
                <span className="text-white font-semibold">OVERDUE: Elevator Safety Inspection</span>
              </div>
              <span className="text-red-400 text-sm">2 weeks overdue</span>
            </div>
            <p className="text-gray-300 text-sm mb-2">Critical compliance task requires immediate attention</p>
            <div className="flex items-center space-x-2">
              <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors">
                Escalate Now
              </button>
              <button className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-sm transition-colors">
                Contact Vendor
              </button>
            </div>
          </div>

          <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <Clock className="text-yellow-400" size={20} />
                <span className="text-white font-semibold">DUE SOON: HVAC Filter Replacement</span>
              </div>
              <span className="text-yellow-400 text-sm">Due in 3 days</span>
            </div>
            <p className="text-gray-300 text-sm mb-2">Monthly maintenance scheduled with Arctic Air Solutions</p>
            <div className="flex items-center space-x-2">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded text-sm transition-colors">
                Confirm Schedule
              </button>
              <button className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-sm transition-colors">
                Reschedule
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Escalation Rules */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Users className="mr-2 text-teal-400" size={20} />
          Escalation Rules
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
            <h4 className="text-white font-semibold mb-2">Unacknowledged PM Tasks</h4>
            <p className="text-gray-400 text-sm mb-3">When primary vendor doesn't acknowledge task within 2 hours</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Step 1: Reminder</label>
                <select className="w-full px-3 py-2 bg-white/5 border border-gray-600/50 rounded text-white text-sm focus:outline-none focus:border-teal-500">
                  <option>Send SMS + Email</option>
                  <option>Phone Call</option>
                  <option>Skip</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Step 2: Backup Vendor</label>
                <select className="w-full px-3 py-2 bg-white/5 border border-gray-600/50 rounded text-white text-sm focus:outline-none focus:border-teal-500">
                  <option>Auto-assign backup</option>
                  <option>Manual selection</option>
                  <option>Skip</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Step 3: Management</label>
                <select className="w-full px-3 py-2 bg-white/5 border border-gray-600/50 rounded text-white text-sm focus:outline-none focus:border-teal-500">
                  <option>Notify FM Manager</option>
                  <option>Escalate to Director</option>
                  <option>Emergency protocol</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
            <h4 className="text-white font-semibold mb-2">Overdue Critical Tasks</h4>
            <p className="text-gray-400 text-sm mb-3">Immediate escalation for compliance-critical overdue tasks</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-teal-500 bg-gray-700 border-gray-600 rounded focus:ring-teal-500" />
                <span className="text-gray-300 text-sm">Auto-activate backup vendors</span>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-teal-500 bg-gray-700 border-gray-600 rounded focus:ring-teal-500" />
                <span className="text-gray-300 text-sm">Emergency notifications</span>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 text-teal-500 bg-gray-700 border-gray-600 rounded focus:ring-teal-500" />
                <span className="text-gray-300 text-sm">Client notifications</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCertificateModal = () => {
    if (!selectedCertificate) return null;

    const task = mockTasks.find(t => t.id === selectedCertificate);
    if (!task) return null;

    const certificateData = {
      'PM-002': {
        title: 'Fire Safety Compliance Certificate',
        number: 'FSC-2024-001',
        issuedBy: 'SafeGuard Fire Protection',
        issuedDate: '2024-01-10',
        expiresDate: '2024-02-10',
        regulation: 'NFPA 10 - Standard for Portable Fire Extinguishers',
        scope: 'Monthly inspection of 47 fire extinguishers across all buildings',
        findings: 'All fire extinguishers operational and compliant. 2 units replaced due to expiration.',
        inspector: 'Mike Rodriguez - Certified Fire Safety Inspector',
        license: 'FSI-12345'
      },
      'PM-003': {
        title: 'Elevator Safety Certificate',
        number: 'ESC-2023-004',
        issuedBy: 'SafeLift Services',
        issuedDate: '2023-11-15',
        expiresDate: '2024-02-15',
        regulation: 'ASME A17.1 - Safety Code for Elevators and Escalators',
        scope: 'Quarterly safety inspection of 4 passenger elevators',
        findings: 'All elevators meet safety requirements. Minor door sensor adjustment on Unit 2.',
        inspector: 'David Chen - Licensed Elevator Inspector',
        license: 'ELI-67890'
      },
      'PM-005': {
        title: 'Electrical Safety Certificate',
        number: 'ELC-2023-003',
        issuedBy: 'PowerTech Electrical',
        issuedDate: '2023-03-15',
        expiresDate: '2024-03-15',
        regulation: 'NEC 110.14 - Electrical Connections',
        scope: 'Annual electrical panel inspection and testing',
        findings: 'All electrical panels tested and certified. Connections tightened on Panel 3B.',
        inspector: 'Sarah Wilson - Master Electrician',
        license: 'ME-54321'
      }
    };

    const cert = certificateData[selectedCertificate as keyof typeof certificateData];
    if (!cert) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="bg-slate-900 rounded-2xl border border-gray-700/30 w-full max-w-4xl max-h-[95vh] overflow-hidden shadow-2xl">
          {/* Certificate Header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 border-b border-gray-700/50">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">{cert.title}</h2>
                <p className="text-gray-400">Certificate #{cert.number}</p>
              </div>
              <button 
                onClick={() => setSelectedCertificate(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Certificate Content */}
          <div className="p-8 overflow-y-auto">
            <div className="bg-white text-black p-8 rounded-lg border-4 border-blue-600">
              {/* Certificate Header */}
              <div className="text-center mb-8">
                <div className="text-3xl font-bold text-blue-600 mb-2">COMPLIANCE CERTIFICATE</div>
                <div className="text-xl font-semibold text-gray-800">{cert.title}</div>
                <div className="text-lg text-gray-600">Certificate #{cert.number}</div>
              </div>

              {/* Certificate Body */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Certificate Details</h3>
                    <div className="space-y-2">
                      <div><strong>Issued By:</strong> {cert.issuedBy}</div>
                      <div><strong>Issue Date:</strong> {new Date(cert.issuedDate).toLocaleDateString()}</div>
                      <div><strong>Expiration Date:</strong> {new Date(cert.expiresDate).toLocaleDateString()}</div>
                      <div><strong>Regulation:</strong> {cert.regulation}</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Inspector Information</h3>
                    <div className="space-y-2">
                      <div><strong>Inspector:</strong> {cert.inspector}</div>
                      <div><strong>License #:</strong> {cert.license}</div>
                      <div><strong>Property:</strong> Metro Office Complex</div>
                      <div><strong>Address:</strong> 123 Business Ave, Oklahoma City, OK</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Scope of Inspection</h3>
                  <p className="text-gray-700">{cert.scope}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Findings & Results</h3>
                  <p className="text-gray-700">{cert.findings}</p>
                </div>

                <div className="border-t-2 border-blue-600 pt-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600 mb-2">✓ COMPLIANT</div>
                    <div className="text-sm text-gray-600">
                      This certificate verifies compliance with applicable safety regulations and standards.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mt-6">
              <button 
                onClick={() => alert('📄 Certificate downloaded as PDF!')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
              >
                Download PDF
              </button>
              <button 
                onClick={() => alert('📧 Certificate emailed to compliance@company.com')}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
              >
                Email Certificate
              </button>
              <button 
                onClick={() => setSelectedCertificate(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCompliance = () => (
    <div className="space-y-6">
      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-6 rounded-xl border border-green-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-green-400 font-semibold">Compliant</h3>
            <CheckCircle className="text-green-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">
            {mockTasks.filter(t => t.compliance.required && t.status !== 'Overdue').length}
          </div>
          <div className="text-sm text-green-300 mt-1">Tasks up to date</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 p-6 rounded-xl border border-yellow-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-yellow-400 font-semibold">Due Soon</h3>
            <Clock className="text-yellow-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">
            {mockTasks.filter(t => t.compliance.required && t.status === 'Due Soon').length}
          </div>
          <div className="text-sm text-yellow-300 mt-1">Requires attention</div>
        </div>

        <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 p-6 rounded-xl border border-red-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-red-400 font-semibold">Non-Compliant</h3>
            <AlertTriangle className="text-red-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">
            {mockTasks.filter(t => t.compliance.required && t.status === 'Overdue').length}
          </div>
          <div className="text-sm text-red-300 mt-1">Immediate action needed</div>
        </div>
      </div>

      {/* Compliance Tasks */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Compliance Tasks</h3>
          <button 
            onClick={exportComplianceReport}
            className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
          >
            <Download size={16} />
            <span>Export Report</span>
          </button>
        </div>
        
        <div className="space-y-3">
          {mockTasks.filter(t => t.compliance.required).map((task) => (
            <div key={task.id} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1">{task.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                    <span>Regulation: {task.compliance.regulation}</span>
                    <span>•</span>
                    <span>Certificate: {task.compliance.certificate}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{task.description}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                  <span className="px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    COMPLIANCE REQUIRED
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-400">Due: {new Date(task.nextDue).toLocaleDateString()}</span>
                  <span className="text-gray-400">Vendor: {task.assignedVendor}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => viewCertificate(task.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    View Certificate
                  </button>
                  <button className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded text-sm transition-colors">
                    Schedule Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Reports */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <FileText className="mr-2 text-teal-400" size={20} />
          Compliance Reports
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <h4 className="text-blue-400 font-semibold mb-2">Monthly Compliance Report</h4>
            <p className="text-gray-300 text-sm mb-3">Comprehensive compliance status for all required maintenance tasks</p>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Last generated: Jan 1, 2024</span>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
                Generate
              </button>
            </div>
          </div>

          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <h4 className="text-green-400 font-semibold mb-2">Audit Trail Report</h4>
            <p className="text-gray-300 text-sm mb-3">Detailed history of all compliance-related activities and certifications</p>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Last generated: Dec 15, 2023</span>
              <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors">
                Generate
              </button>
            </div>
          </div>
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
              <h1 className="text-2xl font-semibold">Preventative Maintenance System</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">AI-Powered Scheduling & Forecasting</span>
                <span className="text-xs text-gray-400">• Smart Alerts • Compliance Tracking</span>
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
          <strong className="text-teal-400">Demo Mode:</strong> This interface demonstrates comprehensive preventative maintenance management with AI forecasting, drag & drop scheduling, custom alerts, and compliance reporting.
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'scheduler', label: 'Drag & Drop Scheduler', icon: Calendar },
            { id: 'alerts', label: 'Custom Alerts', icon: Bell },
            { id: 'compliance', label: 'Compliance Reporting', icon: Shield }
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
        {selectedTask ? renderTaskDetails() : (
          <>
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'scheduler' && renderScheduler()}
            {activeTab === 'alerts' && renderAlerts()}
            {activeTab === 'compliance' && renderCompliance()}
          </>
        )}
        
        {/* Certificate Modal */}
        {renderCertificateModal()}
      </div>
    </div>
  );
};

export default PreventativeMaintenanceSystem;