import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, FileText, Upload, Search, Filter, Download, Eye, Edit, BarChart3,
  Clock, AlertTriangle, CheckCircle, Calendar,
  Users, Building, Shield, Bell, Settings, RefreshCw, X, Plus,
  FolderOpen, File, Archive, Key, History, UserCheck, Lock,
  ExternalLink, Copy, Send, RotateCcw, Star, Tag, Paperclip, Share2, Award
} from 'lucide-react';
import Logo from './Logo';

interface Document {
  id: string;
  name: string;
  type: 'w9' | 'coi' | 'license' | 'service_agreement' | 'certificate' | 'contract' | 'other';
  category: string;
  uploadedBy: string;
  uploadedDate: string;
  lastModified: string;
  version: number;
  size: string;
  status: 'active' | 'expired' | 'expiring_soon' | 'pending_review' | 'archived';
  expiryDate?: string;
  owner: string;
  ownerType: 'client' | 'vendor' | 'ffm';
  permissions: DocumentPermission[];
  versions: DocumentVersion[];
  tags: string[];
  description: string;
  complianceRequired: boolean;
  approvalStatus: 'approved' | 'pending' | 'rejected' | 'not_required';
  approvedBy?: string;
  approvedDate?: string;
  sharedWith: SharedAccess[];
  downloadCount: number;
  lastAccessed: string;
}

interface DocumentPermission {
  userId: string;
  userType: 'client' | 'vendor' | 'ffm_admin';
  userName: string;
  permissions: ('view' | 'download' | 'edit' | 'share' | 'delete')[];
  grantedBy: string;
  grantedDate: string;
}

interface DocumentVersion {
  version: number;
  uploadedBy: string;
  uploadedDate: string;
  size: string;
  changes: string;
  status: 'current' | 'archived';
}

interface SharedAccess {
  sharedWith: string;
  sharedWithType: 'client' | 'vendor' | 'ffm_admin';
  sharedBy: string;
  sharedDate: string;
  permissions: string[];
  expiryDate?: string;
  accessed: boolean;
  lastAccessed?: string;
}

interface ExpiryAlert {
  id: string;
  documentId: string;
  documentName: string;
  owner: string;
  ownerType: 'client' | 'vendor';
  expiryDate: string;
  daysUntilExpiry: number;
  severity: 'critical' | 'warning' | 'info';
  acknowledged: boolean;
  remindersSent: number;
  lastReminderDate: string;
}

