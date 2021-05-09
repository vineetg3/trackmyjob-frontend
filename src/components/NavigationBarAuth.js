import React from 'react';
import { Badge } from 'react-bootstrap';
import logo from '../static/logo.png';
//import {browserHistory,Router} from 'react-router';
import { Link,Redirect} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../store/auth/auth.js';






export default function NavigationBarAuth(props) {
  const dispatch = useDispatch();
  const username = useSelector(state => state.auth.user.username);
  const isloading = useSelector(state => state.auth.loading);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  function handleLogout(e) {
    e.preventDefault()
    dispatch(logOutUser());
  }


  return (

    <React.Fragment>
      <div class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-end fixed-top">
        <div class="navbar-brand mr-auto" >
          <img src={logo} width="200" height="40" class="d-inline-block align-top" alt="Logo" />
          <button class="btn btn-outline-info btn-sm" onClick={props.toggleQueryBar}>Toggle Menu</button>
        </div>
        <div >
          <ul class="navbar-nav  ml-auto">
            <li class="nav-item">
              <h5><div class="badge badge-light p-2 mt-1 " >Hi {username}!</div></h5>
            </li>
            <li>
              {
                !isloading &&
                  <button type="button" class="btn btn-danger ml-3" onClick={handleLogout}>Logout</button>
              }
              {
                isloading &&
                <div  style={{display:"flex"}} >
                <span class="spinner-border text-primary mx-auto" role="status" aria-hidden="true"></span>
                </div>
              }
              {
                !isLoggedIn && !isloading &&
                <Redirect  to={{
                  pathname: "/",
                }}/>
              }
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>

  );
};

