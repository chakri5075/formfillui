import React, { useState } from 'react';
import './PensionForm.css';
import { useNavigate } from 'react-router-dom';

const PensionForm = () => {
  const [imageType, setImageType] = useState('PASSPORT');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentStatus, setDocumentStatus] = useState<string | null>(null);
  const [pensionDetails, setPensionDetails] = useState<any | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setDocumentStatus(null); // Reset state
    setPensionDetails(null);
  };

const handleUpload = async () => {
  if (!selectedFile) {
    alert('Please select a file to upload.');
    return;
  }

  const requestBody = {
    imageType: imageType,
    // You could also send file name or size if needed:
    // fileName: selectedFile.name
  };

  try {
    const response = await fetch('https://onfidomock1-140053972027.europe-west2.run.app/api/pension/details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    setDocumentStatus(data.documentStatus);

    if (data.documentStatus === 'VALID') {
      navigate('/pension-details', { state: data });
    } else {
      setPensionDetails(null);
    }
  } catch (error) {
    console.error('Error calling pension API:', error);
    setDocumentStatus('Error');
    setPensionDetails(null);
  }
};


  return (
    <div className="pension-form-container">
      <h2>Pension ID Upload</h2>

      <div className="form-group">
        <label>Image Type:</label>
        <select value={imageType} onChange={(e) => setImageType(e.target.value)}>
          <option value="PASSPORT">Passport</option>
          <option value="NINO">National Insurance Number</option>
          <option value="DL">Driving License</option>
          <option value="EIC">Electoral Identity Card</option>
        </select>
      </div>

      <div className="form-group">
        <label>Upload ID Image:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      <button type="button" onClick={handleUpload} disabled={!selectedFile}>
        Upload & Fetch Details
      </button>

      {/* Show pension fields if valid */}
      {documentStatus === 'VALID' && pensionDetails && (
        <div className="pension-details">
          <h3>Pension Details</h3>
          <div className="form-group">
            <label>First Name:</label>
            <input type="text" value={pensionDetails.firstName} readOnly />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input type="text" value={pensionDetails.lastName} readOnly />
          </div>
          <div className="form-group">
            <label>Date of Birth:</label>
            <input type="date" value={pensionDetails.dob} readOnly />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input type="text" value={pensionDetails.address} readOnly />
          </div>
          <div className="form-group">
            <label>City:</label>
            <input type="text" value={pensionDetails.city} readOnly />
          </div>
          <div className="form-group">
            <label>Postal Code:</label>
            <input type="text" value={pensionDetails.postalCode} readOnly />
          </div>
          <div className="form-group">
            <label>Pension Scheme:</label>
            <input type="text" value={pensionDetails.pensionScheme} readOnly />
          </div>
          <div className="form-group">
            <label>Pension Account:</label>
            <input type="text" value={pensionDetails.pensionAccount} readOnly />
          </div>
          <div className="form-group">
            <label>Total Deposited (£):</label>
            <input type="number" value={pensionDetails.totalDeposited} readOnly />
          </div>
        </div>
      )}

      {/* Show error if document is not valid */}
      {documentStatus && documentStatus !== 'VALID' && (
        <p style={{ color: 'red', marginTop: '1rem' }}>Couldnot validate Document. Please re-upload.</p>
      )}
    </div>
  );
};

export default PensionForm;
