// import React from 'react';
// import { Link } from 'react-router-dom'; 
// import './Home.css';

// function Home() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1 className="grey-header">MakaStory</h1>
//         <Link to="/select-input">
//           <button className="home-button">Start Adventure</button>
//         </Link>
//       </header>
//     </div>
//   );
// }

// export default Home;



import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './html/style.css';
import Home from './Home';
import SelectInput from './SelectInput';
import Text from './Text';
import Voice from './Voice'; 
import Makaton from './Makaton'; 


import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    const handleScroll = () => {
      const stars = document.getElementById('./html/stars');
      const moon = document.getElementById('./html/moon');
      const mountainsBehind = document.getElementById('./html/mountains_behind');
      const text = document.getElementById('./html/text');
      const btn = document.getElementById('./html/btn');
      const mountainsFront = document.getElementById('./html/mountains_front');
      const header = document.querySelector('header');

      const value = window.scrollY;
      stars.style.left = value * 0.25 + 'px';
      moon.style.top = value * 1.05 + 'px';
      mountainsBehind.style.top = value * 0.5 + 'px';
      mountainsFront.style.top = value * 0 + 'px';
      text.style.marginRight = value * 4 + 'px';
      text.style.marginTop = value * 1.5 + 'px';
      btn.style.marginTop = value * 1.5 + 'px';
      header.style.top = value * 0.5 + 'px';
    };

  }, []);

  return (
    <div>
      <header>
        <div className="logo-wrapper">
          <a href="#" className="logo">
            MAKASTORY
          </a>
          <a href="#" className="subtitle">
            Generating stories for kids
          </a>
        </div>
        <ul>
                <li>
                <Link to="/voice">
                <a>Voice</a>
                </Link></li>
                <li>
                <Link to="/text">
                <a>Text</a>
                </Link>
                </li>
                <li>
                <Link to="/makaton">
                <a>Sign</a>
                </Link>
                </li>
        </ul>
      </header>
      <section>
      <img src={require('./html/sun.png')} id="moon" alt="Moon" />
      <img src={require('./html/mountains_front.png')} id="mountains_front" alt="Mountains Front" />
    </section>
    </div>
  );
}

export default App;