import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './SelectInput.css';

function SelectInput() {
  return (
    <div>
      <h1 className='header'>Select an input</h1>
      <div className="centered-buttons">
        <Link to="/voice">
        <button className="large-button">Voice</button>
        </Link>
        <Link to="/text">
          <button className="large-button">Text</button>
        </Link>
        <button className="large-button">Makaton</button>
      </div>
    </div>
  );
}

export default SelectInput;
