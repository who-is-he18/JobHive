import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MessagePage.css';

const MessagePage = () => {
  const { profileId } = useParams();
  const [jobseekerProfile, setJobseekerProfile] = useState(null);

  useEffect(() => {
    fetch('/jobhive.json')
      .then((response) => response.json())
      .then((data) => {
        const profile = data.jobseeker_profiles.find((profile) => profile.profile_id === parseInt(profileId));
        setJobseekerProfile(profile);
      })
      .catch((error) => console.error('Error loading jobseeker profile:', error));
  }, [profileId]);

  return jobseekerProfile ? (
    <div className="message-page">
      <div className="profile-section">
        <img src={jobseekerProfile.profile_pic} alt="Jobseeker Profile" className="profile-photo" />
        <h2>{jobseekerProfile.username}</h2>
      </div>
      <textarea className="message-box" placeholder="Type your message here..."></textarea>
      <button className="send-message-btn">SEND MESSAGE</button>
    </div>
  ) : (
    <p>Loading jobseeker profile...</p>
  );
};

export default MessagePage;
