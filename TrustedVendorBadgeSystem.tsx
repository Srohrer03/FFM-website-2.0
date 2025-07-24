import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Award, Star, Shield, CheckCircle, TrendingUp,
  Users, Clock, DollarSign, Target, Zap, Crown,
  Medal, Trophy, Gem, Eye, Filter, Search
} from 'lucide-react';
import Logo from './Logo';

interface TrustedVendor {
  id: string;
  name: string;
  category: string;
  badgeLevel: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Elite';
  overallScore: number;
  certifications: string[];
  specialties: string[];
  metrics: {
    responseTime: number;
    completionRate: number;
    qualityRating: number;
    costEfficiency: number;
    safetyRecord: number;
    clientSatisfaction: number;
  };
  achievements: string[];
  workOrdersCompleted: number;
  yearsWithFFM: number;
  emergencyAvailable: boolean;
  location: string;
  badgeEarnedDate: string;
  nextReviewDate: string;
  testimonials: {
    client: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

const TrustedVendorBadgeSystem = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('directory');
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [filterBadge, setFilterBadge] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock trusted vendors data
  const mockTrustedVendors: TrustedVendor[] = [
    {
      id: 'TV-001',
      name: 'Arctic Air Solutions',
      category: 'HVAC',
      badgeLevel: 'Elite',
      overallScore: 98,
      certifications: ['EPA Certified', 'NATE Certified', 'OSHA 30', 'Energy Star Partner'],
      specialties: ['Commercial HVAC', 'Emergency Repair', 'Energy Efficiency', 'Preventive Maintenance'],
      metrics: {
        responseTime: 1.2,
        completionRate: 99,
        qualityRating: 4.9,
        costEfficiency: 96,
        safetyRecord: 100,
        clientSatisfaction: 4.9
      },
      achievements: [
        'Zero Safety Incidents - 3 Years',
        'Fastest Response Time in Category',
        'Highest Client Satisfaction Score',
        'Energy Efficiency Excellence Award',
        '500+ Work Orders Completed'
      ],
      workOrdersCompleted: 547,
      yearsWithFFM: 3,
      emergencyAvailable: true,
      location: 'Oklahoma City, OK',
      badgeEarnedDate: '2023-01-15',
      nextReviewDate: '2024-07-15',
      testimonials: [
        {
          client: 'Metro Properties LLC',
          rating: 5,
          comment: 'Arctic Air consistently delivers exceptional service. Their response time is unmatched and quality is always perfect.',
          date: '2024-01-15'
        },
        {
          client: 'Downtown Office Complex',
          rating: 5,
          comment: 'Professional, reliable, and cost-effective. They have become our go-to HVAC partner.',
          date: '2024-01-10'
        }
      ]
    },
    {
      id: 'TV-002',
      name: 'SecureGuard Systems',
      category: 'Security',
      badgeLevel: 'Platinum',
      overallScore: 95,
      certifications: ['Licensed Security Contractor', 'ASIS Certified', 'Fire Alarm License', 'Low Voltage License'],
      specialties: ['Access Control', 'CCTV Systems', 'Fire Safety', 'Emergency Response'],
      metrics: {
        responseTime: 0.5,
        completionRate: 98,
        qualityRating: 4.8,
        costEfficiency: 92,
        safetyRecord: 100,
        clientSatisfaction: 4.8
      },
      achievements: [
        'Sub-Hour Emergency Response',
        'Advanced Security Expertise',
        'Perfect Safety Record',
        'Technology Innovation Leader',
        '300+ Successful Installations'
      ],
      workOrdersCompleted: 312,
      yearsWithFFM: 2,
      emergencyAvailable: true,
      location: 'Oklahoma City, OK',
      badgeEarnedDate: '2023-06-20',
      nextReviewDate: '2024-12-20',
      testimonials: [
        {
          client: 'Corporate Plaza',
          rating: 5,
          comment: 'SecureGuard transformed our security infrastructure. Their expertise and responsiveness are outstanding.',
          date: '2024-01-12'
        }
      ]
    },
    {
      id: 'TV-003',
      name: 'ProClean Facilities',
      category: 'Cleaning',
      badgeLevel: 'Gold',
      overallScore: 92,
      certifications: ['Green Seal Certified', 'ISSA Certified', 'Bonded & Insured', 'OSHA Trained'],
      specialties: ['Commercial Cleaning', 'Deep Cleaning', 'Eco-Friendly Solutions', 'Post-Construction Cleanup'],
      metrics: {
        responseTime: 1.8,
        completionRate: 97,
        qualityRating: 4.7,
        costEfficiency: 94,
        safetyRecord: 98,
        clientSatisfaction: 4.6
      },
      achievements: [
        'Eco-Friendly Excellence',
        'Consistent Quality Delivery',
        'High Volume Capacity',
        'Green Cleaning Pioneer',
        '1000+ Cleaning Projects'
      ],
      workOrdersCompleted: 1247,
      yearsWithFFM: 4,
      emergencyAvailable: false,
      location: 'Oklahoma City, OK',
      badgeEarnedDate: '2022-03-10',
      nextReviewDate: '2024-09-10',
      testimonials: [
        {
          client: 'Business Center',
          rating: 5,
          comment: 'ProClean maintains the highest standards consistently. Their eco-friendly approach aligns with our values.',
          date: '2024-01-08'
        }
      ]
    },
    {
      id: 'TV-004',
      name: 'PowerTech Electrical',
      category: 'Electrical',
      badgeLevel: 'Silver',
      overallScore: 89,
      certifications: ['Master Electrician License', 'OSHA 30', 'NECA Member', 'Code Compliance Certified'],
      specialties: ['Commercial Electrical', 'Code Compliance', 'Emergency Service', 'LED Upgrades'],
      metrics: {
        responseTime: 2.2,
        completionRate: 95,
        qualityRating: 4.6,
        costEfficiency: 91,
        safetyRecord: 96,
        clientSatisfaction: 4.5
      },
      achievements: [
        'Code Compliance Expert',
        'Energy Efficiency Specialist',
        'Reliable Service Provider',
        'Safety Focused Operations'
      ],
      workOrdersCompleted: 234,
      yearsWithFFM: 2,
      emergencyAvailable: true,
      location: 'Oklahoma City, OK',
      badgeEarnedDate: '2023-09-15',
      nextReviewDate: '2024-03-15',
      testimonials: [
        {
          client: 'Industrial Complex',
          rating: 4,
          comment: 'PowerTech provides solid electrical services with good attention to safety and code compliance.',
          date: '2024-01-05'
        }
      ]
    },
    {
      id: 'TV-005',
      name: 'GreenScape Solutions',
      category: 'Landscaping',
      badgeLevel: 'Bronze',
      overallScore: 85,
      certifications: ['Certified Arborist', 'Pesticide License', 'Irrigation Certified', 'Landscape Contractor License'],
      specialties: ['Landscape Design', 'Seasonal Maintenance', 'Irrigation Systems', 'Tree Services'],
      metrics: {
        responseTime: 2.5,
        completionRate: 92,
        qualityRating: 4.5,
        costEfficiency: 88,
        safetyRecord: 94,
        clientSatisfaction: 4.4
      },
      achievements: [
        'Seasonal Expertise',
        'Environmental Stewardship',
        'Reliable Maintenance',
        'Customer Focused'
      ],
      workOrdersCompleted: 156,
      yearsWithFFM: 1,
      emergencyAvailable: false,
      location: 'Oklahoma City, OK',
      badgeEarnedDate: '2023-11-20',
      nextReviewDate: '2024-05-20',
      testimonials: [
        {
          client: 'Office Park',
          rating: 4,
          comment: 'GreenScape does good work with attention to environmental practices. Reliable for routine maintenance.',
          date: '2024-01-03'
        }
      ]
    }
  ];

  const getBadgeColor = (level: string) => {
    const colors = {
      'Bronze': 'from-amber-600 to-amber-700',
      'Silver': 'from-gray-400 to-gray-500',
      'Gold': 'from-yellow-400 to-yellow-500',
      'Platinum': 'from-blue-400 to-blue-500',
      'Elite': 'from-purple-500 to-pink-500'
    };
    return colors[level as keyof typeof colors] || 'from-gray-400 to-gray-500';
  };

  const getBadgeIcon = (level: string) => {
    const icons = {
      'Bronze': Medal,
      'Silver': Award,
      'Gold': Trophy,
      'Platinum': Crown,
      'Elite': Gem
    };
    return icons[level as keyof typeof icons] || Award;
  };

  const getBadgeRequirements = (level: string) => {
    const requirements = {
      'Bronze': {
        minScore: 80,
        minWorkOrders: 50,
        minYears: 0.5,
        requirements: ['Basic certifications', '80+ overall score', '50+ completed work orders', '6+ months with FFM']
      },
      'Silver': {
        minScore: 85,
        minWorkOrders: 100,
        minYears: 1,
        requirements: ['Advanced certifications', '85+ overall score', '100+ completed work orders', '1+ years with FFM', '95%+ completion rate']
      },
      'Gold': {
        minScore: 90,
        minWorkOrders: 200,
        minYears: 2,
        requirements: ['Premium certifications', '90+ overall score', '200+ completed work orders', '2+ years with FFM', '4.5+ quality rating']
      },
      'Platinum': {
        minScore: 95,
        minWorkOrders: 300,
        minYears: 2,
        requirements: ['Elite certifications', '95+ overall score', '300+ completed work orders', '2+ years with FFM', '4.8+ quality rating', 'Emergency availability']
      },
      'Elite': {
        minScore: 98,
        minWorkOrders: 500,
        minYears: 3,
        requirements: ['Master certifications', '98+ overall score', '500+ completed work orders', '3+ years with FFM', '4.9+ quality rating', 'Zero safety incidents', 'Industry leadership']
      }
    };
    return requirements[level as keyof typeof requirements];
  };

  const filteredVendors = mockTrustedVendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesBadge = filterBadge === 'all' || vendor.badgeLevel === filterBadge;
    const matchesCategory = filterCategory === 'all' || vendor.category === filterCategory;
    return matchesSearch && matchesBadge && matchesCategory;
  });

  const renderDirectory = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search trusted vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            />
          </div>
          <select
            value={filterBadge}
            onChange={(e) => setFilterBadge(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Badge Levels</option>
            <option value="Elite">Elite</option>
            <option value="Platinum">Platinum</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Bronze">Bronze</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Categories</option>
            <option value="HVAC">HVAC</option>
            <option value="Security">Security</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Electrical">Electrical</option>
            <option value="Landscaping">Landscaping</option>
          </select>
        </div>
      </div>

      {/* Badge Level Overview */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-4">Trusted Vendor Badge Levels</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {['Bronze', 'Silver', 'Gold', 'Platinum', 'Elite'].map((level) => {
            const IconComponent = getBadgeIcon(level);
            const count = mockTrustedVendors.filter(v => v.badgeLevel === level).length;
            return (
              <div key={level} className="text-center p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
                <div className={`w-16 h-16 bg-gradient-to-r ${getBadgeColor(level)} rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                  <IconComponent className="text-white" size={24} />
                </div>
                <h4 className="text-white font-semibold mb-1">{level}</h4>
                <p className="text-gray-400 text-sm">{count} vendors</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trusted Vendors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredVendors.map((vendor) => {
          const BadgeIcon = getBadgeIcon(vendor.badgeLevel);
          return (
            <div key={vendor.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30 hover:border-teal-500/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${getBadgeColor(vendor.badgeLevel)} rounded-full flex items-center justify-center shadow-lg`}>
                    <BadgeIcon className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-1">{vendor.name}</h4>
                    <p className="text-gray-400">{vendor.category} Specialist</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded text-xs font-medium bg-gradient-to-r ${getBadgeColor(vendor.badgeLevel)} text-white`}>
                        {vendor.badgeLevel} Trusted Vendor
                      </span>
                      {vendor.emergencyAvailable && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
                          24/7 Emergency
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-teal-400">{vendor.overallScore}</div>
                  <div className="text-xs text-gray-400">Overall Score</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-lg font-bold text-blue-400">{vendor.metrics.responseTime}h</div>
                  <div className="text-xs text-blue-300">Response Time</div>
                </div>
                <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="text-lg font-bold text-green-400">{vendor.metrics.completionRate}%</div>
                  <div className="text-xs text-green-300">Completion Rate</div>
                </div>
                <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="text-lg font-bold text-yellow-400">{vendor.metrics.qualityRating}</div>
                  <div className="text-xs text-yellow-300">Quality Rating</div>
                </div>
                <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="text-lg font-bold text-purple-400">{vendor.workOrdersCompleted}</div>
                  <div className="text-xs text-purple-300">Work Orders</div>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="text-gray-300 font-medium mb-2">Specialties:</h5>
                <div className="flex flex-wrap gap-2">
                  {vendor.specialties.slice(0, 3).map((specialty, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs">
                      {specialty}
                    </span>
                  ))}
                  {vendor.specialties.length > 3 && (
                    <span className="px-2 py-1 bg-gray-700/50 text-gray-400 rounded text-xs">
                      +{vendor.specialties.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  <span>Trusted since {new Date(vendor.badgeEarnedDate).getFullYear()}</span>
                </div>
                <button
                  onClick={() => setSelectedVendor(vendor.id)}
                  className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Eye size={16} className="inline mr-1" />
                  View Profile
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderVendorProfile = () => {
    const vendor = mockTrustedVendors.find(v => v.id === selectedVendor);
    if (!vendor) return null;

    const BadgeIcon = getBadgeIcon(vendor.badgeLevel);
    const requirements = getBadgeRequirements(vendor.badgeLevel);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedVendor(null)}
            className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors"
          >
            <Home size={20} />
            <span>Back to Directory</span>
          </button>
        </div>

        {/* Vendor Header */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className={`w-24 h-24 bg-gradient-to-r ${getBadgeColor(vendor.badgeLevel)} rounded-full flex items-center justify-center shadow-lg`}>
                <BadgeIcon className="text-white" size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-semibold text-white mb-2">{vendor.name}</h2>
                <p className="text-gray-400 text-lg mb-2">{vendor.category} Specialist</p>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getBadgeColor(vendor.badgeLevel)} text-white`}>
                    {vendor.badgeLevel} Trusted Vendor
                  </span>
                  {vendor.emergencyAvailable && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-500/20 text-red-400 border border-red-500/30">
                      24/7 Emergency Available
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-teal-400">{vendor.overallScore}</div>
              <div className="text-gray-400">Overall Score</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="text-lg font-bold text-blue-400">{vendor.metrics.responseTime}h</div>
              <div className="text-xs text-blue-300">Response Time</div>
            </div>
            <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="text-lg font-bold text-green-400">{vendor.metrics.completionRate}%</div>
              <div className="text-xs text-green-300">Completion Rate</div>
            </div>
            <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <div className="text-lg font-bold text-yellow-400">{vendor.metrics.qualityRating}</div>
              <div className="text-xs text-yellow-300">Quality Rating</div>
            </div>
            <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="text-lg font-bold text-purple-400">{vendor.metrics.costEfficiency}%</div>
              <div className="text-xs text-purple-300">Cost Efficiency</div>
            </div>
            <div className="text-center p-3 bg-red-500/10 rounded-lg border border-red-500/20">
              <div className="text-lg font-bold text-red-400">{vendor.metrics.safetyRecord}%</div>
              <div className="text-xs text-red-300">Safety Record</div>
            </div>
            <div className="text-center p-3 bg-teal-500/10 rounded-lg border border-teal-500/20">
              <div className="text-lg font-bold text-teal-400">{vendor.workOrdersCompleted}</div>
              <div className="text-xs text-teal-300">Work Orders</div>
            </div>
          </div>
        </div>

        {/* Badge Requirements & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h3 className="text-lg font-semibold text-white mb-4">{vendor.badgeLevel} Badge Requirements</h3>
            <div className="space-y-3">
              {requirements?.requirements.map((req, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="text-green-400" size={16} />
                  <span className="text-gray-300 text-sm">{req}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-teal-500/10 rounded-lg border border-teal-500/20">
              <div className="text-teal-400 font-medium text-sm">Badge Earned: {new Date(vendor.badgeEarnedDate).toLocaleDateString()}</div>
              <div className="text-gray-400 text-sm">Next Review: {new Date(vendor.nextReviewDate).toLocaleDateString()}</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h3 className="text-lg font-semibold text-white mb-4">Achievements & Recognition</h3>
            <div className="space-y-3">
              {vendor.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Trophy className="text-yellow-400" size={16} />
                  <span className="text-gray-300 text-sm">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications & Specialties */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h3 className="text-lg font-semibold text-white mb-4">Certifications</h3>
            <div className="space-y-2">
              {vendor.certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Shield className="text-blue-400" size={16} />
                  <span className="text-gray-300">{cert}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h3 className="text-lg font-semibold text-white mb-4">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {vendor.specialties.map((specialty, index) => (
                <span key={index} className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm">
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Client Testimonials */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <h3 className="text-lg font-semibold text-white mb-4">Client Testimonials</h3>
          <div className="space-y-4">
            {vendor.testimonials.map((testimonial, index) => (
              <div key={index} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={star <= testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}
                        />
                      ))}
                    </div>
                    <span className="text-white font-medium">{testimonial.client}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{new Date(testimonial.date).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-300 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderBadgeProgram = () => (
    <div className="space-y-6">
      {/* Program Overview */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-4">Trusted Vendor Badge Program</h3>
        <p className="text-gray-300 mb-6">
          Our Trusted Vendor Badge Program recognizes and rewards vendors who consistently deliver exceptional service, 
          maintain high safety standards, and exceed client expectations. Badges are earned through rigorous performance 
          evaluation and are reviewed regularly to ensure continued excellence.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <Shield className="text-blue-400 mx-auto mb-2" size={32} />
            <h4 className="text-white font-semibold mb-2">Rigorous Vetting</h4>
            <p className="text-gray-400 text-sm">12-point verification process including licenses, insurance, and background checks</p>
          </div>
          <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <TrendingUp className="text-green-400 mx-auto mb-2" size={32} />
            <h4 className="text-white font-semibold mb-2">Continuous Monitoring</h4>
            <p className="text-gray-400 text-sm">Real-time performance tracking with monthly reviews and client feedback</p>
          </div>
          <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <Award className="text-purple-400 mx-auto mb-2" size={32} />
            <h4 className="text-white font-semibold mb-2">Recognition & Rewards</h4>
            <p className="text-gray-400 text-sm">Priority work assignments and marketing benefits for top performers</p>
          </div>
        </div>
      </div>

      {/* Badge Levels Detail */}
      <div className="space-y-4">
        {['Elite', 'Platinum', 'Gold', 'Silver', 'Bronze'].map((level) => {
          const BadgeIcon = getBadgeIcon(level);
          const requirements = getBadgeRequirements(level);
          const vendorCount = mockTrustedVendors.filter(v => v.badgeLevel === level).length;
          
          return (
            <div key={level} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${getBadgeColor(level)} rounded-full flex items-center justify-center shadow-lg`}>
                  <BadgeIcon className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-2xl font-semibold text-white">{level} Trusted Vendor</h4>
                  <p className="text-gray-400">{vendorCount} vendors currently hold this badge</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-lg font-semibold text-white mb-3">Requirements</h5>
                  <div className="space-y-2">
                    {requirements?.requirements.map((req, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="text-teal-400" size={16} />
                        <span className="text-gray-300 text-sm">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="text-lg font-semibold text-white mb-3">Benefits</h5>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Star className="text-yellow-400" size={16} />
                      <span className="text-gray-300 text-sm">Priority work order assignments</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="text-blue-400" size={16} />
                      <span className="text-gray-300 text-sm">Featured in client vendor recommendations</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="text-green-400" size={16} />
                      <span className="text-gray-300 text-sm">Marketing and promotional support</span>
                    </div>
                    {level === 'Elite' && (
                      <div className="flex items-center space-x-2">
                        <Crown className="text-purple-400" size={16} />
                        <span className="text-gray-300 text-sm">Exclusive partnership opportunities</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
              <h1 className="text-2xl font-semibold">Trusted Vendor Badge Program</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">Elite Recognition • Performance Excellence • Quality Assurance</span>
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
          <strong className="text-teal-400">Quality Recognition:</strong> Trusted Vendor Badge Program recognizes top-performing vendors with Bronze, Silver, Gold, Platinum, and Elite badges based on performance metrics and client satisfaction.
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { id: 'directory', label: 'Trusted Vendor Directory', icon: Users },
            { id: 'program', label: 'Badge Program Details', icon: Award }
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
        {selectedVendor ? renderVendorProfile() : (
          <>
            {activeTab === 'directory' && renderDirectory()}
            {activeTab === 'program' && renderBadgeProgram()}
          </>
        )}
      </div>
    </div>
  );
};

export default TrustedVendorBadgeSystem;