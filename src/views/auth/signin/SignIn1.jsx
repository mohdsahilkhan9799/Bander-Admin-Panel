import React, { useState } from 'react';
import { Card, Button, Alert, Row, Col } from 'react-bootstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom'; // import useNavigate here
import { useDispatch } from 'react-redux'; // import useDispatch here

import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { LoginPost } from '../../../Slices/AdminSlice.js'; // Assuming you have an action for login
import AuthLogin from './JWTLogin';
import { toast } from 'react-toastify'; // Import toast for notifications

const Signin1 = () => {
  const dispatch = useDispatch(); // Call useDispatch inside the component
  const navigate = useNavigate(); // Call useNavigate inside the component

  const initialState = {
    email: "",
    password: ""
  };

  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginPost(formData))
      .then((result) => {
        if (result.payload.success) {
          toast.success("Login successful!");
          setTimeout(() => {
            navigate("/adminpanel/dashboard");
          }, 1000);
        } else {
          toast.error("Login failed: " + result.payload.message);
        }
      })
      .catch((error) => {
        toast.error("An error occurred: " + error.message);
      });
  };

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
                 <div className="mb-4">
                   <i className="feather icon-user-plus auth-icon" />
                 </div>
                 <h3 className="mb-4">Log In</h3>
                 <form onSubmit={handleSubmit}>

                   <div className="input-group mb-3">
                     <input
                       type="email"
                       name="email"
                       className="form-control"
                       placeholder="Email address"
                       value={formData.email}
                       onChange={handleInputChange}
                     />
                   </div>
                   <div className="input-group mb-4">
                     <input
                       type="password"
                       name="password"
                       className="form-control"
                       placeholder="Password"
                       value={formData.password}
                       onChange={handleInputChange}
                     />
                   </div>

                   <button className="btn btn-primary mb-4" type="submit">Sign In</button>
                 </form>
                  <p className="mb-0 text-muted">
                 Don’t have an account?{' '} 
               <NavLink to="/auth/signup-1" className="f-w-400">
                  Signup
               </NavLink>
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

export default Signin1;
