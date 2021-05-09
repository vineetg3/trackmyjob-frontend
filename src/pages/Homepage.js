import React from 'react';
import NavigationBarHome from '../components/NavigationBarHome';
import './homepage.css'
const HomePage = () => {

  return (
    <div>
      <NavigationBarHome />

      <body class="text-center middle">

        <div class="cover-container d-flex h-200 p-3 mx-auto mt-5 flex-column">
          <main role="main" class="inner cover">
            <h1 class="cover-heading">Track Your Job</h1>
            <p class="lead ">
            TrackMyJob allows you to keep track of all those hundreds of job applications you applied.
                Each application has fields like job title, company, status of application, and many more so that all data is at one place.
                You can edit, filter and sort!
                
              </p>
              <p>
              Startup by signing up and logging in.
                Job on!
              </p>
            <p class="lead">
            </p>
          </main>
          <footer class="mastfoot mt-auto">
            <div class="inner">
              <p class="bottom">Created by <a href="https://www.linkedin.com/in/vineetgandham/">Vineet</a>. <a href="https://github.com/vineetg3/trackmyjob-frontend">Repo is hosted at github.</a>Reach me out at vineet.gandham@gmail.com :)</p>
            </div>
          </footer>
        </div>
      </body>
    </div>
  );
};

export default HomePage;