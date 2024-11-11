import React, { useEffect, useState } from 'react';
import './AdminPage.css';
import { FaSignOutAlt } from 'react-icons/fa'; // Importing an icon for the logout button

const AdminPage = () => {
    const [employersCount, setEmployersCount] = useState(0);
    const [jobseekersCount, setJobseekersCount] = useState(0);
    const [pendingVerifications, setPendingVerifications] = useState(0);

useEffect(() => {
    fetch('/jobhive.json') # THIS NEEDS TO BE CHANGED TO AN API LATER ON
        .then((response) => response.json())
        .then((jsonData) => {
            // Count employers
            const employers = jsonData.employer_profiles || [];
            setEmployersCount(employers.length);

            // Count jobseekers
            const jobseekers = jsonData.jobseeker_profiles || [];
            setJobseekersCount(jobseekers.length);

            // Count pending verifications
            const pending = jobseekers.filter((profile) => !profile.profile_verified).length;
            setPendingVerifications(pending);
        })
        .catch((error) => console.error('Error fetching data:', error));
}, []);

return (
    <div className="admin-page">
        <header className="admin-header">
            <span className="admin-name">ADMIN NAME</span>
            <FaSignOutAlt className="logout-icon" /> {/* Logout icon */}
        </header>
        
        <section className="stats-section">
            <div className="user-stats">
                <h3>User statistics</h3>
                <p>Employers: {employersCount}</p>
                <p>Job seekers: {jobseekersCount}</p>
                <p>Total: {employersCount + jobseekersCount}</p>
            </div>
            
            <div className="pending-verifications">
                <h3>Pending verifications</h3>
                <p>Pending: {pendingVerifications}</p>
            </div>
        </section>
        
        <div className="button-group">
            <button className="view-employers-btn">VIEW EMPLOYERS</button>
            <button className="view-candidates-btn">VIEW CANDIDATES</button>
        </div>
    </div>
);
};

export default AdminPage;
