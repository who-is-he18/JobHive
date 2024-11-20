import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './EmployerLandingPage.css';

const EmployerLandingPage = () => {
  const [data, setData] = useState(null);
  const [displayCount, setDisplayCount] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);  // Track fetch error
  const serverURL = import.meta.env.VITE_SERVER_URL;


  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      setError('No authentication token found.');
      return;
    }

    fetch(`${serverURL}/jobseekers`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData) => {
        // Check if jobseeker_profiles exists before setting data
        if (jsonData && jsonData.jobseeker_profiles) {
          setData(jsonData);
        } else {
          setError('No jobseeker profiles found.');
        }
      })
      .catch((error) => {
        console.error('Error loading data:', error);
        setError('Failed to fetch jobseeker profiles.');
      });
  }, []);

  const loadMoreJobseekers = () => {
    setDisplayCount(displayCount + 3);
  };

  if (error) {
    return <p>{error}</p>;  // Display error message
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  const jobseekerProfiles = data.jobseeker_profiles || [];

  const filteredJobseekers = jobseekerProfiles.filter((candidate) =>
    candidate.job_category?.toLowerCase().includes(searchQuery.toLowerCase()) // Safe check for job_category
  );

  return (
    <div className="employer-landing-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for candidates by job category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button>Search</button>
      </div>

      <section className="suggested-candidates">
        <h2>Suggested Candidates</h2>
        <ul className="candidate-list">
          {filteredJobseekers.length > 0 ? (
            filteredJobseekers.slice(0, displayCount).map((candidate) => {
              console.log(candidate);  // Log candidate object to check if profile_id exists
              if (!candidate.profile_id) {
                return <p key={candidate.username}>Profile ID is missing for {candidate.username}</p>;
              }

              return (
                <li key={candidate.profile_id} className="candidate-item">
                  <div className="candidate-info">
                    {candidate.profile_pic ? (
                      <img 
                        src={candidate.profile_pic} 
                        alt="Candidate Profile" 
                        className="profile-photo" 
                      />
                    ) : (
                      <FaUserCircle className="default-icon" />
                    )}
                    <span className="candidate-name">{candidate.username}</span>
                    <span className="candidate-category">{candidate.job_category}</span>
                  </div>

                  <Link to={`/view-jobseeker-profile/${candidate.profile_id}`}>
                    <button className="view-profile-btn">View Profile</button>
                  </Link>
                </li>
              );
            })
          ) : (
            <p>No candidates available matching the search.</p>
          )}
        </ul>

        {filteredJobseekers.length > displayCount && (
          <div className="view-more" onClick={loadMoreJobseekers}>
            Load More
          </div>
        )}
      </section>
    </div>
  );
};

export default EmployerLandingPage;
