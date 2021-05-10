import React from 'react';
import NavigationBarHome from '../components/NavigationBarHome';
import './homepage.css'
const HomePage = () => {

  return (
    <div>
      <NavigationBarHome />

      <body class="text-center middle">

        <div class="cover-container d-flex h-200 p-2 mx-auto mt-5 flex-column">
            <h1 class="cover-heading">Track Your Job</h1>
            <div class="lead ">
              TrackMyJob allows you to keep track of all those hundreds of job applications you applied.
              Each application has fields like job title, company, status of application, and many more so that all data is at one place.
              You can edit, filter and sort!
              </div>
            <div class="mb-2">
              Startup by signing up and logging in.
              Job on!
            </div>
             
              <div class="bottom text-center">
                <p >Created by <a href="https://www.linkedin.com/in/vineetgandham/">Vineet</a>.</p>
                <p> <a href="https://github.com/vineetg3/trackmyjob-frontend">Repo is hosted at github.</a></p>
                <p>Reach me out at vineet.gandham@gmail.com :)</p>
              </div>
        </div> 
      </body>
    </div>
  );
};

export default HomePage;