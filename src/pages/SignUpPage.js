import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import NavigationBarHome from '../components/NavigationBarHome';
import { Container, Alert} from 'react-bootstrap';
import { signUpUser, authClearError, setSignedUpBool, setError } from '../store/auth/auth.js'

const SignUpPage = () => {

    const [username, setUsername] = useState("");
    const [password, setpassword] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const errorState = useSelector(state => state.auth.error);
    const isSignedUp = useSelector(state => state.auth.signedUp);
    const loading = useSelector(state => state.auth.loading);
    const validEmailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;



    function handleSubmit(e) {
        e.preventDefault();
        console.log(username, password, email);
        if (username.length === 0) {
            dispatch(setError({ isError: true, message: "Username can't be empty" }))
            return;
        }
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
        dispatch(signUpUser({ username, password, email }));
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
                                <h3 className="text-center mb-4">Sign Up</h3>
                                <form action="#" className="login-form">
                                    <div className="form-group">
                                        <input
                                            type="text" className="form-control rounded-left"
                                            placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}
                                            required />
                                    </div>
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
                                            Sign Up
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
                                        isSignedUp && !loading &&
                                        <div>
                                            <Alert variant='success' onClose={() => { dispatch(setSignedUpBool({ isSignedUp: false })) }} dismissible>
                                                Signed Up Successfully! You may login now.
                                            </Alert>
                                        </div>
                                    }

                                </form>
                                {
                                        loading && 
                                        <div  style={{display:"flex"}} >
                                        <span class="spinner-border mx-auto" role="status" aria-hidden="true"></span>
                                        
                                        </div>
                                }

                            </div>
                        </div>

                    </div>
                </div>
            </Container>
        </React.Fragment>
    );
};

export default SignUpPage;