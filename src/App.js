import React from 'react';
import SignUpPage from './pages/SignUpPage.js';
import { Route} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import { BrowserRouter } from "react-router-dom";
import HomePage from './pages/Homepage.js';
import DashboardPage from './pages/DashboardPage.js';




function App() {

  

  return (
    <React.Fragment>
    <BrowserRouter>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/sign-up" component={SignUpPage} />
            <Route exact path="/dashboard" component={DashboardPage} />

    </BrowserRouter>
    </React.Fragment>
    
 );
}

export default App;
