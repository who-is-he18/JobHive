// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployerLandingPage from './pages/EmployerLandingPage';
import PaymentPage from './pages/PaymentPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/ELandingPage" element={<EmployerLandingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
