import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import StyleGuide from './components/StyleGuide';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/styleguide" element={<StyleGuide />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
