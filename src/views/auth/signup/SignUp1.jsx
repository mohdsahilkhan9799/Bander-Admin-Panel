import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import { RegisterUser } from '../../../Slices/AdminSlice.js';
import PersonalInfo from './PersonalInfo';
import CompanyInfo from './CompanyInfo';

const SignUp1 = () => {
  const dispatch = useDispatch();
  
  const initialFormData = {
    name: "",
    address: "",
    email: "",
    password: "",
    phone: "",
    profile_image: null,
    
    company_name: "",
    company_address: "",
    gst_number: "",
    account_number: "",
    bank_name: "",
    ifsc_code: "",
    pan_card: "",
    adhar_card: "",
    country_name: "",
    state_name: "",
    pin_number: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(1); // Step 1 for Personal Info

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const updatedValue = type === "checkbox" ? checked : type === "file" ? files[0] : value;

    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(RegisterUser(formData)) 
    navigate("/login");  };

  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless">
            <Row className="align-items-center">
              <Col>
                <Card.Body className="text-center">
                  <h3 className="mb-4">Sign up</h3>
                  <form onSubmit={handleSubmit}>
                    {currentStep === 1 && (
                      <PersonalInfo formData={formData} handleInputChange={handleInputChange} />
                    )}
                    {currentStep === 2 && (
                      <CompanyInfo formData={formData} handleInputChange={handleInputChange} />
                    )}
                    <div className="input-group mb-3">
                      <input
                        type="file"
                        name="profile_image"
                        className="form-control"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="d-flex justify-content-between">
                      {currentStep > 1 && (
                        <button className="btn btn-secondary" onClick={handleBack}>Back</button>
                      )}
                      {currentStep < 2 ? (
                        <button className="btn btn-primary" onClick={handleNext}>Next</button>
                      ) : (
                        <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Sign up</button>
                      )}
                    </div>
                  </form>
                  <p className="mb-2">
                    Already have an account? <NavLink to="/login">Login</NavLink>
                  </p>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </div>  
      </div>
    </React.Fragment>
  );
};

export default SignUp1;
