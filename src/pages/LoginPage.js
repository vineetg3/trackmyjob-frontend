/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from 'react';
import { Container} from 'react-bootstrap';
import NavigationBarHome from '../components/NavigationBarHome';

const LoginPage = () =>{
    const [email,setEmail]= useState("");
    const [password,setpassword]= useState("");

    function handleSubmit(e){
        e.stopPropagation();
        console.log(email,password);
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
                                         placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}
                                         required/>
                                    </div>
                                    <div className="form-group d-flex">
                                        <input type="password" className="form-control rounded-left" placeholder="Password" 
                                        value={password} onChange={e=>setpassword(e.target.value)}
                                        required/>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit"
                                         className="form-control btn btn-primary rounded submit px-3"
                                         onClick={handleSubmit}
                                         >
                                            Login
                                        </button>
                                    </div>
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