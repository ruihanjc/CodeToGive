import React, { useState } from 'react';
import "./Text.css";

function Text() {
  const [text, setText] = useState('');

  const handleTextChange = (event) => {
    // Update the 'text' state with the input value
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the entered text, e.g., send it to an API or process it.
    console.log('Entered Text:', text);
  };

  return (
    <div className="text-container">
      <h2>Tell me a story about ...</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="textInput">Enter Text:</label>
        <input
          type="text"
          id="textInput"
          value={text}
          onChange={handleTextChange}
          placeholder="Enter your text here"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Text;
