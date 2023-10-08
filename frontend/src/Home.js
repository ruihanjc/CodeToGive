import React from 'react';
import { Link } from 'react-router-dom'; 
import './Home.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <header>

            <div class="logo-wrapper">
                <a class="logo">MAKASTORY</a>
                <a class="subtitle">Generating stories for kids</a>
            </div>
            <ul>
                <div className="centered-buttons">
                <Link to="/voice">
                <li><a href="#">Voice</a></li>
                </Link>
                <Link to="/text">
                <li><a href="#">Text</a></li>
                </Link>
                <Link to="/makaton">
                <li><a href="#">Sign</a></li>
                </Link>
                </div>
            </ul>

          


        </header>
        
        
      </header>
    </div>
  );
}

export default Home;
