import React from 'react';
import { Link } from 'react-router-dom'; 
import './SelectInput.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <header>
            <div class="logo-wrapper">
                <a class="logo">MAKASTORY</a>
                <a class="subtitle">Generating stories for kids</a>
            </div>
            <div>
      <h1 className='header'>Select an input</h1>
      <div className="centered-buttons">
        <Link to="/voice">
          <button className="large-button">
            Voice
          </button>
        </Link>
        <Link to="/text">
          <button className="large-button">
            Text
          </button>
        </Link>
        <Link to="/makaton">
        <button className="large-button">
          Makaton
        </button>
        </Link>
       
        
      </div>
    </div>

          


        </header>
        
        
      </header>
    </div>
  );
}

export default Home;
