import React, { useEffect, useState } from 'react';
import './ViewJobseekersProfile.css'

const ViewJobseekersProfile = () => {
  const [jobseekerProfile, setJobseekerProfile] = useState(null);

  useEffect(() => {
    // Fetch jobseeker profile data
    const data = {
      "jobseeker_profiles": [
        {
          "profile_id": 1,
          "user_id": 1,
          "username": "John Doe",
          "profile_pic": "https://images.unsplash.com/photo-1669475535978-7479ef74e14f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDA%3D",
          "bio": "Experienced software engineer",
          "job_description": "Looking for a full-stack role",
          "availability": true,
          "job_category": "Software Development",
          "salary_expectation": 70000,
          "resume": "https://example.com/resume/john.pdf",
          "profile_verified": true,
          "updated_at": "2024-11-05T09:00:00Z"
        }
      ]
    };
    
    // Simulate fetching the first jobseeker profile
    setJobseekerProfile(data.jobseeker_profiles[0]);
  }, []);

  return jobseekerProfile ? (
    <div className="profile-container">
      <div className="profile-header">
        <img src={jobseekerProfile.profile_pic} alt="Profile" className="profile-pic" />
        <div className="profile-info">
          <p><strong>Jobseeker's name:</strong> {jobseekerProfile.username}</p>
          <p><strong>Phone Number:</strong> 123-456-7890</p>
          <p><strong>Job Category:</strong> {jobseekerProfile.job_category}</p>
          <p><strong>Email:</strong> john@example.com</p>
        </div>
      </div>
      <div className="profile-details">
        <div className="availability">
          <strong>Availability:</strong> {jobseekerProfile.availability ? 'Available' : 'Not Available'}
        </div>
        <div className="salary-expectations">
          <strong>Salary expectations:</strong> ${jobseekerProfile.salary_expectation}
        </div>
        <div className="documents">
          <strong>Documents:</strong>
          <a href={jobseekerProfile.resume} target="_blank" rel="noopener noreferrer">View Resume</a>
        </div>
      </div>
      <button className="message-button">Message</button>
    </div>
  ) : (
    <p>Loading profile...</p>
  );
};

export default ViewJobseekersProfile;
