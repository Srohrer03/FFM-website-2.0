import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight, CheckCircle, Building, Users, FileText, DollarSign, Shield, Upload, Download, Trash2, Plus, Minus } from 'lucide-react';

const OnboardingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(16.67); // 1/6 steps = 16.67%
  const totalSteps = 6;

  const steps = [
    'Company & Property Info',
    'Emergency Contacts',
    'Machinery & Equipment',
    'Document Uploads',
    'R&M Budgets & Escrow',
    'Team Roles & Permissions'
  ];

  // Form data state
  const [formData, setFormData] = useState({
    // Step 1: Company & Property Info
    companyName: '',
    legalEntityName: '',
    corporateAddress: '',
    corporateCity: '',
    corporateState: '',
    corporateZip: '',
    primaryContact: '',
    primaryEmail: '',
    primaryPhone: '',
    properties: [
      {
        id: 1,
        address: '',
        city: '',
        state: '',
        zip: '',
        propertyManager: '',
        facilityType: '',
        squareFootage: '',
        floors: '',
        floorPlan: null
      }
    ],
    
    // Step 2: Emergency Contacts
    emergencyContacts: {
      security: { company: '', contact: '', phone: '', email: '', available24_7: false },
      fire: { company: '', contact: '', phone: '', email: '', available24_7: false },
      plumbing: { company: '', contact: '', phone: '', email: '', available24_7: false },
      hvac: { company: '', contact: '', phone: '', email: '', available24_7: false },
      electrical: { company: '', contact: '', phone: '', email: '', available24_7: false },
      emergency: { company: '', contact: '', phone: '', email: '', available24_7: false }
    },
    
    // Step 3: Machinery & Equipment
    equipment: [],
    
    // Step 4: Document Uploads
    documents: {
      assetInventory: [],
      pmCalendar: [],
      nda: []
    },
    
    // Step 5: R&M Budgets & Escrow
    annualBudget: '',
    hvacBudget: '',
    plumbingBudget: '',
    electricalBudget: '',
    cleaningBudget: '',
    emergencyBudget: '',
    autoApproveThreshold: '',
    manualApprovalThreshold: '',
    escrowHoldPeriod: '',
    approvalAuthority: '',
    
    // Step 6: Team Roles
    teamMembers: []
  });

  const openModal = () => {
    setIsOpen(true);
    setCurrentStep(1);
    setProgress(16.67);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      setProgress((newStep / totalSteps) * 100);
      
      // Scroll to top of modal content
      const modalContent = document.querySelector('.modal-content');
      if (modalContent) {
        modalContent.scrollTop = 0;
      }
    } else {
      // Complete onboarding
      closeModal();
      alert('🎉 Client Onboarding Complete!\n\nWelcome to FFM! Your account has been set up successfully.\n\n📧 Next Steps:\n• Confirmation email sent\n• Account manager will contact you within 24 hours\n• Platform access credentials delivered\n• Initial facility assessment scheduled\n\nClient ID: FFM-' + Date.now());
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      setProgress((newStep / totalSteps) * 100);
      
      // Scroll to top of modal content
      const modalContent = document.querySelector('.modal-content');
      if (modalContent) {
        modalContent.scrollTop = 0;
      }
    }
  };

  const saveAndExit = () => {
    alert(`💾 Progress Saved!\n\nYour onboarding progress (${progress.toFixed(0)}% complete) has been saved.\n\n📧 We'll send you a reminder email to complete your setup.\n\nYou can resume anytime by clicking "Client Onboarding" again.`);
    closeModal();
  };

  const autoFillCompanyData = () => {
    setFormData({
      ...formData,
      companyName: 'Metro Properties LLC',
      legalEntityName: 'Metro Properties Limited Liability Company',
      corporateAddress: '123 Corporate Plaza, Suite 500',
      corporateCity: 'Oklahoma City',
      corporateState: 'OK',
      corporateZip: '73102',
      primaryContact: 'John Smith - CEO',
      primaryEmail: 'john.smith@metroproperties.com',
      primaryPhone: '(555) 123-4567',
      properties: [
        {
          id: 1,
          address: '456 Business Ave',
          city: 'Oklahoma City',
          state: 'OK',
          zip: '73101',
          propertyManager: 'Sarah Johnson',
          facilityType: 'Office',
          squareFootage: '450,000',
          floors: '12',
          floorPlan: null
        },
        {
          id: 2,
          address: '789 Industrial Blvd',
          city: 'Tulsa',
          state: 'OK',
          zip: '74101',
          propertyManager: 'Mike Chen',
          facilityType: 'Warehouse',
          squareFootage: '280,000',
          floors: '1',
          floorPlan: null
        },
        {
          id: 3,
          address: '321 Retail Center Dr',
          city: 'Norman',
          state: 'OK',
          zip: '73019',
          propertyManager: 'Emily Rodriguez',
          facilityType: 'Retail',
          squareFootage: '120,000',
          floors: '2',
          floorPlan: null
        }
      ]
    });
  };

  const autoFillEmergencyContacts = () => {
    setFormData({
      ...formData,
      emergencyContacts: {
        security: {
          company: 'SecureGuard Systems',
          contact: 'David Martinez - Security Director',
          phone: '(555) 911-SAFE',
          email: 'emergency@secureguard.com',
          available24_7: true
        },
        fire: {
          company: 'SafeGuard Fire Protection',
          contact: 'Lisa Thompson - Fire Safety Manager',
          phone: '(555) 911-FIRE',
          email: 'emergency@safeguardfire.com',
          available24_7: true
        },
        plumbing: {
          company: 'FastFlow Emergency Plumbing',
          contact: 'Robert Wilson - Emergency Coordinator',
          phone: '(555) 911-PIPE',
          email: 'emergency@fastflow.com',
          available24_7: true
        },
        hvac: {
          company: 'Arctic Air Solutions',
          contact: 'Jennifer Davis - Emergency HVAC',
          phone: '(555) 911-HVAC',
          email: 'emergency@arcticair.com',
          available24_7: true
        },
        electrical: {
          company: 'PowerTech Emergency Electric',
          contact: 'Michael Brown - Master Electrician',
          phone: '(555) 911-POWER',
          email: 'emergency@powertech.com',
          available24_7: true
        },
        emergency: {
          company: 'Regional Emergency Response Team',
          contact: 'Captain Sarah Miller',
          phone: '(555) 911-HELP',
          email: 'dispatch@regionalemergency.com',
          available24_7: true
        }
      }
    });
  };

  const autoFillBudgetData = () => {
    setFormData({
      ...formData,
      annualBudget: '$1,200,000.00',
      hvacBudget: '$300,000.00',
      plumbingBudget: '$180,000.00',
      electricalBudget: '$144,000.00',
      cleaningBudget: '$96,000.00',
      emergencyBudget: '$84,000.00',
      autoApproveThreshold: '$5,000.00',
      manualApprovalThreshold: '$15,000.00',
      escrowHoldPeriod: '72',
      approvalAuthority: 'CFO'
    });
  };

  const autoFillTeamData = () => {
    setFormData({
      ...formData,
      teamMembers: [
        {
          id: 1,
          name: 'Mike Chen',
          title: 'Regional Facility Manager',
          email: 'mike.chen@metroproperties.com',
          phone: '(555) 234-5678',
          role: 'Regional FM',
          accessLevel: 'Full Access - All properties, vendors, budgets, and reporting'
        },
        {
          id: 2,
          name: 'Sarah Rodriguez',
          title: 'On-site Facility Manager',
          email: 'sarah.rodriguez@metroproperties.com',
          phone: '(555) 345-6789',
          role: 'On-site FM',
          accessLevel: 'Operational Access - Work orders, vendor communication, maintenance scheduling'
        },
        {
          id: 3,
          name: 'Jennifer Walsh',
          title: 'Chief Financial Officer',
          email: 'jennifer.walsh@metroproperties.com',
          phone: '(555) 456-7890',
          role: 'CFO',
          accessLevel: 'Financial Access - Budget oversight, approvals, financial reporting'
        }
      ]
    });
  };

  const addProperty = () => {
    const newProperty = {
      id: formData.properties.length + 1,
      address: '',
      city: '',
      state: '',
      zip: '',
      propertyManager: '',
      facilityType: '',
      squareFootage: '',
      floors: '',
      floorPlan: null
    };
    setFormData({
      ...formData,
      properties: [...formData.properties, newProperty]
    });
  };

  const removeProperty = (id: number) => {
    setFormData({
      ...formData,
      properties: formData.properties.filter(p => p.id !== id)
    });
  };

  const addEquipment = () => {
    const newEquipment = {
      id: Date.now(),
      tag: '',
      serialNumber: '',
      make: '',
      model: '',
      age: '',
      condition: '',
      maintenanceHistory: '',
      pmFrequency: '',
      preferredVendor: '',
      includePM: false,
      photos: []
    };
    setFormData({
      ...formData,
      equipment: [...formData.equipment, newEquipment]
    });
  };

  const removeEquipment = (id: number) => {
    setFormData({
      ...formData,
      equipment: formData.equipment.filter(e => e.id !== id)
    });
  };

  const addTeamMember = () => {
    const newMember = {
      id: Date.now(),
      name: '',
      title: '',
      email: '',
      phone: '',
      role: '',
      accessLevel: ''
    };
    setFormData({
      ...formData,
      teamMembers: [...formData.teamMembers, newMember]
    });
  };

  const removeTeamMember = (id: number) => {
    setFormData({
      ...formData,
      teamMembers: formData.teamMembers.filter(m => m.id !== id)
    });
  };

  const uploadDocument = (category: string) => {
    const fileName = prompt(`Enter document name for ${category}:`);
    if (fileName) {
      const newDoc = {
        id: Date.now(),
        name: fileName,
        size: '2.1 MB',
        uploadedAt: new Date().toLocaleString()
      };
      setFormData({
        ...formData,
        documents: {
          ...formData.documents,
          [category]: [...formData.documents[category], newDoc]
        }
      });
    }
  };

  const deleteDocument = (category: string, docId: number) => {
    setFormData({
      ...formData,
      documents: {
        ...formData.documents,
        [category]: formData.documents[category].filter(doc => doc.id !== docId)
      }
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className="text-2xl font-semibold text-white mb-2">Company & Property Information</h3>
            <p className="text-gray-400 mb-6">Tell us about your company and the properties you manage.</p>
            
            <div className="space-y-6">
              {/* Company Information */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Company Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-2">Company Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Metro Properties LLC" 
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-2">Legal Entity Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Metro Properties Limited Liability Company" 
                      value={formData.legalEntityName}
                      onChange={(e) => setFormData({...formData, legalEntityName: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-300 font-semibold mb-2">Corporate Address</label>
                    <input 
                      type="text" 
                      placeholder="e.g., 123 Corporate Plaza, Suite 500" 
                      value={formData.corporateAddress}
                      onChange={(e) => setFormData({...formData, corporateAddress: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-2">City</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Oklahoma City" 
                      value={formData.corporateCity}
                      onChange={(e) => setFormData({...formData, corporateCity: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-2">State</label>
                    <select 
                      value={formData.corporateState}
                      onChange={(e) => setFormData({...formData, corporateState: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
                    >
                      <option value="">Select State</option>
                      <option value="OK">Oklahoma</option>
                      <option value="TX">Texas</option>
                      <option value="AR">Arkansas</option>
                      <option value="KS">Kansas</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-2">ZIP Code</label>
                    <input 
                      type="text" 
                      placeholder="e.g., 73102" 
                      value={formData.corporateZip}
                      onChange={(e) => setFormData({...formData, corporateZip: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-2">Primary Contact</label>
                    <input 
                      type="text" 
                      placeholder="e.g., John Smith - CEO" 
                      value={formData.primaryContact}
                      onChange={(e) => setFormData({...formData, primaryContact: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-2">Email</label>
                    <input 
                      type="email" 
                      placeholder="e.g., john.smith@metroproperties.com" 
                      value={formData.primaryEmail}
                      onChange={(e) => setFormData({...formData, primaryEmail: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-2">Phone</label>
                    <input 
                      type="tel" 
                      placeholder="e.g., (555) 123-4567" 
                      value={formData.primaryPhone}
                      onChange={(e) => setFormData({...formData, primaryPhone: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                    />
                  </div>
                </div>
              </div>

              {/* Properties */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-semibold text-white">Property Information</h4>
                  <button
                    onClick={addProperty}
                    className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                  >
                    <Plus size={16} />
                    <span>Add Property</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  {formData.properties.map((property, index) => (
                    <div key={property.id} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
                      <div className="flex justify-between items-center mb-4">
                        <h5 className="text-white font-medium">Property {index + 1}</h5>
                        {formData.properties.length > 1 && (
                          <button
                            onClick={() => removeProperty(property.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-gray-300 font-medium mb-2">Property Address</label>
                          <input 
                            type="text" 
                            placeholder="e.g., 456 Business Ave" 
                            value={property.address}
                            onChange={(e) => {
                              const updatedProperties = formData.properties.map(p => 
                                p.id === property.id ? {...p, address: e.target.value} : p
                              );
                              setFormData({...formData, properties: updatedProperties});
                            }}
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 font-medium mb-2">City</label>
                          <input 
                            type="text" 
                            placeholder="e.g., Oklahoma City" 
                            value={property.city}
                            onChange={(e) => {
                              const updatedProperties = formData.properties.map(p => 
                                p.id === property.id ? {...p, city: e.target.value} : p
                              );
                              setFormData({...formData, properties: updatedProperties});
                            }}
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 font-medium mb-2">State</label>
                          <select 
                            value={property.state}
                            onChange={(e) => {
                              const updatedProperties = formData.properties.map(p => 
                                p.id === property.id ? {...p, state: e.target.value} : p
                              );
                              setFormData({...formData, properties: updatedProperties});
                            }}
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
                          >
                            <option value="">Select State</option>
                            <option value="OK">Oklahoma</option>
                            <option value="TX">Texas</option>
                            <option value="AR">Arkansas</option>
                            <option value="KS">Kansas</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-gray-300 font-medium mb-2">ZIP Code</label>
                          <input 
                            type="text" 
                            placeholder="e.g., 73101" 
                            value={property.zip}
                            onChange={(e) => {
                              const updatedProperties = formData.properties.map(p => 
                                p.id === property.id ? {...p, zip: e.target.value} : p
                              );
                              setFormData({...formData, properties: updatedProperties});
                            }}
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 font-medium mb-2">Property Manager</label>
                          <input 
                            type="text" 
                            placeholder="e.g., Sarah Johnson" 
                            value={property.propertyManager}
                            onChange={(e) => {
                              const updatedProperties = formData.properties.map(p => 
                                p.id === property.id ? {...p, propertyManager: e.target.value} : p
                              );
                              setFormData({...formData, properties: updatedProperties});
                            }}
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 font-medium mb-2">Facility Type</label>
                          <select 
                            value={property.facilityType}
                            onChange={(e) => {
                              const updatedProperties = formData.properties.map(p => 
                                p.id === property.id ? {...p, facilityType: e.target.value} : p
                              );
                              setFormData({...formData, properties: updatedProperties});
                            }}
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
                          >
                            <option value="">Select Type</option>
                            <option value="Office">Office</option>
                            <option value="Warehouse">Warehouse</option>
                            <option value="Retail">Retail</option>
                            <option value="Medical">Medical</option>
                            <option value="Industrial">Industrial</option>
                            <option value="Mixed Use">Mixed Use</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-gray-300 font-medium mb-2">Square Footage</label>
                          <input 
                            type="text" 
                            placeholder="e.g., 450,000" 
                            value={property.squareFootage}
                            onChange={(e) => {
                              const updatedProperties = formData.properties.map(p => 
                                p.id === property.id ? {...p, squareFootage: e.target.value} : p
                              );
                              setFormData({...formData, properties: updatedProperties});
                            }}
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 font-medium mb-2">Number of Floors</label>
                          <input 
                            type="number" 
                            placeholder="e.g., 12" 
                            value={property.floors}
                            onChange={(e) => {
                              const updatedProperties = formData.properties.map(p => 
                                p.id === property.id ? {...p, floors: e.target.value} : p
                              );
                              setFormData({...formData, properties: updatedProperties});
                            }}
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-gray-300 font-medium mb-2">Floor Plan Upload</label>
                          <div className="border-2 border-dashed border-teal-500/30 rounded-lg p-6 text-center bg-teal-500/5 hover:bg-teal-500/10 transition-colors cursor-pointer">
                            <Upload className="text-teal-400 mx-auto mb-2" size={24} />
                            <p className="text-gray-300">Upload floor plan or use drawing tool</p>
                            <p className="text-sm text-gray-500">PDF, JPG, PNG up to 10MB</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={autoFillCompanyData}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Auto-Fill Demo Data
                </button>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h3 className="text-2xl font-semibold text-white mb-2">Emergency Contact Details</h3>
            <p className="text-gray-400 mb-6">Provide emergency contact information for critical services.</p>
            
            <div className="space-y-6">
              {Object.entries(formData.emergencyContacts).map(([key, contact]) => (
                <div key={key} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
                  <h4 className="text-white font-semibold mb-4 capitalize">
                    {key === 'fire' ? 'Fire/Safety' : 
                     key === 'emergency' ? 'Local/Regional Emergency Response' : 
                     key.toUpperCase()}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Company Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g., SecureGuard Systems" 
                        value={contact.company}
                        onChange={(e) => setFormData({
                          ...formData,
                          emergencyContacts: {
                            ...formData.emergencyContacts,
                            [key]: {...contact, company: e.target.value}
                          }
                        })}
                        className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Contact Person</label>
                      <input 
                        type="text" 
                        placeholder="e.g., David Martinez - Security Director" 
                        value={contact.contact}
                        onChange={(e) => setFormData({
                          ...formData,
                          emergencyContacts: {
                            ...formData.emergencyContacts,
                            [key]: {...contact, contact: e.target.value}
                          }
                        })}
                        className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="e.g., (555) 911-SAFE" 
                        value={contact.phone}
                        onChange={(e) => setFormData({
                          ...formData,
                          emergencyContacts: {
                            ...formData.emergencyContacts,
                            [key]: {...contact, phone: e.target.value}
                          }
                        })}
                        className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Email</label>
                      <input 
                        type="email" 
                        placeholder="e.g., emergency@secureguard.com" 
                        value={contact.email}
                        onChange={(e) => setFormData({
                          ...formData,
                          emergencyContacts: {
                            ...formData.emergencyContacts,
                            [key]: {...contact, email: e.target.value}
                          }
                        })}
                        className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex items-center space-x-3">
                        <input 
                          type="checkbox" 
                          id={`${key}-24-7`}
                          checked={contact.available24_7}
                          onChange={(e) => setFormData({
                            ...formData,
                            emergencyContacts: {
                              ...formData.emergencyContacts,
                              [key]: {...contact, available24_7: e.target.checked}
                            }
                          })}
                          className="w-5 h-5 text-teal-500 bg-gray-700 border-gray-600 rounded focus:ring-teal-500" 
                        />
                        <label htmlFor={`${key}-24-7`} className="text-gray-300">Available 24/7</label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-center">
                <button
                  onClick={autoFillEmergencyContacts}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Auto-Fill Demo Data
                </button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h3 className="text-2xl font-semibold text-white mb-2">Machinery & Equipment Inventory</h3>
            <p className="text-gray-400 mb-6">Add individual equipment and machinery for PM tracking and management.</p>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-white">Equipment List</h4>
                <button
                  onClick={addEquipment}
                  className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                >
                  <Plus size={16} />
                  <span>Add Equipment</span>
                </button>
              </div>

              {formData.equipment.length === 0 ? (
                <div className="text-center py-8 bg-gray-700/20 rounded-lg border border-gray-700/30">
                  <p className="text-gray-400 mb-4">No equipment added yet</p>
                  <button
                    onClick={addEquipment}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Add Your First Equipment
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {formData.equipment.map((equipment, index) => (
                    <div key={equipment.id} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
                      <div className="flex justify-between items-center mb-4">
                        <h5 className="text-white font-medium">Equipment {index + 1}</h5>
                        <button
                          onClick={() => removeEquipment(equipment.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-300 font-medium mb-2">Equipment Tag/ID</label>
                          <input 
                            type="text" 
                            placeholder="e.g., HVAC-001" 
                            value={equipment.tag}
                            onChange={(e) => {
                              const updatedEquipment = formData.equipment.map(eq => 
                                eq.id === equipment.id ? {...eq, tag: e.target.value} : eq
                              );
                              setFormData({...formData, equipment: updatedEquipment});
                            }}
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 font-medium mb-2">Serial Number</label>
                          <input 
                            type="text" 
                            placeholder="e.g., CV48001234" 
                            value={equipment.serialNumber}
                            onChange={(e) => {
                              const updatedEquipment = formData.equipment.map(eq => 
                                eq.id === equipment.id ? {...eq, serialNumber: e.target.value} : eq
                              );
                              setFormData({...formData, equipment: updatedEquipment});
                            }}
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 font-medium mb-2">Make</label>
                          <input 
                            type="text" 
                            placeholder="e.g., Carrier" 
                            value={equipment.make}
                            onChange={(e) => {
                              const updatedEquipment = formData.equipment.map(eq => 
                                eq.id === equipment.id ? {...eq, make: e.target.value} : eq
                              );
                              setFormData({...formData, equipment: updatedEquipment});
                            }}
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 font-medium mb-2">Model</label>
                          <input 
                            type="text" 
                            placeholder="e.g., WeatherExpert 48TCED" 
                            value={equipment.model}
                            onChange={(e) => {
                              const updatedEquipment = formData.equipment.map(eq => 
                                eq.id === equipment.id ? {...eq, model: e.target.value} : eq
                              );
                              setFormData({...formData, equipment: updatedEquipment});
                            }}
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 font-medium mb-2">Age (Years)</label>
                          <input 
                            type="number" 
                            placeholder="e.g., 5" 
                            value={equipment.age}
                            onChange={(e) => {
                              const updatedEquipment = formData.equipment.map(eq => 
                                eq.id === equipment.id ? {...eq, age: e.target.value} : eq
                              );
                              setFormData({...formData, equipment: updatedEquipment});
                            }}
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 font-medium mb-2">Condition</label>
                          <select 
                            value={equipment.condition}
                            onChange={(e) => {
                              const updatedEquipment = formData.equipment.map(eq => 
                                eq.id === equipment.id ? {...eq, condition: e.target.value} : eq
                              );
                              setFormData({...formData, equipment: updatedEquipment});
                            }}
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
                          >
                            <option value="">Select Condition</option>
                            <option value="Excellent">Excellent</option>
                            <option value="Good">Good</option>
                            <option value="Fair">Fair</option>
                            <option value="Poor">Poor</option>
                            <option value="Critical">Critical</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-gray-300 font-medium mb-2">PM Frequency</label>
                          <select 
                            value={equipment.pmFrequency}
                            onChange={(e) => {
                              const updatedEquipment = formData.equipment.map(eq => 
                                eq.id === equipment.id ? {...eq, pmFrequency: e.target.value} : eq
                              );
                              setFormData({...formData, equipment: updatedEquipment});
                            }}
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
                          >
                            <option value="">Select Frequency</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Quarterly">Quarterly</option>
                            <option value="Semi-Annual">Semi-Annual</option>
                            <option value="Annual">Annual</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-gray-300 font-medium mb-2">Preferred Vendor</label>
                          <input 
                            type="text" 
                            placeholder="e.g., Arctic Air Solutions" 
                            value={equipment.preferredVendor}
                            onChange={(e) => {
                              const updatedEquipment = formData.equipment.map(eq => 
                                eq.id === equipment.id ? {...eq, preferredVendor: e.target.value} : eq
                              );
                              setFormData({...formData, equipment: updatedEquipment});
                            }}
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-gray-300 font-medium mb-2">Maintenance History</label>
                          <textarea 
                            placeholder="Brief history of maintenance, repairs, or issues..." 
                            value={equipment.maintenanceHistory}
                            onChange={(e) => {
                              const updatedEquipment = formData.equipment.map(eq => 
                                eq.id === equipment.id ? {...eq, maintenanceHistory: e.target.value} : eq
                              );
                              setFormData({...formData, equipment: updatedEquipment});
                            }}
                            rows={3}
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <div className="flex items-center space-x-3">
                            <input 
                              type="checkbox" 
                              id={`pm-${equipment.id}`}
                              checked={equipment.includePM}
                              onChange={(e) => {
                                const updatedEquipment = formData.equipment.map(eq => 
                                  eq.id === equipment.id ? {...eq, includePM: e.target.checked} : eq
                                );
                                setFormData({...formData, equipment: updatedEquipment});
                              }}
                              className="w-5 h-5 text-teal-500 bg-gray-700 border-gray-600 rounded focus:ring-teal-500" 
                            />
                            <label htmlFor={`pm-${equipment.id}`} className="text-gray-300 font-medium">Include in Preventative Maintenance Program</label>
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-gray-300 font-medium mb-2">Equipment Photos</label>
                          <div className="border-2 border-dashed border-teal-500/30 rounded-lg p-4 text-center bg-teal-500/5 hover:bg-teal-500/10 transition-colors cursor-pointer">
                            <Upload className="text-teal-400 mx-auto mb-2" size={20} />
                            <p className="text-gray-300 text-sm">Upload equipment photos</p>
                            <p className="text-xs text-gray-500">JPG, PNG up to 5MB each</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h3 className="text-2xl font-semibold text-white mb-2">Document Uploads</h3>
            <p className="text-gray-400 mb-6">Upload your asset inventory, PM calendar, and service agreements.</p>
            
            <div className="space-y-6">
              {/* Asset Inventory */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Asset Inventory</h4>
                <p className="text-gray-400 text-sm mb-4">Include serial numbers, make/model, and photos. Tag equipment for PM inclusion.</p>
                <div className="border-2 border-dashed border-teal-500/30 rounded-lg p-6 text-center bg-teal-500/5 hover:bg-teal-500/10 transition-colors cursor-pointer">
                  <Upload className="text-teal-400 mx-auto mb-2" size={24} />
                  <p className="text-gray-300">Upload Asset Inventory</p>
                  <p className="text-sm text-gray-500">Excel, CSV, PDF up to 25MB</p>
                  <button
                    onClick={() => uploadDocument('assetInventory')}
                    className="mt-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    Choose Files
                  </button>
                </div>
                {formData.documents.assetInventory.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {formData.documents.assetInventory.map((doc) => (
                      <div key={doc.id} className="flex justify-between items-center p-3 bg-gray-700/20 rounded-lg">
                        <div>
                          <span className="text-white font-medium">{doc.name}</span>
                          <span className="text-gray-400 text-sm ml-2">({doc.size})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors">
                            <Download size={12} />
                          </button>
                          <button 
                            onClick={() => deleteDocument('assetInventory', doc.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition-colors"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* PM Calendar */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Preventative Maintenance Calendar</h4>
                <p className="text-gray-400 text-sm mb-4">Upload existing PM schedule or request FFM to build one for you.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-teal-500/30 rounded-lg p-6 text-center bg-teal-500/5 hover:bg-teal-500/10 transition-colors cursor-pointer">
                    <Upload className="text-teal-400 mx-auto mb-2" size={24} />
                    <p className="text-gray-300">Upload Existing PM Schedule</p>
                    <p className="text-sm text-gray-500">Excel, PDF up to 10MB</p>
                    <button
                      onClick={() => uploadDocument('pmCalendar')}
                      className="mt-2 bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                    >
                      Upload Schedule
                    </button>
                  </div>
                  <div className="border-2 border-dashed border-blue-500/30 rounded-lg p-6 text-center bg-blue-500/5 hover:bg-blue-500/10 transition-colors cursor-pointer">
                    <FileText className="text-blue-400 mx-auto mb-2" size={24} />
                    <p className="text-gray-300">Request FFM to Build PM Calendar</p>
                    <p className="text-sm text-gray-500">Based on your equipment inventory</p>
                    <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors text-sm">
                      Request Build
                    </button>
                  </div>
                </div>
                {formData.documents.pmCalendar.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {formData.documents.pmCalendar.map((doc) => (
                      <div key={doc.id} className="flex justify-between items-center p-3 bg-gray-700/20 rounded-lg">
                        <div>
                          <span className="text-white font-medium">{doc.name}</span>
                          <span className="text-gray-400 text-sm ml-2">({doc.size})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors">
                            <Download size={12} />
                          </button>
                          <button 
                            onClick={() => deleteDocument('pmCalendar', doc.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition-colors"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* NDA / Service Agreements */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">NDA / Service Agreements</h4>
                <p className="text-gray-400 text-sm mb-4">Upload signed agreements and legal documents.</p>
                <div className="border-2 border-dashed border-teal-500/30 rounded-lg p-6 text-center bg-teal-500/5 hover:bg-teal-500/10 transition-colors cursor-pointer">
                  <Upload className="text-teal-400 mx-auto mb-2" size={24} />
                  <p className="text-gray-300">Upload Signed Agreements</p>
                  <p className="text-sm text-gray-500">PDF up to 10MB</p>
                  <button
                    onClick={() => uploadDocument('nda')}
                    className="mt-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    Choose Files
                  </button>
                </div>
                {formData.documents.nda.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {formData.documents.nda.map((doc) => (
                      <div key={doc.id} className="flex justify-between items-center p-3 bg-gray-700/20 rounded-lg">
                        <div>
                          <span className="text-white font-medium">{doc.name}</span>
                          <span className="text-gray-400 text-sm ml-2">({doc.size})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors">
                            <Download size={12} />
                          </button>
                          <button 
                            onClick={() => deleteDocument('nda', doc.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition-colors"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div>
            <h3 className="text-2xl font-semibold text-white mb-2">R&M Budgets & Escrow Preferences</h3>
            <p className="text-gray-400 mb-6">Set your maintenance budgets and define escrow rules for fund management.</p>
            
            <div className="space-y-6">
              {/* Budget Allocation */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Budget Allocation</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-2">Annual R&M Budget</label>
                    <input 
                      type="text" 
                      placeholder="e.g., $1,200,000.00" 
                      value={formData.annualBudget} 
                      onChange={(e) => setFormData({...formData, annualBudget: e.target.value})} 
                      className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 font-semibold mb-2">HVAC Budget</label>
                      <input 
                        type="text" 
                        placeholder="e.g., $300,000.00" 
                        value={formData.hvacBudget} 
                        onChange={(e) => setFormData({...formData, hvacBudget: e.target.value})} 
                        className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-semibold mb-2">Plumbing Budget</label>
                      <input 
                        type="text" 
                        placeholder="e.g., $180,000.00" 
                        value={formData.plumbingBudget} 
                        onChange={(e) => setFormData({...formData, plumbingBudget: e.target.value})} 
                        className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-semibold mb-2">Electrical Budget</label>
                      <input 
                        type="text" 
                        placeholder="e.g., $144,000.00" 
                        value={formData.electricalBudget} 
                        onChange={(e) => setFormData({...formData, electricalBudget: e.target.value})} 
                        className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-semibold mb-2">Cleaning Budget</label>
                      <input 
                        type="text" 
                        placeholder="e.g., $96,000.00" 
                        value={formData.cleaningBudget} 
                        onChange={(e) => setFormData({...formData, cleaningBudget: e.target.value})} 
                        className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-semibold mb-2">Emergency Budget</label>
                      <input 
                        type="text" 
                        placeholder="e.g., $84,000.00" 
                        value={formData.emergencyBudget} 
                        onChange={(e) => setFormData({...formData, emergencyBudget: e.target.value})} 
                        className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Escrow Rules */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Escrow Preferences</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 font-semibold mb-2">Auto-Approve Threshold</label>
                      <input 
                        type="text" 
                        placeholder="e.g., $5,000.00" 
                        value={formData.autoApproveThreshold} 
                        onChange={(e) => setFormData({...formData, autoApproveThreshold: e.target.value})} 
                        className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                      />
                      <p className="text-xs text-gray-400 mt-1">Work orders under this amount are auto-approved</p>
                    </div>
                    <div>
                      <label className="block text-gray-300 font-semibold mb-2">Manual Approval Threshold</label>
                      <input 
                        type="text" 
                        placeholder="e.g., $15,000.00" 
                        value={formData.manualApprovalThreshold} 
                        onChange={(e) => setFormData({...formData, manualApprovalThreshold: e.target.value})} 
                        className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                      />
                      <p className="text-xs text-gray-400 mt-1">Work orders over this amount require manual approval</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 font-semibold mb-2">Escrow Hold Period (Hours)</label>
                      <select 
                        value={formData.escrowHoldPeriod} 
                        onChange={(e) => setFormData({...formData, escrowHoldPeriod: e.target.value})} 
                        className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
                      >
                        <option value="">Select Hold Period</option>
                        <option value="24">24 hours</option>
                        <option value="48">48 hours</option>
                        <option value="72">72 hours</option>
                        <option value="168">1 week</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-300 font-semibold mb-2">Approval Authority</label>
                      <select 
                        value={formData.approvalAuthority} 
                        onChange={(e) => setFormData({...formData, approvalAuthority: e.target.value})} 
                        className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
                      >
                        <option value="">Select Authority</option>
                        <option value="Regional FM">Regional FM</option>
                        <option value="CFO">CFO</option>
                        <option value="Both">Both Required</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={autoFillBudgetData}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Auto-Fill Demo Data
                </button>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div>
            <h3 className="text-2xl font-semibold text-white mb-2">Team Roles & Permissions</h3>
            <p className="text-gray-400 mb-6">Assign team members to key roles and define their access levels in the FFM client portal.</p>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-white">Team Members</h4>
                <button
                  onClick={addTeamMember}
                  className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                >
                  <Plus size={16} />
                  <span>Add Team Member</span>
                </button>
              </div>

              {formData.teamMembers.length === 0 ? (
                <div className="text-center py-8 bg-gray-700/20 rounded-lg border border-gray-700/30">
                  <p className="text-gray-400 mb-4">No team members added yet</p>
                  <button
                    onClick={addTeamMember}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Add Your First Team Member
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {formData.teamMembers.map((member, index) => (
                    <div key={member.id} className="p-4 bg-gray-700/20 rounded-lg border border-gray-700/30">
                      <div className="flex justify-between items-center mb-4">
                        <h5 className="text-white font-medium">Team Member {index + 1}</h5>
                        <button
                          onClick={() => removeTeamMember(member.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-300 font-medium mb-2">Full Name</label>
                          <input 
                            type="text" 
                            placeholder="e.g., Mike Chen" 
                            value={member.name}
                            onChange={(e) => {
                              const updatedMembers = formData.teamMembers.map(m => 
                                m.id === member.id ? {...m, name: e.target.value} : m
                              );
                              setFormData({...formData, teamMembers: updatedMembers});
                            }}
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 font-medium mb-2">Job Title</label>
                          <input 
                            type="text" 
                            placeholder="e.g., Regional Facility Manager" 
                            value={member.title}
                            onChange={(e) => {
                              const updatedMembers = formData.teamMembers.map(m => 
                                m.id === member.id ? {...m, title: e.target.value} : m
                              );
                              setFormData({...formData, teamMembers: updatedMembers});
                            }}
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 font-medium mb-2">Email</label>
                          <input 
                            type="email" 
                            placeholder="e.g., mike.chen@metroproperties.com" 
                            value={member.email}
                            onChange={(e) => {
                              const updatedMembers = formData.teamMembers.map(m => 
                                m.id === member.id ? {...m, email: e.target.value} : m
                              );
                              setFormData({...formData, teamMembers: updatedMembers});
                            }}
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 font-medium mb-2">Phone</label>
                          <input 
                            type="tel" 
                            placeholder="e.g., (555) 234-5678" 
                            value={member.phone}
                            onChange={(e) => {
                              const updatedMembers = formData.teamMembers.map(m => 
                                m.id === member.id ? {...m, phone: e.target.value} : m
                              );
                              setFormData({...formData, teamMembers: updatedMembers});
                            }}
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" 
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 font-medium mb-2">FFM Role</label>
                          <select 
                            value={member.role}
                            onChange={(e) => {
                              const updatedMembers = formData.teamMembers.map(m => 
                                m.id === member.id ? {...m, role: e.target.value} : m
                              );
                              setFormData({...formData, teamMembers: updatedMembers});
                            }}
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
                          >
                            <option value="">Select Role</option>
                            <option value="Regional FM">Regional Facility Manager</option>
                            <option value="On-site FM">On-site Facility Manager</option>
                            <option value="CFO">CFO / Finance Contact</option>
                            <option value="Operations">Operations Manager</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-gray-300 font-medium mb-2">Access Level</label>
                          <select 
                            value={member.accessLevel}
                            onChange={(e) => {
                              const updatedMembers = formData.teamMembers.map(m => 
                                m.id === member.id ? {...m, accessLevel: e.target.value} : m
                              );
                              setFormData({...formData, teamMembers: updatedMembers});
                            }}
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
                          >
                            <option value="">Select Access Level</option>
                            <option value="Full Access">Full Access - All properties, vendors, budgets, and reporting</option>
                            <option value="Operational">Operational Access - Work orders, vendor communication, maintenance scheduling</option>
                            <option value="Financial">Financial Access - Budget oversight, approvals, financial reporting</option>
                            <option value="Read Only">Read Only - View-only access to reports and dashboards</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-center">
                <button
                  onClick={autoFillTeamData}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Auto-Fill Demo Data
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Expose the openModal function globally so it can be called from Hero component
  React.useEffect(() => {
    const handleStartClientOnboarding = () => {
      openModal();
    };
    
    window.addEventListener('startClientOnboarding', handleStartClientOnboarding);
    
    return () => {
      window.removeEventListener('startClientOnboarding', handleStartClientOnboarding);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 rounded-2xl border border-gray-700/30 w-full max-w-6xl max-h-[95vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 border-b border-gray-700/50">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-4 mb-2">
                <img 
                  src="/ffm_logo_manual.png" 
                  alt="FFM - Fractional Facilities Management" 
                  className="h-16 w-auto"
                />
                <div className="text-teal-400 font-semibold">CLIENT ONBOARDING</div>
              </div>
              <h2 className="text-2xl font-bold text-white">Welcome to FFM</h2>
              <p className="text-gray-400">Step {currentStep} of {totalSteps} • {progress.toFixed(0)}% Complete</p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={saveAndExit}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
              >
                Save & Exit
              </button>
              <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-800/50 p-4 border-b border-gray-700/30">
          <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-teal-500 to-teal-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`text-center flex-1 ${
                  index + 1 === currentStep ? 'text-teal-400 font-semibold' : 
                  index + 1 < currentStep ? 'text-green-400' : 'text-gray-500'
                }`}
              >
                <div className="flex items-center justify-center mb-1">
                  {index + 1 < currentStep ? <CheckCircle size={16} /> : 
                   index + 1 === currentStep ? <div className="w-4 h-4 bg-teal-500 rounded-full"></div> :
                   <div className="w-4 h-4 bg-gray-600 rounded-full"></div>}
                </div>
                <div className="text-xs hidden md:block">{step}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto flex-1 min-h-0 modal-content">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="bg-gray-800/50 p-6 border-t border-gray-700/30 flex justify-between items-center flex-shrink-0">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 border-2 ${
              currentStep === 1 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed border-gray-700' 
                : 'bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white border-slate-800 hover:border-teal-500 hover:text-slate-900'
            }`}
          >
            <ArrowLeft size={20} />
            <span>Previous</span>
          </button>

          <div className="text-gray-400">
            Step {currentStep} of {totalSteps} • {progress.toFixed(0)}% Complete
          </div>

          <button
            onClick={nextStep}
            className="flex items-center space-x-2 bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900"
          >
            <span>{currentStep === totalSteps ? 'Complete Onboarding' : 'Continue'}</span>
            {currentStep === totalSteps ? <CheckCircle size={20} /> : <ArrowRight size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;