// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EmployerLandingPage from './pages/EmployerLandingPage';
import PaymentPage from './pages/PaymentPage';

function App() {
  return (
    <Routes>
      <Route path="/ELandingPage" element={<EmployerLandingPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      {/* Add other routes as needed */}
    </Routes>
  );
}

export default App;
