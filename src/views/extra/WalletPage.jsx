import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { getRegisterUser } from "../../Slices/AdminSlice"; // Adjust the import based on your structure

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { GetUserdata } = useSelector((state) => state.admin);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profileImage: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
  });

  const [imagePreview, setImagePreview] = useState(null); // For image preview
  const [amount, setAmount] = useState(''); // For vendor money handling

  useEffect(() => {
    dispatch(getRegisterUser());
  }, [dispatch]);

  useEffect(() => {
    if (GetUserdata) {
      setFormData({
        name: GetUserdata.name || '',
        email: GetUserdata.email || '',
        phone: GetUserdata.phone || '',
        address: GetUserdata.address || '',
        profileImage: GetUserdata.profileImage || '',
        bankName: '',
        accountNumber: '',
        ifscCode: '',
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

  const handleMoneyChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSendMoney = () => {
    console.log("Send Money:", amount);
    console.log("Bank Details:", formData.bankName, formData.accountNumber, formData.ifscCode);
    // Add logic to process sending money
  };

  return (
    <React.Fragment>
      <Row className="justify-content-center mt-4">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Header className="text-center">Vendor Transactions</Card.Header>
            <Card.Body>
              <Row>
                {/* Left Section - Receive Money */}
                <Col md={6}>
                  <Card className="text-center shadow-sm mb-3">
                    <Card.Body>
                      <h4>Receive Money</h4>
                      <h1 className="display-4 text-success " style={{ fontFamily: "lato" }}>
                        5000
                      </h1>


                      <Button variant="success" className="mt-3" disabled>
                        Receive Money
                      </Button>
                      {imagePreview && (
                        <div className="mt-4">
                          <img
                            src={imagePreview}
                            alt="Profile"
                            width={100}
                            className="img-thumbnail"
                          />
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>

                {/* Right Section - Send Money with Bank Details */}
                <Col md={6}>
                  <Card className="shadow-sm">
                    <Card.Body>
                      <h4>Send Money</h4>

                      {/* Bank Name Field */}
                      <Form.Group controlId="formBankName" className="mb-3">
                        <Form.Label>Bank Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="bankName"
                          value={formData.bankName}
                          onChange={handleInputChange}
                          placeholder="Enter bank name"
                        />
                      </Form.Group>

                      {/* Account Number Field */}
                      <Form.Group controlId="formAccountNumber" className="mb-3">
                        <Form.Label>Account Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="accountNumber"
                          value={formData.accountNumber}
                          onChange={handleInputChange}
                          placeholder="Enter account number"
                        />
                      </Form.Group>

                      {/* IFSC Code Field */}
                      <Form.Group controlId="formIfscCode" className="mb-3">
                        <Form.Label>IFSC Code</Form.Label>
                        <Form.Control
                          type="text"
                          name="ifscCode"
                          value={formData.ifscCode}
                          onChange={handleInputChange}
                          placeholder="Enter IFSC code"
                        />
                      </Form.Group>

                      {/* Amount Field */}
                      <Form.Group controlId="formAmount" className="mb-3">
                        <Form.Label>Enter Amount</Form.Label>
                        <Form.Control
                          type="number"
                          name="amount"
                          value={amount}
                          onChange={handleMoneyChange}
                          placeholder="Enter amount"
                        />
                      </Form.Group>

                      <div className="d-grid gap-2">
                        <Button
                          variant="danger"
                          onClick={handleSendMoney}
                          disabled={!amount || !formData.accountNumber || !formData.ifscCode} // Disable button if fields are empty
                        >
                          Send Money
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ProfilePage;
