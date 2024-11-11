// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobseekerProfile from './components/JobseekerProfile';
import ViewJobseekerProfile from './components/ViewJobseekerProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/jobseeker-profile" element={<JobseekerProfile />} />
        <Route path="/view-jobseeker-profile" element={<ViewJobseekerProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
