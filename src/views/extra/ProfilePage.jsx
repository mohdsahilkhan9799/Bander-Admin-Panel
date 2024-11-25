import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Spinner, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { getRegisterUser } from "../../Slices/AdminSlice"; // Adjust the import based on your structure
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaBuilding, FaIdCard } from 'react-icons/fa';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { GetUserdata, isLoading } = useSelector((state) => state.admin);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [imagePreview, setImagePreview] = useState(null); // For image preview

  useEffect(() => {
    dispatch(getRegisterUser());
  }, [dispatch]);

  useEffect(() => {
    if (GetUserdata) {
      setFormData({
        name: GetUserdata.name || '',
        address: GetUserdata.address || '',
        phone: GetUserdata.phone || ''
      });
      setImagePreview(GetUserdata.profileImage); // Set image preview if available
    }
  }, [GetUserdata]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profileImage: file,
    });
    setImagePreview(URL.createObjectURL(file)); // Create a preview for the image
  };

  return (
    <React.Fragment>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm mb-4">
            <Card.Header>Profile</Card.Header>
            <Card.Body>
              {isLoading ? (
                <Spinner animation="border" />
              ) : (
                <Row>
                  <Col md={8}>
                    <h5>Name: {GetUserdata?.name}</h5>
                    <p><FaEnvelope /> <strong>Email:</strong> {GetUserdata?.email}</p>
                    <p><FaPhone /> <strong>Phone:</strong> {GetUserdata?.phone}</p>
                    <p><FaMapMarkerAlt /> <strong>Address:</strong> {GetUserdata?.address || 'N/A'}</p>
                  </Col>
                  <Col md={4} className="d-flex justify-content-center align-items-center">
                    <img
                      src={GetUserdata?.profile_image || 'placeholder.jpg'}
                      alt={GetUserdata?.name}
                      style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                    />
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Company Information Card */}
      <Row className="justify-content-center mt-4">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Header>Company Information</Card.Header>
            <Card.Body>
              {isLoading ? (
                <Spinner animation="border" />
              ) : (
                <Row>
                  <Col md={6}>
                    <p><FaBuilding /> <strong>Company:</strong> {GetUserdata?.company_name || 'N/A'}</p>
                    <p><FaMapMarkerAlt /> <strong>Company Address:</strong> {GetUserdata?.company_address || 'N/A'}</p>
                    <p><FaIdCard /> <strong>GST Number:</strong> {GetUserdata?.gst_number || 'N/A'}</p>
                  </Col>
                  <Col md={6}>
                    <p><strong>Account Number:</strong> {GetUserdata?.account_number || 'N/A'}</p>
                    <p><strong>Bank Name:</strong> {GetUserdata?.bank_name || 'N/A'}</p>
                    <p><strong>IFSC Code:</strong> {GetUserdata?.ifsc_code || 'N/A'}</p>
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Profile Update Form */}
      <Row className="justify-content-center mt-4">
        <Col md={8}>
          <Card className="p-4 shadow-sm">
            <h4 className="mb-4 text-center">Profile Information</h4>
            {isLoading ? (
              <Spinner animation="border" className="d-block mx-auto" />
            ) : (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your name"
                    className="mb-3"
                  />
                </Form.Group>

                <Form.Group controlId="formAddress">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your address"
                    className="mb-3"
                  />
                </Form.Group>

                <Form.Group controlId="formPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="mb-4"
                  />
                </Form.Group>

                <Form.Group controlId="formProfileImage">
                  <Form.Label>Profile Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="profileImage"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <div className="mt-3">
                      <img
                        src={imagePreview}
                        alt="Profile Preview"
                        style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                      />
                    </div>
                  )}
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                  Update Profile
                </Button>
              </Form>
            )}
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ProfilePage;
