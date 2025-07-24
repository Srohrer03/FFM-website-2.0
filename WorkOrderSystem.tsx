import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Plus, Search, Filter, Calendar, Clock, DollarSign, 
  User, MapPin, Wrench, AlertTriangle, CheckCircle, X, 
  Eye, Edit, Trash2, Star, Award, Phone, Mail, FileText,
  TrendingUp, Users, Shield, Zap, Target, Activity
} from 'lucide-react';
import Logo from './Logo';

interface WorkOrder {
  id: string;
  title: string;
  description: string;
  category: 'HVAC' | 'Plumbing' | 'Electrical' | 'Roofing' | 'Cleaning' | 'General';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Draft' | 'Active Bidding' | 'Vendor Selected' | 'In Progress' | 'Completed' | 'Cancelled';
  location: string;
  requestedBy: string;
  createdDate: string;
  dueDate: string;
  estimatedBudget: number;
  actualCost?: number;
  assignedVendor?: string;
  bids: Bid[];
  attachments: string[];
  notes: string;
  compliance?: {
    required: boolean;
    regulation: string;
  };
}

interface Bid {
  id: string;
  vendorName: string;
  vendorId: string;
  amount: number;
  timeline: string;
  submittedAt: string;
  status: 'Submitted' | 'Under Review' | 'Accepted' | 'Rejected';
  proposal: string;
  warranty: string;
  certifications: string[];
  rating: number;
  completedJobs: number;
  responseTime: string;
  availability: string;
  materials: {
    description: string;
    cost: number;
  }[];
  labor: {
    description: string;
    hours: number;
    rate: number;
  }[];
  notes?: string;
}

