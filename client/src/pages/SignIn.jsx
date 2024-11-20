import React, { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './signin.css';
import { toast } from 'react-toastify'; 

import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Please enter a valid email address')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`${serverURL}/login`, {
          email: values.email,
          password_hash: values.password
        });
        const userData = res.data;
        console.log('Response data:', userData);

        const { access_token } = userData;
        localStorage.setItem('jwt_token', access_token); // Store JWT token

        if (userData.user.role === 'admin') {
          console.log('Admin login successful:', userData);
          toast.success('Admin login successful!');
          navigate('/admin');
        } else if (userData.user.role === 'employer') {
          toast.success('Employer login successful!');
          // Check if the employer has a profile
          if (userData.user.employerprofiles.length === 0) {
            // Redirect to profile creation if no profile exists
            return navigate('/create-employer-profile');
          } else {
            // Redirect to employer profile page if profile exists
            return navigate(`/employer-profile/${userData.user.id}`);
          }
        } else if (userData.user.role === 'Candidate') {
          toast.success('Candidate login successful!');

          // Check if the candidate has a profile
          if (userData.user.jobseekerprofiles.length === 0) {
            // Redirect to profile creation if no profile exists
            return navigate('/jobseeker-create-profile');
          } else {
            // Redirect to candidate profile page if profile exists
            return navigate(`/jobseeker-profile/${userData.user.id}`);
          }
        } else {
          alert('Unknown role');
        }
      } catch (error) {
        console.error('Login failed:', error);
        toast.error('Login failed. Please check your credentials.');
      }
    }
  });

  return (
    <div className="signup-container">
      <div>
        <h2 className="signup-heading">Welcome back!</h2>
        <form onSubmit={formik.handleSubmit} className="signup-form">
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Enter your email"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="signup-error">{formik.errors.email}</div>
          )}

          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Enter your password"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="signup-error">{formik.errors.password}</div>
          )}

          <button 
            type="submit" 
            style={{ 
              marginTop: "25px",
              backgroundColor: "#1E90FF", 
              color: "white", 
              border: "none", 
              padding: "10px", 
              cursor: "pointer", 
              borderRadius: "5px", 
              fontSize: "16px", 
              fontWeight: "bold" 
            }}
            disabled={!(formik.isValid && formik.dirty)}
          >
            SIGN IN
          </button>
        </form>
        <p className="signup-login-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
