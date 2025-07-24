import React from 'react';
import { Shield, Lock, Eye, Users, Fingerprint, Globe, Bot, Clock } from 'lucide-react';

const SecurityFeatures = () => {
  const securityFeatures = [
    {
      icon: Fingerprint,
      title: 'Multi-Factor Authentication (MFA)',
      description: 'Enhanced security with SMS, email, and authenticator app verification for all user accounts.',
      details: ['SMS verification', 'Email confirmation', 'Authenticator app support', 'Backup recovery codes']
    },
    {
      icon: Lock,
      title: 'Enterprise-Grade Encryption',
      description: 'End-to-end SSL/TLS encryption protects all data transmission and storage with 256-bit security.',
      details: ['256-bit SSL/TLS encryption', 'Data at rest encryption', 'Secure API endpoints', 'PCI DSS compliant']
    },
    {
      icon: Users,
      title: 'Single Sign-On (SSO)',
      description: 'Seamless integration with OAuth 2.0 and SAML 2.0 for enterprise identity management.',
      details: ['OAuth 2.0 integration', 'SAML 2.0 support', 'Active Directory sync', 'Google Workspace compatible']
    },
    {
      icon: Globe,
      title: 'IP Whitelisting & Access Control',
      description: 'Advanced network security with IP restrictions and geographic access controls for administrators.',
      details: ['IP address whitelisting', 'Geographic restrictions', 'VPN detection', 'Admin-only access zones']
    },
    {
      icon: Bot,
      title: 'Bot Protection & Fraud Prevention',
      description: 'Advanced ReCAPTCHA v3 and behavioral analysis prevent automated attacks and fraud.',
      details: ['ReCAPTCHA v3 integration', 'Behavioral analysis', 'Rate limiting', 'Suspicious activity detection']
    },
    {
      icon: Eye,
      title: 'Role-Based Access Control (RBAC)',
      description: 'Granular permissions system ensures users only access data and features relevant to their role.',
      details: ['Client role permissions', 'Vendor access controls', 'Admin privilege management', 'Custom role creation']
    },
    {
      icon: Clock,
      title: 'Session Management & Monitoring',
      description: 'Automatic session timeouts and comprehensive activity logging for security compliance.',
      details: ['Automatic session timeouts', 'Real-time activity logging', 'Login attempt monitoring', 'Security audit trails']
    },
    {
      icon: Shield,
      title: 'Compliance & Certifications',
      description: 'SOC 2 Type II certified with GDPR compliance and regular third-party security audits.',
      details: ['SOC 2 Type II certified', 'GDPR compliant', 'Regular security audits', 'Penetration testing']
    }
  ];

  const roles = [
    {
      title: 'Client Portal',
      description: 'Secure access to facility management dashboards, project tracking, and vendor communications.',
      permissions: ['View facility data', 'Manage work orders', 'Access financial reports', 'Communicate with vendors'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Vendor Portal',
      description: 'Protected environment for bid management, project updates, and client communications.',
      permissions: ['Submit bids', 'Update project status', 'Access work orders', 'Manage availability'],
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Admin Dashboard',
      description: 'Comprehensive system administration with advanced security controls and monitoring.',
      permissions: ['User management', 'Security settings', 'System monitoring', 'Audit log access'],
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <section id="security-section" className="py-20 bg-slate-900 border-t border-gray-700/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-teal-500/25">
              <Shield className="text-slate-900" size={36} />
            </div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-light text-white mb-4">
            Enterprise-Grade Security & Authentication
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Bank-level security protecting your facility data, vendor communications, and financial transactions with comprehensive access controls and monitoring.
          </p>
        </div>

        {/* User Roles */}
        <div className="mb-20">
          <h3 className="text-3xl font-semibold text-white text-center mb-12">Secure Role-Based Access</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roles.map((role, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30 hover:border-teal-500/50 transition-all duration-300">
                <div className={`w-12 h-12 bg-gradient-to-r ${role.color} rounded-lg flex items-center justify-center mb-4 shadow-lg`}>
                  <Users className="text-white" size={24} />
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">{role.title}</h4>
                <p className="text-gray-400 mb-4">{role.description}</p>
                <div className="space-y-2">
                  {role.permissions.map((permission, permIndex) => (
                    <div key={permIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                      <span className="text-sm text-gray-300">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {securityFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30 hover:border-teal-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-500/10"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-teal-500/25">
                  <IconComponent className="text-slate-900" size={24} />
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="space-y-1">
                  {feature.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-teal-400 rounded-full flex-shrink-0"></div>
                      <span className="text-xs text-teal-400 font-medium">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Certifications */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/30">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-white mb-4">Security Certifications & Compliance</h3>
            <p className="text-gray-400">FFM maintains the highest security standards with regular audits and certifications</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-3 shadow-lg">
                <Shield className="text-white" size={28} />
              </div>
              <div className="text-white font-semibold">SOC 2 Type II</div>
              <div className="text-sm text-gray-400">Certified</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-3 shadow-lg">
                <Lock className="text-white" size={28} />
              </div>
              <div className="text-white font-semibold">GDPR</div>
              <div className="text-sm text-gray-400">Compliant</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-3 shadow-lg">
                <Eye className="text-white" size={28} />
              </div>
              <div className="text-white font-semibold">PCI DSS</div>
              <div className="text-sm text-gray-400">Level 1</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-3 shadow-lg">
                <Globe className="text-white" size={28} />
              </div>
              <div className="text-white font-semibold">ISO 27001</div>
              <div className="text-sm text-gray-400">Certified</div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-6 py-3">
            <Shield className="text-teal-400" size={20} />
            <span className="text-teal-400 font-medium">Your data is protected by enterprise-grade security</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityFeatures;