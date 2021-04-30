import React from 'react';
import NavigationBarHome from '../components/NavigationBarHome';

const HomePage = () => {
    let lst=[];

  for(let i=0;i<40;i++){
    lst.push(<h1>in app</h1>);
  }
    return (
        <div>
            <NavigationBarHome />
            
            Login
            {lst}
        </div>
    );
};

export default HomePage;