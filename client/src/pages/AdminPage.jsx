import React from 'react';
import './AdminPage.css';
import { FaSignOutAlt } from 'react-icons/fa'; // Importing an icon for the logout button

const AdminPage = () => {
    return (
        <div className="admin-page">
        <header className="admin-header">
            <span className="admin-name">ADMIN NAME</span>
            <FaSignOutAlt className="logout-icon" /> {/* Logout icon */}
        </header>
        
        <section className="stats-section">
            <div className="user-stats">
            <h3>User statistics</h3>
            <p>Employers: </p>
            <p>Job seekers: </p>
            <p>Total: </p>
            </div>
            
            <div className="pending-verifications">
            <h3>Pending verifications</h3>
            <p>Pending: </p>
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
