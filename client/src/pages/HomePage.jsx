import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const heroImageUrl = "https://img.freepik.com/free-vector/search-concept-illustration_114360-95.jpg?t=st=1731419806~exp=1731423406~hmac=d56d3d3d90d98a018b7bc692a994f0f2abdc47cbc6dddb73e51759c074cdb97f&w=740";

  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="logo">
          <h1>JobHive</h1>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
        <div className="auth-buttons">
          <Link to="/signin" className="signup-button">Sign in</Link>
          <Link to="/signup" className="signup-button">Sign up</Link>
        </div>
      </nav>
      
      <section className="hero">
        <div className="hero-content">
          <h2>Hire the best, Leave the rest to us</h2>
          <p>
            With our custom-made platform, get access to thousands of jobs and
            top-notch talent from across the globe. We handle the hard parts so
            that you don’t have to.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="get-started-button">Get started</Link>
            <Link to="/explore-jobs" className="explore-jobs-button">Explore jobs</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImageUrl} alt="Hero Section" />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
