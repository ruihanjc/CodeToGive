import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import SelectInput from './SelectInput';
import Text from './Text';
import Voice from './Voice'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select-input" element={<SelectInput />} />
        <Route path="/text" element={<Text />} />
        <Route path="/voice" element={<Voice />} />
      </Routes>
    </Router>
  );
}


export default App;
