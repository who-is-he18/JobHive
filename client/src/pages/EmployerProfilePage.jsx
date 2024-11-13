import React, { useEffect, useState } from 'react';
import './EmployerProfilePage.css';
import { useParams } from 'react-router-dom';

const EmployerProfilePage = () => {
    const [employer, setEmployer] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const { employerId } = useParams();

    useEffect(() => {
        fetch('/jobhive.json')
            .then(response => response.json())
            .then(data => {
                const employerData = data.employer_profiles.find(
                    (profile) => profile.employer_id === parseInt(employerId)
                );
                setEmployer(employerData);
            })
            .catch(error => console.error('Error fetching employer data:', error));
    }, [employerId]);

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
        // Here you would make an API call to save changes on the server
        // Example: fetch('/api/employers', { method: 'PUT', body: JSON.stringify(employer) })

        console.log('Updated employer data:', employer);
        setIsEditing(false); 
    };

    if (!employer) {
        return <p>Loading...</p>;
    }

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
