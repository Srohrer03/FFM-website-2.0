import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, MessageSquare, Clock, CheckCircle, AlertTriangle, 
  Camera, Upload, Send, Star, User, MapPin, Calendar,
  Phone, Mail, FileText, Image, Paperclip, RefreshCw
} from 'lucide-react';
import Logo from './Logo';

interface RepairRequest {
  id: string;
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  unitNumber: string;
  propertyName: string;
  category: 'Plumbing' | 'Electrical' | 'HVAC' | 'Appliance' | 'General' | 'Emergency';
  priority: 'Low' | 'Medium' | 'High' | 'Emergency';
  title: string;
  description: string;
  location: string;
  preferredTime: string;
  accessInstructions: string;
  attachments: RequestAttachment[];
  status: 'Submitted' | 'Acknowledged' | 'Assigned' | 'In Progress' | 'Completed' | 'Closed';
  submittedAt: string;
  acknowledgedAt?: string;
  assignedAt?: string;
  completedAt?: string;
  estimatedCompletion?: string;
  assignedVendor?: string;
  vendorContact?: string;
  workOrderId?: string;
  updates: RequestUpdate[];
  rating?: number;
  feedback?: string;
}

interface RequestAttachment {
  id: string;
  name: string;
  type: 'image' | 'document';
  size: string;
  uploadedAt: string;
  url: string;
}

interface RequestUpdate {
  id: string;
  timestamp: string;
  author: string;
  role: 'tenant' | 'ffm' | 'vendor';
  message: string;
  attachments?: RequestAttachment[];
  isInternal?: boolean;
}

