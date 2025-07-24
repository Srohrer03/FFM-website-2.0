import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, FileText, Download, Calendar, TrendingUp, 
  BarChart3, PieChart, AlertTriangle, CheckCircle,
  DollarSign, Clock, Users, Wrench, Shield, Activity,
  Eye, Settings, RefreshCw, Mail, Printer
} from 'lucide-react';
import Logo from './Logo';

interface FacilityMetrics {
  totalAssets: number;
  assetValue: number;
  workOrdersCompleted: number;
  maintenanceCompliance: number;
  budgetUtilization: number;
  vendorPerformance: number;
  emergencyResponse: number;
  tenantSatisfaction: number;
  energyEfficiency: number;
  safetyIncidents: number;
}

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  frequency: 'Monthly' | 'Quarterly' | 'Annual';
  lastGenerated: string;
  nextDue: string;
  recipients: string[];
  sections: string[];
  format: 'PDF' | 'Excel' | 'PowerPoint';
}

const FacilityHealthReports = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [reportPeriod, setReportPeriod] = useState('Q1-2024');
  const [showReportPreview, setShowReportPreview] = useState<string | null>(null);

  // Mock facility metrics
  const mockMetrics: FacilityMetrics = {
    totalAssets: 347,
    assetValue: 3750000,
    workOrdersCompleted: 284,
    maintenanceCompliance: 96,
    budgetUtilization: 82,
    vendorPerformance: 94,
    emergencyResponse: 97,
    tenantSatisfaction: 91,
    energyEfficiency: 88,
    safetyIncidents: 1
  };

  // Mock report templates
  const mockReportTemplates: ReportTemplate[] = [
    {
      id: 'RPT-001',
      name: 'Quarterly Facility Health Report',
      description: 'Comprehensive quarterly report for board-level presentation including KPIs, financials, and strategic recommendations.',
      frequency: 'Quarterly',
      lastGenerated: '2024-01-01',
      nextDue: '2024-04-01',
      recipients: ['board@company.com', 'ceo@company.com', 'cfo@company.com'],
      sections: ['Executive Summary', 'Financial Performance', 'Operational Metrics', 'Vendor Performance', 'Risk Assessment', 'Strategic Recommendations'],
      format: 'PDF'
    },
    {
      id: 'RPT-002',
      name: 'Monthly Operations Dashboard',
      description: 'Monthly operational summary with key metrics, work order status, and budget tracking.',
      frequency: 'Monthly',
      lastGenerated: '2024-01-01',
      nextDue: '2024-02-01',
      recipients: ['operations@company.com', 'facilities@company.com'],
      sections: ['Work Order Summary', 'Budget Status', 'Vendor Activity', 'Maintenance Schedule'],
      format: 'Excel'
    },
    {
      id: 'RPT-003',
      name: 'Annual Strategic Review',
      description: 'Comprehensive annual review with strategic analysis, ROI assessment, and future planning recommendations.',
      frequency: 'Annual',
      lastGenerated: '2023-12-31',
      nextDue: '2024-12-31',
      recipients: ['board@company.com', 'strategy@company.com'],
      sections: ['Year in Review', 'ROI Analysis', 'Market Benchmarking', 'Strategic Roadmap', 'Investment Recommendations'],
      format: 'PowerPoint'
    }
  ];

  const generateReport = (reportId: string) => {
    const report = mockReportTemplates.find(r => r.id === reportId);
    if (!report) return;

    alert(`📊 ${report.name} Generation Started!\n\n📋 Report Details:\n• Format: ${report.format}\n• Sections: ${report.sections.length} included\n• Recipients: ${report.recipients.length} stakeholders\n• Period: ${reportPeriod}\n\n⏰ Processing:\n• Data compilation: 2-3 minutes\n• PDF generation: 1-2 minutes\n• Auto-distribution: Immediate\n\n📧 Report will be automatically sent to all recipients and available for download.`);
  };

  const scheduleReport = (reportId: string) => {
    const report = mockReportTemplates.find(r => r.id === reportId);
    if (!report) return;

    alert(`📅 ${report.name} Scheduled!\n\n⚙️ Schedule Settings:\n• Frequency: ${report.frequency}\n• Next Generation: ${report.nextDue}\n• Auto-Distribution: Enabled\n• Format: ${report.format}\n\n✅ Report will be automatically generated and distributed according to schedule.`);
  };

  const previewReport = (reportId: string) => {
    setShowReportPreview(reportId);
  };

  const closePreview = () => {
    setShowReportPreview(null);
  };

  const renderQuarterlyHealthReport = () => (
    <div className="space-y-8">
      {/* Executive Summary */}
      <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-xl border border-blue-500/20">
        <h2 className="text-2xl font-bold text-white mb-4">Executive Summary - Q1 2024</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">$180K</div>
            <div className="text-sm text-gray-400">Cost Savings Achieved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">96%</div>
            <div className="text-sm text-gray-400">Maintenance Compliance</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-400">2.1h</div>
            <div className="text-sm text-gray-400">Avg Response Time</div>
          </div>
        </div>
        <p className="text-gray-300 leading-relaxed">
          Q1 2024 demonstrated exceptional performance across all facility management metrics. Our strategic vendor optimization 
          initiatives resulted in $180,000 in cost savings while maintaining 96% maintenance compliance. Emergency response 
          times improved by 15% to an average of 2.1 hours, and tenant satisfaction reached 91%.
        </p>
      </div>

      {/* Financial Performance */}
      <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-6 rounded-xl border border-green-500/20">
        <h2 className="text-2xl font-bold text-white mb-4">Financial Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-3">Budget Performance</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Annual Budget:</span>
                <span className="text-white font-semibold">$1,020,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Q1 Spent:</span>
                <span className="text-white font-semibold">$188,250</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Variance:</span>
                <span className="text-green-400 font-semibold">-$66,750 (Under Budget)</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: '74%' }}></div>
              </div>
              <div className="text-sm text-gray-400">74% of quarterly budget utilized</div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-3">Cost per Square Foot</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Industry Average:</span>
                <span className="text-white">$2.85/sq ft</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Our Performance:</span>
                <span className="text-green-400 font-semibold">$2.12/sq ft</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Savings:</span>
                <span className="text-green-400 font-semibold">25.6% below market</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Metrics */}
      <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-6 rounded-xl border border-purple-500/20">
        <h2 className="text-2xl font-bold text-white mb-4">Operational Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-purple-400 mb-3">Response Times</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Emergency:</span>
                <span className="text-green-400">28 min avg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Urgent:</span>
                <span className="text-green-400">1.8h avg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Standard:</span>
                <span className="text-yellow-400">4.2h avg</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-purple-400 mb-3">Work Orders</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Completed:</span>
                <span className="text-white">284</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">On-Time Rate:</span>
                <span className="text-green-400">94%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Avg Cost:</span>
                <span className="text-white">$1,847</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-purple-400 mb-3">Satisfaction</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Tenant Rating:</span>
                <span className="text-green-400">4.6/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Vendor Rating:</span>
                <span className="text-green-400">4.8/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Overall NPS:</span>
                <span className="text-green-400">+67</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Recommendations */}
      <div className="bg-gradient-to-br from-teal-500/10 to-teal-600/10 p-6 rounded-xl border border-teal-500/20">
        <h2 className="text-2xl font-bold text-white mb-4">Strategic Recommendations</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-700/20 rounded-lg">
            <h3 className="text-lg font-semibold text-teal-400 mb-2">1. Expand Preventive Maintenance Program</h3>
            <p className="text-gray-300 mb-2">
              Increase PM frequency for critical HVAC systems to reduce emergency calls by 35%.
            </p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Investment: $45,000</span>
              <span className="text-green-400">ROI: 280% over 12 months</span>
            </div>
          </div>
          <div className="p-4 bg-gray-700/20 rounded-lg">
            <h3 className="text-lg font-semibold text-teal-400 mb-2">2. Implement IoT Monitoring</h3>
            <p className="text-gray-300 mb-2">
              Deploy smart sensors for predictive maintenance and energy optimization.
            </p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Investment: $125,000</span>
              <span className="text-green-400">ROI: 340% over 24 months</span>
            </div>
          </div>
          <div className="p-4 bg-gray-700/20 rounded-lg">
            <h3 className="text-lg font-semibold text-teal-400 mb-2">3. Vendor Portfolio Optimization</h3>
            <p className="text-gray-300 mb-2">
              Consolidate with top-performing vendors for 15% additional cost savings.
            </p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Investment: $15,000</span>
              <span className="text-green-400">ROI: 1,200% annually</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMonthlyDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20 text-center">
          <div className="text-2xl font-bold text-blue-400">47</div>
          <div className="text-sm text-gray-400">Work Orders Completed</div>
          <div className="text-xs text-green-400">+12% vs last month</div>
        </div>
        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20 text-center">
          <div className="text-2xl font-bold text-green-400">$62,750</div>
          <div className="text-sm text-gray-400">Monthly Spend</div>
          <div className="text-xs text-green-400">-8% under budget</div>
        </div>
        <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20 text-center">
          <div className="text-2xl font-bold text-purple-400">1.9h</div>
          <div className="text-sm text-gray-400">Avg Response Time</div>
          <div className="text-xs text-green-400">-15% improvement</div>
        </div>
        <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20 text-center">
          <div className="text-2xl font-bold text-yellow-400">98%</div>
          <div className="text-sm text-gray-400">Completion Rate</div>
          <div className="text-xs text-green-400">+3% vs target</div>
        </div>
      </div>

      {/* Work Order Breakdown */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-4">Work Order Breakdown by Category</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">HVAC</span>
            <div className="flex items-center space-x-3">
              <div className="w-32 bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <span className="text-white">15 orders</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Plumbing</span>
            <div className="flex items-center space-x-3">
              <div className="w-32 bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <span className="text-white">12 orders</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Electrical</span>
            <div className="flex items-center space-x-3">
              <div className="w-32 bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>
              <span className="text-white">8 orders</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Cleaning</span>
            <div className="flex items-center space-x-3">
              <div className="w-32 bg-gray-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '55%' }}></div>
              </div>
              <span className="text-white">12 orders</span>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Status */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-4">Budget Utilization</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Monthly Budget</span>
              <span className="text-white">$85,000</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div className="bg-green-500 h-4 rounded-full" style={{ width: '74%' }}></div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-green-400">$62,750 spent</span>
              <span className="text-gray-400">74% utilized</span>
            </div>
          </div>
          <div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">$22,250</div>
              <div className="text-sm text-gray-400">Remaining Budget</div>
              <div className="text-xs text-green-400 mt-1">8% under monthly target</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStrategicReview = () => (
    <div className="space-y-8">
      {/* 2024 Year in Review */}
      <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-xl border border-blue-500/20">
        <h2 className="text-2xl font-bold text-white mb-4">2024 Year in Review</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">$720K</div>
            <div className="text-sm text-gray-400">Total Cost Savings</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">1,247</div>
            <div className="text-sm text-gray-400">Work Orders Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">97%</div>
            <div className="text-sm text-gray-400">Client Satisfaction</div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-gray-700/20 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Major Accomplishments</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Implemented AI-powered vendor optimization system</li>
              <li>• Achieved 97% preventive maintenance compliance</li>
              <li>• Reduced emergency response times by 35%</li>
              <li>• Expanded vendor network to 750+ certified professionals</li>
              <li>• Launched IoT monitoring across 15 critical assets</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ROI Analysis */}
      <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-6 rounded-xl border border-green-500/20">
        <h2 className="text-2xl font-bold text-white mb-4">ROI Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-3">Technology Investments</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">FFM Platform:</span>
                <span className="text-green-400">385% ROI</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">IoT Sensors:</span>
                <span className="text-green-400">240% ROI</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">AI Optimization:</span>
                <span className="text-green-400">520% ROI</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-3">Process Improvements</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Vendor Consolidation:</span>
                <span className="text-green-400">$180K saved</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Preventive Maintenance:</span>
                <span className="text-green-400">$240K saved</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Emergency Reduction:</span>
                <span className="text-green-400">$300K saved</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2025 Strategic Roadmap */}
      <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-6 rounded-xl border border-purple-500/20">
        <h2 className="text-2xl font-bold text-white mb-4">2025 Strategic Roadmap</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-700/20 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-400 mb-2">Q1 2025: Digital Transformation</h3>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Deploy advanced IoT sensors across all facilities</li>
              <li>• Implement predictive maintenance algorithms</li>
              <li>• Launch mobile app for real-time facility monitoring</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-700/20 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-400 mb-2">Q2 2025: Sustainability Initiative</h3>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Achieve 25% energy consumption reduction</li>
              <li>• Implement green vendor certification program</li>
              <li>• Launch carbon footprint tracking system</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-700/20 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-400 mb-2">Q3-Q4 2025: Expansion & Optimization</h3>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Expand to 3 additional markets</li>
              <li>• Implement blockchain-based vendor payments</li>
              <li>• Launch AI-powered space optimization</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Investment Recommendations */}
      <div className="bg-gradient-to-br from-teal-500/10 to-teal-600/10 p-6 rounded-xl border border-teal-500/20">
        <h2 className="text-2xl font-bold text-white mb-4">High-Priority Investment Recommendations</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-700/20 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-teal-400">Advanced Analytics Platform</h3>
              <span className="text-green-400 font-semibold">ROI: 450%</span>
            </div>
            <p className="text-gray-300 text-sm mb-2">
              Machine learning platform for predictive maintenance and cost optimization.
            </p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Investment: $250,000</span>
              <span className="text-green-400">Annual Savings: $1.125M</span>
            </div>
          </div>
          <div className="p-4 bg-gray-700/20 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-teal-400">Smart Building Integration</h3>
              <span className="text-green-400 font-semibold">ROI: 320%</span>
            </div>
            <p className="text-gray-300 text-sm mb-2">
              Comprehensive IoT deployment for real-time facility monitoring and control.
            </p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Investment: $180,000</span>
              <span className="text-green-400">Annual Savings: $576K</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReportPreview = () => {
    if (!showReportPreview) return null;

    const report = mockReportTemplates.find(r => r.id === showReportPreview);
    if (!report) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={closePreview}
            className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors"
          >
            <Home size={20} />
            <span>Back to Report Templates</span>
          </button>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => generateReport(showReportPreview)}
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
            >
              <Download size={16} className="inline mr-2" />
              Generate PDF
            </button>
            <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors">
              <Mail size={16} className="inline mr-2" />
              Email Report
            </button>
          </div>
        </div>

        {/* Report Header */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center">
              <FileText className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white">{report.name}</h1>
              <p className="text-gray-400">{report.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <span>Period: {reportPeriod}</span>
            <span>•</span>
            <span>Format: {report.format}</span>
            <span>•</span>
            <span>Generated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Report Content */}
        <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-gray-700/30 p-8">
          {showReportPreview === 'RPT-001' && renderQuarterlyHealthReport()}
          {showReportPreview === 'RPT-002' && renderMonthlyDashboard()}
          {showReportPreview === 'RPT-003' && renderStrategicReview()}
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-xl border border-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-blue-400 font-semibold">Total Assets</h3>
            <Activity className="text-blue-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{mockMetrics.totalAssets}</div>
          <div className="text-sm text-blue-300 mt-1">Tracked assets</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-6 rounded-xl border border-green-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-green-400 font-semibold">Asset Value</h3>
            <DollarSign className="text-green-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">${(mockMetrics.assetValue / 1000000).toFixed(1)}M</div>
          <div className="text-sm text-green-300 mt-1">Current book value</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-6 rounded-xl border border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-purple-400 font-semibold">Work Orders</h3>
            <Wrench className="text-purple-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{mockMetrics.workOrdersCompleted}</div>
          <div className="text-sm text-purple-300 mt-1">Completed this quarter</div>
        </div>

        <div className="bg-gradient-to-br from-teal-500/10 to-teal-600/10 p-6 rounded-xl border border-teal-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-teal-400 font-semibold">Compliance</h3>
            <Shield className="text-teal-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-white">{mockMetrics.maintenanceCompliance}%</div>
          <div className="text-sm text-teal-300 mt-1">Maintenance compliance</div>
        </div>
      </div>

      {/* Performance Indicators */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-6">Key Performance Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Budget Utilization</span>
              <span className="text-white font-semibold">{mockMetrics.budgetUtilization}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                style={{ width: `${mockMetrics.budgetUtilization}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Vendor Performance</span>
              <span className="text-white font-semibold">{mockMetrics.vendorPerformance}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
                style={{ width: `${mockMetrics.vendorPerformance}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Emergency Response</span>
              <span className="text-white font-semibold">{mockMetrics.emergencyResponse}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full"
                style={{ width: `${mockMetrics.emergencyResponse}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Tenant Satisfaction</span>
              <span className="text-white font-semibold">{mockMetrics.tenantSatisfaction}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-full"
                style={{ width: `${mockMetrics.tenantSatisfaction}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Energy Efficiency</span>
              <span className="text-white font-semibold">{mockMetrics.energyEfficiency}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-teal-500 to-teal-600 h-3 rounded-full"
                style={{ width: `${mockMetrics.energyEfficiency}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Safety Record</span>
              <span className="text-white font-semibold">{mockMetrics.safetyIncidents} incidents</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
                style={{ width: '95%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
        <h3 className="text-xl font-semibold text-white mb-4">Quick Report Generation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => previewReport('RPT-001')}
            className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 hover:bg-blue-500/20 transition-colors text-left"
          >
            <FileText className="text-blue-400 mb-2" size={24} />
            <h4 className="text-white font-semibold mb-1">Quarterly Health Report</h4>
            <p className="text-gray-400 text-sm">Generate comprehensive quarterly report</p>
          </button>

          <button
            onClick={() => previewReport('RPT-002')}
            className="p-4 bg-green-500/10 rounded-lg border border-green-500/20 hover:bg-green-500/20 transition-colors text-left"
          >
            <BarChart3 className="text-green-400 mb-2" size={24} />
            <h4 className="text-white font-semibold mb-1">Monthly Dashboard</h4>
            <p className="text-gray-400 text-sm">Generate monthly operations summary</p>
          </button>

          <button
            onClick={() => previewReport('RPT-003')}
            className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20 hover:bg-purple-500/20 transition-colors text-left"
          >
            <TrendingUp className="text-purple-400 mb-2" size={24} />
            <h4 className="text-white font-semibold mb-1">Strategic Review</h4>
            <p className="text-gray-400 text-sm">Generate annual strategic analysis</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderReportTemplates = () => (
    <div className="space-y-6">
      {/* Report Templates */}
      <div className="space-y-4">
        {mockReportTemplates.map((template) => (
          <div key={template.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30 hover:border-teal-500/50 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-white mb-2">{template.name}</h4>
                <p className="text-gray-400 mb-3">{template.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Frequency: {template.frequency}</span>
                  <span>•</span>
                  <span>Format: {template.format}</span>
                  <span>•</span>
                  <span>Last Generated: {new Date(template.lastGenerated).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-teal-500/20 text-teal-400 border border-teal-500/30">
                  {template.frequency}
                </span>
                <span className="text-gray-400 text-sm">Next: {new Date(template.nextDue).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="text-gray-300 font-medium mb-2">Report Sections:</h5>
              <div className="flex flex-wrap gap-2">
                {template.sections.map((section, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs">
                    {section}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h5 className="text-gray-300 font-medium mb-2">Recipients:</h5>
              <div className="flex flex-wrap gap-2">
                {template.recipients.map((recipient, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                    {recipient}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => generateReport(template.id)}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
                >
                  <Download size={16} className="inline mr-2" />
                  Generate Now
                </button>
                <button
                  onClick={() => scheduleReport(template.id)}
                  className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Calendar size={16} className="inline mr-2" />
                  Schedule
                </button>
              </div>
              <button
                onClick={() => previewReport(template.id)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg transition-colors"
              >
                <Eye size={16} className="inline mr-1" />
                Preview Report
              </button>
            </div>
          </div>
        ))}
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
              <h1 className="text-2xl font-semibold">Facility Health Reports</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">Auto-Generated PDFs • Board-Level Presentations • Executive Dashboards</span>
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
          <strong className="text-teal-400">Executive Reporting:</strong> Automated generation of comprehensive facility health reports with KPIs, financial analysis, and strategic recommendations for board-level presentations.
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { id: 'dashboard', label: 'Health Dashboard', icon: BarChart3 },
            { id: 'templates', label: 'Report Templates', icon: FileText }
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
        {showReportPreview ? renderReportPreview() : (
          <>
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'templates' && renderReportTemplates()}
          </>
        )}
      </div>
    </div>
  );
};

export default FacilityHealthReports;