import React, { useEffect, useState } from 'react';
import './EmployerProfilePage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployerProfilePage = () => {
  const [employer, setEmployer] = useState({
    company_name: '',
    company_email: '',
    profile_pic: '',
    what_were_looking_for: '',
    verified: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const serverURL = import.meta.env.VITE_SERVER_URL;


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const access_token = localStorage.getItem('jwt_token');
      if (!access_token) {
        navigate('/signin');
        return;
      }

      const response = await axios.get(`${serverURL}/employerprofile`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const data = response.data;
      if (!data || Object.keys(data).length === 0) {
        navigate('/create-employer-profile'); // Redirect to profile creation if profile doesn't exist
      } else {
        setEmployer(data); // Populate the employer data
      }
    } catch (err) {
      setError('Failed to fetch profile');
      console.error(err);
      if (err.response?.status === 401) {
        navigate('/signin');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError(null); // Clear any previous errors
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployer((prevEmployer) => ({
      ...prevEmployer,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const access_token = localStorage.getItem('jwt_token');
      const payload = {
        company_name: employer.company_name || '',
        company_email: employer.company_email || '',
        profile_pic: employer.profile_pic || '',
        what_were_looking_for: employer.what_were_looking_for || '',
        verified: employer.verified || false, // Maintain the verification status
      };

      const response = await axios.put(`${serverURL}/employerprofile`, payload, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      // Update profile state with server response (so changes are reflected immediately)
      setEmployer(response.data);
      setIsEditing(false); // Exit edit mode
      alert('Profile updated successfully!');

      // Refresh the page to show the updated data
      window.location.reload();
    } catch (err) {
      console.error('Error saving changes:', err);
      setError('Failed to save changes');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your profile? This action cannot be undone.');
    if (confirmDelete) {
      try {
        const access_token = localStorage.getItem('jwt_token');
        
        const response = await axios.delete(`${serverURL}/employerprofile`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (response.status === 200) {
          alert('Profile deleted successfully!');
          navigate('/'); // Redirect to home page after deletion
        }
      } catch (err) {
        console.error('Error deleting profile:', err);
        setError('Failed to delete profile');
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="employer-profile">
      <div className="profile-card">
        <div className="profile-picture">
          <img src={employer.profile_pic} alt="Profile" />
        </div>
        <div className="profile-info">
          {isEditing ? (
            <>
              <label>
                <strong>Company's Name:</strong>
                <input
                  type="text"
                  name="company_name"
                  value={employer.company_name || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <strong>Company Email:</strong>
                <input
                  type="email"
                  name="company_email"
                  value={employer.company_email || ''}
                  onChange={handleInputChange}
                />
              </label>
            </>
          ) : (
            <>
              <p><strong>Company's Name:</strong> {employer.company_name}</p>
              <p><strong>Company Email:</strong> {employer.company_email}</p>
            </>
          )}
          <p><strong>Verification Status:</strong> {employer.verified ? 'Verified' : 'verified'}</p>
        </div>
        <div className="description-section">
          <h4>What We're Looking For:</h4>
          {isEditing ? (
            <textarea
              name="what_were_looking_for"
              value={employer.what_were_looking_for || ''}
              onChange={handleInputChange}
            />
          ) : (
            <p>{employer.what_were_looking_for}</p>
          )}
        </div>
        <div className="action-buttons">
          {isEditing ? (
            <>
              <button className="save-button" onClick={handleSaveChanges}>Save Changes</button>
              <button className="cancel-button" onClick={handleEditToggle}>Cancel</button>
            </>
          ) : (
            <>
              <button className="edit-button" onClick={handleEditToggle}>Edit Profile</button>
              <button className="delete-button" onClick={handleDelete}>Delete</button>
              <button className="landing-page-button" onClick={() => navigate('/ELandingpage')}>Go to Employer Landing Page</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerProfilePage;
