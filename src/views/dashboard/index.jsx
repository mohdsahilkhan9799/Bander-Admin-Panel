import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from "../../Slices/CreateProductSlice.js";
import { getCategory } from "../../Slices/CreateCategorySlice.js";
import { getCoupans } from "../../Slices/CoupanSlice";
import 'bootstrap/dist/css/bootstrap.min.css';

const DashDefault = () => {
  const dispatch = useDispatch();
  const { getCategorydata, loading: loadingCategories } = useSelector((state) => state.Category);
  const { getProductdata, loading: loadingProducts } = useSelector((state) => state.Product);
  const { getCoupansdata, loading: loadingCoupans } = useSelector((state) => state.Coupans);

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getCategory());
    dispatch(getCoupans());
  }, [dispatch]);

  // Loading state
  if (loadingProducts || loadingCategories || loadingCoupans) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  // Data for Pie Chart and Bar Graph
  const totalProducts = getProductdata?.length || 0;
  const totalCategories = getCategorydata?.length || 0;
  const totalCoupons = getCoupansdata?.length || 0;

  // Calculate the percentage for each slice (products, categories, coupons)
  const totalItems = totalProducts + totalCategories + totalCoupons;
  const productPercentage = (totalProducts / totalItems) * 100;
  const categoryPercentage = (totalCategories / totalItems) * 100;
  const couponPercentage = (totalCoupons / totalItems) * 100;

  return (
    <React.Fragment>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title" >Total Brands</h5>
                <h2 style={{color:"#FF6384"}}>{totalProducts}</h2>
                <p className="text-muted">Number of Brands available</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Total Categories</h5>
                <h2 style={{color:"#36A2EB"}}>{totalCategories}</h2>
                <p className="text-muted">Number of product categories</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Coupons</h5>
                <h2 style={{color:"#FFCE56"}}>{totalCoupons}</h2>
                <p className="text-muted">Number of Coupons</p>
              </div>
            </div>
          </div>
        </div>

           {/* Bar Graph */}
           <div className="row mt-5">
          <div className="col-md-12">
            <h5 className="text-center">Overview of Data</h5>
            <div className="bar-graph">
              <div className="bar-item">
                <span>Brands</span>
                <div className="bar" style={{ width: `${(totalProducts / totalItems) * 100}%`, backgroundColor: '#FF6384' }}>
                  {totalProducts}
                </div>
              </div>
              <div className="bar-item">
                <span>Categories</span>
                <div className="bar" style={{ width: `${(totalCategories / totalItems) * 100}%`, backgroundColor: '#36A2EB' }}>
                  {totalCategories}
                </div>
              </div>
              <div className="bar-item">
                <span>Coupons</span>
                <div className="bar" style={{ width: `${(totalCoupons / totalItems) * 100}%`, backgroundColor: '#FFCE56' }}>
                  {totalCoupons}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bootstrap Pie Chart Simulation */}
        <div className="row mt-4">
          <div className="col-md-12 text-center">
            <div className="d-inline-block position-relative" style={{ width: '200px', height: '200px', borderRadius: '50%', background: 'conic-gradient(#FF6384 0% ' + productPercentage + '%, #36A2EB ' + productPercentage + '% ' + (productPercentage + categoryPercentage) + '%, #FFCE56 ' + (productPercentage + categoryPercentage) + '% 100%)' }}>
              <div className="position-absolute top-50 start-50 translate-middle" style={{ width: '100px', height: '100px', backgroundColor: 'white', borderRadius: '50%' }}>
                <span className="d-block mt-4">Total</span>
                <span>{totalItems}</span>
              </div>
            </div>
          </div>
        </div>

     

        {/* Recent Activity */}
        {/* <div className="row mt-4">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Recent Activity</h5>
                <ul>
                  <li>User A added a new product.</li>
                  <li>User B updated a category.</li>
                  <li>User C deleted a product.</li>
                </ul>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {/* CSS for Bar Graph */}
      <style jsx>{`
        .bar-graph {
          margin: 20px 0;
          padding: 0;
        }
        .bar-item {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        .bar-item span {
          width: 100px;
          font-weight: bold;
        }
        .bar {
          height: 30px;
          line-height: 30px;
          color: white;
          text-align: center;
          border-radius: 5px;
          transition: width 0.4s ease;
        }
      `}</style>
    </React.Fragment>
  );
};

export default DashDefault;
