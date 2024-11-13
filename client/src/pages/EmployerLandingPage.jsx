import React, { useState, useEffect } from 'react';
import './EmployerLandingPage.css';

const EmployerLandingPage = () => {
  const [data, setData] = useState(null);
  const [displayCount, setDisplayCount] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/jobhive.json')
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => console.error('Error loading data:', error));
  }, []);

  const loadMoreJobseekers = () => {
    setDisplayCount(displayCount + 3);
  };

  if (!data) {
    return <p>Loading...</p>;
  }

  const jobseekerProfiles = data.jobseeker_profiles || [];
  const employerProfiles = data.employer_profiles || [];

  const filteredJobseekers = jobseekerProfiles.filter((candidate) =>
    candidate.job_category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="employer-landing-page">
      <section className="employer-details">
        {employerProfiles.length > 0 ? (
          employerProfiles.map((employer) => (
            <div key={employer.employer_id} className="employer-info">
              <img 
                src={employer.profile_pic || "default_employer_image_url"} 
                alt="Employer Profile" 
                className="profile-photo"
              />
              <h2>{employer.company_name}</h2>
              <p>{employer.what_were_looking_for}</p>
            </div>
          ))
        ) : (
          <p>No employer profiles available.</p>
        )}
      </section>

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
            filteredJobseekers.slice(0, displayCount).map((candidate) => (
              <li key={candidate.profile_id} className="candidate-item">
                <div className="candidate-info">
                  <img 
                    src={candidate.profile_pic || "default_jobseeker_image_url"} 
                    alt="Candidate Profile" 
                    className="profile-photo"
                  />
                  <span className="candidate-name">{candidate.username}</span>
                  <span className="candidate-category">{candidate.job_category}</span>
                </div>
                <button className="view-profile-btn">View Profile</button>
              </li>
            ))
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
