import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Brain, TrendingUp, Users, DollarSign, Clock,
  Target, Zap, BarChart3, Activity, AlertTriangle,
  CheckCircle, Star, Settings, RefreshCw, Eye
} from 'lucide-react';
import Logo from './Logo';

interface VendorPerformance {
  vendorId: string;
  vendorName: string;
  category: string;
  aiScore: number;
  responseTime: number;
  completionRate: number;
  costEfficiency: number;
  qualityRating: number;
  reliabilityScore: number;
  workOrdersCompleted: number;
  averageCost: number;
  recommendations: string[];
  strengths: string[];
  improvements: string[];
}

interface AIRecommendation {
  id: string;
  type: 'vendor_selection' | 'cost_optimization' | 'performance_improvement' | 'risk_mitigation';
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  confidence: number;
  potentialSavings?: number;
  implementationEffort: 'Low' | 'Medium' | 'High';
  timeline: string;
  details: string;
}

interface WorkOrderOptimization {
  workOrderId: string;
  title: string;
  category: string;
  currentVendor: string;
  aiRecommendedVendor: string;
  reasonForChange: string;
  potentialSavings: number;
  qualityImprovement: number;
  timeImprovement: number;
  confidenceScore: number;
}

const AIVendorOptimization = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);

  // Mock AI vendor performance data
  const mockVendorPerformance: VendorPerformance[] = [
    {
      vendorId: 'VEN-001',
      vendorName: 'Arctic Air Solutions',
      category: 'HVAC',
      aiScore: 94,
      responseTime: 2.3,
      completionRate: 98,
      costEfficiency: 92,
      qualityRating: 4.9,
      reliabilityScore: 96,
      workOrdersCompleted: 127,
      averageCost: 2850,
      recommendations: [
        'Excellent performance across all metrics',
        'Consider expanding scope to include preventive maintenance',
        'Ideal for emergency response situations'
      ],
      strengths: [
        'Fastest response time in HVAC category',
        'Highest quality ratings from clients',
        'Excellent emergency availability'
      ],
      improvements: [
        'Could improve cost competitiveness by 5%',
        'Expand service area coverage'
      ]
    },
    {
      vendorId: 'VEN-002',
      vendorName: 'FastFlow Plumbing',
      category: 'Plumbing',
      aiScore: 87,
      responseTime: 3.1,
      completionRate: 94,
      costEfficiency: 89,
      qualityRating: 4.6,
      reliabilityScore: 91,
      workOrdersCompleted: 89,
      averageCost: 1250,
      recommendations: [
        'Strong performer with room for improvement',
        'Focus on response time optimization',
        'Good value for routine maintenance'
      ],
      strengths: [
        'Cost-effective pricing',
        'Reliable for routine maintenance',
        'Good client communication'
      ],
      improvements: [
        'Reduce response time by 30 minutes',
        'Improve completion rate to 96%+',
        'Enhance emergency response capabilities'
      ]
    },
    {
      vendorId: 'VEN-003',
      vendorName: 'SafeLift Services',
      category: 'Elevator',
      aiScore: 78,
      responseTime: 4.1,
      completionRate: 89,
      costEfficiency: 76,
      qualityRating: 4.2,
      reliabilityScore: 82,
      workOrdersCompleted: 45,
      averageCost: 3200,
      recommendations: [
        'Performance below category average',
        'Consider performance improvement plan',
        'Monitor closely for next 90 days'
      ],
      strengths: [
        'Specialized elevator expertise',
        'Certified technicians',
        'Compliance with safety regulations'
      ],
      improvements: [
        'Reduce response time significantly',
        'Improve work completion rate',
        'Better cost competitiveness needed'
      ]
    },
    {
      vendorId: 'VEN-004',
      vendorName: 'ProClean Facilities',
      category: 'Cleaning',
      aiScore: 91,
      responseTime: 1.8,
      completionRate: 97,
      costEfficiency: 94,
      qualityRating: 4.7,
      reliabilityScore: 95,
      workOrdersCompleted: 234,
      averageCost: 850,
      recommendations: [
        'Top performer in cleaning category',
        'Consider expanding service scope',
        'Excellent reliability and quality'
      ],
      strengths: [
        'Fastest response time in category',
        'Highest completion rate',
        'Excellent cost efficiency',
        'Consistent quality delivery'
      ],
      improvements: [
        'Minimal improvements needed',
        'Could expand weekend availability'
      ]
    },
    {
      vendorId: 'VEN-005',
      vendorName: 'GreenScape Solutions',
      category: 'Landscaping',
      aiScore: 85,
      responseTime: 2.5,
      completionRate: 92,
      costEfficiency: 88,
      qualityRating: 4.5,
      reliabilityScore: 89,
      workOrdersCompleted: 67,
      averageCost: 1200,
      recommendations: [
        'Solid performer with seasonal expertise',
        'Good value for landscaping services',
        'Reliable for scheduled maintenance'
      ],
      strengths: [
        'Seasonal expertise and planning',
        'Environmentally conscious practices',
        'Good client relationships'
      ],
      improvements: [
        'Improve response time for urgent requests',
        'Enhance equipment maintenance',
        'Expand service offerings'
      ]
    },
    {
      vendorId: 'VEN-006',
      vendorName: 'SecureGuard Systems',
      category: 'Security',
      aiScore: 93,
      responseTime: 0.8,
      completionRate: 98,
      costEfficiency: 87,
      qualityRating: 4.8,
      reliabilityScore: 97,
      workOrdersCompleted: 156,
      averageCost: 2100,
      recommendations: [
        'Exceptional security service provider',
        'Industry-leading response times',
        'Consider expanding partnership'
      ],
      strengths: [
        'Sub-hour emergency response',
        'Highest completion rate',
        'Advanced security expertise',
        'Excellent client satisfaction'
      ],
      improvements: [
        'Cost optimization opportunities',
        'Expand preventive services'
      ]
    },
    {
      vendorId: 'VEN-007',
      vendorName: 'PowerTech Electrical',
      category: 'Electrical',
      aiScore: 89,
      responseTime: 2.2,
      completionRate: 95,
      costEfficiency: 91,
      qualityRating: 4.6,
      reliabilityScore: 93,
      workOrdersCompleted: 112,
      averageCost: 1650,
      recommendations: [
        'Strong electrical service provider',
        'Good balance of cost and quality',
        'Reliable for complex projects'
      ],
      strengths: [
        'Licensed master electricians',
        'Code compliance expertise',
        'Emergency service availability',
        'Competitive pricing'
      ],
      improvements: [
        'Reduce response time by 15 minutes',
        'Improve project completion rate',
        'Enhance communication protocols'
      ]
    },
    {
      vendorId: 'VEN-002',
      vendorName: 'FastFlow Plumbing',
      category: 'Plumbing',
      aiScore: 87,
      responseTime: 3.1,
      completionRate: 94,
      costEfficiency: 89,
      qualityRating: 4.6,
      reliabilityScore: 91,
      workOrdersCompleted: 89,
      averageCost: 1250,
      recommendations: [
        'Strong performer with room for improvement',
        'Focus on response time optimization',
        'Good value for routine maintenance'
      ],
      strengths: [
        'Cost-effective pricing',
        'Reliable for routine maintenance',
        'Good client communication'
      ],
      improvements: [
        'Reduce response time by 30 minutes',
        'Improve completion rate to 96%+',
        'Enhance emergency response capabilities'
      ]
    },
    {
      vendorId: 'VEN-003',
      vendorName: 'SafeLift Services',
      category: 'Elevator',
      aiScore: 78,
      responseTime: 4.1,
      completionRate: 89,
      costEfficiency: 76,
      qualityRating: 4.2,
      reliabilityScore: 82,
      workOrdersCompleted: 45,
      averageCost: 3200,
      recommendations: [
        'Performance below category average',
        'Consider performance improvement plan',
        'Monitor closely for next 90 days'
      ],
      strengths: [
        'Specialized elevator expertise',
        'Certified technicians',
        'Compliance with safety regulations'
      ],
      improvements: [
        'Reduce response time significantly',
        'Improve work completion rate',
        'Better cost competitiveness needed'
      ]
    }
  ];

  // Mock AI recommendations
  const mockAIRecommendations: AIRecommendation[] = [
    {
      id: 'REC-001',
      type: 'vendor_selection',
      title: 'Optimize HVAC Vendor Portfolio',
      description: 'AI analysis suggests consolidating HVAC work with Arctic Air Solutions for 15% cost savings.',
      impact: 'High',
      confidence: 92,
      potentialSavings: 18000,
      implementationEffort: 'Low',
      timeline: '30 days',
      details: 'Arctic Air Solutions consistently outperforms other HVAC vendors across all metrics. Consolidating 80% of HVAC work with them while maintaining backup vendors for capacity overflow would reduce costs while improving service quality.'
    },
    {
      id: 'REC-002',
      type: 'performance_improvement',
      title: 'Elevator Vendor Performance Plan',
      description: 'SafeLift Services requires immediate performance improvement plan or replacement consideration.',
      impact: 'High',
      confidence: 88,
      implementationEffort: 'Medium',
      timeline: '90 days',
      details: 'SafeLift Services is underperforming in response time (4.1h vs 2.5h average) and completion rate (89% vs 95% target). Implement 90-day improvement plan with specific KPIs or begin vendor replacement process.'
    },
    {
      id: 'REC-003',
      type: 'cost_optimization',
      title: 'Preventive Maintenance Scheduling',
      description: 'AI-optimized PM scheduling could reduce emergency calls by 35% and save $24,000 annually.',
      impact: 'High',
      confidence: 85,
      potentialSavings: 24000,
      implementationEffort: 'Medium',
      timeline: '60 days',
      details: 'Machine learning analysis of failure patterns suggests optimal PM intervals that differ from manufacturer recommendations. Implementing AI-suggested schedules could significantly reduce emergency repairs.'
    },
    {
      id: 'REC-004',
      type: 'risk_mitigation',
      title: 'Vendor Diversification Strategy',
      description: 'Over-reliance on single vendors in critical categories poses operational risk.',
      impact: 'Medium',
      confidence: 79,
      implementationEffort: 'High',
      timeline: '120 days',
      details: 'Current vendor portfolio shows 70%+ concentration in HVAC and plumbing categories. Recommend qualifying 2-3 additional vendors per critical category to ensure business continuity.'
    },
    {
      id: 'REC-005',
      type: 'cost_optimization',
      title: 'Cleaning Service Consolidation',
      description: 'Consolidate cleaning services with ProClean Facilities for 22% cost reduction.',
      impact: 'Medium',
      confidence: 91,
      potentialSavings: 15600,
      implementationEffort: 'Low',
      timeline: '45 days',
      details: 'ProClean Facilities demonstrates superior performance metrics (91 AI score, 97% completion rate) compared to current cleaning vendors. Consolidating services could reduce costs while improving quality.'
    },
    {
      id: 'REC-006',
      type: 'performance_improvement',
      title: 'Security System Optimization',
      description: 'Expand SecureGuard Systems partnership for enhanced facility security.',
      impact: 'High',
      confidence: 89,
      implementationEffort: 'Medium',
      timeline: '60 days',
      details: 'SecureGuard Systems shows exceptional performance (93 AI score, 0.8h response time). Expanding their scope to include additional security services could improve overall facility protection.'
    },
    {
      id: 'REC-007',
      type: 'vendor_selection',
      title: 'Electrical Vendor Performance Enhancement',
      description: 'Implement performance improvement plan for PowerTech Electrical.',
      impact: 'Medium',
      confidence: 84,
      implementationEffort: 'Low',
      timeline: '30 days',
      details: 'PowerTech Electrical shows good performance but has room for improvement in response time and completion rate. A focused improvement plan could enhance their effectiveness.'
    },
    {
      id: 'REC-008',
      type: 'cost_optimization',
      title: 'Landscaping Service Optimization',
      description: 'Optimize landscaping schedules with GreenScape Solutions for seasonal efficiency.',
      impact: 'Low',
      confidence: 78,
      potentialSavings: 8400,
      implementationEffort: 'Low',
      timeline: '90 days',
      details: 'AI analysis suggests optimizing landscaping schedules based on seasonal patterns and weather data could reduce costs while maintaining quality.'
    }
  ];

  // Mock work order optimization suggestions
  const mockWorkOrderOptimizations: WorkOrderOptimization[] = [
    {
      workOrderId: 'WO-2024-201',
      title: 'Elevator Maintenance - Building A',
      category: 'Elevator',
      currentVendor: 'SafeLift Services',
      aiRecommendedVendor: 'Elevator Experts Inc',
      reasonForChange: 'Better response time and 20% cost savings',
      potentialSavings: 640,
      qualityImprovement: 15,
      timeImprovement: 45,
      confidenceScore: 87
    },
    {
      workOrderId: 'WO-2024-202',
      title: 'HVAC Filter Replacement',
      category: 'HVAC',
      currentVendor: 'CoolTech HVAC',
      aiRecommendedVendor: 'Arctic Air Solutions',
      reasonForChange: 'Higher quality rating and faster completion',
      potentialSavings: 150,
      qualityImprovement: 8,
      timeImprovement: 25,
      confidenceScore: 94
    },
    {
      workOrderId: 'WO-2024-203',
      title: 'Security System Maintenance',
      category: 'Security',
      currentVendor: 'Basic Security Co',
      aiRecommendedVendor: 'SecureGuard Systems',
      reasonForChange: 'Superior response time and advanced expertise',
      potentialSavings: 320,
      qualityImprovement: 25,
      timeImprovement: 60,
      confidenceScore: 93
    },
    {
      workOrderId: 'WO-2024-204',
      title: 'Landscaping Seasonal Cleanup',
      category: 'Landscaping',
      currentVendor: 'Budget Landscaping',
      aiRecommendedVendor: 'GreenScape Solutions',
      reasonForChange: 'Better seasonal expertise and environmental practices',
      potentialSavings: 180,
      qualityImprovement: 18,
      timeImprovement: 20,
      confidenceScore: 85
    },
    {
      workOrderId: 'WO-2024-205',
      title: 'Electrical Panel Upgrade',
      category: 'Electrical',
      currentVendor: 'Quick Electric',
      aiRecommendedVendor: 'PowerTech Electrical',
      reasonForChange: 'Better code compliance and safety record',
      potentialSavings: 450,
      qualityImprovement: 22,
      timeImprovement: 15,
      confidenceScore: 89
    },
    {
      workOrderId: 'WO-2024-206',
      title: 'Deep Cleaning Service',
      category: 'Cleaning',
      currentVendor: 'Standard Cleaning Co',
      aiRecommendedVendor: 'ProClean Facilities',
      reasonForChange: 'Higher quality rating and better completion rate',
      potentialSavings: 125,
      qualityImprovement: 12,
      timeImprovement: 30,
      confidenceScore: 91
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-yellow-400';
    if (score >= 70) return 'text-orange-400';
    return 'text-red-400';
  };

  const getImpactColor = (impact: string) => {
    const colors = {
      'High': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Low': 'bg-green-500/20 text-green-400 border-green-500/30'
    };
    return colors[impact as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const implementRecommendation = (recId: string) => {
    const rec = mockAIRecommendations.find(r => r.id === recId);
    if (!rec) return;

    alert(`🤖 AI Recommendation Implementation Started!\n\n📋 Recommendation: ${rec.title}\n💡 Impact: ${rec.impact}\n🎯 Confidence: ${rec.confidence}%\n⏰ Timeline: ${rec.timeline}\n\n${rec.potentialSavings ? `💰 Potential Savings: $${rec.potentialSavings.toLocaleString()}\n\n` : ''}✅ Implementation plan created and assigned to facilities team.`);
  };

  const optimizeWorkOrder = (woId: string) => {
    const wo = mockWorkOrderOptimizations.find(w => w.workOrderId === woId);
    if (!wo) return;

    alert(`🎯 Work Order Optimization Applied!\n\n📋 Work Order: ${wo.title}\n🔄 Vendor Change: ${wo.currentVendor} → ${wo.aiRecommendedVendor}\n\n📊 Expected Improvements:\n💰 Cost Savings: $${wo.potentialSavings}\n⭐ Quality: +${wo.qualityImprovement}%\n⏱️ Time: -${wo.timeImprovement}%\n\n🤖 AI Confidence: ${wo.confidenceScore}%\n\n✅ Vendor assignment updated automatically.`);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* AI Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-xl border border-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-blue-400 font-semibold">AI Optimization Score</h3>
            <Brain className="text-blue-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">87%</div>
          <div className="text-sm text-blue-300 mt-1">Overall efficiency</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-6 rounded-xl border border-green-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-green-400 font-semibold">Cost Savings</h3>
            <DollarSign className="text-green-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">$42K</div>
          <div className="text-sm text-green-300 mt-1">Potential annual savings</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-6 rounded-xl border border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-purple-400 font-semibold">Active Vendors</h3>
            <Users className="text-purple-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{mockVendorPerformance.length}</div>
          <div className="text-sm text-purple-300 mt-1">AI-monitored vendors</div>
        </div>

        <div className="bg-gradient-to-br from-teal-500/10 to-teal-600/10 p-6 rounded-xl border border-teal-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-teal-400 font-semibold">Recommendations</h3>
            <Target className="text-teal-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{mockAIRecommendations.length}</div>
          <div className="text-sm text-teal-300 mt-1">Active recommendations</div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Brain className="mr-2 text-teal-400" size={20} />
          AI-Powered Recommendations
        </h3>
        
        <div className="space-y-4">
          {mockAIRecommendations.map((rec) => (
            <div key={rec.id} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-1">{rec.title}</h4>
                  <p className="text-gray-400 text-sm mb-2">{rec.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Confidence: {rec.confidence}%</span>
                    <span>•</span>
                    <span>Timeline: {rec.timeline}</span>
                    <span>•</span>
                    <span>Effort: {rec.implementationEffort}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getImpactColor(rec.impact)}`}>
                    {rec.impact} Impact
                  </span>
                  {rec.potentialSavings && (
                    <span className="text-green-400 font-semibold">
                      ${rec.potentialSavings.toLocaleString()} savings
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    rec.confidence >= 90 ? 'bg-green-500' :
                    rec.confidence >= 80 ? 'bg-yellow-500' :
                    'bg-orange-500'
                  }`}></div>
                  <span className="text-gray-400 text-sm">AI Confidence: {rec.confidence}%</span>
                </div>
                <button
                  onClick={() => implementRecommendation(rec.id)}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
                >
                  Implement
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Work Order Optimizations */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Zap className="mr-2 text-teal-400" size={20} />
          Smart Work Order Optimization
        </h3>
        
        <div className="space-y-4">
          {mockWorkOrderOptimizations.map((wo) => (
            <div key={wo.workOrderId} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-1">{wo.title}</h4>
                  <p className="text-gray-400 text-sm mb-2">{wo.reasonForChange}</p>
                  <div className="text-sm text-gray-500">
                    <span className="text-red-400">Current:</span> {wo.currentVendor} → 
                    <span className="text-green-400 ml-1">Recommended:</span> {wo.aiRecommendedVendor}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-semibold">${wo.potentialSavings} savings</div>
                  <div className="text-xs text-gray-400">AI Confidence: {wo.confidenceScore}%</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="text-center p-2 bg-green-500/10 rounded border border-green-500/20">
                  <div className="text-green-400 font-semibold">+{wo.qualityImprovement}%</div>
                  <div className="text-xs text-green-300">Quality</div>
                </div>
                <div className="text-center p-2 bg-blue-500/10 rounded border border-blue-500/20">
                  <div className="text-blue-400 font-semibold">-{wo.timeImprovement}%</div>
                  <div className="text-xs text-blue-300">Time</div>
                </div>
                <div className="text-center p-2 bg-purple-500/10 rounded border border-purple-500/20">
                  <div className="text-purple-400 font-semibold">${wo.potentialSavings}</div>
                  <div className="text-xs text-purple-300">Savings</div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => optimizeWorkOrder(wo.workOrderId)}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
                >
                  Apply Optimization
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderVendorAnalysis = () => (
    <div className="space-y-6">
      {/* Vendor Performance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockVendorPerformance.map((vendor) => (
          <div key={vendor.vendorId} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30 hover:border-teal-500/50 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-white font-semibold mb-1">{vendor.vendorName}</h4>
                <p className="text-gray-400 text-sm">{vendor.category}</p>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${getScoreColor(vendor.aiScore)}`}>
                  {vendor.aiScore}
                </div>
                <div className="text-xs text-gray-400">AI Score</div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Response Time</span>
                <span className="text-white">{vendor.responseTime}h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Completion Rate</span>
                <span className="text-white">{vendor.completionRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Quality Rating</span>
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-400" size={14} />
                  <span className="text-white">{vendor.qualityRating}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Avg Cost</span>
                <span className="text-teal-400">${vendor.averageCost.toLocaleString()}</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-gray-300 font-medium mb-2 text-sm">AI Performance Breakdown</div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Cost Efficiency</span>
                  <span className="text-white">{vendor.costEfficiency}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1">
                  <div 
                    className="bg-teal-500 h-1 rounded-full"
                    style={{ width: `${vendor.costEfficiency}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">{vendor.workOrdersCompleted} completed</span>
              <button
                onClick={() => setSelectedVendor(vendor.vendorId)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                <Eye size={14} className="inline mr-1" />
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderVendorDetail = () => {
    const vendor = mockVendorPerformance.find(v => v.vendorId === selectedVendor);
    if (!vendor) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedVendor(null)}
            className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors"
          >
            <Home size={20} />
            <span>Back to Vendor Analysis</span>
          </button>
        </div>

        {/* Vendor Header */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">{vendor.vendorName}</h2>
              <p className="text-gray-400">{vendor.category} Specialist</p>
            </div>
            <div className="text-right">
              <div className={`text-4xl font-bold ${getScoreColor(vendor.aiScore)}`}>
                {vendor.aiScore}
              </div>
              <div className="text-gray-400">AI Performance Score</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="text-lg font-bold text-blue-400">{vendor.responseTime}h</div>
              <div className="text-xs text-blue-300">Response Time</div>
            </div>
            <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="text-lg font-bold text-green-400">{vendor.completionRate}%</div>
              <div className="text-xs text-green-300">Completion Rate</div>
            </div>
            <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <div className="text-lg font-bold text-yellow-400">{vendor.qualityRating}</div>
              <div className="text-xs text-yellow-300">Quality Rating</div>
            </div>
            <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="text-lg font-bold text-purple-400">{vendor.workOrdersCompleted}</div>
              <div className="text-xs text-purple-300">Work Orders</div>
            </div>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h3 className="text-lg font-semibold text-white mb-4">AI-Identified Strengths</h3>
            <div className="space-y-2">
              {vendor.strengths.map((strength, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="text-green-400" size={16} />
                  <span className="text-gray-300 text-sm">{strength}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
            <h3 className="text-lg font-semibold text-white mb-4">Improvement Opportunities</h3>
            <div className="space-y-2">
              {vendor.improvements.map((improvement, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <AlertTriangle className="text-yellow-400" size={16} />
                  <span className="text-gray-300 text-sm">{improvement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <h3 className="text-lg font-semibold text-white mb-4">AI Recommendations</h3>
          <div className="space-y-3">
            {vendor.recommendations.map((rec, index) => (
              <div key={index} className="p-3 bg-teal-500/10 rounded-lg border border-teal-500/20">
                <p className="text-teal-300">{rec}</p>
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
              <h1 className="text-2xl font-semibold">AI Vendor Optimization</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">Machine Learning • Performance Analytics • Smart Recommendations</span>
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
          <strong className="text-teal-400">AI-Powered Optimization:</strong> Machine learning algorithms analyze vendor performance, predict outcomes, and provide intelligent recommendations for cost savings and quality improvements.
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { id: 'dashboard', label: 'AI Dashboard', icon: Brain },
            { id: 'analysis', label: 'Vendor Analysis', icon: BarChart3 }
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
        {selectedVendor ? renderVendorDetail() : (
          <>
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'analysis' && renderVendorAnalysis()}
          </>
        )}
      </div>
    </div>
  );
};

export default AIVendorOptimization;