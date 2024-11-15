import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ViewJobseekersProfile.css';

const ViewJobseekersProfile = () => {
  const { profileId } = useParams();
  const [jobseekerProfile, setJobseekerProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/jobhive.json')
      .then((response) => response.json())
      .then((data) => {
        const profile = data.jobseeker_profiles.find((profile) => profile.profile_id === parseInt(profileId));
        setJobseekerProfile(profile);
      })
      .catch((error) => console.error('Error loading profile:', error));
  }, [profileId]);

  const handleMessageClick = () => {
    navigate(`/message/${profileId}`);
  };

  const handleViewResume = () => {
    navigate(`/resume-view/${profileId}`);
  };

  return jobseekerProfile ? (
    <div className="profile-container">
      <div
        className="profile-header-background"
        style={{ backgroundImage: `url(${jobseekerProfile.profile_pic})` }}
      >
        <div className="profile-header-overlay">
          <h1>{jobseekerProfile.username}</h1>
        </div>
      </div>
      <div className="profile-info">
        <p><strong>Jobseeker's name:</strong> {jobseekerProfile.username}</p>
        <p><strong>Phone Number:</strong> 123-456-7890</p>
        <p><strong>Job Category:</strong> {jobseekerProfile.job_category}</p>
        <p><strong>Email:</strong> {jobseekerProfile.email}</p>
      </div>
      <div className="profile-details">
        <div className="availability">
          <strong>Availability:</strong> {jobseekerProfile.availability ? 'Available' : 'Not Available'}
        </div>
        <div className="salary-expectations">
          <strong>Salary expectations:</strong> ksh{jobseekerProfile.salary_expectation}
        </div>
        <div className="documents">
          <strong>Documents:</strong>
          <button onClick={handleViewResume} className="view-resume-button">View Resume</button>
        </div>
      </div>
      <button className="message-button" onClick={handleMessageClick}>Message</button>
    </div>
  ) : (
    <p>Loading profile...</p>
  );
};

export default ViewJobseekersProfile;
