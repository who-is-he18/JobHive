import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ViewJobseekersProfile.css';

const ViewJobseekersProfile = () => {
  const { profile_id } = useParams(); // Get profileId from the URL
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  console.log("profile:",profile_id)

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      setError('No authentication token found.');
      return;
    }

    fetch(`${serverURL}/view-jobseeker-profile/${profile_id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse JSON response
      })
      .then((data) => {
        console.log('Fetched Profile Data:', data); // Check the API response
        if (data.profile_data) {
          setProfile(data.profile_data); // Access the nested `profile_data`
        } else {
          throw new Error('Profile data is missing in the response.');
        }
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
        setError('Failed to fetch profile.');
      });
  }, [profile_id]);

  const handleViewResume = () => {
    if (profile && profile.resume_url) {
      // Open the resume in a new tab
      window.open(profile.resume_url, '_blank');
    } else {
      alert('Resume is not available.');
    }
  };

  const handleMessageClick = () => {
    alert('Messaging functionality is under development.');
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">
      <div
        className="profile-header-background"
        style={{ backgroundImage: `url(${profile.profile_pic})` }}
      >
        <div className="profile-header-overlay">
          <h1>{profile.username}</h1>
        </div>
      </div>
      <div className="profile-info">
        <p><strong>Jobseeker's name:</strong> {profile.username}</p>
        <p><strong>Phone Number:</strong> 123-456-7890</p>
        <p><strong>Job Category:</strong> {profile.job_category}</p>
        <p><strong>Job Description:</strong> {profile.job_description}</p>
        <p><strong>Email:</strong>{profile.email}johndoe@gmail.com</p>
      </div>
      <div className="profile-details">
        <div className="availability">
          <strong>Availability:</strong> {profile.availability ? 'Available' : 'Not Available'}
        </div>
        <div className="salary-expectations">
          <strong>Salary expectations:</strong> ksh{profile.salary_expectation}
        </div>
        <div className="documents">
          <strong>Documents:</strong>
          <button onClick={handleViewResume} className="view-resume-button">View Resume</button>
        </div>
      </div>
      <button className="message-button" onClick={handleMessageClick}>Message</button>
    </div>
  );
};

export default ViewJobseekersProfile;

// viewjobseekersprofile
