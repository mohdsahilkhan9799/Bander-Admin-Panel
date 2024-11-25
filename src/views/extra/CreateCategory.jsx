import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Table, Spinner } from 'react-bootstrap';
import Card from '../../components/Card/MainCard';
import { CreatecategoryData, getCategory } from "../../Slices/CreateCategorySlice.js";
import { useDispatch, useSelector } from "react-redux";

const SamplePage = () => {
  const { getCategorydata, isLoading } = useSelector((state) => state.Category);
  const dispatch = useDispatch();

  const initialState = {
    name: ""
  };

  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(CreatecategoryData(formData));

    dispatch(getCategory());

    setFormData(initialState);
  };

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title="Create Category" isOption>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="productName">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-4">
                Create Category
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card title="Category List">
          {isLoading ? (
              <div className="text-center"><Spinner animation="border" /></div>
            ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Category</th>
                </tr>
              </thead>
              <tbody>
                {getCategorydata?.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="text-center">
                      No products created yet
                    </td>
                  </tr>
                ) : (
                  getCategorydata?.map((product, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{product.name}</td>
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
