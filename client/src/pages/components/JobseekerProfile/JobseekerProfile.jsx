// src/components/JobseekerProfile/JobseekerProfile.js
import React from 'react';
import ViewJobseekerProfile from './ViewJobseekerProfile.jsx';
import DocumentsSection from './DocumentsSection';
import EditProfileModal from './EditProfileModal';

const JobseekerProfile = () => {
  return (
    <div className="jobseeker-profile">
      <h1>Jobseeker Profile</h1>
      <ViewJobseekerProfile />
      <DocumentsSection />
      <EditProfileModal />
    </div>
  );
};

export default JobseekerProfile;
