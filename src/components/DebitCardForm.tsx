import React, { useState } from 'react';
type FormDataType = {
  fullName: string;
  dob: string;
  address: string;
  email: string;
  phone: string;
  accountNumber: string;
  accountType: string;
  employmentStatus: string;
  agree: boolean;
};

const DebitCardForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    fullName: '',
    dob: '',
    address: '',
    email: '',
    phone: '',
    accountNumber: '',
    accountType: '',
    employmentStatus: '',
    agree: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value, type } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name as keyof FormDataType]:
      type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value,
  }));
};


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("Please accept the terms to proceed.");
      return;
    }
    console.log('Form Submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return <p style={{ color: 'green' }}>Your application has been submitted successfully!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Debit Card Application Form</h2>

      <label>Full Name:</label>
      <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

      <label>Date of Birth:</label>
      <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

      <label>Address:</label>
      <input type="text" name="address" value={formData.address} onChange={handleChange} required />

      <label>Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />

      <label>Phone Number:</label>
      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

      <label>Account Number:</label>
      <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} required />

      <label>Account Type:</label>
      <select name="accountType" value={formData.accountType} onChange={handleChange} required>
        <option value="">Select</option>
        <option value="current">Current</option>
        <option value="savings">Savings</option>
        <option value="student">Student</option>
        <option value="joint">Joint</option>
      </select>

      <label>Employment Status:</label>
      <select name="employmentStatus" value={formData.employmentStatus} onChange={handleChange} required>
        <option value="">Select</option>
        <option value="employed">Employed</option>
        <option value="self-employed">Self-Employed</option>
        <option value="unemployed">Unemployed</option>
        <option value="student">Student</option>
        <option value="retired">Retired</option>
      </select>

<div className="checkbox-wrapper">
  <input
    type="checkbox"
    id="agree"
    name="agree"
    checked={formData.agree}
    onChange={handleChange}
  />
  <label htmlFor="agree">I agree to the terms and conditions</label>
</div>



      <button type="submit">Submit Application</button>
    </form>
  );
};

export default DebitCardForm;
