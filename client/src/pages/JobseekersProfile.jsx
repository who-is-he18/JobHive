import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './JobseekersProfile.css';

function JobseekersProfile() {
    const { userId } = useParams();
    const [profile, setProfile] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                // Simulate fetching from the provided JSON (replace this with actual API call if needed)
                const response = await fetch('/jobhive.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                // Find the profile matching the userId
                const userProfile = data.jobseeker_profiles.find(profile => profile.user_id === parseInt(userId));
                const userMessages = data.messages.filter(message => message.sender_id === parseInt(userId));

                if (userProfile) {
                    setProfile(userProfile);
                    setMessages(userMessages);
                } else {
                    setError('Profile not found');
                }
            } catch (err) {
                setError('Failed to fetch data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [userId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="jobseekers-profile">
            <h1>{profile.username}</h1>
            <img src={profile.profile_pic} alt={`${profile.username}'s profile`} />
            <p><strong>Bio:</strong> {profile.bio}</p>
            <p><strong>Job Category:</strong> {profile.job_category}</p>
            <p><strong>Salary Expectation:</strong> ${profile.salary_expectation}</p>
            <p><strong>Availability:</strong> {profile.availability ? 'Available' : 'Not Available'}</p>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer">View Resume</a>

            <h2>Messages</h2>
            <ul>
                {messages.length > 0 ? (
                    messages.map((message, index) => (
                        <li key={index}>{message.content}</li>
                    ))
                ) : (
                    <p>No messages found.</p>
                )}
            </ul>
        </div>
    );
}

export default JobseekersProfile;
