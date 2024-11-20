import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateJobProfile.css';

function CreateProfile() {
    const [formData, setFormData] = useState({
        username: '', 
        profile_pic: '',
        bio: '',
        job_category: '',
        salary_expectation: '',
        job_description: '',
        availability: true,
        profile_verified: '',
        linkedin: '',
        resume: null,
        email:''
    });
    const [error, setError] = useState(''); 
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'resume' && files) {
            setFormData((prev) => ({ ...prev, resume: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const access_token = localStorage.getItem('jwt_token');
            if (!access_token) {
                navigate('/signin');
                return;
            }

            const payload = {
                username: formData.username,
                profile_pic: formData.profile_pic,
                bio: formData.bio,
                job_category: formData.job_category,
                salary_expectation: formData.salary_expectation,
                job_description: formData.job_description,
                availability: formData.availability,
                linkedin: formData.linkedin,
                resume: formData.resume,
                email: formData.email
            };

            await axios.post(`${serverURL}/jobseekerprofile`, payload, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
            });

            navigate('/jobseekerprofile');
        } catch (err) {
            setError('Failed to create profile. Please try again later.');
            console.error(err.response ? err.response.data : err);
        }
    };

    return (
        <div className="create-profile">
            <h2>Create Profile</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Profile Picture URL:
                    <input
                        type="text"
                        name="profile_pic"
                        value={formData.profile_pic}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Bio:
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Job Category:
                    <input
                        type="text"
                        name="job_category"
                        value={formData.job_category}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Salary Expectation:
                    <input
                        type="number"
                        name="salary_expectation"
                        value={formData.salary_expectation}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Job Description:
                    <textarea
                        name="job_description"
                        value={formData.job_description}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Availability:
                    <input
                        type="checkbox"
                        name="availability"
                        checked={formData.availability}
                        onChange={() =>
                            setFormData((prev) => ({
                                ...prev,
                                availability: !prev.availability,
                            }))
                        }
                    />
                </label>
                <label>
                    LinkedIn URL:
                    <input
                        type="text"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Upload Resume:
                    <input
                        type="file"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Create Profile</button>
            </form>
        </div>
    );
}

export default CreateProfile;
