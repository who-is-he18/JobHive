import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const heroImageUrl =
    "https://img.freepik.com/free-vector/search-concept-illustration_114360-95.jpg?t=st=1731419806~exp=1731423406~hmac=d56d3d3d90d98a018b7bc692a994f0f2abdc47cbc6dddb73e51759c074cdb97f&w=740";

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <h1>JobHive</h1>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="#hero" className="nav-link">
              Home
            </Link>
          </li>
        </ul>
        <div className="auth-buttons">
          <Link to="/signin" className="auth-button">
            Sign in
          </Link>
          <Link to="/signup" className="auth-button">
            Sign up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-content">
          <h2 className="hero-title">Hire the best, Leave the rest to us</h2>
          <p className="hero-description">
            With our custom-made platform, get access to thousands of jobs and
            top-notch talent from across the globe. We handle the hard parts so
            that you don’t have to.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="button primary-button">
              Get started
            </Link>
            <Link to="/explore-jobs" className="button secondary-button">
              Explore jobs
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImageUrl} alt="Hero Section" />
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="about-us">
        <h1 className="section-title">About Us</h1>
        <p className="section-description">
          JobHive is a premier platform designed to connect job seekers with
          employers worldwide. Our mission is to simplify the hiring process by
          providing a user-friendly interface and powerful tools for both
          recruiters and candidates. Whether you're looking for your dream job
          or top-notch talent, JobHive is here to help you succeed.
        </p>
      </section>

      {/* Contact Us Section */}
      <section id="contact-us" className="contact-us">
        <h1 className="section-title">Contact Us</h1>
        <p className="section-description">
          We'd love to hear from you! Whether you have questions, feedback, or
          need assistance, feel free to reach out to us:
        </p>
        <ul className="contact-details">
          <li>Email: support@jobhive.com</li>
          <li>Phone: +254 712 345 678</li>
          <li>Address: 123 Tech Lane, Nairobi City</li>
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
