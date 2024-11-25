import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Table, Spinner } from 'react-bootstrap';
import Card from '../../components/Card/MainCard';
import { CreateProductData, getProduct } from "../../Slices/CreateProductSlice.js";
import { useDispatch, useSelector } from "react-redux";

const SamplePage = () => {
  const { getProductdata, isLoading } = useSelector((state) => state.Product);
  const dispatch = useDispatch();
console.log("getProductdata",getProductdata)
  const initialState = {
    Brand_name: "",
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

    await dispatch(CreateProductData(formData));
    dispatch(getProduct());
    setFormData(initialState);
  };

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title="Create Brands" isOption>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="productName">
              
              </Form.Group>
              <Form.Group controlId="brandName">
                <Form.Label>Brand Name</Form.Label>
                <Form.Control
                  type="text"
                  name="Brand_name"
                  className="form-control"
                  placeholder="Enter brand name"
                  value={formData.Brand_name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-4">
                Create Brands
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card title="Brands List">
            {isLoading ? (
              <div className="text-center"><Spinner animation="border" /></div>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Brand Name</th>
                  </tr>
                </thead>
                <tbody>
                {Array.isArray(getProductdata) && getProductdata.length === 0 ? (
    <tr>
        <td colSpan="3" className="text-center">
            No products created yet
        </td>
    </tr>
) : (
    Array.isArray(getProductdata) && getProductdata.map((product, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{product.Brand_name}</td>
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
