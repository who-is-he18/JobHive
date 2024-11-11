import React, { useState, useEffect } from 'react';
import './AdminPage.css';
import { FaSignOutAlt } from 'react-icons/fa';

const AdminPage = () => {
    const [employers, setEmployers] = useState([]);
    const [jobseekers, setJobseekers] = useState([]);
    const [showEmployers, setShowEmployers] = useState(false);
    const [showJobseekers, setShowJobseekers] = useState(false);
    const [statistics, setStatistics] = useState({
        employerCount: 0,
        jobseekerCount: 0,
        pendingCount: 0
    });

useEffect(() => {
    fetch('/jobhive.json')
        .then((response) => response.json())
        .then((data) => {
            const employerProfiles = data.employer_profiles || [];
            const jobseekerProfiles = data.jobseeker_profiles || [];

            setEmployers(employerProfiles);
            setJobseekers(jobseekerProfiles);
            setStatistics({
                employerCount: employerProfiles.length,
                jobseekerCount: jobseekerProfiles.length,
                pendingCount: jobseekerProfiles.filter((profile) => !profile.profile_verified).length
            });
        })
        .catch((error) => console.error('Error fetching data:', error));
}, []);

const handleViewEmployers = () => {
    setShowEmployers(true);
    setShowJobseekers(false);
};

const handleViewJobseekers = () => {
    setShowJobseekers(true);
    setShowEmployers(false);
};

return (
    <div className="admin-page">
        <header className="admin-header">
            <span className="admin-name">ADMIN NAME</span>
            <FaSignOutAlt className="logout-icon" />
        </header>

        <section className="stats-section">
            <div className="user-stats">
                <h3>User statistics</h3>
                <p>Employers: {statistics.employerCount}</p>
                <p>Job seekers: {statistics.jobseekerCount}</p>
                <p>Total: {statistics.employerCount + statistics.jobseekerCount}</p>
            </div>

            <div className="pending-verifications">
                <h3>Pending verifications</h3>
                <p>Pending: {statistics.pendingCount}</p>
            </div>
        </section>

        <div className="button-group">
            <button className="view-employers-btn" onClick={handleViewEmployers}>
                VIEW EMPLOYERS
            </button>
            <button className="view-candidates-btn" onClick={handleViewJobseekers}>
                VIEW CANDIDATES
            </button>
        </div>

        {showEmployers && (
            <div className="employers-list">
                <h3>Employers</h3>
                {employers.map((employer) => (
                    <div key={employer.employer_id} className="employer-card">
                        <img src={employer.profile_pic} alt={employer.company_name} />
                        <p><strong>Company:</strong> {employer.company_name}</p>
                        <p><strong>Looking For:</strong> {employer.what_were_looking_for}</p>
                    </div>
                ))}
            </div>
        )}

        {showJobseekers && (
            <div className="jobseekers-list">
                <h3>Jobseekers</h3>
                {jobseekers.map((jobseeker) => (
                    <div key={jobseeker.profile_id} className="jobseeker-card">
                        <img src={jobseeker.profile_pic} alt={jobseeker.username} />
                        <p><strong>Name:</strong> {jobseeker.username}</p>
                        <p><strong>Bio:</strong> {jobseeker.bio}</p>
                        <p><strong>Job Description:</strong> {jobseeker.job_description}</p>
                    </div>
                ))}
            </div>
        )}
    </div>
);
};

export default AdminPage;