import React, { useEffect, useState } from 'react';
import logo from '../static/logo.png';
import { Link } from "react-router-dom";
import { NavDropdown } from 'react-bootstrap';




export default function NavigationBarHome() {
  const [width, setDimensions] = useState(window.innerWidth);


  useEffect(() => {
    function handleResize() {
      setDimensions(
        window.innerWidth
      )
    }
    window.addEventListener('resize', handleResize)
  });


  return (
    <React.Fragment>
      {
        width >= 1000 &&
        <div class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-end">
          <div class="navbar-brand mr-auto" >
            <Link to={{ pathname: "/" }}>
              <img src={logo} width="180" height="40" class="d-inline-block align-top" alt="Logo" />
            </Link>
          </div>
          <div >
            <ul class="navbar-nav  ml-auto">
              <li class="nav-item">
                <Link to={{ pathname: "/login" }}>
                  <button type="button" class="btn btn-outline-light me-2 ">Login</button>
                </Link>
              </li>
              <li>
                <Link to={{ pathname: "/sign-up" }}>
                  <button type="button" class="btn btn-info ml-3">Sign-up</button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      }
      {
        width < 1000 &&
        <div class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-end">
          <div class="navbar-brand mr-auto" >
            <Link to={{ pathname: "/" }}>
              <img src={logo} width="170" height="35" class="d-inline-block align-top" alt="Logo" />
            </Link>
          </div>
          <ul class="navbar-nav  ml-auto">
            <li class="nav-item">
              <NavDropdown title="Login/Signup">
                <NavDropdown.Item>
                  <Link to={{ pathname: "/login" }}>
                    <button type="button" class="btn btn-info btn-block ">Login</button>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to={{ pathname: "/sign-up" }}>
                    <button type="button" class="btn btn-info btn-block">Sign-up</button>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </li>
          </ul>
        </div>
      }

    </React.Fragment>
  );
};
