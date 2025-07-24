import React from 'react';
import { FormData } from './types';

interface WorkOrderFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onAutoFill: () => void;
}

const WorkOrderForm: React.FC<WorkOrderFormProps> = ({ formData, setFormData, onAutoFill }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
      <h3 className="text-xl font-semibold text-white mb-4">Work Order Creation Form</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-300 font-medium mb-2">WO Number</label>
          <input
            type="text"
            value={formData.woNumber}
            readOnly
            className="w-full px-4 py-3 bg-gray-600/20 border border-gray-600/50 rounded-lg text-gray-300 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-gray-300 font-medium mb-2">Priority Level</label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({...formData, priority: e.target.value})}
            className="w-full px-4 py-3 bg-slate-800 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
            style={{
              backgroundColor: '#1e293b',
              color: 'white'
            }}
          >
            <option value="">Select Priority</option>
            <option value="Critical" style={{backgroundColor: '#1e293b', color: 'white'}}>Critical</option>
            <option value="Urgent" style={{backgroundColor: '#1e293b', color: 'white'}}>Urgent</option>
            <option value="High" style={{backgroundColor: '#1e293b', color: 'white'}}>High</option>
            <option value="Medium" style={{backgroundColor: '#1e293b', color: 'white'}}>Medium</option>
            <option value="Low" style={{backgroundColor: '#1e293b', color: 'white'}}>Low</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-300 font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Describe the work needed"
            rows={3}
            className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 font-medium mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="Building, floor, room"
              className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-medium mb-2">Start Date</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 font-medium mb-2">Vendor Category</label>
            <select
              value={formData.vendorCategory}
              onChange={(e) => setFormData({...formData, vendorCategory: e.target.value})}
              className="w-full px-4 py-3 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
              style={{
                backgroundColor: '#0f172a',
                color: 'white'
              }}
            >
              <option value="" style={{backgroundColor: '#0f172a', color: 'white'}}>Select Vendor Category</option>
              <optgroup label="HVAC & Climate Control" style={{backgroundColor: '#0f172a', color: 'white'}}>
                <option value="HVAC-Commercial" style={{backgroundColor: '#0f172a', color: 'white'}}>Commercial HVAC</option>
                <option value="HVAC-Residential" style={{backgroundColor: '#0f172a', color: 'white'}}>Residential HVAC</option>
                <option value="HVAC-Emergency" style={{backgroundColor: '#0f172a', color: 'white'}}>Emergency HVAC</option>
                <option value="HVAC-Maintenance" style={{backgroundColor: '#0f172a', color: 'white'}}>HVAC Maintenance</option>
              </optgroup>
              <optgroup label="Plumbing Services" style={{backgroundColor: '#0f172a', color: 'white'}}>
                <option value="Plumbing-Commercial" style={{backgroundColor: '#0f172a', color: 'white'}}>Commercial Plumbing</option>
                <option value="Plumbing-Emergency" style={{backgroundColor: '#0f172a', color: 'white'}}>Emergency Plumbing</option>
                <option value="Plumbing-Maintenance" style={{backgroundColor: '#0f172a', color: 'white'}}>Plumbing Maintenance</option>
              </optgroup>
              <optgroup label="Electrical Services" style={{backgroundColor: '#0f172a', color: 'white'}}>
                <option value="Electrical-Commercial" style={{backgroundColor: '#0f172a', color: 'white'}}>Commercial Electrical</option>
                <option value="Electrical-Emergency" style={{backgroundColor: '#0f172a', color: 'white'}}>Emergency Electrical</option>
                <option value="Electrical-Lighting" style={{backgroundColor: '#0f172a', color: 'white'}}>Lighting Systems</option>
              </optgroup>
              <optgroup label="Roofing Services" style={{backgroundColor: '#0f172a', color: 'white'}}>
                <option value="Roofing-Commercial" style={{backgroundColor: '#0f172a', color: 'white'}}>Commercial Roofing</option>
                <option value="Roofing-Residential" style={{backgroundColor: '#0f172a', color: 'white'}}>Residential Roofing</option>
                <option value="Roofing-Emergency" style={{backgroundColor: '#0f172a', color: 'white'}}>Emergency Roof Repair</option>
                <option value="Roofing-Maintenance" style={{backgroundColor: '#0f172a', color: 'white'}}>Roof Maintenance</option>
                <option value="Roofing-Gutters" style={{backgroundColor: '#0f172a', color: 'white'}}>Gutter Services</option>
              </optgroup>
              <optgroup label="Cleaning & Janitorial" style={{backgroundColor: '#0f172a', color: 'white'}}>
                <option value="Cleaning-Commercial" style={{backgroundColor: '#0f172a', color: 'white'}}>Commercial Cleaning</option>
                <option value="Cleaning-Deep" style={{backgroundColor: '#0f172a', color: 'white'}}>Deep Cleaning</option>
                <option value="Cleaning-Carpet" style={{backgroundColor: '#0f172a', color: 'white'}}>Carpet Cleaning</option>
                <option value="Cleaning-Window" style={{backgroundColor: '#0f172a', color: 'white'}}>Window Cleaning</option>
                <option value="Cleaning-Pressure" style={{backgroundColor: '#0f172a', color: 'white'}}>Pressure Washing</option>
                <option value="Janitorial" style={{backgroundColor: '#0f172a', color: 'white'}}>Janitorial Services</option>
              </optgroup>
              <optgroup label="Landscaping & Grounds" style={{backgroundColor: '#0f172a', color: 'white'}}>
                <option value="Landscaping-Design" style={{backgroundColor: '#0f172a', color: 'white'}}>Landscape Design</option>
                <option value="Landscaping-Maintenance" style={{backgroundColor: '#0f172a', color: 'white'}}>Landscape Maintenance</option>
                <option value="Landscaping-Lawn" style={{backgroundColor: '#0f172a', color: 'white'}}>Lawn Care</option>
                <option value="Landscaping-Tree" style={{backgroundColor: '#0f172a', color: 'white'}}>Tree Services</option>
                <option value="Landscaping-Snow" style={{backgroundColor: '#0f172a', color: 'white'}}>Snow Removal</option>
                <option value="Landscaping-Irrigation" style={{backgroundColor: '#0f172a', color: 'white'}}>Irrigation Systems</option>
              </optgroup>
              <optgroup label="Flooring Services" style={{backgroundColor: '#0f172a', color: 'white'}}>
                <option value="Flooring-Carpet" style={{backgroundColor: '#0f172a', color: 'white'}}>Carpet Installation</option>
                <option value="Flooring-Hardwood" style={{backgroundColor: '#0f172a', color: 'white'}}>Hardwood Flooring</option>
                <option value="Flooring-Tile" style={{backgroundColor: '#0f172a', color: 'white'}}>Tile Installation</option>
                <option value="Flooring-Vinyl" style={{backgroundColor: '#0f172a', color: 'white'}}>Vinyl Flooring</option>
                <option value="Flooring-Refinishing" style={{backgroundColor: '#0f172a', color: 'white'}}>Floor Refinishing</option>
              </optgroup>
              <optgroup label="Painting Services" style={{backgroundColor: '#0f172a', color: 'white'}}>
                <option value="Painting-Interior" style={{backgroundColor: '#0f172a', color: 'white'}}>Interior Painting</option>
                <option value="Painting-Exterior" style={{backgroundColor: '#0f172a', color: 'white'}}>Exterior Painting</option>
                <option value="Painting-Commercial" style={{backgroundColor: '#0f172a', color: 'white'}}>Commercial Painting</option>
                <option value="Painting-Specialty" style={{backgroundColor: '#0f172a', color: 'white'}}>Specialty Coatings</option>
              </optgroup>
              <optgroup label="Building Maintenance" style={{backgroundColor: '#0f172a', color: 'white'}}>
                <option value="Maintenance-General" style={{backgroundColor: '#0f172a', color: 'white'}}>General Maintenance</option>
                <option value="Maintenance-Preventive" style={{backgroundColor: '#0f172a', color: 'white'}}>Preventive Maintenance</option>
                <option value="Maintenance-Emergency" style={{backgroundColor: '#0f172a', color: 'white'}}>Emergency Repairs</option>
                <option value="Handyman" style={{backgroundColor: '#0f172a', color: 'white'}}>Handyman Services</option>
              </optgroup>
              <optgroup label="Security & Safety" style={{backgroundColor: '#0f172a', color: 'white'}}>
                <option value="Security" style={{backgroundColor: '#0f172a', color: 'white'}}>Security Systems</option>
                <option value="Fire-Safety" style={{backgroundColor: '#0f172a', color: 'white'}}>Fire Safety</option>
                <option value="Elevator" style={{backgroundColor: '#0f172a', color: 'white'}}>Elevator Services</option>
                <option value="Access-Control" style={{backgroundColor: '#0f172a', color: 'white'}}>Access Control</option>
                <option value="CCTV" style={{backgroundColor: '#0f172a', color: 'white'}}>CCTV Systems</option>
              </optgroup>
              <optgroup label="Specialized Services" style={{backgroundColor: '#0f172a', color: 'white'}}>
                <option value="Windows" style={{backgroundColor: '#0f172a', color: 'white'}}>Window Services</option>
                <option value="Pest-Control" style={{backgroundColor: '#0f172a', color: 'white'}}>Pest Control</option>
                <option value="Waste-Management" style={{backgroundColor: '#0f172a', color: 'white'}}>Waste Management</option>
                <option value="General-Contractor" style={{backgroundColor: '#0f172a', color: 'white'}}>General Contractor</option>
                <option value="Locksmith" style={{backgroundColor: '#0f172a', color: 'white'}}>Locksmith Services</option>
                <option value="Signage" style={{backgroundColor: '#0f172a', color: 'white'}}>Signage Services</option>
                <option value="Moving" style={{backgroundColor: '#0f172a', color: 'white'}}>Moving Services</option>
              </optgroup>
            </select>
          </div>
          <div>
            <label className="block text-gray-300 font-medium mb-2">Estimated Finish Date</label>
            <input
              type="date"
              value={formData.estimatedFinishDate}
              onChange={(e) => setFormData({...formData, estimatedFinishDate: e.target.value})}
              className="w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={onAutoFill}
          className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Auto-Fill Demo Data
        </button>
      </div>
    </div>
  );
};

export default WorkOrderForm;