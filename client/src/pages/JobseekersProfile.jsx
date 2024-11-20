import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './JobseekersProfile.css';

function JobseekersProfile() {
    const [jobseeker, setJobseeker] = useState(null);
    const { userId } = useParams();
    const [profile, setProfile] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [resumeURL, setResumeURL] = useState(null);
    const [resumeFile, setResumeFile] = useState(null);
    const navigate = useNavigate();

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
    
            const response = await axios.get('http://127.0.0.1:5000/jobseekerprofile', {
                headers: { Authorization: `Bearer ${access_token}` },
            });
    
            const data = response.data;
            console.log(data);
        
    
            setProfile(data);
            setResumeURL(data.resume);
            setMessages([]);
        } catch (err) {
            setError('Failed to fetch profile. Please try again later.');
            console.error(err);
            if (err.response?.status === 401) {
                navigate('/signin');
            } else if (err.response?.status === 404) {
                navigate('/jobseeker-create-profile');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleEditToggle = () => {
        // Employers cannot toggle edit mode
        if (localStorage.getItem('role') !== 'Employer') {
          setIsEditing(!isEditing);
        }
      };
    

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/signin');
    };

    const handleSaveChanges = () => {

        console.log('Updated employer data:', jobseeker);
        setIsEditing(false); 
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('/upload-resume', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setResumeURL(response.data.url);
            } catch (err) {
                setError('Failed to upload resume. Please try again later.');
                console.error(err);
            }
        }
    };

    const renderResumeLink = () => {
        if (resumeURL) {
            return (
                <div>
                    <h3>Resume Uploaded:</h3>
                    <a href={`/resume-view/${userId}`} target="_blank" rel="noopener noreferrer">View Resume</a>
                </div>
            );
        }
        return <p>No resume uploaded yet.</p>;
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="jobseekers-profile">
                <div className="profile-picture">
                {profile && profile.profile_pic ? (
                    <img src={profile.profile_pic} alt="Profile" />
                ) : (
                    <p>No profile picture available</p>
                )}
            </div>
                    

                <h1 className="profile-name">{profile.username}</h1>
          

            {isEditing ? (
                <div className="edit-profile">
                    <label>
                        <span>Bio:</span>
                        <textarea
                            name="bio"
                            value={profile.bio}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                    </label>
                    <label>
                        <span>Image Url:</span>
                        <textarea
                            name="profile_pic"
                            value={profile.profile_pic}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                    </label>
                    <label>
                        <span>Job Category:</span>
                        <input
                            type="text"
                            name="job_category"
                            value={profile.job_category}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                    </label>
                    <label>
                        <span>Salary Expectation:</span>
                        <input
                            type="number"
                            name="salary_expectation"
                            value={profile.salary_expectation}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                    </label>
                    <label>
                        <span>Job Description:</span>
                        <textarea
                            name="job_description"
                            value={profile.job_description}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                    </label>
                    <div className="file-upload">
                        <label>Upload Resume:</label>
                        <input type="file" onChange={handleFileUpload} className="input-file" />
                    </div>
                    <div className="button-group">
                        <button onClick={handleSaveChanges} className="button save-button">Save</button>
                    </div>
                </div>
            ) : (
                <div className="profile-info">
                    <p><strong>Bio:</strong> {profile.bio}</p>
                    <p><strong>Job Category:</strong> {profile.job_category}</p>
                    <p><strong>Salary Expectation:</strong> ksh{profile.salary_expectation}</p>
                    <p><strong>Job Description:</strong> {profile.job_description}</p>
                    <p><strong>Availability:</strong> {profile.availability ? 'Available' : 'Not Available'}</p>
                    {renderResumeLink()}
                </div>
            )}

            <div className="button-group">
                {localStorage.getItem('role') !== 'Employer' && (
                    <>
                        <button onClick={handleEditToggle} className="button edit-profile-button">
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </button>
                        <button onClick={handleLogout} className="button logout-button">
                            Logout
                        </button>
                    </>
                )}
            </div>
            <h2>Messages</h2>
            <ul className="messages-list">
                {messages.length > 0 ? (
                    messages.map((message, index) => (
                        <li key={index} className="message-item">{message.content}</li>
                    ))
                ) : (
                    <p className="no-messages">No messages found.</p>
                )}
            </ul>
        </div>
    );
}

export default JobseekersProfile;
