// CompanyInfo.jsx
import React from 'react';

const CompanyInfo = ({ formData, handleInputChange }) => {
  return (
    <>
      <div className="input-group mb-3">
        <input
          type="text"
          name="company_name"
          className="form-control"
          placeholder="Company Name"
          value={formData.company_name}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          name="company_address"
          className="form-control"
          placeholder="Company Address"
          value={formData.company_address}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          name="gst_number"
          className="form-control"
          placeholder="GST Number"
          value={formData.gst_number}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          name="account_number"
          className="form-control"
          placeholder="Account Number"
          value={formData.account_number}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          name="bank_name"
          className="form-control"
          placeholder="Bank Name"
          value={formData.bank_name}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          name="ifsc_code"
          className="form-control"
          placeholder="IFSC Code"
          value={formData.ifsc_code}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          name="pan_card"
          className="form-control"
          placeholder="PAN Card Number"
          value={formData.pan_card}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          name="adhar_card"
          className="form-control"
          placeholder="Aadhaar Card Number"
          value={formData.adhar_card}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          name="country_name"
          className="form-control"
          placeholder="Country Name"
          value={formData.country_name}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          name="state_name"
          className="form-control"
          placeholder="State Name"
          value={formData.state_name}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          name="pin_number"
          className="form-control"
          placeholder="PIN Code"
          value={formData.pin_number}
          onChange={handleInputChange}
        />
      </div>
      {/* Other company fields here */}
    </>
  );
};

export default CompanyInfo;
