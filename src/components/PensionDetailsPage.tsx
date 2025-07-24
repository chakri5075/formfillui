import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PensionDetailsPage.css';

interface PensionDetails {
  firstName: string;
  lastName: string;
  dob: string;
  address: string;
  city: string;
  postalCode: string;
  pensionScheme: string;
  pensionAccount: string;
  totalDeposited: string;
}

const PensionDetailsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pensionDetails = location.state as PensionDetails;

  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState<PensionDetails>(pensionDetails);

  if (!pensionDetails) {
    return (
      <div className="no-details">
        <p>No pension details found. Please upload again.</p>
        <button className="back-btn" onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    // You can send editedDetails to backend here if needed
    setIsEditing(false);
  };

  const formatLabel = (key: string) => {
    const labels: Record<string, string> = {
      firstName: 'First Name',
      lastName: 'Last Name',
      dob: 'Date of Birth',
      address: 'Address',
      city: 'City',
      postalCode: 'Postal Code',
      pensionScheme: 'Pension Scheme',
      pensionAccount: 'Pension Account',
      totalDeposited: 'Total Deposited (£)'
    };
    return labels[key] || key;
  };

  return (
    <div className="pension-details">
      <div className="header-row">
        <h3>Pension Details</h3>
        {!isEditing && (
          <button className="edit-btn" onClick={handleEdit}>Edit</button>
        )}
      </div>

      {Object.entries(editedDetails).map(([key, value]) => (
        <div className="form-group" key={key}>
          <label>{formatLabel(key)}:</label>
          <input
            type={key === 'dob' ? 'date' : key === 'totalDeposited' ? 'number' : 'text'}
            name={key}
            value={value}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
      ))}

      {isEditing && (
        <button className="save-btn" onClick={handleSave}>Save</button>
      )}
    </div>
  );
};

export default PensionDetailsPage;
