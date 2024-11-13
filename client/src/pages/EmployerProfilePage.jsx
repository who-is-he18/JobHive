import React, { useEffect, useState } from 'react';
import './EmployerProfilePage.css';
import { useParams } from 'react-router-dom';

const EmployerProfilePage = () => {
    const [employer, setEmployer] = useState(null);
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
                    <p><strong>Company's name:</strong> {employer.company_name}</p>
                    <p><strong>Company email:</strong> {employer.company_email}</p>
                    <p><strong>Verification status:</strong> {employer.verified ? 'Verified' : 'Unverified'}</p>
                </div>
                <div className="description-section">
                    <h4>What we're looking for:</h4>
                    <p>{employer.what_were_looking_for}</p>
                </div>
                <div className="action-buttons">
                    <button className="edit-button">Edit Profile</button>
                    <button className="delete-button">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default EmployerProfilePage;
