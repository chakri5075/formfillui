// src/components/CreditCardForm.tsx
import React, { useState } from 'react';

const CreditCardForm: React.FC = () => {
  const [form, setForm] = useState({
    fullName: '',
    dob: '',
    address: '',
    income: '',
    employmentStatus: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Credit Card Form:", form);
    alert("Form submitted successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h3>Credit Card Application</h3>
      
      <label>Full Name</label>
      <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required />

      <label>Date of Birth</label>
      <input type="date" name="dob" value={form.dob} onChange={handleChange} required />

      <label>Address</label>
      <input type="text" name="address" value={form.address} onChange={handleChange} required />

      <label>Annual Income (GBP)</label>
      <input type="number" name="income" value={form.income} onChange={handleChange} required />

      <label>Employment Status</label>
      <select name="employmentStatus" value={form.employmentStatus} onChange={handleChange} required>
        <option value="">Select</option>
        <option value="Employed">Employed</option>
        <option value="Self-Employed">Self-Employed</option>
        <option value="Student">Student</option>
        <option value="Unemployed">Unemployed</option>
        <option value="Retired">Retired</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreditCardForm;
