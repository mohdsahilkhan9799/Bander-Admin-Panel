// PersonalInfo.jsx
import React from 'react';

const PersonalInfo = ({ formData, handleInputChange }) => {
  return (
    <>
      <div className="input-group mb-3">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          name="address"
          className="form-control"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          name="phone"
          className="form-control"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>

    </>
  );
};

export default PersonalInfo;
