import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Smartphone, Camera, MapPin, AlertTriangle, 
  CheckCircle, Clock, Upload, Send, Mic, QrCode,
  Wrench, Zap, FileText, Tag, Star, Users
} from 'lucide-react';
import Logo from './Logo';

interface WalkthroughIssue {
  id: string;
  title: string;
  description: string;
  category: 'Safety' | 'Maintenance' | 'Cleanliness' | 'Security' | 'Compliance' | 'General';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  location: string;
  gpsCoordinates?: string;
  photos: string[];
  audioNote?: string;
  qrCodeScanned?: string;
  reportedBy: string;
  timestamp: string;
  status: 'Draft' | 'Submitted' | 'Work Order Created' | 'In Progress' | 'Resolved';
  workOrderId?: string;
  estimatedCost?: number;
  assignedVendor?: string;
}

const FacilityWalkthroughApp = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('walkthrough');
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [newIssue, setNewIssue] = useState({
    title: '',
    description: '',
    category: '',
    priority: '',
    location: '',
    photos: [] as string[],
    audioNote: ''
  });

  // Mock walkthrough issues
  const mockWalkthroughIssues: WalkthroughIssue[] = [
    {
      id: 'WT-001',
      title: 'Loose Handrail - Stairwell B',
      description: 'Handrail on 3rd floor landing is loose and wobbles when pressure is applied. Potential safety hazard.',
      category: 'Safety',
      priority: 'High',
      location: 'Building A - Stairwell B - 3rd Floor Landing',
      gpsCoordinates: '35.4676, -97.5164',
      photos: ['handrail_loose_1.jpg', 'handrail_loose_2.jpg'],
      audioNote: 'handrail_audio_note.mp3',
      qrCodeScanned: 'QR-STAIR-B-03',
      reportedBy: 'Mike Chen - Facilities Manager',
      timestamp: '2024-01-21 14:30:00',
      status: 'Work Order Created',
      workOrderId: 'WO-2024-167',
      estimatedCost: 150,
      assignedVendor: 'SafetyFirst Repairs'
    },
    {
      id: 'WT-002',
      title: 'HVAC Vent Cover Missing',
      description: 'Air vent cover in conference room is missing. Ductwork exposed.',
      category: 'Maintenance',
      priority: 'Medium',
      location: 'Building A - Floor 2 - Conference Room 2B',
      gpsCoordinates: '35.4676, -97.5164',
      photos: ['vent_missing_cover.jpg'],
      qrCodeScanned: 'QR-CONF-2B',
      reportedBy: 'Sarah Johnson - Operations',
      timestamp: '2024-01-21 11:15:00',
      status: 'In Progress',
      workOrderId: 'WO-2024-168',
      estimatedCost: 75,
      assignedVendor: 'Arctic Air Solutions'
    },
    {
      id: 'WT-003',
      title: 'Restroom Deep Cleaning Needed',
      description: 'Men\'s restroom on 1st floor requires deep cleaning. Soap dispensers empty, paper towels low.',
      category: 'Cleanliness',
      priority: 'Medium',
      location: 'Building A - Floor 1 - Men\'s Restroom',
      gpsCoordinates: '35.4676, -97.5164',
      photos: ['restroom_condition.jpg'],
      reportedBy: 'Emily Rodriguez - Tenant Services',
      timestamp: '2024-01-21 09:45:00',
      status: 'Resolved',
      workOrderId: 'WO-2024-166',
      assignedVendor: 'ProClean Facilities'
    },
    {
      id: 'WT-004',
      title: 'Emergency Exit Light Not Working',
      description: 'Emergency exit light above east exit door is not illuminated. Battery backup may be failed.',
      category: 'Safety',
      priority: 'Critical',
      location: 'Building A - Floor 1 - East Exit',
      gpsCoordinates: '35.4676, -97.5164',
      photos: ['exit_light_dark.jpg'],
      qrCodeScanned: 'QR-EXIT-EAST-01',
      reportedBy: 'Mike Chen - Facilities Manager',
      timestamp: '2024-01-20 16:20:00',
      status: 'Resolved',
      workOrderId: 'WO-2024-165',
      estimatedCost: 120,
      assignedVendor: 'PowerTech Electrical'
    },
    {
      id: 'WT-005',
      title: 'Landscaping - Dead Plants in Lobby',
      description: 'Several plants in main lobby planter are dead and need replacement.',
      category: 'Maintenance',
      priority: 'Low',
      location: 'Building A - Main Lobby',
      gpsCoordinates: '35.4676, -97.5164',
      photos: ['dead_plants_lobby.jpg'],
      reportedBy: 'Reception Staff',
      timestamp: '2024-01-20 10:30:00',
      status: 'Submitted',
      estimatedCost: 200
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'Draft': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      'Submitted': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Work Order Created': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'In Progress': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Resolved': 'bg-green-500/20 text-green-400 border-green-500/30'
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

  const getCategoryIcon = (category: string) => {
    const icons = {
      'Safety': AlertTriangle,
      'Maintenance': Wrench,
      'Cleanliness': CheckCircle,
      'Security': Zap,
      'Compliance': FileText,
      'General': Tag
    };
    return icons[category as keyof typeof icons] || Tag;
  };

  const takePhoto = () => {
    const photoName = `photo_${Date.now()}.jpg`;
    setNewIssue({
      ...newIssue,
      photos: [...newIssue.photos, photoName]
    });
    alert(`📸 Photo captured: ${photoName}\n\nPhoto has been added to the issue report. You can take multiple photos to document the issue thoroughly.`);
  };

  const startRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setNewIssue({
        ...newIssue,
        audioNote: `audio_note_${Date.now()}.mp3`
      });
      alert(`🎤 Audio note recorded!\n\nVoice note has been attached to the issue. This helps provide additional context for the maintenance team.`);
    }, 3000);
  };

  const scanQRCode = () => {
    const qrCode = `QR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    alert(`📱 QR Code Scanned: ${qrCode}\n\nAsset information retrieved:\n• Location: Building A - Floor 2\n• Asset Type: HVAC Unit\n• Last Maintenance: 2024-01-15\n• Next Due: 2024-04-15\n\nLocation and asset details have been automatically added to your issue report.`);
  };

  const submitIssue = () => {
    if (!newIssue.title || !newIssue.description || !newIssue.category || !newIssue.priority) {
      alert('Please fill in all required fields before submitting.');
      return;
    }

    const issueId = `WT-${String(mockWalkthroughIssues.length + 1).padStart(3, '0')}`;
    
    alert(`✅ Issue Submitted Successfully!\n\n📋 Issue Details:\n• ID: ${issueId}\n• Title: ${newIssue.title}\n• Category: ${newIssue.category}\n• Priority: ${newIssue.priority}\n• Photos: ${newIssue.photos.length}\n• Audio Note: ${newIssue.audioNote ? 'Yes' : 'No'}\n\n⚡ Next Steps:\n• Work order will be created automatically\n• Appropriate vendor will be assigned\n• You'll receive updates on progress\n• Issue tracking available in dashboard`);
    
    // Reset form
    setNewIssue({
      title: '',
      description: '',
      category: '',
      priority: '',
      location: '',
      photos: [],
      audioNote: ''
    });
  };

  const renderWalkthrough = () => (
    <div className="space-y-6">
      {/* Mobile App Interface */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Smartphone className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white">Facility Walkthrough Companion</h2>
            <p className="text-gray-400">Log issues on-site and create instant work orders</p>
          </div>
        </div>

        {/* Issue Reporting Form */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 font-medium mb-2">Issue Title *</label>
              <input
                type="text"
                value={newIssue.title}
                onChange={(e) => setNewIssue({...newIssue, title: e.target.value})}
                placeholder="Brief description of the issue"
                className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 font-medium mb-2">Location</label>
              <input
                type="text"
                value={newIssue.location}
                onChange={(e) => setNewIssue({...newIssue, location: e.target.value})}
                placeholder="Building, floor, room"
                className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 font-medium mb-2">Category *</label>
              <select
                value={newIssue.category}
                onChange={(e) => setNewIssue({...newIssue, category: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
              >
                <option value="">Select Category</option>
                <option value="Safety">Safety</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Cleanliness">Cleanliness</option>
                <option value="Security">Security</option>
                <option value="Compliance">Compliance</option>
                <option value="General">General</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 font-medium mb-2">Priority *</label>
              <select
                value={newIssue.priority}
                onChange={(e) => setNewIssue({...newIssue, priority: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">Description *</label>
            <textarea
              value={newIssue.description}
              onChange={(e) => setNewIssue({...newIssue, description: e.target.value})}
              placeholder="Detailed description of the issue"
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Mobile Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              onClick={takePhoto}
              className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition-colors font-semibold"
            >
              <Camera size={20} />
              <span>Take Photo</span>
            </button>

            <button
              onClick={startRecording}
              disabled={isRecording}
              className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors font-semibold ${
                isRecording 
                  ? 'bg-red-500 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              <Mic size={20} />
              <span>{isRecording ? 'Recording...' : 'Voice Note'}</span>
            </button>

            <button
              onClick={scanQRCode}
              className="flex items-center justify-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg transition-colors font-semibold"
            >
              <QrCode size={20} />
              <span>Scan QR</span>
            </button>

            <button
              onClick={() => {
                setNewIssue({...newIssue, location: 'Building A - Floor 2 - Room 201'});
                alert('📍 GPS Location captured!\n\nCoordinates: 35.4676, -97.5164\nAddress: 123 Business Ave, Oklahoma City\n\nLocation has been automatically added to the issue report.');
              }}
              className="flex items-center justify-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-3 rounded-lg transition-colors font-semibold"
            >
              <MapPin size={20} />
              <span>GPS Location</span>
            </button>
          </div>

          {/* Attachments Display */}
          {(newIssue.photos.length > 0 || newIssue.audioNote) && (
            <div className="bg-gray-700/20 p-4 rounded-lg border border-gray-700/30">
              <h4 className="text-white font-medium mb-3">Attachments</h4>
              <div className="space-y-2">
                {newIssue.photos.map((photo, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Camera className="text-blue-400" size={16} />
                    <span className="text-gray-300">{photo}</span>
                  </div>
                ))}
                {newIssue.audioNote && (
                  <div className="flex items-center space-x-2">
                    <Mic className="text-green-400" size={16} />
                    <span className="text-gray-300">{newIssue.audioNote}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              onClick={submitIssue}
              className="bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900"
            >
              <Send size={20} className="inline mr-2" />
              Submit Issue & Create Work Order
            </button>
          </div>
        </div>
      </div>

      {/* App Features */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-4">Mobile App Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <Camera className="text-blue-400 mx-auto mb-2" size={24} />
            <h4 className="text-white font-semibold mb-1">Photo Capture</h4>
            <p className="text-gray-400 text-sm">High-resolution photos with automatic metadata</p>
          </div>
          <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <Mic className="text-green-400 mx-auto mb-2" size={24} />
            <h4 className="text-white font-semibold mb-1">Voice Notes</h4>
            <p className="text-gray-400 text-sm">Audio descriptions for detailed context</p>
          </div>
          <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <QrCode className="text-purple-400 mx-auto mb-2" size={24} />
            <h4 className="text-white font-semibold mb-1">QR Code Scanning</h4>
            <p className="text-gray-400 text-sm">Instant asset identification and history</p>
          </div>
          <div className="text-center p-4 bg-teal-500/10 rounded-lg border border-teal-500/20">
            <MapPin className="text-teal-400 mx-auto mb-2" size={24} />
            <h4 className="text-white font-semibold mb-1">GPS Tracking</h4>
            <p className="text-gray-400 text-sm">Precise location data for every issue</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIssueHistory = () => (
    <div className="space-y-6">
      {selectedIssue ? (
        <div className="space-y-6">
          {(() => {
            const issue = mockWalkthroughIssues.find(i => i.id === selectedIssue);
            if (!issue) return null;

            const IconComponent = getCategoryIcon(issue.category);

            return (
              <>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setSelectedIssue(null)}
                    className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    <Home size={20} />
                    <span>Back to Issue History</span>
                  </button>
                </div>

                {/* Issue Details */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 rounded-lg flex items-center justify-center border ${getPriorityColor(issue.priority)}`}>
                        <IconComponent size={24} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold text-white mb-2">{issue.title}</h2>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>ID: {issue.id}</span>
                          <span>•</span>
                          <span>Reported: {new Date(issue.timestamp).toLocaleString()}</span>
                          <span>•</span>
                          <span>By: {issue.reportedBy}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(issue.status)}`}>
                        {issue.status}
                      </span>
                      <span className={`px-3 py-2 rounded-full text-sm font-medium border ${getPriorityColor(issue.priority)}`}>
                        {issue.priority}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Issue Details</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-gray-400">Description:</span>
                          <p className="text-white mt-1">{issue.description}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Location:</span>
                          <p className="text-white">{issue.location}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Category:</span>
                          <p className="text-white">{issue.category}</p>
                        </div>
                        {issue.gpsCoordinates && (
                          <div>
                            <span className="text-gray-400">GPS Coordinates:</span>
                            <p className="text-white">{issue.gpsCoordinates}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Work Order Info</h3>
                      <div className="space-y-3">
                        {issue.workOrderId && (
                          <div>
                            <span className="text-gray-400">Work Order ID:</span>
                            <p className="text-white">{issue.workOrderId}</p>
                          </div>
                        )}
                        {issue.assignedVendor && (
                          <div>
                            <span className="text-gray-400">Assigned Vendor:</span>
                            <p className="text-white">{issue.assignedVendor}</p>
                          </div>
                        )}
                        {issue.estimatedCost && (
                          <div>
                            <span className="text-gray-400">Estimated Cost:</span>
                            <p className="text-teal-400 font-semibold">${issue.estimatedCost}</p>
                          </div>
                        )}
                        {issue.qrCodeScanned && (
                          <div>
                            <span className="text-gray-400">QR Code Scanned:</span>
                            <p className="text-white">{issue.qrCodeScanned}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Attachments */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
                  <h3 className="text-lg font-semibold text-white mb-4">Attachments</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {issue.photos.length > 0 && (
                      <div>
                        <h4 className="text-gray-300 font-medium mb-3">Photos ({issue.photos.length})</h4>
                        <div className="space-y-2">
                          {issue.photos.map((photo, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-700/20 rounded-lg">
                              <Camera className="text-blue-400" size={16} />
                              <span className="text-white">{photo}</span>
                              <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors">
                                View
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {issue.audioNote && (
                      <div>
                        <h4 className="text-gray-300 font-medium mb-3">Audio Note</h4>
                        <div className="flex items-center space-x-3 p-3 bg-gray-700/20 rounded-lg">
                          <Mic className="text-green-400" size={16} />
                          <span className="text-white">{issue.audioNote}</span>
                          <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs transition-colors">
                            Play
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      ) : (
        <div className="space-y-4">
          {mockWalkthroughIssues.map((issue) => {
            const IconComponent = getCategoryIcon(issue.category);
            return (
              <div key={issue.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30 hover:border-teal-500/50 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${getPriorityColor(issue.priority)}`}>
                      <IconComponent size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-white mb-1">{issue.title}</h4>
                      <p className="text-gray-400 text-sm mb-2">{issue.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Location: {issue.location}</span>
                        <span>•</span>
                        <span>Reported: {new Date(issue.timestamp).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>By: {issue.reportedBy}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(issue.status)}`}>
                      {issue.status}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(issue.priority)}`}>
                      {issue.priority}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>{issue.photos.length} photos</span>
                    {issue.audioNote && (
                      <>
                        <span>•</span>
                        <span>Audio note</span>
                      </>
                    )}
                    {issue.workOrderId && (
                      <>
                        <span>•</span>
                        <span>WO: {issue.workOrderId}</span>
                      </>
                    )}
                    {issue.estimatedCost && (
                      <>
                        <span>•</span>
                        <span className="text-teal-400">${issue.estimatedCost}</span>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedIssue(issue.id)}
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
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
              <h1 className="text-2xl font-semibold">Facility Walkthrough Companion App</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">Mobile Issue Logging • Instant Work Orders • Photo & Audio Capture</span>
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
          <strong className="text-teal-400">Mobile Companion:</strong> On-site issue logging with photo capture, voice notes, QR code scanning, and GPS location tracking. Instantly creates work orders and assigns vendors.
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { id: 'walkthrough', label: 'Mobile Walkthrough', icon: Smartphone },
            { id: 'history', label: 'Issue History', icon: FileText }
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
        {activeTab === 'walkthrough' && renderWalkthrough()}
        {activeTab === 'history' && renderIssueHistory()}
      </div>
    </div>
  );
};

export default FacilityWalkthroughApp;