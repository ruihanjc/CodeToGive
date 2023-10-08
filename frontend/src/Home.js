import React from 'react';
import { Link } from 'react-router-dom'; 
import './Home.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="grey-header">MakaStory</h1>
        <h3 className='sub-header'>Personalised stories for kids</h3>
        <Link to="/select-input">
          <button className="button">Start Adventure</button>
        </Link>
      </header>
    </div>
  );
}

export default Home;
