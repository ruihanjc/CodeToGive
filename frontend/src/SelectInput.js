import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './SelectInput.css';

function SelectInput() {
  return (
    <div>
      <h1 className='header'>Select an input</h1>
      <div className="centered-buttons">
        <Link to="/voice">
          <button className="large-button">
            <img
              src={require('./Voice1.png')} // Image path for Voice button
              alt="Voice Icon"
              className="button-icon"
            />
            Voice
          </button>
        </Link>
        <Link to="/text">
          <button className="large-button">
            <img
              src={require('./Text1.png')} // Image path for Text button
              alt="Text Icon"
              className="button-icon"
            />
            Text
          </button>
        </Link>
        <button className="large-button">
          <img
            src={require('./Makaton1.png')} // Image path for Makaton button
            alt="Makaton Icon"
            className="button-icon"
          />
          Makaton
        </button>
      </div>
    </div>
  );
}

export default SelectInput;

