/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import NavigationBarHome from '../components/NavigationBarHome';
import { useDispatch, useSelector } from 'react-redux';
import { authClearError, setError, loginUser } from '../store/auth/auth.js';
import { Redirect } from "react-router-dom";



const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const dispatch = useDispatch();
    const errorState = useSelector(state => state.auth.error);
    const loading = useSelector(state => state.auth.loading);
    const isAuthenticated = useSelector(state => state.auth.isLoggedIn);
    const validEmailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;




    //clear errors state affected in other pages
    useEffect(() => {
        dispatch(authClearError());
        localStorage.removeItem('accessTokenTrackMyJob')
    }, []);



    function handleSubmit(e) {
        e.preventDefault();
        if (email.length === 0) {
            dispatch(setError({ isError: true, message: "Email can't be empty" }))
            return;
        }
        if (!validEmailRegex.test(email)) {
            dispatch(setError({ isError: true, message: "Invalid Email Address" }))
            return;
        }
        if (password.length === 0) {
            dispatch(setError({ isError: true, message: "Password can't be empty" }))
            return;
        }
        dispatch(loginUser({ email, password }));
    }

    return (
        <React.Fragment>
            <NavigationBarHome />

            <Container fluid>

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-7 col-lg-5">
                            <div className="login-wrap p-4 p-md-5">
                                <div className="icon d-flex align-items-center justify-content-center">
                                    <span className="fa fa-user-o"></span>
                                </div>
                                <h3 className="text-center mb-4">Sign In</h3>
                                <form action="#" className="login-form">
                                    <div className="form-group">
                                        <input
                                            type="email" className="form-control rounded-left"
                                            placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
                                            required />
                                    </div>
                                    <div className="form-group d-flex">
                                        <input type="password" className="form-control rounded-left" placeholder="Password"
                                            value={password} onChange={e => setpassword(e.target.value)}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit"
                                            className="form-control btn btn-primary rounded submit px-3"
                                            onClick={handleSubmit}
                                        >
                                            Login
                                        </button>
                                    </div>
                                    {errorState.isError && !loading &&
                                        <div>
                                            <Alert variant='danger' onClose={() => { dispatch(authClearError()) }} dismissible>
                                                Error: {errorState.statusCode} {errorState.message}
                                            </Alert>
                                        </div>
                                    }
                                    {
                                        loading &&
                                        <div style={{ display: "flex" }} >
                                            <span class="spinner-border mx-auto" role="status" aria-hidden="true"></span>
                                        </div>
                                    }
                                    {
                                        isAuthenticated && !loading &&
                                        <Redirect to={{
                                            pathname: "/dashboard",
                                        }} />
                                    }

                                </form>
                            </div>
                        </div>

                    </div>
                </div>

            </Container>
        </React.Fragment>

    );
};

export default LoginPage;