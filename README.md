# TrackMyJob - frontend

This web application allows users to track the status of thier jobs with an intutive web interface. All their data is stored and queried at the backend.
TrackMyJob(frontend) is built with React,Bootstrap,JS, and Redux.

Check out the live version : [trackmyjob](https://trackmyjob.herokuapp.com/)

The backend for this project is at the following link: [Click me!](https://github.com/vineetg3/trackmyjob-backend)

## Project Status
This project is currently in development. 
Users can do CRUD operations with information they provide such as Job title, company, status of the job(applied, interviews, archived, etc..), date of application, etc. However, users need to sign up and login so that thier information is stored for future use.


## Screenshots

![Login Page](/images/loginpage.png)

![Sign Up Page](/images/signUpPage.png)

![Dashboard Page](/images/dashboardpage.png)

## Installation and Setup

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Run Test Suite:  

`npm test`  

To Start Server:

`npm start`  

To Visit App:

`localhost:3000/`  

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

Note : This project uses config.json file for its configuration settings such as Server URL, etc.
While cloning this repository , do not forget to create one and add your local settings.
Currently the file has:
1. SERVER_BASE_URL


