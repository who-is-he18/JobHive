import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
        pendingCount: 0,
    });
    const serverURL = import.meta.env.VITE_SERVER_URL;

    const fetchData = async () => {
        try {
            // Get the JWT token from localStorage
            const token = localStorage.getItem('jwt_token');
            if (!token) {
                console.error("JWT token not found.");
                return;
            }

            // Fetch Employers
            const employersResponse = await axios.get(`${serverURL}/admin/employers`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const employersData = employersResponse.data.employers || [];
            setEmployers(employersData);

            // Fetch Jobseekers
            const jobseekersResponse = await axios.get(`${serverURL}/admin/jobseekers`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const jobseekersData = jobseekersResponse.data.jobseekers || [];
            setJobseekers(jobseekersData);

            // Set Statistics
            const pendingCount = jobseekersData.filter(profile => !profile.profile_verified).length;
            setStatistics({
                employerCount: employersData.length,
                jobseekerCount: jobseekersData.length,
                pendingCount,
            });
        } catch (error) {
            console.error('Error fetching data:', error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleViewEmployers = () => {
        setShowEmployers(true);
        setShowJobseekers(false);
    };

    const handleViewJobseekers = () => {
        setShowJobseekers(true);
        setShowEmployers(false);
    };

    const handleDeactivateUser = async (email) => {
        try {
            const token = localStorage.getItem('jwt_token');
            if (!token) {
                console.error("JWT token not found.");
                return;
            }
    
            // Check if email is provided
            if (!email) {
                console.error("Email is missing");
                return;
            }
    
            // Make the request to deactivate the user
            const response = await axios.put(`${serverURL}/admin/deactivate_user/${email}`, {}, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
    
            // Re-fetch the users after deactivating
            fetchData();
        } catch (error) {
            console.error('Error deactivating user:', error.response?.data || error.message);
        }
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
                        <div key={employer.user_id} className="employer-card">
                            <img src={employer.profile_pic} alt={employer.company_name} />
                            <p><strong>Company:</strong> {employer.company_name}</p>
                            <p><strong>Username:</strong> {employer.username}</p>
                            <button onClick={() => handleDeactivateUser(user.email)}>Deactivate</button>
                        </div>
                    ))}
                </div>
            )}

            {showJobseekers && (
                <div className="jobseekers-list">
                    <h3>Jobseekers</h3>
                    {jobseekers.map((jobseeker) => (
                        <div key={jobseeker.user_id} className="jobseeker-card">
                            <img src={jobseeker.profile_pic} alt={jobseeker.username} />
                            <p><strong>Name:</strong> {jobseeker.username}</p>
                            <p><strong>Bio:</strong> {jobseeker.bio}</p>
                            <p><strong>Job Category:</strong> {jobseeker.job_category}</p>
                            <button onClick={() => handleDeactivateUser(user.email)}>Deactivate</button>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminPage;
