import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './JobseekersProfile.css';

function JobseekersProfile() {
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
        const storedProfile = localStorage.getItem(`profile_${userId}`);
        if (storedProfile) {
            const profileData = JSON.parse(storedProfile);
            setProfile(profileData);
            setResumeURL(profileData.resume?.url || null);
            setResumeFile(profileData.resume?.file || null);
            setLoading(false);
        } else {
            fetchData();
        }
    }, [userId]);

    const fetchData = async () => {
        try {
            const response = await fetch('/jobhive.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const userProfile = data.jobseeker_profiles.find(profile => profile.user_id === parseInt(userId));
            const userMessages = data.messages.filter(message => message.sender_id === parseInt(userId));

            if (userProfile) {
                setProfile(userProfile);
                setMessages(userMessages);
                setResumeURL(userProfile.resume?.url || null);
                setResumeFile(userProfile.resume?.file || null);
                localStorage.setItem(`profile_${userId}`, JSON.stringify(userProfile));
            } else {
                setError('Profile not found');
            }
        } catch (err) {
            setError('Failed to fetch data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/signin');
    };

    const handleProfileSave = () => {
        if (resumeFile && resumeURL) {
            const updatedProfile = {
                ...profile,
                resume: {
                    url: resumeURL,
                    file: resumeFile,
                }
            };
            setProfile(updatedProfile);
            localStorage.setItem(`profile_${userId}`, JSON.stringify(updatedProfile));
        }
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64File = reader.result;
                setResumeURL(base64File);
                setResumeFile(file);

                const updatedProfile = {
                    ...profile,
                    resume: {
                        url: base64File,
                        file: file,
                    }
                };
                setProfile(updatedProfile);
                localStorage.setItem(`profile_${userId}`, JSON.stringify(updatedProfile));
            };
            reader.readAsDataURL(file);
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
            <div
                className="profile-header"
                style={{ backgroundImage: `url(${profile.profile_pic})` }}
            >
                <div className="profile-header-overlay"></div>
                <h1 className="profile-name">{profile.username}</h1>
            </div>

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
                        <button onClick={handleProfileSave} className="button save-button">Save</button>
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
                <button onClick={handleEditToggle} className="button edit-profile-button">
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
                <button onClick={handleLogout} className="button logout-button">
                    Logout
                </button>
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
