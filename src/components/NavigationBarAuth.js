import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import logo from '../static/logo.png';
//import {browserHistory,Router} from 'react-router';
import { Link } from "react-router-dom";



export default function NavigationBarAuth({page}) {
  const toggleActiveLinkNavItem = page === "jobs" ;



  return (

    <React.Fragment>
      <div class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-end fixed-top">
          <div class="navbar-brand mr-auto" >
            <img src={logo} width="200" height="40" class="d-inline-block align-top" alt="Logo" />
          </div>
          <div >
            <ul class="navbar-nav  ml-auto">
              {/* <li class="nav-item">
              <Link to={{ pathname: "/auth/internships" }}>
                {toggleActiveLinkNavItem 
                ?  <div class="nav-link active" >Jobs</div> 
                : <div class="nav-link" >Jobs</div>}
                
                </Link>
              </li> */}
              <li class="nav-item">
              <Link to={{ pathname: "/auth/dashboard" }}>
              {toggleActiveLinkNavItem 
                ?  <div class="nav-link " >Dashboard</div> 
                : <div class="nav-link active" >Dashboard</div>}
                </Link>
              </li>
              <li>
              <Link to={{ pathname: "/" }}>
        <button type="button" class="btn btn-danger ml-3">Logout</button>
        </Link>
        </li>
            </ul>
          </div>
      </div>
    </React.Fragment>

  );
};


/*
<Link to={{ pathname: "/auth/internships" }}>
              <div class="nav-link px-2 text-white">Internships</div>
              </Link>
              <Link to={{ pathname: "/auth/dashboard" }}>
              <div class="nav-link px-2 text-white">My Dashboard</div>
              </Link>
              <Link to={{ pathname: "/" }}>
                <button type="button" class="btn btn-info ml-3">Logout</button>
              </Link>
              */