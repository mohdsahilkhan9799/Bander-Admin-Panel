import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Table, Spinner } from 'react-bootstrap';
import Card from '../../components/Card/MainCard';
import { CreateCoupansData, getCoupans } from "../../Slices/CoupanSlice";
import { useDispatch, useSelector } from "react-redux";

const SamplePage = () => {
  const { getCoupansdata, isLoading } = useSelector((state) => state.Coupans);
  const dispatch = useDispatch();
console.log("getCoupansdata",getCoupansdata)
  const initialState = {
    Coupans_name: "",
    discount: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(CreateCoupansData(formData));
    dispatch(getCoupans());
    setFormData(initialState);
  };

  useEffect(() => {
    dispatch(getCoupans());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title="Create coupons" isOption>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="CoupansName">
              
              </Form.Group>
              <Form.Group controlId="brandName">
                <Form.Label>Brand Name</Form.Label>
                <Form.Control
                  type="text"
                  name="Coupans_name"
                  className="form-control"
                  placeholder="Enter Coupons name"
                  value={formData.Coupans_name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="brandName">
                <Form.Label>Brand Name</Form.Label>
                <Form.Control
                  type="text"
                  name="discount"
                  className="form-control"
                  placeholder="Enter discount "
                  value={formData.discount}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-4">
                Create coupons
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card title="coupons List">
            {isLoading ? (
              <div className="text-center"><Spinner animation="border" /></div>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Coupans Name</th>
                    <th>Discount %</th>
                  </tr>
                </thead>
                <tbody>
                {Array.isArray(getCoupansdata) && getCoupansdata.length === 0 ? (
    <tr>
        <td colSpan="3" className="text-center">
            No Coupanss created yet
        </td>
    </tr>
) : (
    Array.isArray(getCoupansdata) && getCoupansdata.map((Coupans, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{Coupans.Coupans_name}</td>
            <td>{Coupans.discount}</td>
        </tr>
    ))
)}

                </tbody>
              </Table>
            )}
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default SamplePage;