const WorkOrderSystem = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<string | null>(null);
  const [selectedBid, setSelectedBid] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newWorkOrder, setNewWorkOrder] = useState({
    title: '',
    description: '',
    category: '',
    priority: '',
    location: '',
    requestedBy: '',
    dueDate: '',
    estimatedBudget: '',
    notes: '',
    attachments: [] as string[],
    compliance: {
      required: false,
      regulation: ''
    }
  });
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Comprehensive mock data
  const mockWorkOrders: WorkOrder[] = [
    {
      id: 'WO-2024-001',
      title: 'HVAC System Replacement - Building A',
      description: 'Complete replacement of aging HVAC system in main building. System is 15 years old and experiencing frequent breakdowns. Requires energy-efficient units with smart controls.',
      category: 'HVAC',
      priority: 'High',
      status: 'Active Bidding',
      location: 'Building A - Mechanical Room, Floors 1-5',
      requestedBy: 'John Smith - Facilities Manager',
      createdDate: '2024-01-15',
      dueDate: '2024-02-15',
      estimatedBudget: 25000,
      bids: [
        {
          id: 'BID-001',
          vendorName: 'Arctic Air Solutions',
          vendorId: 'VEN-001',
          amount: 23500,
          timeline: '10-12 business days',
          submittedAt: '2024-01-16 10:30 AM',
          status: 'Submitted',
          proposal: 'Complete HVAC system replacement with Carrier 50TCQ series rooftop units. Includes new ductwork inspection, smart thermostat installation, and 5-year warranty on all equipment.',
          warranty: '5 years parts and labor, 10 years compressor',
          certifications: ['EPA Section 608', 'NATE Certified', 'Carrier Factory Authorized'],
          rating: 4.9,
          completedJobs: 127,
          responseTime: '2.3 hours',
          availability: 'Available immediately',
          materials: [
            { description: 'Carrier 50TCQ rooftop units (2 units)', cost: 12000 },
            { description: 'Smart thermostats and controls', cost: 2500 },
            { description: 'Ductwork modifications and sealing', cost: 1500 },
            { description: 'Electrical connections and startup', cost: 800 }
          ],
          labor: [
            { description: 'System removal and disposal', hours: 16, rate: 85 },
            { description: 'New system installation', hours: 24, rate: 85 },
            { description: 'Testing and commissioning', hours: 8, rate: 95 },
            { description: 'Training and documentation', hours: 4, rate: 95 }
          ],
          notes: 'Can start immediately upon approval. Includes after-hours work to minimize disruption.'
        },
        {
          id: 'BID-002',
          vendorName: 'CoolTech HVAC Services',
          vendorId: 'VEN-002',
          amount: 26800,
          timeline: '14-16 business days',
          submittedAt: '2024-01-16 02:15 PM',
          status: 'Submitted',
          proposal: 'Premium HVAC replacement using Trane Precedent series units with advanced building automation integration. Includes comprehensive ductwork upgrade and energy management system.',
          warranty: '7 years comprehensive warranty',
          certifications: ['EPA Universal', 'Trane Comfort Specialist', 'BAS Certified'],
          rating: 4.7,
          completedJobs: 89,
          responseTime: '3.1 hours',
          availability: 'Available in 1 week',
          materials: [
            { description: 'Trane Precedent rooftop units (2 units)', cost: 14500 },
            { description: 'Building automation system upgrade', cost: 3500 },
            { description: 'Complete ductwork replacement', cost: 2800 },
            { description: 'Energy management controls', cost: 1200 }
          ],
          labor: [
            { description: 'System removal and disposal', hours: 20, rate: 90 },
            { description: 'New system installation', hours: 32, rate: 90 },
            { description: 'BAS integration and programming', hours: 12, rate: 110 },
            { description: 'Commissioning and optimization', hours: 8, rate: 110 }
          ],
          notes: 'Includes 2-year maintenance contract and energy efficiency guarantee.'
        },
        {
          id: 'BID-003',
          vendorName: 'Climate Control Experts',
          vendorId: 'VEN-003',
          amount: 21900,
          timeline: '8-10 business days',
          submittedAt: '2024-01-17 09:45 AM',
          status: 'Submitted',
          proposal: 'Cost-effective HVAC replacement using Lennox commercial units. Focus on quick installation with minimal downtime while maintaining quality standards.',
          warranty: '3 years parts and labor',
          certifications: ['EPA Section 608', 'Lennox Premier Dealer', 'OSHA 30'],
          rating: 4.5,
          completedJobs: 156,
          responseTime: '1.8 hours',
          availability: 'Available this week',
          materials: [
            { description: 'Lennox commercial rooftop units (2 units)', cost: 10500 },
            { description: 'Basic digital controls', cost: 1200 },
            { description: 'Ductwork repairs and sealing', cost: 800 },
            { description: 'Electrical and startup', cost: 600 }
          ],
          labor: [
            { description: 'System removal', hours: 12, rate: 75 },
            { description: 'New system installation', hours: 20, rate: 75 },
            { description: 'Testing and startup', hours: 6, rate: 85 },
            { description: 'Basic training', hours: 2, rate: 85 }
          ],
          notes: 'Fastest installation timeline. Can work weekends if needed.'
        }
      ],
      attachments: ['hvac_specs.pdf', 'building_plans.dwg', 'current_system_photos.zip'],
      notes: 'Critical system replacement needed before summer season. Building houses temperature-sensitive equipment.',
      compliance: {
        required: true,
        regulation: 'ASHRAE 90.1 Energy Standard'
      }
    },
    {
      id: 'WO-2024-002',
      title: 'Emergency Plumbing Repair - Basement Flooding',
      description: 'Urgent repair needed for burst main water line in basement causing flooding. Water has been shut off to building. Immediate response required.',
      category: 'Plumbing',
      priority: 'Critical',
      status: 'Active Bidding',
      location: 'Building B - Basement Level, Mechanical Room',
      requestedBy: 'Sarah Johnson - Property Manager',
      createdDate: '2024-01-18',
      dueDate: '2024-01-19',
      estimatedBudget: 5000,
      bids: [
        {
          id: 'BID-004',
          vendorName: 'Emergency Plumbing Solutions',
          vendorId: 'VEN-004',
          amount: 4200,
          timeline: 'Same day completion',
          submittedAt: '2024-01-18 11:15 AM',
          status: 'Submitted',
          proposal: 'Emergency response for burst water main. Includes pipe replacement, water damage mitigation, and system pressure testing. Available for immediate dispatch.',
          warranty: '1 year on all repairs',
          certifications: ['Master Plumber License', '24/7 Emergency Service', 'Water Damage Certified'],
          rating: 4.8,
          completedJobs: 234,
          responseTime: '45 minutes',
          availability: 'Available now - emergency crew standing by',
          materials: [
            { description: '6-inch main water line (50 feet)', cost: 800 },
            { description: 'Pipe fittings and connections', cost: 300 },
            { description: 'Water damage mitigation supplies', cost: 400 },
            { description: 'Pressure testing equipment', cost: 100 }
          ],
          labor: [
            { description: 'Emergency response and assessment', hours: 2, rate: 150 },
            { description: 'Pipe replacement and repair', hours: 8, rate: 125 },
            { description: 'Water cleanup and mitigation', hours: 6, rate: 100 },
            { description: 'System testing and restoration', hours: 3, rate: 125 }
          ],
          notes: 'Emergency crew can be on-site within 1 hour. Includes water extraction and basic cleanup.'
        },
        {
          id: 'BID-005',
          vendorName: 'FastFlow Plumbing',
          vendorId: 'VEN-005',
          amount: 3850,
          timeline: 'Within 6 hours',
          submittedAt: '2024-01-18 12:30 PM',
          status: 'Submitted',
          proposal: 'Rapid response plumbing repair with focus on minimizing downtime. Experienced with commercial emergency repairs and water damage prevention.',
          warranty: '6 months on repairs',
          certifications: ['Licensed Plumber', 'Emergency Response Certified', 'Commercial Specialist'],
          rating: 4.6,
          completedJobs: 178,
          responseTime: '1.2 hours',
          availability: 'Can start within 2 hours',
          materials: [
            { description: 'Main water line replacement', cost: 750 },
            { description: 'Fittings and connections', cost: 250 },
            { description: 'Sealants and compounds', cost: 150 },
            { description: 'Testing materials', cost: 50 }
          ],
          labor: [
            { description: 'Emergency assessment', hours: 1, rate: 140 },
            { description: 'Pipe repair and replacement', hours: 6, rate: 110 },
            { description: 'Cleanup and restoration', hours: 4, rate: 95 },
            { description: 'Final testing', hours: 2, rate: 110 }
          ],
          notes: 'Specializes in emergency commercial repairs. Can coordinate with water damage restoration if needed.'
        }
      ],
      attachments: ['flood_damage_photos.zip', 'building_water_schematic.pdf'],
      notes: 'URGENT: Building water supply compromised. Tenants affected. Need immediate resolution.',
      compliance: {
        required: true,
        regulation: 'Local Building Code - Emergency Repairs'
      }
    },
    {
      id: 'WO-2024-003',
      title: 'Roof Inspection and Minor Repairs',
      description: 'Annual roof inspection with minor leak repairs identified during last inspection. Several areas need attention before winter weather.',
      category: 'Roofing',
      priority: 'Medium',
      status: 'Active Bidding',
      location: 'Building C - Entire Roof Surface',
      requestedBy: 'Mike Davis - Maintenance Supervisor',
      createdDate: '2024-01-17',
      dueDate: '2024-02-01',
      estimatedBudget: 3500,
      bids: [
        {
          id: 'BID-006',
          vendorName: 'Summit Roofing Company',
          vendorId: 'VEN-006',
          amount: 3200,
          timeline: '3-4 business days',
          submittedAt: '2024-01-17 03:20 PM',
          status: 'Submitted',
          proposal: 'Comprehensive roof inspection with detailed report and minor repair work. Includes sealant application, flashing repairs, and gutter maintenance.',
          warranty: '2 years on all repair work',
          certifications: ['GAF Master Elite', 'OSHA Safety Certified', 'Commercial Roofing Specialist'],
          rating: 4.9,
          completedJobs: 145,
          responseTime: '2.5 hours',
          availability: 'Available next week',
          materials: [
            { description: 'Roofing sealants and compounds', cost: 400 },
            { description: 'Flashing materials', cost: 300 },
            { description: 'Gutter repair materials', cost: 200 },
            { description: 'Safety equipment and supplies', cost: 100 }
          ],
          labor: [
            { description: 'Comprehensive roof inspection', hours: 4, rate: 85 },
            { description: 'Minor leak repairs', hours: 8, rate: 85 },
            { description: 'Flashing and sealant work', hours: 6, rate: 85 },
            { description: 'Report preparation and documentation', hours: 2, rate: 95 }
          ],
          notes: 'Includes detailed inspection report with photos and recommendations for future maintenance.'
        },
        {
          id: 'BID-007',
          vendorName: 'TopShield Roofing',
          vendorId: 'VEN-007',
          amount: 3650,
          timeline: '2-3 business days',
          submittedAt: '2024-01-18 08:45 AM',
          status: 'Submitted',
          proposal: 'Professional roof inspection and repair service with drone technology for detailed assessment. Includes preventive maintenance recommendations.',
          warranty: '3 years on repairs, 1 year on inspection',
          certifications: ['Certified Roofing Contractor', 'Drone Pilot Licensed', 'Safety Training Certified'],
          rating: 4.7,
          completedJobs: 98,
          responseTime: '3.2 hours',
          availability: 'Available this week',
          materials: [
            { description: 'Premium roofing sealants', cost: 500 },
            { description: 'Flashing and membrane materials', cost: 350 },
            { description: 'Gutter and downspout materials', cost: 250 },
            { description: 'Drone inspection equipment', cost: 150 }
          ],
          labor: [
            { description: 'Drone-assisted inspection', hours: 3, rate: 100 },
            { description: 'Detailed repair work', hours: 10, rate: 90 },
            { description: 'Preventive maintenance', hours: 4, rate: 90 },
            { description: 'Comprehensive reporting', hours: 3, rate: 100 }
          ],
          notes: 'Uses advanced drone technology for thorough inspection. Provides detailed digital report with recommendations.'
        }
      ],
      attachments: ['previous_inspection_report.pdf', 'roof_photos.zip'],
      notes: 'Part of annual maintenance program. Address issues before winter weather season.',
      compliance: {
        required: false,
        regulation: ''
      }
    },
    {
      id: 'WO-2024-004',
      title: 'Electrical Panel Upgrade - Safety Compliance',
      description: 'Upgrade aging electrical panels to meet current safety codes. Several panels are 20+ years old and need replacement for insurance compliance.',
      category: 'Electrical',
      priority: 'High',
      status: 'Active Bidding',
      location: 'Building A - Electrical Rooms, Floors 1, 3, 5',
      requestedBy: 'Lisa Chen - Safety Coordinator',
      createdDate: '2024-01-16',
      dueDate: '2024-02-10',
      estimatedBudget: 15000,
      bids: [
        {
          id: 'BID-008',
          vendorName: 'PowerTech Electrical Services',
          vendorId: 'VEN-008',
          amount: 14200,
          timeline: '5-7 business days',
          submittedAt: '2024-01-16 04:10 PM',
          status: 'Submitted',
          proposal: 'Complete electrical panel upgrade with modern safety features. Includes arc fault protection, surge suppression, and code compliance certification.',
          warranty: '5 years on all electrical work',
          certifications: ['Master Electrician', 'NECA Member', 'OSHA 30 Hour'],
          rating: 4.8,
          completedJobs: 167,
          responseTime: '2.1 hours',
          availability: 'Available in 1 week',
          materials: [
            { description: 'Main electrical panels (3 units)', cost: 4500 },
            { description: 'Circuit breakers and safety devices', cost: 2000 },
            { description: 'Wiring and conduit materials', cost: 1500 },
            { description: 'Labels and documentation', cost: 200 }
          ],
          labor: [
            { description: 'Panel removal and disposal', hours: 12, rate: 95 },
            { description: 'New panel installation', hours: 20, rate: 95 },
            { description: 'Circuit testing and commissioning', hours: 8, rate: 105 },
            { description: 'Code compliance documentation', hours: 4, rate: 105 }
          ],
          notes: 'All work performed to NEC standards. Includes permit acquisition and inspection coordination.'
        }
      ],
      attachments: ['electrical_assessment.pdf', 'code_requirements.pdf'],
      notes: 'Required for insurance compliance. Must meet current NEC standards.',
      compliance: {
        required: true,
        regulation: 'National Electrical Code (NEC)'
      }
    },
    {
      id: 'WO-2024-005',
      title: 'Deep Cleaning - Post Construction',
      description: 'Comprehensive deep cleaning following recent renovation work. Includes dust removal, floor refinishing, and window cleaning.',
      category: 'Cleaning',
      priority: 'Medium',
      status: 'Vendor Selected',
      location: 'Building D - Floors 2-4, All Common Areas',
      requestedBy: 'Tom Wilson - Operations Manager',
      createdDate: '2024-01-14',
      dueDate: '2024-01-28',
      estimatedBudget: 2500,
      assignedVendor: 'ProClean Commercial Services',
      actualCost: 2350,
      bids: [
        {
          id: 'BID-009',
          vendorName: 'ProClean Commercial Services',
          vendorId: 'VEN-009',
          amount: 2350,
          timeline: '2-3 business days',
          submittedAt: '2024-01-14 01:30 PM',
          status: 'Accepted',
          proposal: 'Complete post-construction cleaning including HEPA filtration, floor care, and detailed surface cleaning. Eco-friendly products used throughout.',
          warranty: '30-day satisfaction guarantee',
          certifications: ['ISSA Certified', 'Green Seal Approved', 'Bonded and Insured'],
          rating: 4.6,
          completedJobs: 289,
          responseTime: '1.5 hours',
          availability: 'Available immediately',
          materials: [
            { description: 'Eco-friendly cleaning supplies', cost: 300 },
            { description: 'HEPA filtration equipment', cost: 200 },
            { description: 'Floor care products', cost: 150 },
            { description: 'Window cleaning supplies', cost: 100 }
          ],
          labor: [
            { description: 'Dust removal and HEPA cleaning', hours: 16, rate: 45 },
            { description: 'Floor deep cleaning and refinishing', hours: 12, rate: 50 },
            { description: 'Window and surface cleaning', hours: 8, rate: 45 },
            { description: 'Final inspection and touch-ups', hours: 4, rate: 50 }
          ],
          notes: 'Specializes in post-construction cleanup. Uses hospital-grade cleaning protocols.'
        }
      ],
      attachments: ['construction_completion_photos.zip', 'cleaning_specifications.pdf'],
      notes: 'Cleaning must be completed before tenant move-in scheduled for February 1st.',
      compliance: {
        required: false,
        regulation: ''
      }
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'Draft': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      'Active Bidding': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Vendor Selected': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'In Progress': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Completed': 'bg-green-500/20 text-green-400 border-green-500/30',
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

  const getBidStatusColor = (status: string) => {
    const colors = {
      'Submitted': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Under Review': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Accepted': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Rejected': 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const acceptBid = (workOrderId: string, bidId: string) => {
    const workOrder = mockWorkOrders.find(wo => wo.id === workOrderId);
    const bid = workOrder?.bids.find(b => b.id === bidId);
    
    if (workOrder && bid) {
      alert(`✅ Bid Accepted!\n\nVendor: ${bid.vendorName}\nAmount: ${formatCurrency(bid.amount)}\nTimeline: ${bid.timeline}\n\nWork order status updated to "Vendor Selected"\nVendor has been notified and will begin work as scheduled.`);
    }
  };

  const rejectBid = (workOrderId: string, bidId: string) => {
    const workOrder = mockWorkOrders.find(wo => wo.id === workOrderId);
    const bid = workOrder?.bids.find(b => b.id === bidId);
    
    if (workOrder && bid) {
      alert(`❌ Bid Rejected\n\nVendor: ${bid.vendorName}\nAmount: ${formatCurrency(bid.amount)}\n\nVendor has been notified of the decision.\nBid removed from consideration.`);
    }
  };

  const handleCreateWorkOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate new work order ID
    const newId = `WO-2024-${String(mockWorkOrders.length + 1).padStart(3, '0')}`;
    
    // Create new work order object
    const workOrder: WorkOrder = {
      id: newId,
      title: newWorkOrder.title,
      description: newWorkOrder.description,
      category: newWorkOrder.category as any,
      priority: newWorkOrder.priority as any,
      status: 'Draft',
      location: newWorkOrder.location,
      requestedBy: newWorkOrder.requestedBy,
      createdDate: new Date().toISOString().split('T')[0],
      dueDate: newWorkOrder.dueDate,
      estimatedBudget: parseFloat(newWorkOrder.estimatedBudget) || 0,
      bids: [],
      attachments: newWorkOrder.attachments,
      notes: newWorkOrder.notes,
      compliance: newWorkOrder.compliance
    };
    
    // In a real app, this would save to backend
    mockWorkOrders.push(workOrder);
    
    // Reset form and close modal
    setNewWorkOrder({
      title: '',
      description: '',
      category: '',
      priority: '',
      location: '',
      requestedBy: '',
      dueDate: '',
      estimatedBudget: '',
      notes: '',
      attachments: [],
      compliance: {
        required: false,
        regulation: ''
      }
    });
    setShowCreateModal(false);
    
    alert(`✅ Work Order Created Successfully!\n\nWork Order ID: ${newId}\nTitle: ${workOrder.title}\nStatus: Draft\n\nThe work order has been saved as a draft. You can edit it further or publish it to start receiving bids from vendors.`);
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setNewWorkOrder(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setNewWorkOrder(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const addAttachment = () => {
    const fileName = prompt('Enter attachment filename (e.g., "specifications.pdf"):');
    if (fileName) {
      setNewWorkOrder(prev => ({
        ...prev,
        attachments: [...prev.attachments, fileName]
      }));
    }
  };

  const removeAttachment = (index: number) => {
    setNewWorkOrder(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const filteredWorkOrders = mockWorkOrders.filter(wo => {
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'active' && ['Active Bidding', 'Vendor Selected', 'In Progress'].includes(wo.status)) ||
                      (activeTab === 'completed' && wo.status === 'Completed') ||
                      (activeTab === 'draft' && wo.status === 'Draft');
    
    const matchesCategory = filterCategory === 'all' || wo.category === filterCategory;
    const matchesPriority = filterPriority === 'all' || wo.priority === filterPriority;
    const matchesSearch = wo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wo.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesCategory && matchesPriority && matchesSearch;
  });

  const renderWorkOrderDetails = () => {
    const workOrder = mockWorkOrders.find(wo => wo.id === selectedWorkOrder);
    if (!workOrder) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedWorkOrder(null)}
            className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors"
          >
            <X size={20} />
            <span>Back to Work Orders</span>
          </button>
        </div>

        {/* Work Order Header */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">{workOrder.title}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>ID: {workOrder.id}</span>
                <span>•</span>
                <span>Created: {new Date(workOrder.createdDate).toLocaleDateString()}</span>
                <span>•</span>
                <span>Due: {new Date(workOrder.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(workOrder.status)}`}>
                {workOrder.status}
              </span>
              <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(workOrder.priority)}`}>
                {workOrder.priority}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-teal-400 font-semibold mb-3">Work Order Details</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="text-gray-400" size={16} />
                  <span className="text-gray-400">Location:</span>
                  <span className="text-white">{workOrder.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="text-gray-400" size={16} />
                  <span className="text-gray-400">Requested by:</span>
                  <span className="text-white">{workOrder.requestedBy}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wrench className="text-gray-400" size={16} />
                  <span className="text-gray-400">Category:</span>
                  <span className="text-white">{workOrder.category}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-teal-400 font-semibold mb-3">Budget Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Estimated Budget:</span>
                  <span className="text-white">{formatCurrency(workOrder.estimatedBudget)}</span>
                </div>
                {workOrder.actualCost && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Actual Cost:</span>
                    <span className="text-green-400">{formatCurrency(workOrder.actualCost)}</span>
                  </div>
                )}
                {workOrder.assignedVendor && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Assigned Vendor:</span>
                    <span className="text-white">{workOrder.assignedVendor}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-teal-400 font-semibold mb-3">Description</h3>
            <p className="text-gray-300">{workOrder.description}</p>
          </div>

          {workOrder.notes && (
            <div className="mt-6">
              <h3 className="text-teal-400 font-semibold mb-3">Notes</h3>
              <p className="text-gray-300">{workOrder.notes}</p>
            </div>
          )}

          {workOrder.attachments.length > 0 && (
            <div className="mt-6">
              <h3 className="text-teal-400 font-semibold mb-3">Attachments</h3>
              <div className="flex flex-wrap gap-2">
                {workOrder.attachments.map((file, index) => (
                  <span key={index} className="bg-gray-600/50 text-gray-300 px-3 py-1 rounded text-sm">
                    {file}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bids Section */}
        {workOrder.bids.length > 0 && (
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Users className="mr-2 text-teal-400" size={20} />
              Vendor Bids ({workOrder.bids.length})
            </h3>
            
            <div className="space-y-4">
              {workOrder.bids.map((bid) => (
                <div key={bid.id} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-white font-semibold text-lg">{bid.vendorName}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="text-yellow-400" size={14} />
                          <span>{bid.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{bid.completedJobs} jobs completed</span>
                        <span>•</span>
                        <span>Response: {bid.responseTime}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-teal-400">{formatCurrency(bid.amount)}</div>
                      <div className="text-sm text-gray-400">{bid.timeline}</div>
                      <span className={`px-2 py-1 rounded text-xs font-medium border mt-2 inline-block ${getBidStatusColor(bid.status)}`}>
                        {bid.status}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-teal-400 font-medium mb-2">Proposal</h5>
                    <p className="text-gray-300 text-sm">{bid.proposal}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h5 className="text-teal-400 font-medium mb-2">Materials Breakdown</h5>
                      <div className="space-y-1">
                        {bid.materials.map((material, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-300">{material.description}</span>
                            <span className="text-white">{formatCurrency(material.cost)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-teal-400 font-medium mb-2">Labor Breakdown</h5>
                      <div className="space-y-1">
                        {bid.labor.map((labor, index) => (
                          <div key={index} className="text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-300">{labor.description}</span>
                              <span className="text-white">{formatCurrency(labor.hours * labor.rate)}</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {labor.hours}h × {formatCurrency(labor.rate)}/hr
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-teal-400 font-medium mb-2">Certifications & Warranty</h5>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {bid.certifications.map((cert, index) => (
                        <span key={index} className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">
                          {cert}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-300 text-sm">Warranty: {bid.warranty}</p>
                  </div>

                  {bid.notes && (
                    <div className="mb-4">
                      <h5 className="text-teal-400 font-medium mb-2">Additional Notes</h5>
                      <p className="text-gray-300 text-sm">{bid.notes}</p>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-400">
                      Submitted: {bid.submittedAt} • Availability: {bid.availability}
                    </div>
                    {bid.status === 'Submitted' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => acceptBid(workOrder.id, bid.id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors"
                        >
                          Accept Bid
                        </button>
                        <button
                          onClick={() => rejectBid(workOrder.id, bid.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition-colors"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => setSelectedBid(bid.id)}
                          className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded text-sm transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderWorkOrdersList = () => (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search work orders..."
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
            <option value="Roofing">Roofing</option>
            <option value="Cleaning">Cleaning</option>
            <option value="General">General</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
        >
          <Plus size={16} />
          <span>Create Work Order</span>
        </button>
      </div>

      {/* Work Orders List */}
      <div className="space-y-4">
        {filteredWorkOrders.map((workOrder) => (
          <div key={workOrder.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30 hover:border-teal-500/50 transition-all duration-300">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">{workOrder.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{workOrder.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>ID: {workOrder.id}</span>
                  <span>•</span>
                  <span>Category: {workOrder.category}</span>
                  <span>•</span>
                  <span>Due: {new Date(workOrder.dueDate).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>Budget: {formatCurrency(workOrder.estimatedBudget)}</span>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(workOrder.status)}`}>
                  {workOrder.status}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(workOrder.priority)}`}>
                  {workOrder.priority}
                </span>
                {workOrder.compliance?.required && (
                  <span className="px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    COMPLIANCE
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>Requested by: {workOrder.requestedBy}</span>
                {workOrder.bids.length > 0 && (
                  <>
                    <span>•</span>
                    <span>{workOrder.bids.length} bid{workOrder.bids.length !== 1 ? 's' : ''} received</span>
                  </>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedWorkOrder(workOrder.id)}
                  className="bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900"
                >
                  <Eye size={16} className="inline mr-2" />
                  View Details
                </button>
                <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors">
                  <Edit size={16} className="inline mr-2" />
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredWorkOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">No work orders found matching your criteria</div>
          <button
            onClick={() => {
              setFilterCategory('all');
              setFilterPriority('all');
              setSearchTerm('');
            }}
            className="text-teal-400 hover:text-teal-300 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );

  const renderCreateWorkOrderModal = () => {
    if (!showCreateModal) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="bg-slate-900 rounded-2xl border border-gray-700/30 w-full max-w-4xl max-h-[95vh] overflow-hidden shadow-2xl flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 border-b border-gray-700/50">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Create New Work Order</h2>
                <p className="text-gray-400">Fill in the details for your new work order request</p>
              </div>
              <button 
                onClick={() => setShowCreateModal(false)} 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1">
            <form onSubmit={handleCreateWorkOrder} className="space-y-6">
              {/* Basic Information */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/30">
                <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-gray-300 font-medium mb-2">Work Order Title *</label>
                    <input
                      type="text"
                      value={newWorkOrder.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="e.g., HVAC System Repair - Building A"
                      className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Category *</label>
                    <select
                      value={newWorkOrder.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="HVAC">HVAC</option>
                      <option value="Plumbing">Plumbing</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Roofing">Roofing</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Priority Level *</label>
                    <select
                      value={newWorkOrder.priority}
                      onChange={(e) => handleInputChange('priority', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
                      required
                    >
                      <option value="">Select Priority</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Location *</label>
                    <input
                      type="text"
                      value={newWorkOrder.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="e.g., Building A - Floor 3 - Room 301"
                      className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Requested By *</label>
                    <input
                      type="text"
                      value={newWorkOrder.requestedBy}
                      onChange={(e) => handleInputChange('requestedBy', e.target.value)}
                      placeholder="e.g., John Smith - Facilities Manager"
                      className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-gray-300 font-medium mb-2">Description *</label>
                  <textarea
                    value={newWorkOrder.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Provide detailed description of the work needed..."
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
                    required
                  />
                </div>
              </div>

              {/* Timeline & Budget */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/30">
                <h3 className="text-lg font-semibold text-white mb-4">Timeline & Budget</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Due Date *</label>
                    <input
                      type="date"
                      value={newWorkOrder.dueDate}
                      onChange={(e) => handleInputChange('dueDate', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Estimated Budget</label>
                    <input
                      type="number"
                      value={newWorkOrder.estimatedBudget}
                      onChange={(e) => handleInputChange('estimatedBudget', e.target.value)}
                      placeholder="e.g., 5000"
                      className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>
              </div>

              {/* Compliance */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/30">
                <h3 className="text-lg font-semibold text-white mb-4">Compliance Requirements</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="compliance-required"
                      checked={newWorkOrder.compliance.required}
                      onChange={(e) => handleInputChange('compliance.required', e.target.checked)}
                      className="w-5 h-5 text-teal-500 bg-gray-700 border-gray-600 rounded focus:ring-teal-500"
                    />
                    <label htmlFor="compliance-required" className="text-gray-300">
                      This work order requires regulatory compliance
                    </label>
                  </div>
                  
                  {newWorkOrder.compliance.required && (
                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Regulation/Standard</label>
                      <input
                        type="text"
                        value={newWorkOrder.compliance.regulation}
                        onChange={(e) => handleInputChange('compliance.regulation', e.target.value)}
                        placeholder="e.g., OSHA 1910.147, NFPA 70, ASHRAE 62.1"
                        className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Attachments */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/30">
                <h3 className="text-lg font-semibold text-white mb-4">Attachments</h3>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={addAttachment}
                    className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Plus size={16} />
                    <span>Add Attachment</span>
                  </button>
                  
                  {newWorkOrder.attachments.length > 0 && (
                    <div className="space-y-2">
                      {newWorkOrder.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-700/20 p-2 rounded">
                          <span className="text-gray-300">{file}</span>
                          <button
                            type="button"
                            onClick={() => removeAttachment(index)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Notes */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/30">
                <h3 className="text-lg font-semibold text-white mb-4">Additional Notes</h3>
                <textarea
                  value={newWorkOrder.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Any additional information, special requirements, or notes for vendors..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
                />
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="bg-gray-800/50 p-6 border-t border-gray-700/30 flex justify-between items-center">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleCreateWorkOrder}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={(e) => {
                  handleCreateWorkOrder(e as any);
                  // In a real app, this would also publish the work order
                }}
                className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-semibold transition-colors"
              >
                Create & Publish
              </button>
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
              <h1 className="text-2xl font-semibold">Work Order Management System</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">Real-Time Bidding & Vendor Management</span>
                <span className="text-xs text-gray-400">• Smart Matching • Automated Workflows</span>
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
          <strong className="text-teal-400">Demo Mode:</strong> This interface demonstrates comprehensive work order management with real-time bidding, vendor selection, and project tracking capabilities.
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { id: 'active', label: 'Active Projects', count: mockWorkOrders.filter(wo => ['Active Bidding', 'Vendor Selected', 'In Progress'].includes(wo.status)).length },
            { id: 'completed', label: 'Completed', count: mockWorkOrders.filter(wo => wo.status === 'Completed').length },
            { id: 'draft', label: 'Drafts', count: mockWorkOrders.filter(wo => wo.status === 'Draft').length },
            { id: 'all', label: 'All Work Orders', count: mockWorkOrders.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 border-2 ${
                activeTab === tab.id
                  ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/25 border-teal-500'
                  : 'bg-slate-800 text-white hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 border-slate-800 hover:border-teal-500 hover:text-slate-900'
              }`}
            >
              <span>{tab.label}</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        {selectedWorkOrder ? renderWorkOrderDetails() : renderWorkOrdersList()}
      </div>
      
      {/* Create Work Order Modal */}
      {renderCreateWorkOrderModal()}
    </div>
  );
};

export default WorkOrderSystem;