const DocumentManagementSystem = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedOwnerType, setSelectedOwnerType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);

  // Mock Access Control Data
  const mockAccessData = [
    {
      documentId: 'DOC-001',
      documentName: 'HVAC Maintenance Contract',
      users: [
        {
          id: 'USER-001',
          name: 'John Smith',
          email: 'john.smith@company.com',
          role: 'Facilities Manager',
          permissions: ['view', 'download', 'edit'],
          grantedBy: 'Admin',
          grantedDate: '2024-01-15',
          expiryDate: '2024-12-31',
          lastAccessed: '2024-01-20',
          status: 'active'
        },
        {
          id: 'USER-002',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@vendor.com',
          role: 'Vendor',
          permissions: ['view', 'download'],
          grantedBy: 'John Smith',
          grantedDate: '2024-01-10',
          expiryDate: '2024-02-10',
          lastAccessed: '2024-01-18',
          status: 'expiring'
        },
        {
          id: 'USER-003',
          name: 'Mike Wilson',
          email: 'mike.wilson@company.com',
          role: 'Admin',
          permissions: ['view', 'download', 'edit', 'share', 'delete'],
          grantedBy: 'System',
          grantedDate: '2024-01-01',
          expiryDate: '2024-12-31',
          lastAccessed: '2024-01-22',
          status: 'active'
        }
      ]
    },
    {
      documentId: 'DOC-002',
      documentName: 'Fire Safety Certificate',
      users: [
        {
          id: 'USER-004',
          name: 'Lisa Chen',
          email: 'lisa.chen@safety.com',
          role: 'Safety Inspector',
          permissions: ['view', 'download'],
          grantedBy: 'Admin',
          grantedDate: '2023-12-01',
          expiryDate: '2024-01-15',
          lastAccessed: '2024-01-10',
          status: 'expired'
        },
        {
          id: 'USER-005',
          name: 'David Brown',
          email: 'david.brown@company.com',
          role: 'Compliance Officer',
          permissions: ['view', 'download', 'share'],
          grantedBy: 'Admin',
          grantedDate: '2024-01-01',
          expiryDate: '2024-06-30',
          lastAccessed: '2024-01-19',
          status: 'active'
        }
      ]
    },
    {
      documentId: 'DOC-003',
      documentName: 'Vendor Insurance Policy',
      users: [
        {
          id: 'USER-006',
          name: 'Emily Davis',
          email: 'emily.davis@insurance.com',
          role: 'Insurance Agent',
          permissions: ['view', 'download'],
          grantedBy: 'John Smith',
          grantedDate: '2024-01-05',
          expiryDate: '2024-07-05',
          lastAccessed: '2024-01-21',
          status: 'active'
        },
        {
          id: 'USER-007',
          name: 'Robert Taylor',
          email: 'robert.taylor@company.com',
          role: 'Procurement Manager',
          permissions: ['view'],
          grantedBy: 'Admin',
          grantedDate: '2024-01-12',
          expiryDate: '2024-03-12',
          lastAccessed: '2024-01-16',
          status: 'active'
        }
      ]
    }
  ];

  // Mock expiry data
  const mockExpiryData = [
    {
      id: 'DOC-001',
      name: 'HVAC Maintenance Certificate',
      type: 'Certificate',
      owner: 'Arctic Air Solutions',
      expiryDate: '2024-01-15',
      status: 'expired',
      daysUntilExpiry: -10,
      lastNotified: '2024-01-10',
      notificationCount: 3,
      renewalContact: 'service@arcticair.com',
      criticality: 'high'
    },
    {
      id: 'DOC-002',
      name: 'Fire Safety Inspection Report',
      type: 'Report',
      owner: 'SafeGuard Fire Protection',
      expiryDate: '2024-02-05',
      status: 'critical',
      daysUntilExpiry: 5,
      lastNotified: '2024-01-25',
      notificationCount: 1,
      renewalContact: 'admin@safeguardfire.com',
      criticality: 'critical'
    },
    {
      id: 'DOC-003',
      name: 'Elevator Safety Certificate',
      type: 'Certificate',
      owner: 'SafeLift Services',
      expiryDate: '2024-02-20',
      status: 'warning',
      daysUntilExpiry: 20,
      lastNotified: '2024-01-20',
      notificationCount: 0,
      renewalContact: 'info@safelift.com',
      criticality: 'medium'
    },
    {
      id: 'DOC-004',
      name: 'Plumbing License',
      type: 'License',
      owner: 'ProFlow Plumbing',
      expiryDate: '2024-06-15',
      status: 'healthy',
      daysUntilExpiry: 135,
      lastNotified: null,
      notificationCount: 0,
      renewalContact: 'licensing@proflow.com',
      criticality: 'low'
    },
    {
      id: 'DOC-005',
      name: 'Insurance Certificate',
      type: 'Insurance',
      owner: 'Summit Roofing Co',
      expiryDate: '2024-03-30',
      status: 'healthy',
      daysUntilExpiry: 58,
      lastNotified: null,
      notificationCount: 0,
      renewalContact: 'insurance@summitroofing.com',
      criticality: 'medium'
    }
  ];

  // Mock document content data
  const mockDocumentContent: { [key: string]: any } = {
    'EXP-001': {
      title: 'Fire Safety Certificate',
      type: 'Certificate',
      content: {
        certificateNumber: 'FSC-2024-001',
        issuedBy: 'Oklahoma Fire Department',
        issuedDate: '2023-02-15',
        expiryDate: '2024-02-15',
        facilityAddress: '123 Business Ave, Oklahoma City, OK 73102',
        inspectionDate: '2023-02-10',
        inspector: 'John Martinez, Fire Inspector',
        violations: 'None',
        requirements: [
          'Monthly fire extinguisher inspections',
          'Annual sprinkler system testing',
          'Emergency exit lighting maintenance'
        ],
        'Status': 'Valid',
        'Violations Found': 'None',
        'Next Inspection': '2024-02-10'
      }
    },
    'EXP-002': {
      title: 'General Liability Insurance Policy',
      type: 'Insurance',
      content: {
        policyNumber: 'GL-789456123',
        insurer: 'Commercial Insurance Corp',
        effectiveDate: '2024-01-01',
        expiryDate: '2024-12-31',
        coverageAmount: '$2,000,000',
        'Premium': '$8,500 annually',
        'Agent': 'Sarah Johnson',
        'Agent Phone': '(405) 555-0456',
        'Deductible': '$5,000',
        coverageDetails: [
          'General liability coverage',
          'Property damage protection',
          'Professional liability',
          'Workers compensation'
        ]
      }
    },
    'EXP-003': {
      title: 'HVAC Contractor License',
      type: 'License',
      content: {
        licenseNumber: 'HVAC-OK-2024-789',
        licensee: 'Arctic Air Solutions',
        issuedBy: 'Oklahoma Construction Industries Board',
        issuedDate: '2022-03-01',
        expiryDate: '2024-03-01',
        'Classification': 'Commercial HVAC Installation & Repair',
        'Bond Amount': '$50,000',
        'License Status': 'Active',
        'Renewal Required': 'Yes - Due March 1, 2024',
        bondAmount: '$50,000'
      }
    },
    'EXP-004': {
      title: 'Building Occupancy Permit',
      type: 'Permit',
      content: {
        permitNumber: 'BOP-2019-4567',
        issuedBy: 'Oklahoma City Planning Department',
        issuedDate: '2019-06-15',
        expiryDate: '2024-06-15',
        occupancyType: 'Business/Commercial Office',
        'Max Occupancy': '250 persons',
        'Floor Area': '15,000 sq ft',
        'Parking Spaces': '65 provided',
        'ADA Compliant': 'Yes',
        'Fire Safety Approved': 'Yes',
        floorArea: '15,000 sq ft'
      }
    },
    'EXP-005': {
      title: 'Preventive Maintenance Agreement',
      type: 'Contract',
      content: {
        contractNumber: 'PMA-2023-001',
        contractor: 'ProMaint Services',
        startDate: '2023-01-01',
        endDate: '2024-12-31',
        contractValue: '$24,000 annually',
        'Payment Terms': 'Net 30 days',
        'Service Frequency': 'Monthly inspections',
        'Emergency Response': '24/7 available',
        'Contact Person': 'Mike Thompson',
        'Contact Phone': '(405) 555-0654',
        services: [
          'HVAC system maintenance',
          'Plumbing inspections',
          'Electrical safety checks'
        ]
      }
    }
  };

  // Mock Documents Data
  const mockDocuments: Document[] = [
    {
      id: 'DOC-2024-001',
      name: 'Arctic Air Solutions - W9 Tax Form 2024',
      type: 'w9',
      category: 'Tax Documents',
      uploadedBy: 'Arctic Air Solutions',
      uploadedDate: '2024-01-15',
      lastModified: '2024-01-15',
      version: 1,
      size: '245 KB',
      status: 'active',
      owner: 'Arctic Air Solutions',
      ownerType: 'vendor',
      permissions: [
        {
          userId: 'vendor-001',
          userType: 'vendor',
          userName: 'Arctic Air Solutions',
          permissions: ['view', 'download', 'edit'],
          grantedBy: 'System',
          grantedDate: '2024-01-15'
        },
        {
          userId: 'admin-001',
          userType: 'ffm_admin',
          userName: 'FFM Admin',
          permissions: ['view', 'download', 'edit', 'share', 'delete'],
          grantedBy: 'System',
          grantedDate: '2024-01-15'
        }
      ],
      versions: [
        {
          version: 1,
          uploadedBy: 'Arctic Air Solutions',
          uploadedDate: '2024-01-15',
          size: '245 KB',
          changes: 'Initial upload',
          status: 'current'
        }
      ],
      tags: ['tax', 'vendor', 'required'],
      description: 'W-9 tax form for vendor payment processing',
      complianceRequired: true,
      approvalStatus: 'approved',
      approvedBy: 'FFM Admin',
      approvedDate: '2024-01-15',
      sharedWith: [
        {
          sharedWith: 'Metro Properties LLC',
          sharedWithType: 'client',
          sharedBy: 'FFM Admin',
          sharedDate: '2024-01-16',
          permissions: ['view', 'download'],
          accessed: true,
          lastAccessed: '2024-01-18'
        }
      ],
      downloadCount: 5,
      lastAccessed: '2024-01-20'
    },
    {
      id: 'DOC-2024-002',
      name: 'Arctic Air Solutions - General Liability Insurance',
      type: 'coi',
      category: 'Insurance',
      uploadedBy: 'Arctic Air Solutions',
      uploadedDate: '2024-01-10',
      lastModified: '2024-01-22',
      version: 2,
      size: '1.2 MB',
      status: 'expiring_soon',
      expiryDate: '2024-03-15',
      owner: 'Arctic Air Solutions',
      ownerType: 'vendor',
      permissions: [
        {
          userId: 'vendor-001',
          userType: 'vendor',
          userName: 'Arctic Air Solutions',
          permissions: ['view', 'download', 'edit'],
          grantedBy: 'System',
          grantedDate: '2024-01-10'
        },
        {
          userId: 'admin-001',
          userType: 'ffm_admin',
          userName: 'FFM Admin',
          permissions: ['view', 'download', 'edit', 'share', 'delete'],
          grantedBy: 'System',
          grantedDate: '2024-01-10'
        }
      ],
      versions: [
        {
          version: 1,
          uploadedBy: 'Arctic Air Solutions',
          uploadedDate: '2024-01-10',
          size: '1.1 MB',
          changes: 'Initial upload',
          status: 'archived'
        },
        {
          version: 2,
          uploadedBy: 'Arctic Air Solutions',
          uploadedDate: '2024-01-22',
          size: '1.2 MB',
          changes: 'Updated coverage amounts and additional insured',
          status: 'current'
        }
      ],
      tags: ['insurance', 'liability', 'vendor', 'expiring'],
      description: 'General liability insurance certificate - $2M coverage',
      complianceRequired: true,
      approvalStatus: 'approved',
      approvedBy: 'FFM Admin',
      approvedDate: '2024-01-22',
      sharedWith: [
        {
          sharedWith: 'Metro Properties LLC',
          sharedWithType: 'client',
          sharedBy: 'FFM Admin',
          sharedDate: '2024-01-23',
          permissions: ['view', 'download'],
          accessed: true,
          lastAccessed: '2024-01-25'
        },
        {
          sharedWith: 'Downtown Office Complex',
          sharedWithType: 'client',
          sharedBy: 'FFM Admin',
          sharedDate: '2024-01-23',
          permissions: ['view', 'download'],
          accessed: false
        }
      ],
      downloadCount: 12,
      lastAccessed: '2024-01-25'
    },
    {
      id: 'DOC-2024-003',
      name: 'HVAC Contractor License - State of Oklahoma',
      type: 'license',
      category: 'Licenses',
      uploadedBy: 'Arctic Air Solutions',
      uploadedDate: '2024-01-08',
      lastModified: '2024-01-08',
      version: 1,
      size: '890 KB',
      status: 'active',
      expiryDate: '2025-12-31',
      owner: 'Arctic Air Solutions',
      ownerType: 'vendor',
      permissions: [
        {
          userId: 'vendor-001',
          userType: 'vendor',
          userName: 'Arctic Air Solutions',
          permissions: ['view', 'download'],
          grantedBy: 'System',
          grantedDate: '2024-01-08'
        },
        {
          userId: 'admin-001',
          userType: 'ffm_admin',
          userName: 'FFM Admin',
          permissions: ['view', 'download', 'edit', 'share', 'delete'],
          grantedBy: 'System',
          grantedDate: '2024-01-08'
        }
      ],
      versions: [
        {
          version: 1,
          uploadedBy: 'Arctic Air Solutions',
          uploadedDate: '2024-01-08',
          size: '890 KB',
          changes: 'Initial upload',
          status: 'current'
        }
      ],
      tags: ['license', 'hvac', 'state', 'contractor'],
      description: 'State of Oklahoma HVAC contractor license',
      complianceRequired: true,
      approvalStatus: 'approved',
      approvedBy: 'FFM Admin',
      approvedDate: '2024-01-08',
      sharedWith: [],
      downloadCount: 3,
      lastAccessed: '2024-01-20'
    },
    {
      id: 'DOC-2024-004',
      name: 'Metro Properties - Master Service Agreement',
      type: 'service_agreement',
      category: 'Contracts',
      uploadedBy: 'FFM Admin',
      uploadedDate: '2024-01-05',
      lastModified: '2024-01-18',
      version: 3,
      size: '2.1 MB',
      status: 'active',
      owner: 'Metro Properties LLC',
      ownerType: 'client',
      permissions: [
        {
          userId: 'client-001',
          userType: 'client',
          userName: 'Metro Properties LLC',
          permissions: ['view', 'download'],
          grantedBy: 'FFM Admin',
          grantedDate: '2024-01-05'
        },
        {
          userId: 'admin-001',
          userType: 'ffm_admin',
          userName: 'FFM Admin',
          permissions: ['view', 'download', 'edit', 'share', 'delete'],
          grantedBy: 'System',
          grantedDate: '2024-01-05'
        }
      ],
      versions: [
        {
          version: 1,
          uploadedBy: 'FFM Admin',
          uploadedDate: '2024-01-05',
          size: '1.8 MB',
          changes: 'Initial contract draft',
          status: 'archived'
        },
        {
          version: 2,
          uploadedBy: 'FFM Admin',
          uploadedDate: '2024-01-12',
          size: '1.9 MB',
          changes: 'Updated pricing terms and SLA requirements',
          status: 'archived'
        },
        {
          version: 3,
          uploadedBy: 'FFM Admin',
          uploadedDate: '2024-01-18',
          size: '2.1 MB',
          changes: 'Final version with client amendments and signatures',
          status: 'current'
        }
      ],
      tags: ['contract', 'service', 'client', 'signed'],
      description: 'Master service agreement for facilities management services',
      complianceRequired: false,
      approvalStatus: 'approved',
      approvedBy: 'Legal Team',
      approvedDate: '2024-01-18',
      sharedWith: [
        {
          sharedWith: 'Arctic Air Solutions',
          sharedWithType: 'vendor',
          sharedBy: 'FFM Admin',
          sharedDate: '2024-01-19',
          permissions: ['view'],
          expiryDate: '2024-12-31',
          accessed: true,
          lastAccessed: '2024-01-20'
        }
      ],
      downloadCount: 8,
      lastAccessed: '2024-01-22'
    },
    {
      id: 'DOC-2024-005',
      name: 'FastFlow Plumbing - Workers Compensation Insurance',
      type: 'coi',
      category: 'Insurance',
      uploadedBy: 'FastFlow Plumbing',
      uploadedDate: '2024-01-20',
      lastModified: '2024-01-20',
      version: 1,
      size: '756 KB',
      status: 'pending_review',
      expiryDate: '2024-12-31',
      owner: 'FastFlow Plumbing',
      ownerType: 'vendor',
      permissions: [
        {
          userId: 'vendor-002',
          userType: 'vendor',
          userName: 'FastFlow Plumbing',
          permissions: ['view', 'download', 'edit'],
          grantedBy: 'System',
          grantedDate: '2024-01-20'
        },
        {
          userId: 'admin-001',
          userType: 'ffm_admin',
          userName: 'FFM Admin',
          permissions: ['view', 'download', 'edit', 'share', 'delete'],
          grantedBy: 'System',
          grantedDate: '2024-01-20'
        }
      ],
      versions: [
        {
          version: 1,
          uploadedBy: 'FastFlow Plumbing',
          uploadedDate: '2024-01-20',
          size: '756 KB',
          changes: 'Initial upload',
          status: 'current'
        }
      ],
      tags: ['insurance', 'workers-comp', 'vendor', 'pending'],
      description: 'Workers compensation insurance certificate',
      complianceRequired: true,
      approvalStatus: 'pending',
      sharedWith: [],
      downloadCount: 1,
      lastAccessed: '2024-01-20'
    },
    {
      id: 'DOC-2024-006',
      name: 'Summit Roofing - EPA Lead Certification',
      type: 'certificate',
      category: 'Certifications',
      uploadedBy: 'Summit Roofing Co',
      uploadedDate: '2024-01-12',
      lastModified: '2024-01-12',
      version: 1,
      size: '445 KB',
      status: 'expired',
      expiryDate: '2024-01-10',
      owner: 'Summit Roofing Co',
      ownerType: 'vendor',
      permissions: [
        {
          userId: 'vendor-003',
          userType: 'vendor',
          userName: 'Summit Roofing Co',
          permissions: ['view', 'download', 'edit'],
          grantedBy: 'System',
          grantedDate: '2024-01-12'
        },
        {
          userId: 'admin-001',
          userType: 'ffm_admin',
          userName: 'FFM Admin',
          permissions: ['view', 'download', 'edit', 'share', 'delete'],
          grantedBy: 'System',
          grantedDate: '2024-01-12'
        }
      ],
      versions: [
        {
          version: 1,
          uploadedBy: 'Summit Roofing Co',
          uploadedDate: '2024-01-12',
          size: '445 KB',
          changes: 'Initial upload',
          status: 'current'
        }
      ],
      tags: ['certification', 'epa', 'lead', 'expired'],
      description: 'EPA Lead-Safe Certification for renovation work',
      complianceRequired: true,
      approvalStatus: 'rejected',
      sharedWith: [],
      downloadCount: 2,
      lastAccessed: '2024-01-15'
    }
  ];

  // Mock Expiry Alerts
  const mockExpiryAlerts: ExpiryAlert[] = [
    {
      id: 'ALERT-001',
      documentId: 'DOC-2024-002',
      documentName: 'Arctic Air Solutions - General Liability Insurance',
      owner: 'Arctic Air Solutions',
      ownerType: 'vendor',
      expiryDate: '2024-03-15',
      daysUntilExpiry: 54,
      severity: 'warning',
      acknowledged: false,
      remindersSent: 1,
      lastReminderDate: '2024-01-20'
    },
    {
      id: 'ALERT-002',
      documentId: 'DOC-2024-006',
      documentName: 'Summit Roofing - EPA Lead Certification',
      owner: 'Summit Roofing Co',
      ownerType: 'vendor',
      expiryDate: '2024-01-10',
      daysUntilExpiry: -15,
      severity: 'critical',
      acknowledged: false,
      remindersSent: 3,
      lastReminderDate: '2024-01-25'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'active': 'bg-green-500/20 text-green-400 border-green-500/30',
      'expired': 'bg-red-500/20 text-red-400 border-red-500/30',
      'expiring_soon': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'pending_review': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'archived': 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      'w9': FileText,
      'coi': Shield,
      'license': Key,
      'service_agreement': File,
      'certificate': Award,
      'contract': FileText,
      'other': File
    };
    return icons[type as keyof typeof icons] || File;
  };

  const formatFileSize = (size: string) => size;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesOwnerType = selectedOwnerType === 'all' || doc.ownerType === selectedOwnerType;
    const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesOwnerType && matchesStatus && matchesSearch;
  });

  const documentStats = {
    total: mockDocuments.length,
    active: mockDocuments.filter(d => d.status === 'active').length,
    expiring: mockDocuments.filter(d => d.status === 'expiring_soon').length,
    expired: mockDocuments.filter(d => d.status === 'expired').length,
    pending: mockDocuments.filter(d => d.status === 'pending_review').length
  };

  const uploadDocument = () => {
    alert('📄 Document Upload Started!\n\nDocument upload functionality would include:\n• Drag & drop file upload\n• Automatic file type detection\n• Version control assignment\n• Permission setup\n• Compliance validation\n• Expiry date setting\n\nDocument would be processed and added to the system.');
    setShowUploadModal(false);
  };

  const shareDocument = (docId: string) => {
    alert(`🔗 Document Sharing Initiated!\n\nDocument ${docId} sharing would include:\n• User/role selection\n• Permission level assignment\n• Expiry date setting\n• Access tracking\n• Notification sending\n• Audit trail creation\n\nSharing permissions would be applied immediately.`);
    setShowShareModal(false);
  };

  const approveDocument = (docId: string) => {
    alert(`✅ Document Approved!\n\nDocument ${docId} has been approved and is now active in the system.\n\nActions taken:\n• Status updated to approved\n• Compliance requirements met\n• Stakeholders notified\n• Audit trail updated`);
  };

  const rejectDocument = (docId: string) => {
    alert(`❌ Document Rejected!\n\nDocument ${docId} has been rejected.\n\nActions taken:\n• Status updated to rejected\n• Owner notified with feedback\n• Compliance status updated\n• Re-submission required`);
  };

  const acknowledgeAlert = (alertId: string) => {
    alert(`🔔 Alert Acknowledged!\n\nAlert ${alertId} has been acknowledged.\n\nActions taken:\n• Alert marked as acknowledged\n• Reminder schedule updated\n• Stakeholders notified\n• Follow-up actions scheduled`);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Document Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-xl border border-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-blue-400 font-semibold">Total Documents</h3>
            <FileText className="text-blue-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{documentStats.total}</div>
          <div className="text-sm text-blue-300 mt-1">All document types</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-6 rounded-xl border border-green-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-green-400 font-semibold">Active</h3>
            <CheckCircle className="text-green-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{documentStats.active}</div>
          <div className="text-sm text-green-300 mt-1">Current & valid</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 p-6 rounded-xl border border-yellow-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-yellow-400 font-semibold">Expiring Soon</h3>
            <Clock className="text-yellow-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{documentStats.expiring}</div>
          <div className="text-sm text-yellow-300 mt-1">Within 60 days</div>
        </div>

        <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 p-6 rounded-xl border border-red-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-red-400 font-semibold">Expired</h3>
            <AlertTriangle className="text-red-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{documentStats.expired}</div>
          <div className="text-sm text-red-300 mt-1">Require renewal</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-6 rounded-xl border border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-purple-400 font-semibold">Pending Review</h3>
            <Eye className="text-purple-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{documentStats.pending}</div>
          <div className="text-sm text-purple-300 mt-1">Awaiting approval</div>
        </div>
      </div>

      {/* Expiry Alerts */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Bell className="mr-2 text-red-400" size={20} />
          Document Expiry Alerts
        </h3>
        
        <div className="space-y-3">
          {mockExpiryAlerts.filter(a => !a.acknowledged).map((alert) => (
            <div key={alert.id} className={`p-4 rounded-lg border ${
              alert.severity === 'critical' ? 'bg-red-500/10 border-red-500/20' : 'bg-yellow-500/10 border-yellow-500/20'
            }`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-white">{alert.documentName}</h4>
                  <p className="text-sm text-gray-400">Owner: {alert.owner}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${
                    alert.severity === 'critical' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                  }`}>
                    {alert.daysUntilExpiry > 0 ? `${alert.daysUntilExpiry} days` : `${Math.abs(alert.daysUntilExpiry)} days overdue`}
                  </span>
                </div>
              </div>
              
              <p className={`mb-3 text-sm ${alert.severity === 'critical' ? 'text-red-300' : 'text-yellow-300'}`}>
                Expires: {formatDate(alert.expiryDate)} • {alert.remindersSent} reminders sent
              </p>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => acknowledgeAlert(alert.id)}
                  className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Acknowledge
                </button>
                <button
                  onClick={() => setSelectedDocument(alert.documentId)}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  View Document
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <History className="mr-2 text-teal-400" size={20} />
          Recent Document Activity
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <Upload className="text-green-400" size={20} />
            <div>
              <div className="font-medium text-white">New document uploaded</div>
              <div className="text-sm text-gray-400">FastFlow Plumbing - Workers Comp Insurance • 2 hours ago</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <Share2 className="text-blue-400" size={20} />
            <div>
              <div className="font-medium text-white">Document shared</div>
              <div className="text-sm text-gray-400">Arctic Air COI shared with Metro Properties • 4 hours ago</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <AlertTriangle className="text-yellow-400" size={20} />
            <div>
              <div className="font-medium text-white">Expiry reminder sent</div>
              <div className="text-sm text-gray-400">Arctic Air Insurance expires in 54 days • 6 hours ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Categories</option>
            <option value="tax">Tax Documents</option>
            <option value="insurance">Insurance</option>
            <option value="licenses">Licenses</option>
            <option value="contracts">Contracts</option>
            <option value="certifications">Certifications</option>
          </select>
          <select
            value={selectedOwnerType}
            onChange={(e) => setSelectedOwnerType(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Owners</option>
            <option value="client">Clients</option>
            <option value="vendor">Vendors</option>
            <option value="ffm">FFM</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expiring_soon">Expiring Soon</option>
            <option value="expired">Expired</option>
            <option value="pending_review">Pending Review</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
        >
          <Upload size={16} />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Documents List */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-4">Document Library</h3>
        
        <div className="space-y-3">
          {filteredDocuments.map((doc) => {
            const IconComponent = getTypeIcon(doc.type);
            return (
              <div key={doc.id} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30 hover:border-teal-500/50 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
                      <IconComponent className="text-teal-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{doc.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>Owner: {doc.owner}</span>
                        <span>•</span>
                        <span>Version: {doc.version}</span>
                        <span>•</span>
                        <span>Size: {doc.size}</span>
                        <span>•</span>
                        <span>Modified: {formatDate(doc.lastModified)}</span>
                      </div>
                      {doc.expiryDate && (
                        <div className="text-sm text-gray-400 mt-1">
                          Expires: {formatDate(doc.expiryDate)} ({getDaysUntilExpiry(doc.expiryDate)} days)
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(doc.status)}`}>
                      {doc.status.replace('_', ' ').toUpperCase()}
                    </span>
                    <button
                      onClick={() => setSelectedDocument(doc.id)}
                      className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {doc.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-teal-500/20 text-teal-400 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => alert(`📥 Downloading ${doc.name}...`)}
                      className="text-gray-400 hover:text-teal-400 transition-colors"
                    >
                      <Download size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDocument(doc.id);
                        setShowShareModal(true);
                      }}
                      className="text-gray-400 hover:text-teal-400 transition-colors"
                    >
                      <Share2 size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDocument(doc.id);
                        setShowVersionHistory(true);
                      }}
                      className="text-gray-400 hover:text-teal-400 transition-colors"
                    >
                      <History size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderDocumentDetails = () => {
    const doc = mockDocuments.find(d => d.id === selectedDocument);
    if (!doc) return null;

    const IconComponent = getTypeIcon(doc.type);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedDocument(null)}
            className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors"
          >
            <X size={20} />
            <span>Back to Documents</span>
          </button>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => alert(`📥 Downloading ${doc.name}...`)}
              className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-sm transition-colors"
            >
              <Download size={14} className="inline mr-1" />
              Download
            </button>
            <button
              onClick={() => setShowShareModal(true)}
              className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded text-sm transition-colors"
            >
              <Share2 size={14} className="inline mr-1" />
              Share
            </button>
          </div>
        </div>

        {/* Document Header */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-16 h-16 bg-teal-500/20 rounded-xl flex items-center justify-center">
              <IconComponent className="text-teal-400" size={32} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-white mb-2">{doc.name}</h2>
              <p className="text-gray-400 mb-3">{doc.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>Owner: {doc.owner}</span>
                <span>•</span>
                <span>Type: {doc.ownerType}</span>
                <span>•</span>
                <span>Category: {doc.category}</span>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-lg font-medium border ${getStatusColor(doc.status)}`}>
              {doc.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-teal-400 font-semibold mb-3">Document Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Version:</span>
                  <span className="text-white">{doc.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Size:</span>
                  <span className="text-white">{doc.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Uploaded:</span>
                  <span className="text-white">{formatDate(doc.uploadedDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Modified:</span>
                  <span className="text-white">{formatDate(doc.lastModified)}</span>
                </div>
                {doc.expiryDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Expires:</span>
                    <span className="text-white">{formatDate(doc.expiryDate)}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-teal-400 font-semibold mb-3">Compliance</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Required:</span>
                  <span className={doc.complianceRequired ? 'text-yellow-400' : 'text-gray-400'}>
                    {doc.complianceRequired ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className={`${
                    doc.approvalStatus === 'approved' ? 'text-green-400' :
                    doc.approvalStatus === 'pending' ? 'text-yellow-400' :
                    doc.approvalStatus === 'rejected' ? 'text-red-400' :
                    'text-gray-400'
                  }`}>
                    {doc.approvalStatus.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                {doc.approvedBy && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Approved By:</span>
                      <span className="text-white">{doc.approvedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Approved Date:</span>
                      <span className="text-white">{formatDate(doc.approvedDate!)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-teal-400 font-semibold mb-3">Usage Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Downloads:</span>
                  <span className="text-white">{doc.downloadCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shared With:</span>
                  <span className="text-white">{doc.sharedWith.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Accessed:</span>
                  <span className="text-white">{formatDate(doc.lastAccessed)}</span>
                </div>
              </div>
            </div>
          </div>

          {doc.approvalStatus === 'pending' && (
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => approveDocument(doc.id)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
              >
                <CheckCircle size={16} className="inline mr-2" />
                Approve Document
              </button>
              <button
                onClick={() => rejectDocument(doc.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
              >
                <X size={16} className="inline mr-2" />
                Reject Document
              </button>
            </div>
          )}
        </div>

        {/* Document Tags */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Tag className="mr-2 text-teal-400" size={20} />
            Tags & Categories
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {doc.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Permissions */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <Lock className="mr-2 text-teal-400" size={20} />
              Access Permissions
            </h3>
            <button
              onClick={() => setShowPermissionsModal(true)}
              className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded text-sm transition-colors"
            >
              Manage Permissions
            </button>
          </div>
          
          <div className="space-y-3">
            {doc.permissions.map((perm, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-700/20 rounded">
                <div>
                  <div className="font-semibold text-white">{perm.userName}</div>
                  <div className="text-sm text-gray-400">{perm.userType} • Granted: {formatDate(perm.grantedDate)}</div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {perm.permissions.map((p, pIndex) => (
                    <span key={pIndex} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shared Access */}
        {doc.sharedWith.length > 0 && (
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Share2 className="mr-2 text-teal-400" size={20} />
              Shared Access
            </h3>
            
            <div className="space-y-3">
              {doc.sharedWith.map((share, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-700/20 rounded">
                  <div>
                    <div className="font-semibold text-white">{share.sharedWith}</div>
                    <div className="text-sm text-gray-400">
                      Shared by {share.sharedBy} on {formatDate(share.sharedDate)}
                      {share.expiryDate && ` • Expires: ${formatDate(share.expiryDate)}`}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${share.accessed ? 'text-green-400' : 'text-gray-400'}`}>
                      {share.accessed ? 'Accessed' : 'Not Accessed'}
                    </div>
                    {share.lastAccessed && (
                      <div className="text-xs text-gray-500">Last: {formatDate(share.lastAccessed)}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Version History */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <History className="mr-2 text-teal-400" size={20} />
              Version History
            </h3>
            <button
              onClick={() => setShowVersionHistory(true)}
              className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded text-sm transition-colors"
            >
              View All Versions
            </button>
          </div>
          
          <div className="space-y-3">
            {doc.versions.slice(0, 3).map((version, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-700/20 rounded">
                <div>
                  <div className="font-semibold text-white">Version {version.version}</div>
                  <div className="text-sm text-gray-400">
                    {version.changes} • {formatDate(version.uploadedDate)}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${version.status === 'current' ? 'text-green-400' : 'text-gray-400'}`}>
                    {version.status.toUpperCase()}
                  </div>
                  <div className="text-xs text-gray-500">{version.size}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderAccessControl = () => {
    const totalUsers = mockAccessData.reduce((acc, doc) => acc + doc.users.length, 0);
    const activePermissions = mockAccessData.reduce((acc, doc) => 
      acc + doc.users.filter(user => user.status === 'active').length, 0);
    const expiringPermissions = mockAccessData.reduce((acc, doc) => 
      acc + doc.users.filter(user => user.status === 'expiring').length, 0);
    const expiredAccess = mockAccessData.reduce((acc, doc) => 
      acc + doc.users.filter(user => user.status === 'expired').length, 0);

    const getStatusColor = (status: string) => {
      const colors = {
        'active': 'bg-green-500/20 text-green-400 border-green-500/30',
        'expiring': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        'expired': 'bg-red-500/20 text-red-400 border-red-500/30'
      };
      return colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    };

    const getPermissionColor = (permission: string) => {
      const colors = {
        'view': 'bg-blue-500/20 text-blue-400',
        'download': 'bg-green-500/20 text-green-400',
        'edit': 'bg-yellow-500/20 text-yellow-400',
        'share': 'bg-purple-500/20 text-purple-400',
        'delete': 'bg-red-500/20 text-red-400'
      };
      return colors[permission as keyof typeof colors] || 'bg-gray-500/20 text-gray-400';
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Access Control Management</h2>
          <button
            onClick={() => setActiveTab('dashboard')}
            className="bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-xl border border-blue-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-blue-400 font-semibold">Total Users</h3>
              <Users className="text-blue-400" size={24} />
            </div>
            <div className="text-2xl font-bold text-white">{totalUsers}</div>
            <div className="text-sm text-blue-300 mt-1">With document access</div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-6 rounded-xl border border-green-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-green-400 font-semibold">Active Permissions</h3>
              <CheckCircle className="text-green-400" size={24} />
            </div>
            <div className="text-2xl font-bold text-white">{activePermissions}</div>
            <div className="text-sm text-green-300 mt-1">Currently active</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 p-6 rounded-xl border border-yellow-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-yellow-400 font-semibold">Expiring Soon</h3>
              <Clock className="text-yellow-400" size={24} />
            </div>
            <div className="text-2xl font-bold text-white">{expiringPermissions}</div>
            <div className="text-sm text-yellow-300 mt-1">Require renewal</div>
          </div>

          <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 p-6 rounded-xl border border-red-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-red-400 font-semibold">Expired Access</h3>
              <AlertTriangle className="text-red-400" size={24} />
            </div>
            <div className="text-2xl font-bold text-white">{expiredAccess}</div>
            <div className="text-sm text-red-300 mt-1">Need attention</div>
          </div>
        </div>

        {/* Document Access Control */}
        <div className="space-y-6">
          {mockAccessData.map((document) => (
            <div key={document.documentId} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">{document.documentName}</h3>
                <span className="text-gray-400 text-sm">ID: {document.documentId}</span>
              </div>

              <div className="space-y-4">
                {document.users.map((user) => (
                  <div key={user.id} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-white">{user.name}</h4>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(user.status)}`}>
                            {user.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-400 mb-2">
                          <span>{user.email} • {user.role}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {user.permissions.map((permission) => (
                            <span key={permission} className={`px-2 py-1 rounded text-xs font-medium ${getPermissionColor(permission)}`}>
                              {permission.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-400">
                        <div>Granted by: {user.grantedBy}</div>
                        <div>Granted: {new Date(user.grantedDate).toLocaleDateString()}</div>
                        <div>Expires: {new Date(user.expiryDate).toLocaleDateString()}</div>
                        <div>Last accessed: {new Date(user.lastAccessed).toLocaleDateString()}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
                        Edit Access
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors">
                        Revoke Access
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderExpiryManagement = () => {
    const getExpiryStatusColor = (status: string) => {
      const colors = {
        'expired': 'bg-red-500/20 text-red-400 border-red-500/30',
        'critical': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
        'warning': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        'healthy': 'bg-green-500/20 text-green-400 border-green-500/30'
      };
      return colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    };

    const expiredCount = mockExpiryData.filter(doc => doc.status === 'expired').length;
    const criticalCount = mockExpiryData.filter(doc => doc.status === 'critical').length;
    const warningCount = mockExpiryData.filter(doc => doc.status === 'warning').length;
    const healthyCount = mockExpiryData.filter(doc => doc.status === 'healthy').length;

    return (
      <div className="space-y-6">
        {selectedDocument && (
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Document Details</h3>
              <button
                onClick={() => setSelectedDocument(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            {mockDocumentContent[selectedDocument] && (
              <div className="space-y-6">
                <div className="border-b border-gray-700/30 pb-4">
                  <h4 className="text-2xl font-semibold text-white mb-2">
                    {mockDocumentContent[selectedDocument].title}
                  </h4>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                    {mockDocumentContent[selectedDocument].type}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {Object.entries(mockDocumentContent[selectedDocument].content).map(([key, value]) => {
                    if (Array.isArray(value)) {
                      return (
                        <div key={key} className="bg-gray-700/20 p-4 rounded-lg border border-gray-700/30">
                          <h5 className="text-teal-400 font-semibold mb-3 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h5>
                          <ul className="space-y-1">
                            {value.map((item, index) => (
                              <li key={index} className="text-gray-300 flex items-center">
                                <div className="w-2 h-2 bg-teal-400 rounded-full mr-2"></div>
                                {String(item)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    } else {
                      return (
                        <div key={key} className="flex justify-between items-center p-3 bg-gray-700/20 rounded border border-gray-700/30">
                          <span className="text-gray-400 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <span className="text-white font-medium">{String(value)}</span>
                        </div>
                      );
                    }
                  })}
                </div>
                
                <div className="flex justify-center space-x-4 pt-4 border-t border-gray-700/30">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors font-semibold">
                    <Download className="inline mr-2" size={16} />
                    Download PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Document Expiry Management</h2>
          <button
            onClick={() => setActiveTab('dashboard')}
            className="bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 p-6 rounded-xl border border-red-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-red-400 font-semibold">Expired</h3>
              <AlertTriangle className="text-red-400" size={24} />
            </div>
            <div className="text-2xl font-bold text-white">{expiredCount}</div>
            <div className="text-sm text-red-300 mt-1">Immediate action required</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 p-6 rounded-xl border border-orange-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-orange-400 font-semibold">Critical</h3>
              <Clock className="text-orange-400" size={24} />
            </div>
            <div className="text-2xl font-bold text-white">{criticalCount}</div>
            <div className="text-sm text-orange-300 mt-1">Expires within 7 days</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 p-6 rounded-xl border border-yellow-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-yellow-400 font-semibold">Warning</h3>
              <Bell className="text-yellow-400" size={24} />
            </div>
            <div className="text-2xl font-bold text-white">{warningCount}</div>
            <div className="text-sm text-yellow-300 mt-1">Expires within 30 days</div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-6 rounded-xl border border-green-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-green-400 font-semibold">Healthy</h3>
              <CheckCircle className="text-green-400" size={24} />
            </div>
            <div className="text-2xl font-bold text-white">{healthyCount}</div>
            <div className="text-sm text-green-300 mt-1">More than 30 days</div>
          </div>
        </div>

        {/* Expiry Timeline */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Calendar className="mr-2 text-teal-400" size={20} />
            Document Expiry Timeline
          </h3>
          
          <div className="space-y-4">
            {mockExpiryData
              .sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry)
              .map((doc) => (
                <div key={doc.id} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">{doc.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>Type: {doc.type}</span>
                        <span>•</span>
                        <span>Owner: {doc.owner}</span>
                        <span>•</span>
                        <span>Expires: {new Date(doc.expiryDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getExpiryStatusColor(doc.status)}`}>
                        {doc.status.toUpperCase()}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {doc.daysUntilExpiry < 0 
                          ? `${Math.abs(doc.daysUntilExpiry)} days overdue`
                          : `${doc.daysUntilExpiry} days remaining`
                        }
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>Contact: {doc.renewalContact}</span>
                      {doc.lastNotified && (
                        <>
                          <span>•</span>
                          <span>Last notified: {new Date(doc.lastNotified).toLocaleDateString()}</span>
                        </>
                      )}
                      <span>•</span>
                      <span>Notifications sent: {doc.notificationCount}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
                        Send Reminder
                      </button>
                      <button
                        onClick={() => setSelectedDocument(doc.id)}
                        className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        View Document
                      </button>
                    </div>
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
              <h1 className="text-2xl font-semibold">Document Management System</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">Secure Document Storage & Sharing</span>
                <span className="text-xs text-gray-400">• Version Control • Expiry Alerts • Permissioned Access</span>
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
          <strong className="text-teal-400">Document Management:</strong> Centralized storage for W-9s, COIs, licenses, and service agreements with version control, expiry alerts, and granular permission management for clients and vendors.
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'documents', label: 'Document Library', icon: FileText },
            { id: 'expiry', label: 'Expiry Management', icon: Clock },
            { id: 'permissions', label: 'Access Control', icon: Lock }
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
        {selectedDocument && activeTab === 'documents' ? renderDocumentDetails() : 
         activeTab === 'dashboard' ? renderDashboard() :
         activeTab === 'documents' ? renderDocuments() :
         activeTab === 'expiry' ? renderExpiryManagement() :
         activeTab === 'permissions' ? renderAccessControl() : (
           <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
             <h3 className="text-xl font-semibold text-white mb-4">Access Control</h3>
             <p className="text-gray-400">Advanced permission management and access control system would be implemented here.</p>
           </div>
         )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-2xl border border-gray-700/30 w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Upload Document</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-teal-500/30 rounded-lg p-8 text-center bg-teal-500/5 hover:bg-teal-500/10 transition-colors cursor-pointer">
                <Upload className="text-teal-400 mx-auto mb-4" size={48} />
                <p className="text-gray-300 mb-2">Drop your document here or click to browse</p>
                <p className="text-sm text-gray-500">Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select className="px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500">
                  <option value="">Document Type</option>
                  <option value="w9">W-9 Tax Form</option>
                  <option value="coi">Certificate of Insurance</option>
                  <option value="license">License</option>
                  <option value="service_agreement">Service Agreement</option>
                  <option value="certificate">Certificate</option>
                  <option value="other">Other</option>
                </select>
                
                <input
                  type="date"
                  placeholder="Expiry Date (if applicable)"
                  className="px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
                />
              </div>
              
              <textarea
                placeholder="Document description..."
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
              />
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={uploadDocument}
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors"
                >
                  Upload Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-2xl border border-gray-700/30 w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Share Document</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select className="px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500">
                  <option value="">Select User/Organization</option>
                  <option value="client1">Metro Properties LLC</option>
                  <option value="client2">Downtown Office Complex</option>
                  <option value="vendor1">Arctic Air Solutions</option>
                  <option value="vendor2">FastFlow Plumbing</option>
                </select>
                
                <select className="px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500">
                  <option value="">Permission Level</option>
                  <option value="view">View Only</option>
                  <option value="download">View & Download</option>
                  <option value="edit">View, Download & Edit</option>
                </select>
              </div>
              
              <input
                type="date"
                placeholder="Access Expiry Date (optional)"
                className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
              />
              
              <textarea
                placeholder="Share message (optional)..."
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
              />
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => shareDocument(selectedDocument!)}
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors"
                >
                  Share Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManagementSystem;