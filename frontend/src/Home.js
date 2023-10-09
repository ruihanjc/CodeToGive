import React from 'react';
import { Link } from 'react-router-dom'; 
import './Home.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="grey-header">MakaStory</h1>
        <Link to="/select-input">
          <button className="home-button">Start Adventure</button>
        </Link>
      </header>
    </div>
  );
}

export default Home;