const TenantRepairInterface = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('submit');
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);
  const [formData, setFormData] = useState({
    tenantName: '',
    tenantEmail: '',
    tenantPhone: '',
    unitNumber: '',
    category: '',
    priority: '',
    title: '',
    description: '',
    location: '',
    preferredTime: '',
    accessInstructions: '',
    attachments: [] as RequestAttachment[]
  });

  // Mock tenant repair requests
  const mockRequests: RepairRequest[] = [
    {
      id: 'TR-2024-001',
      tenantName: 'Sarah Johnson',
      tenantEmail: 'sarah.johnson@email.com',
      tenantPhone: '(555) 123-4567',
      unitNumber: 'Apt 3B',
      propertyName: 'Riverside Apartments',
      category: 'Plumbing',
      priority: 'High',
      title: 'Kitchen Sink Leak',
      description: 'The kitchen sink has been leaking under the cabinet for the past 2 days. Water is pooling and may cause damage to the cabinet floor.',
      location: 'Kitchen - Under sink cabinet',
      preferredTime: 'Morning (9 AM - 12 PM)',
      accessInstructions: 'Please call 30 minutes before arrival. Spare key with building manager if needed.',
      attachments: [
        {
          id: 'ATT-001',
          name: 'sink_leak_photo.jpg',
          type: 'image',
          size: '2.1 MB',
          uploadedAt: '2024-01-20 10:30 AM',
          url: '/uploads/sink_leak_photo.jpg'
        }
      ],
      status: 'In Progress',
      submittedAt: '2024-01-20 10:30 AM',
      acknowledgedAt: '2024-01-20 11:15 AM',
      assignedAt: '2024-01-20 02:30 PM',
      estimatedCompletion: '2024-01-21 04:00 PM',
      assignedVendor: 'FastFlow Plumbing',
      vendorContact: '(555) 987-6543',
      workOrderId: 'WO-2024-156',
      updates: [
        {
          id: 'UPD-001',
          timestamp: '2024-01-20 11:15 AM',
          author: 'FFM Support Team',
          role: 'ffm',
          message: 'Thank you for your repair request. We have received your submission and are reviewing the details. A qualified plumbing vendor will be assigned shortly.'
        },
        {
          id: 'UPD-002',
          timestamp: '2024-01-20 02:30 PM',
          author: 'FFM Support Team',
          role: 'ffm',
          message: 'Your repair request has been assigned to FastFlow Plumbing. They will contact you within 2 hours to schedule the repair. Work Order #WO-2024-156 has been created.'
        },
        {
          id: 'UPD-003',
          timestamp: '2024-01-20 04:45 PM',
          author: 'Mike Rodriguez - FastFlow Plumbing',
          role: 'vendor',
          message: 'Hello Sarah, I will be handling your kitchen sink repair. I can come tomorrow (Jan 21) between 2-4 PM. Please confirm if this works for you.'
        },
        {
          id: 'UPD-004',
          timestamp: '2024-01-20 05:20 PM',
          author: 'Sarah Johnson',
          role: 'tenant',
          message: 'That time works perfectly! I will be home. Thank you for the quick response.'
        }
      ]
    },
    {
      id: 'TR-2024-002',
      tenantName: 'Michael Chen',
      tenantEmail: 'michael.chen@email.com',
      tenantPhone: '(555) 234-5678',
      unitNumber: 'Unit 12A',
      propertyName: 'Downtown Lofts',
      category: 'HVAC',
      priority: 'Medium',
      title: 'Air Conditioning Not Cooling',
      description: 'The AC unit is running but not cooling the apartment effectively. Temperature stays around 78°F even when set to 70°F.',
      location: 'Living room - Wall-mounted AC unit',
      preferredTime: 'Afternoon (1 PM - 5 PM)',
      accessInstructions: 'Doorman can provide access. Unit is on 12th floor.',
      attachments: [],
      status: 'Completed',
      submittedAt: '2024-01-18 09:15 AM',
      acknowledgedAt: '2024-01-18 09:45 AM',
      assignedAt: '2024-01-18 11:30 AM',
      completedAt: '2024-01-19 03:30 PM',
      assignedVendor: 'Arctic Air Solutions',
      vendorContact: '(555) 876-5432',
      workOrderId: 'WO-2024-148',
      updates: [
        {
          id: 'UPD-005',
          timestamp: '2024-01-18 09:45 AM',
          author: 'FFM Support Team',
          role: 'ffm',
          message: 'Your HVAC repair request has been received. We are connecting you with a certified HVAC technician.'
        },
        {
          id: 'UPD-006',
          timestamp: '2024-01-19 03:30 PM',
          author: 'Tom Wilson - Arctic Air Solutions',
          role: 'vendor',
          message: 'Repair completed! The issue was a clogged air filter and low refrigerant. Replaced filter and recharged system. AC should now cool properly.'
        }
      ],
      rating: 5,
      feedback: 'Excellent service! Tom was professional and fixed the problem quickly. AC is working perfectly now.'
    },
    {
      id: 'TR-2024-003',
      tenantName: 'Emily Rodriguez',
      tenantEmail: 'emily.rodriguez@email.com',
      tenantPhone: '(555) 345-6789',
      unitNumber: 'Apt 7C',
      propertyName: 'Garden View Complex',
      category: 'Emergency',
      priority: 'Emergency',
      title: 'No Hot Water - Emergency',
      description: 'Complete loss of hot water in the unit since this morning. Water heater appears to be malfunctioning. Need immediate assistance.',
      location: 'Utility closet - Water heater',
      preferredTime: 'ASAP - Emergency',
      accessInstructions: 'I will be home all day. Please call when arriving.',
      attachments: [],
      status: 'Assigned',
      submittedAt: '2024-01-21 07:30 AM',
      acknowledgedAt: '2024-01-21 07:45 AM',
      assignedAt: '2024-01-21 08:15 AM',
      estimatedCompletion: '2024-01-21 12:00 PM',
      assignedVendor: 'Emergency Plumbing Services',
      vendorContact: '(555) 911-HELP',
      workOrderId: 'WO-2024-159',
      updates: [
        {
          id: 'UPD-007',
          timestamp: '2024-01-21 07:45 AM',
          author: 'FFM Emergency Response',
          role: 'ffm',
          message: 'EMERGENCY REQUEST RECEIVED. We are dispatching an emergency plumber immediately. Expected arrival within 2 hours.'
        },
        {
          id: 'UPD-008',
          timestamp: '2024-01-21 08:15 AM',
          author: 'FFM Emergency Response',
          role: 'ffm',
          message: 'Emergency Plumbing Services has been assigned. Technician David Martinez is en route and will arrive by 10:00 AM.'
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'Submitted': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Acknowledged': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Assigned': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'In Progress': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Completed': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Closed': 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'Low': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'High': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Emergency': 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const handleSubmitRequest = () => {
    if (!formData.tenantName || !formData.tenantEmail || !formData.category || !formData.title || !formData.description) {
      alert('Please fill in all required fields.');
      return;
    }

    const requestId = `TR-2024-${String(mockRequests.length + 1).padStart(3, '0')}`;
    
    alert(`✅ Repair Request Submitted Successfully!\n\nRequest ID: ${requestId}\nTenant: ${formData.tenantName}\nCategory: ${formData.category}\nPriority: ${formData.priority}\n\n📧 Confirmation email sent to ${formData.tenantEmail}\n\n⏰ Next Steps:\n• FFM will acknowledge within 1 hour\n• Qualified vendor will be assigned\n• You'll receive updates via email and SMS\n• Track progress in "My Requests" tab`);
    
    // Reset form
    setFormData({
      tenantName: '',
      tenantEmail: '',
      tenantPhone: '',
      unitNumber: '',
      category: '',
      priority: '',
      title: '',
      description: '',
      location: '',
      preferredTime: '',
      accessInstructions: '',
      attachments: []
    });
    setShowNewRequestForm(false);
  };

  const addAttachment = () => {
    const fileName = prompt('Enter file name (e.g., "leak_photo.jpg"):');
    if (fileName) {
      const newAttachment: RequestAttachment = {
        id: `ATT-${Date.now()}`,
        name: fileName,
        type: fileName.toLowerCase().includes('.jpg') || fileName.toLowerCase().includes('.png') ? 'image' : 'document',
        size: '1.2 MB',
        uploadedAt: new Date().toLocaleString(),
        url: `/uploads/${fileName}`
      };
      setFormData({
        ...formData,
        attachments: [...formData.attachments, newAttachment]
      });
    }
  };

  const removeAttachment = (attachmentId: string) => {
    setFormData({
      ...formData,
      attachments: formData.attachments.filter(att => att.id !== attachmentId)
    });
  };

  const renderSubmitRequest = () => (
    <div className="space-y-6">
      {!showNewRequestForm ? (
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-8 rounded-xl border border-gray-700/30 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="text-white" size={32} />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-4">Submit a Repair Request</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Need something fixed in your unit? Submit a repair request and we'll connect you with qualified professionals. 
            Our team responds within 1 hour and keeps you updated throughout the process.
          </p>
          <button
            onClick={() => setShowNewRequestForm(true)}
            className="bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900"
          >
            Create New Request
          </button>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">New Repair Request</h2>
            <button
              onClick={() => setShowNewRequestForm(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            {/* Tenant Information */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Tenant Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.tenantName}
                    onChange={(e) => setFormData({...formData, tenantName: e.target.value})}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.tenantEmail}
                    onChange={(e) => setFormData({...formData, tenantEmail: e.target.value})}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.tenantPhone}
                    onChange={(e) => setFormData({...formData, tenantPhone: e.target.value})}
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Unit Number *</label>
                  <input
                    type="text"
                    value={formData.unitNumber}
                    onChange={(e) => setFormData({...formData, unitNumber: e.target.value})}
                    placeholder="Apt 3B, Unit 12A, etc."
                    className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            </div>

            {/* Request Details */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Request Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="">Select Category</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="HVAC">HVAC/Heating/Cooling</option>
                    <option value="Appliance">Appliance</option>
                    <option value="General">General Maintenance</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Priority *</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="">Select Priority</option>
                    <option value="Low">Low - Can wait a few days</option>
                    <option value="Medium">Medium - Within 1-2 days</option>
                    <option value="High">High - Within 24 hours</option>
                    <option value="Emergency">Emergency - Immediate attention</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-300 font-medium mb-2">Request Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Brief description of the issue"
                  className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 font-medium mb-2">Detailed Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Please provide detailed information about the issue, when it started, and any relevant details"
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Specific Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Kitchen, bathroom, living room, etc."
                    className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Preferred Time</label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="">Any time</option>
                    <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon (1 PM - 5 PM)">Afternoon (1 PM - 5 PM)</option>
                    <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                    <option value="Weekends only">Weekends only</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Access Instructions */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">Access Instructions</label>
              <textarea
                value={formData.accessInstructions}
                onChange={(e) => setFormData({...formData, accessInstructions: e.target.value})}
                placeholder="How should the technician access your unit? Any special instructions?"
                rows={2}
                className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Attachments */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-gray-300 font-medium">Photos/Documents</label>
                <button
                  type="button"
                  onClick={addAttachment}
                  className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                >
                  <Upload size={16} />
                  <span>Add File</span>
                </button>
              </div>
              {formData.attachments.length > 0 && (
                <div className="space-y-2">
                  {formData.attachments.map((attachment) => (
                    <div key={attachment.id} className="flex justify-between items-center p-3 bg-gray-700/20 rounded-lg border border-gray-700/30">
                      <div className="flex items-center space-x-3">
                        {attachment.type === 'image' ? <Image size={16} className="text-blue-400" /> : <FileText size={16} className="text-green-400" />}
                        <span className="text-white">{attachment.name}</span>
                        <span className="text-gray-400 text-sm">({attachment.size})</span>
                      </div>
                      <button
                        onClick={() => removeAttachment(attachment.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowNewRequestForm(false)}
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitRequest}
                className="bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderMyRequests = () => (
    <div className="space-y-6">
      {selectedRequest ? (
        <div className="space-y-6">
          {(() => {
            const request = mockRequests.find(r => r.id === selectedRequest);
            if (!request) return null;

            return (
              <>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    <Home size={20} />
                    <span>Back to My Requests</span>
                  </button>
                  <button className="bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900">
                    <RefreshCw size={16} className="inline mr-2" />
                    Refresh
                  </button>
                </div>

                {/* Request Header */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold text-white mb-2">{request.title}</h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>Request ID: {request.id}</span>
                        <span>•</span>
                        <span>Submitted: {request.submittedAt}</span>
                        {request.workOrderId && (
                          <>
                            <span>•</span>
                            <span>Work Order: {request.workOrderId}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                      <span className={`px-3 py-2 rounded-full text-sm font-medium border ${getPriorityColor(request.priority)}`}>
                        {request.priority}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div className="text-lg font-bold text-blue-400">{request.category}</div>
                      <div className="text-xs text-blue-300">Category</div>
                    </div>
                    <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="text-lg font-bold text-green-400">{request.unitNumber}</div>
                      <div className="text-xs text-green-300">Unit</div>
                    </div>
                    {request.assignedVendor && (
                      <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                        <div className="text-lg font-bold text-purple-400">{request.assignedVendor}</div>
                        <div className="text-xs text-purple-300">Assigned Vendor</div>
                      </div>
                    )}
                    {request.estimatedCompletion && (
                      <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                        <div className="text-lg font-bold text-yellow-400">
                          {new Date(request.estimatedCompletion).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-yellow-300">Est. Completion</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Request Details */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
                  <h3 className="text-xl font-semibold text-white mb-4">Request Details</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-400">Description:</span>
                        <p className="text-white mt-1">{request.description}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Location:</span>
                        <p className="text-white">{request.location}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Preferred Time:</span>
                        <p className="text-white">{request.preferredTime}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-400">Access Instructions:</span>
                        <p className="text-white">{request.accessInstructions}</p>
                      </div>
                      {request.vendorContact && (
                        <div>
                          <span className="text-gray-400">Vendor Contact:</span>
                          <p className="text-white">{request.vendorContact}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Communication Thread */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <MessageSquare className="mr-2 text-teal-400" size={20} />
                    Communication Thread
                  </h3>
                  <div className="space-y-4">
                    {request.updates.map((update) => (
                      <div key={update.id} className={`p-4 rounded-lg border ${
                        update.role === 'tenant' ? 'bg-teal-500/10 border-teal-500/20 ml-8' :
                        update.role === 'vendor' ? 'bg-purple-500/10 border-purple-500/20 mr-8' :
                        'bg-blue-500/10 border-blue-500/20'
                      }`}>
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center space-x-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              update.role === 'tenant' ? 'bg-teal-500' :
                              update.role === 'vendor' ? 'bg-purple-500' :
                              'bg-blue-500'
                            }`}>
                              {update.role === 'tenant' ? <User size={16} /> :
                               update.role === 'vendor' ? <Wrench size={16} /> :
                               <MessageSquare size={16} />}
                            </div>
                            <span className="font-medium text-white">{update.author}</span>
                            <span className={`px-2 py-1 rounded text-xs ${
                              update.role === 'tenant' ? 'bg-teal-500/20 text-teal-400' :
                              update.role === 'vendor' ? 'bg-purple-500/20 text-purple-400' :
                              'bg-blue-500/20 text-blue-400'
                            }`}>
                              {update.role.toUpperCase()}
                            </span>
                          </div>
                          <span className="text-gray-400 text-sm">{update.timestamp}</span>
                        </div>
                        <p className="text-gray-300">{update.message}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add Message */}
                  <div className="mt-6 p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
                    <div className="flex items-center space-x-3">
                      <textarea
                        placeholder="Type your message here..."
                        rows={2}
                        className="flex-1 px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
                      />
                      <button className="bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-lg transition-colors">
                        <Send size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Rating & Feedback (if completed) */}
                {request.status === 'Completed' && request.rating && (
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <Star className="mr-2 text-teal-400" size={20} />
                      Your Feedback
                    </h3>
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-gray-400">Rating:</span>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={20}
                            className={star <= request.rating! ? 'text-yellow-400 fill-current' : 'text-gray-600'}
                          />
                        ))}
                      </div>
                      <span className="text-white font-medium">{request.rating}/5</span>
                    </div>
                    {request.feedback && (
                      <div>
                        <span className="text-gray-400">Feedback:</span>
                        <p className="text-white mt-1">{request.feedback}</p>
                      </div>
                    )}
                  </div>
                )}
              </>
            );
          })()}
        </div>
      ) : (
        <div className="space-y-4">
          {mockRequests.map((request) => (
            <div key={request.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30 hover:border-teal-500/50 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-white mb-2">{request.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                    <span>ID: {request.id}</span>
                    <span>•</span>
                    <span>Unit: {request.unitNumber}</span>
                    <span>•</span>
                    <span>Category: {request.category}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{request.description.substring(0, 150)}...</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(request.priority)}`}>
                    {request.priority}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>Submitted: {request.submittedAt}</span>
                  {request.assignedVendor && (
                    <>
                      <span>•</span>
                      <span>Vendor: {request.assignedVendor}</span>
                    </>
                  )}
                </div>
                <button
                  onClick={() => setSelectedRequest(request.id)}
                  className="bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
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
              <h1 className="text-2xl font-semibold">Tenant Repair Interface</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">Direct Tenant → FFM → Client Communication</span>
                <span className="text-xs text-gray-400">• Real-Time Updates • Photo Upload</span>
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
          <strong className="text-teal-400">Tenant Portal:</strong> Direct interface for tenants to submit repair requests, track progress, communicate with vendors, and provide feedback. Streamlines the Tenant → FFM → Client workflow.
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { id: 'submit', label: 'Submit Request', icon: MessageSquare },
            { id: 'requests', label: 'My Requests', icon: FileText }
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
        {activeTab === 'submit' && renderSubmitRequest()}
        {activeTab === 'requests' && renderMyRequests()}
      </div>
    </div>
  );
};

export default TenantRepairInterface;