import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ConfigContext } from '../../../../contexts/ConfigContext';
import * as actionType from '../../../../store/actions';
import { getRegisterUser } from "../../../../Slices/AdminSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const NavLogo = () => {
  const dispatch1 = useDispatch();
  const { GetUserdata, loading } = useSelector((state) => state.admin);
  console.log("GetUserdata",GetUserdata)
  // Loading state to ensure data is fetched
  const configContext = useContext(ConfigContext);
  const { collapseMenu } = configContext.state;
  const { dispatch } = configContext;
  

  // Manage toggle class for mobile menu
  let toggleClass = ['mobile-menu'];
  if (collapseMenu) {
    toggleClass = [...toggleClass, 'on'];
  }

  useEffect(() => {
    // Fetch user data when the component mounts
    dispatch1(getRegisterUser());
  }, [dispatch1]);

  return (
    <React.Fragment>
      <div className="navbar-brand header-logo">
        <p className="b-brand mt-4">
          <div className="">
            {/* Check if data is loading or available */}
            {loading ? (
              <span>Loading...</span>
            ) : (
              <img 
                src={GetUserdata?.profile_image} 
                className="img-radius" 
                alt="User Profile" 
                width={50} 
              />
            )}
          </div>
          {/* Render role if data is available */}
          <span className="b-title">
            {GetUserdata?.name ? GetUserdata.name.toUpperCase() : 'No Role'}
          </span>
        </p>
        <Link 
          to="#" 
          className={toggleClass.join(' ')} 
          id="mobile-collapse" 
          onClick={() => dispatch({ type: actionType.COLLAPSE_MENU })}
        >
          <span />
        </Link>
      </div>
    </React.Fragment>
  );
};

export default NavLogo;
