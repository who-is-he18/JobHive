// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployerLandingPage from './pages/EmployerLandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployerLandingPage />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
