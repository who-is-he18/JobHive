import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobseekerProfile from './pages/components/JobseekerProfile/JobseekerProfile.jsx';
import ViewJobseekerProfile from './pages/components/JobseekerProfile/ViewJobseekerProfile.jsx';
import './index.css'; 


function App() {
  return (
      <Routes>
        <Route path="/" element={<JobseekerProfile/>} />
        <Route path="/jobseeker-profile" element={<JobseekerProfile />} />
        <Route path="/view-jobseeker-profile" element={<ViewJobseekerProfile />} />
      </Routes>
  );
}

export default App;
