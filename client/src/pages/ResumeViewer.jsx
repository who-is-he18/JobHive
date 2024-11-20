import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ResumeViewer() {
    const { userId } = useParams();
    const [resumeURL, setResumeURL] = useState(null);
    const serverURL = import.meta.env.VITE_SERVER_URL;


    useEffect(() => {
        const storedProfile = localStorage.getItem(`profile_${userId}`);
        if (storedProfile) {
            const profileData = JSON.parse(storedProfile);
            setResumeURL(profileData.resume?.url || null);
        }
    }, [userId]);

    if (!resumeURL) {
        return <div>No resume found for this user.</div>;
    }

    return (
        <div>
            <h3>Resume for User {userId}</h3>
            <iframe
                src={resumeURL}
                width="100%"
                height="600px"
                title="Resume"
                frameBorder="0"
            />
        </div>
    );
}

export default ResumeViewer;
