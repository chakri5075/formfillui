// src/components/InsuranceForm.tsx
import React, { useState } from 'react';

type InsuranceType =
  | 'Car Insurance'
  | 'Home Insurance'
  | 'Life Insurance'
  | 'Travel Insurance'
  | 'Pet Insurance'
  | 'Business Insurance';

interface FieldConfig {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}

const insuranceFields: Record<InsuranceType, FieldConfig[]> = {
  'Car Insurance': [
    { label: 'Car Make', name: 'carMake', type: 'text', required: true },
    { label: 'Car Model', name: 'carModel', type: 'text', required: true },
    { label: 'Year of Manufacture', name: 'year', type: 'number', required: true },
    { label: 'License Plate Number', name: 'plate', type: 'text' },
  ],
  'Home Insurance': [
    { label: 'Property Address', name: 'address', type: 'text', required: true },
    { label: 'Property Type', name: 'propertyType', type: 'text' },
    { label: 'Estimated Property Value (£)', name: 'value', type: 'number' },
  ],
  'Life Insurance': [
    { label: 'Full Name', name: 'fullName', type: 'text', required: true },
    { label: 'Date of Birth', name: 'dob', type: 'date', required: true },
    { label: 'Coverage Amount (£)', name: 'coverage', type: 'number' },
  ],
  'Travel Insurance': [
    { label: 'Destination Country', name: 'country', type: 'text' },
    { label: 'Travel Start Date', name: 'startDate', type: 'date' },
    { label: 'Travel End Date', name: 'endDate', type: 'date' },
    { label: 'Purpose of Travel', name: 'purpose', type: 'text' },
  ],
  'Pet Insurance': [
    { label: 'Pet Name', name: 'petName', type: 'text' },
    { label: 'Animal Type', name: 'animalType', type: 'text' },
    { label: 'Breed', name: 'breed', type: 'text' },
  ],
  'Business Insurance': [
    { label: 'Business Name', name: 'businessName', type: 'text', required: true },
    { label: 'Industry Type', name: 'industry', type: 'text' },
    { label: 'Annual Revenue (£)', name: 'revenue', type: 'number' },
  ],
};

const InsuranceForm: React.FC = () => {
  const [insuranceType, setInsuranceType] = useState<InsuranceType | ''>('');
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInsuranceType(e.target.value as InsuranceType);
    setFormValues({}); // reset form when changing type
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Submitted: ' + JSON.stringify(formValues, null, 2));
    // You can send `formValues` to your backend here
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Apply for Insurance</h2>

      <label style={{ display: 'block', marginBottom: '1rem' }}>
        Select Insurance Type:
        <select value={insuranceType} onChange={handleTypeChange} style={{ marginLeft: 8 }}>
          <option value="">--Select--</option>
          {Object.keys(insuranceFields).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>

      {insuranceType && (
        <form onSubmit={handleSubmit}>
          <h3>{insuranceType} Details</h3>

          {insuranceFields[insuranceType].map((field) => (
            <div key={field.name} style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: 500 }}>
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                required={field.required}
                value={formValues[field.name] || ''}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '0.5rem' }}
              />
            </div>
          ))}

          <button type="submit" style={{ padding: '0.5rem 1rem' }}>
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
};

export default InsuranceForm;
