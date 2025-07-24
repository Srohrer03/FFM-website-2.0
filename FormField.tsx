import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FormFieldProps {
  label: string;
  type?: 'text' | 'email' | 'tel' | 'password' | 'textarea' | 'select';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  icon?: LucideIcon;
  options?: { value: string; label: string }[];
  rows?: number;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  icon: Icon,
  options,
  rows = 3
}) => {
  const baseInputClasses = "w-full px-4 py-3 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500";

  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={baseInputClasses}
        />
      );
    }

    if (type === 'select' && options) {
      return (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseInputClasses}
        >
          <option value="">{placeholder || 'Select an option'}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={baseInputClasses}
      />
    );
  };

  return (
    <div>
      <label className="block text-gray-300 font-medium mb-2">
        {Icon && <Icon className="inline mr-2" size={16} />}
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {renderInput()}
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default FormField;