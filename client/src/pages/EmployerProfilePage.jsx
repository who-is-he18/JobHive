import React, { useEffect, useState } from 'react';
import './EmployerProfilePage.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EmployerProfilePage = () => {
    const [employer, setEmployer] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { employerId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const access_token = localStorage.getItem('jwt_token');
            if (!access_token){
                navigate('/signin');
                return;
            }

            const response = await axios.get('http://127.0.0.1:5000/employerprofile', {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }); 
            const data = response.data;
            setEmployer(data);    
        }catch (err){
            setError('Failed to fetch profile');
            console.error(err);
            if (err.response?.status === 401){
                navigate('/signin')
            }
        }finally{
            setLoading(false);
        }
    }


    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployer((prevEmployer) => ({
            ...prevEmployer,
            [name]: value,
        }));
    };

    const handleSaveChanges = () => {

        console.log('Updated employer data:', employer);
        setIsEditing(false); 
    };

    if (!employer) {
        return <p>Loading...</p>;
    }

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
                                    value={employer.company_name}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                <strong>Company Email:</strong>
                                <input
                                    type="email"
                                    name="company_email"
                                    value={employer.company_email}
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
                    <p><strong>Verification Status:</strong> {employer.verified ? 'Verified' : 'Unverified'}</p>
                </div>
                <div className="description-section">
                    <h4>What We're Looking For:</h4>
                    {isEditing ? (
                        <textarea
                            name="what_were_looking_for"
                            value={employer.what_were_looking_for}
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
                            <button className="delete-button">Delete</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployerProfilePage;
