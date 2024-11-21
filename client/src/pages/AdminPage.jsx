
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';
import { FaSignOutAlt } from 'react-icons/fa';

const AdminPage = () => {
    const [employers, setEmployers] = useState([]);
    const [jobseekers, setJobseekers] = useState([]);
    const [deactivatedUsers, setDeactivatedUsers] = useState([]);
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
            const token = localStorage.getItem('jwt_token');
            if (!token) {
                console.error("JWT token not found.");
                return;
            }

            const employersResponse = await axios.get(`${serverURL}/admin/employers`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const jobseekersResponse = await axios.get(`${serverURL}/admin/jobseekers`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            const employersData = employersResponse.data.employers || [];
            const jobseekersData = jobseekersResponse.data.jobseekers || [];

            setEmployers(employersData);
            setJobseekers(jobseekersData);

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

    const handleDeactivateUser = (user, type) => {
        // Remove user from the respective list
        if (type === "employer") {
            setEmployers(employers.filter((e) => e.email !== user.email));
        } else {
            setJobseekers(jobseekers.filter((j) => j.email !== user.email));
        }

        // Add user to the deactivated list
        setDeactivatedUsers([...deactivatedUsers, { ...user, type }]);
    };

    const handleActivateUser = (user) => {
        // Remove user from the deactivated list
        setDeactivatedUsers(deactivatedUsers.filter((u) => u.email !== user.email));

        // Restore user to the respective list
        if (user.type === "employer") {
            setEmployers([...employers, user]);
        } else {
            setJobseekers([...jobseekers, user]);
        }
    };

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
                            <img src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb2F1sRrmj0rFgZyVmC8yBgXxyccFRJf7LPQ&s" alt={employer.company_name} />
                            <p><strong>Company:</strong> {employer.company_name}</p>
                            <p><strong>Username:</strong> {employer.username}</p>
                            <button onClick={() => handleDeactivateUser(employer, "employer")}>
                                Deactivate
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {showJobseekers && (
                <div className="jobseekers-list">
                    <h3>Jobseekers</h3>
                    {jobseekers.map((jobseeker) => (
                        <div key={jobseeker.user_id} className="jobseeker-card">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ-HAN6UFnIHXs29W0hyYpQHh-7TOAgxzjbQ&s" alt={jobseeker.username} />
                            <p><strong>Name:</strong> {jobseeker.username}</p>
                            <p><strong>Bio:</strong> {jobseeker.bio}</p>
                            <p><strong>Job Category:</strong> {jobseeker.job_category}</p>
                            <button onClick={() => handleDeactivateUser(jobseeker, "jobseeker")}>
                                Deactivate
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {deactivatedUsers.length > 0 && (
                <div className="deactivated-users">
                    <h3>Deactivated Users</h3>
                    {deactivatedUsers.map((user) => (
                        <div key={user.user_id} className="deactivated-user-card">
                            <p><strong>{user.type === "employer" ? "Company" : "Name"}:</strong> {user.username}</p>
                            <button onClick={() => handleActivateUser(user)}>Activate</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminPage;
