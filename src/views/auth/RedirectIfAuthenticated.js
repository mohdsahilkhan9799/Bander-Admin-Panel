import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectIfAuthenticated = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      // navigate("/app/dashboard/default");
    }
  }, [token, navigate]);

  return null; 
};

export default RedirectIfAuthenticated;
