import React from 'react';
import logo from '../static/logo.png';
import { Link } from "react-router-dom";



export default function NavigationBarHome() {


  return (
    <div class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-end">
      <div class="navbar-brand mr-auto" >
        <Link to={{ pathname: "/" }}>
          <img src={logo} width="200" height="40" class="d-inline-block align-top" alt="Logo" />
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
  );
};
