// src/components/JobseekerProfile/ViewJobseekerProfile.js
import React from 'react';

const ViewJobseekerProfile = () => {
  const jobseeker = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    location: 'Nairobi, Kenya',
    skills: 'JavaScript, React, Node.js',
    experience: '3 years in web development'
  };

  return (
    <div className="view-profile">
      <h2>{jobseeker.name}</h2>
      <p><strong>Email:</strong> {jobseeker.email}</p>
      <p><strong>Location:</strong> {jobseeker.location}</p>
      <p><strong>Skills:</strong> {jobseeker.skills}</p>
      <p><strong>Experience:</strong> {jobseeker.experience}</p>
    </div>
  );
};

export default ViewJobseekerProfile;
