import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Table, Spinner, Modal, Alert } from 'react-bootstrap';
import Card from '../../components/Card/MainCard';
import { CreateProductData, getVendorProduct } from "../../Slices/VenderProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../Slices/CreateProductSlice.js";
import { getCategory } from "../../Slices/CreateCategorySlice.js";
import { getCoupans } from "../../Slices/CoupanSlice";

const SamplePage = () => {
  const { getVendorProductdata, isLoading } = useSelector((state) => state.Vendor);
  const { getProductdata } = useSelector((state) => state.Product);
  const { getCategorydata } = useSelector((state) => state.Category);

  const { getCoupansdata } = useSelector((state) => state.Coupans);


  const dispatch = useDispatch();

  const initialState = {
    product_name: "",
    product_price: "",
    discount_price: "",
    product_quantity: "",
    categoryId: "",
    brandId: "",
    couponsId: "",
    product_image: null,
  };

  const [formData, setFormData] = useState(initialState);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      product_image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productFormData = new FormData();
    Object.keys(formData).forEach(key => {
      productFormData.append(key, formData[key]);
    });

    setLoading(true);
    try {
      await dispatch(CreateProductData(productFormData));
      dispatch(getVendorProduct());
      setFormData(initialState);
      setShowModal(false);
      setErrorMessage(""); // Clear error message on success
    } catch (error) {
      setErrorMessage("Failed to create product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  useEffect(() => {
    dispatch(getVendorProduct());
    dispatch(getProduct());
    dispatch(getCategory());
    dispatch(getCoupans());
  }, [dispatch]);

  return (
    <React.Fragment>
      {/* Modal for Create Product */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="product_name"
                className="form-control"
                placeholder="Enter product name"
                value={formData?.product_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="productPrice">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="number"
                name="product_price"
                className="form-control"
                placeholder="Enter product price"
                value={formData?.product_price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="discountPrice">
              <Form.Label>Discount Price</Form.Label>
              <Form.Control
                type="number"
                name="discount_price"
                className="form-control"
                placeholder="Enter discount price"
                value={formData?.discount_price}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="product_quantity">
              <Form.Label>product quantity</Form.Label>
              <Form.Control
                type="number"
                name="product_quantity"
                className="form-control"
                placeholder="Enter discount price"
                value={formData?.product_quantity}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="categoryId">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="categoryId"
                className="form-control"
                value={formData?.categoryId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                {getCategorydata?.map((category) => (
                  <option key={category.id} value={category._id}>
                    {category?.name}
                    <img src={category.product_image} alt="" srcset="" />
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="brandId">
              <Form.Label>Brand ID</Form.Label>
              <Form.Control
                as="select"
                name="brandId"
                className="form-control"
                value={formData?.brandId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Brand</option>
                {getProductdata?.map((brand) => (
                  <option key={brand.id} value={brand._id}>
                    {brand?.Brand_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="couponsId">
              <Form.Label>Coupons ID</Form.Label>
              <Form.Control
                as="select"
                name="couponsId"
                className="form-control"
                value={formData?.couponsId}
                onChange={handleInputChange}
              >
                <option value="">Select Coupon</option>
                {getCoupansdata?.map((Coupans) => (
                  <option key={Coupans.id} value={Coupans._id}>
                    {Coupans?.Coupans_name} (discount {Coupans?.discount}% )
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="productImage">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                name="product_image"
                className="form-control"
                onChange={handleImageChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-4" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Submit Product"}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Row className="mt-4">
        <Col>
          <Button variant="primary" onClick={handleShowModal}>
            Create Product
          </Button>
          <Card title="Products List">
            {isLoading ? (
              <div className="text-center">
                <Spinner animation="border" />
              </div>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Discount Price</th>
                    <th>Quantity</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Coupons</th>
                    <th>Image</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(getVendorProductdata) && getVendorProductdata.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No products created yet
                      </td>
                    </tr>
                  ) : (
                    getVendorProductdata?.length > 0 && (
                      <tr key={getVendorProductdata?.length - 1}>
                        <td>{getVendorProductdata.length}</td>
                        <td>{getVendorProductdata[getVendorProductdata.length - 1].product_name}</td>
                        <td>{getVendorProductdata[getVendorProductdata.length - 1].product_price}</td>
                        <td>{getVendorProductdata[getVendorProductdata.length - 1].discount_price}</td>
                        <td>{getVendorProductdata[getVendorProductdata.length - 1].product_quantity}</td>
                        <td>{getVendorProductdata[getVendorProductdata.length - 1].categoryId.name}</td>
                        <td>{getVendorProductdata[getVendorProductdata.length - 1].brandId?.Brand_name}</td>
                        <td>{getVendorProductdata[getVendorProductdata.length - 1].couponsId.Coupans_name}</td>
                        <td><img src={getVendorProductdata[getVendorProductdata.length - 1].product_image} alt="" width={50} /></td>
                      </tr>
                    )
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
