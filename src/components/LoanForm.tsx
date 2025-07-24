import React, { useState } from 'react';
import './LoanForm.css';

const loanTypes = ['Home Loan', 'Car Loan', 'Personal Loan', 'Business Loan', 'Student Loan'];

const LoanForm = () => {
  const [formData, setFormData] = useState({
    loanType: '',
    fullName: '',
    dob: '',
    email: '',
    phone: '',
    loanAmount: '',
    loanPurpose: '',
    propertyValue: '',
    agree: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? target.checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agree) {
      alert('Please agree to the terms and conditions');
      return;
    }
    console.log(formData);
  };

  const renderExtraFields = () => {
    switch (formData.loanType) {
      case 'Home Loan':
        return (
          <>
            <div className="form-group">
              <label>Property Value (£):</label>
              <input
                type="number"
                name="propertyValue"
                value={formData.propertyValue}
                onChange={handleChange}
                required
              />
            </div>
          </>
        );
      case 'Business Loan':
        return (
          <>
            <div className="form-group">
              <label>Loan Purpose:</label>
              <input
                type="text"
                name="loanPurpose"
                value={formData.loanPurpose}
                onChange={handleChange}
                required
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="loan-form-container">
      <h2>Apply for a Loan</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Loan Type:</label>
          <select name="loanType" value={formData.loanType} onChange={handleChange} required>
            <option value="">-- Select Loan Type --</option>
            {loanTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Full Name:</label>
          <input name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Date of Birth:</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input name="phone" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Loan Amount (£):</label>
          <input
            type="number"
            name="loanAmount"
            value={formData.loanAmount}
            onChange={handleChange}
            required
          />
        </div>

        {renderExtraFields()}

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              required
            />
            I agree to the terms and conditions
          </label>
        </div>

        <button type="submit" className="submit-button">Submit Application</button>
      </form>
    </div>
  );
};

export default LoanForm;
