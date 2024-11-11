// src/components/JobseekerProfile/EditProfileModal.js
import React, { useState } from 'react';

const EditProfileModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [jobseekerData, setJobseekerData] = useState({
    name: '',
    email: '',
    location: '',
    skills: '',
    experience: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobseekerData({
      ...jobseekerData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Jobseeker Data:', jobseekerData);
    setModalOpen(false);
  };

  return (
    <>
      <button onClick={() => setModalOpen(true)}>Edit Profile</button>
      {isModalOpen && (
        <div className="modal">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={jobseekerData.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={jobseekerData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="location"
              value={jobseekerData.location}
              onChange={handleInputChange}
              placeholder="Location"
            />
            <input
              type="text"
              name="skills"
              value={jobseekerData.skills}
              onChange={handleInputChange}
              placeholder="Skills"
            />
            <input
              type="text"
              name="experience"
              value={jobseekerData.experience}
              onChange={handleInputChange}
              placeholder="Experience"
            />
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setModalOpen(false)}>
              Close
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditProfileModal;
