import React, { useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import logo from '../static/logo.png';
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../store/auth/auth.js';





export default function NavigationBarAuth(props) {
  const dispatch = useDispatch();
  const username = useSelector(state => state.auth.user.username);
  const isloading = useSelector(state => state.auth.loading);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const [width, setDimensions] = useState(window.innerWidth);

  function handleLogout(e) {
    e.preventDefault()
    dispatch(logOutUser());
  }

  useEffect(() => {
    function handleResize() {
      setDimensions(
        window.innerWidth
      )
    }
    window.addEventListener('resize', handleResize)
  })



  return (

    <React.Fragment>

      {
        width > 1000 &&
        <div class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-end fixed-top">

          <div class="navbar-brand mr-auto" >
            <img src={logo} width="200" height="40" class="d-inline-block align-top" alt="Logo" />
            <button class="btn btn-outline-info btn-sm ml-4" onClick={props.toggleQueryBar}>Toggle Side Menu</button>
          </div>
          <ul class="navbar-nav  ml-auto">
            <li class="nav-item mt-2 mb-0">
              <h5><div class="badge badge-light p-2 " >Hi {username}!</div></h5>
            </li>
            <li class="nav-item ml-2">
              {
                !isloading &&
                <button type="button" class="btn btn-danger mt-1" onClick={handleLogout}>Logout</button>
              }
              {
                isloading &&
                <div style={{ display: "flex" }} >
                  <span class="spinner-border text-primary mx-auto" role="status" aria-hidden="true"></span>
                </div>
              }
              {
                !isLoggedIn && !isloading &&
                <Redirect to={{
                  pathname: "/",
                }} />
              }
            </li>

          </ul>
        </div>
      }
      {
        width < 1000 &&
        <div class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-end fixed-top">

          <div class="navbar-brand mr-auto" >
            <img src={logo} width="200" height="40" class="d-inline-block align-top" alt="Logo" />
          </div>
          <ul class="navbar-nav  ml-auto">
            <li>
              <NavDropdown title="Menu">
                <NavDropdown.Item >
                  <div class="text-center" >Hi {username}!</div>
                </NavDropdown.Item>
                <NavDropdown.Item >
                  <button class="btn btn-outline-info btn-block" onClick={props.toggleQueryBar}>Toggle Side Menu</button>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item >
                  {
                    !isloading &&
                    <button type="button" class="btn btn-danger mt-1 btn-block" onClick={handleLogout}>Logout</button>
                  }
                  {
                    isloading &&
                    <div style={{ display: "flex" }} >
                      <span class="spinner-border text-primary mx-auto" role="status" aria-hidden="true"></span>
                    </div>
                  }
                  {
                    !isLoggedIn && !isloading &&
                    <Redirect to={{
                      pathname: "/",
                    }} />
                  }
                </NavDropdown.Item >
              </NavDropdown>
            </li>
          </ul>
        </div>
      }

    </React.Fragment>

  );
};
