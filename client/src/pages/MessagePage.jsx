import React from 'react';
import './MessagePage.css';

const MessagePage = () => {
    return (
        <div className="message-page">
        <div className="profile-section">
            <div className="profile-photo"></div>
            <h2>JOBSEEKER'S NAME</h2>
        </div>
        <textarea className="message-box" placeholder="Type your message here..."></textarea>
        <button className="send-message-btn">SEND MESSAGE</button>
        </div>
    );
};

export default MessagePage;
