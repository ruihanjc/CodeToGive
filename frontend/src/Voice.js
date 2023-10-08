import React from 'react';
import './Voice.css'; 

function Voice() {
  return (
    <div className="voice-container">
      <h2 className="voice-heading">Tell me a story about ... </h2>
      <label htmlFor="audioInput" className="voice-label">
        <input type="file" id="audioInput" accept="audio/*" capture />
        <span className="microphone-icon">
          {/* You can use a Font Awesome microphone icon here */}
          <i className="fas fa-microphone"></i>
        </span>
        Click to Record or Upload Audio
      </label>
    </div>
  );
}

export default Voice;
