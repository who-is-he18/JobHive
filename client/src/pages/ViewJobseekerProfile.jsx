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
          <p><strong>Job Category:</strong> {jobseekerProfile.job_category}</p>
        </div>
      </div>
      <div className="profile-info">
        <p><strong>Phone Number:</strong> {jobseekerProfile.phone}</p>
        <p><strong>Email:</strong> {jobseekerProfile.email}</p>
        <p><strong>LinkedIn:</strong> <a href={jobseekerProfile.linkedin} target="_blank" rel="noopener noreferrer">{jobseekerProfile.linkedin}</a></p>
        <p><strong>Last Updated:</strong> {new Date(jobseekerProfile.updated_at).toLocaleDateString()}</p>
      </div>
      <div className="profile-details">
        <div className="availability">
          <strong>Availability:</strong> {jobseekerProfile.availability ? 'Available' : 'Not Available'}
        </div>
        <div className="salary-expectations">
          <strong>Salary Expectations:</strong> ksh{jobseekerProfile.salary_expectation}
        </div>
        <div className="job-description">
          <strong>Job Description:</strong>
          <p>{jobseekerProfile.job_description}</p>
        </div>
        <div className="bio">
          <strong>Bio:</strong>
          <p>{jobseekerProfile.bio}</p>
        </div>
        <div className="documents">
          <strong>Documents:</strong>
          <a href={jobseekerProfile.resume} target="_blank" rel="noopener noreferrer" className="view-resume-button">View Resume</a>
        </div>
      </div>
      <button className="message-button" onClick={handleMessageClick}>Message</button>
    </div>
  ) : (
    <p>Loading profile...</p>
  );
};

export default ViewJobseekersProfile;
