import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './CreateEmployerProfile.css';

import { useNavigate } from 'react-router-dom';

const CreateEmployerProfile = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // Form validation schema
  const formik = useFormik({
    initialValues: {
      company_name: '',
      company_email: '',
      profile_pic: '',
      what_were_looking_for: '',
    },
    validationSchema: Yup.object({
      company_name: Yup.string().required('Company name is required'),
      company_email: Yup.string().email('Invalid email format').required('Company email is required'),
      profile_pic: Yup.string().url('Invalid URL').required('Profile picture URL is required'),
      what_were_looking_for: Yup.string().required('Description is required'),
    }),
    onSubmit: async (values) => {
      try {
        const access_token = localStorage.getItem('jwt_token');
        if (!access_token) {
          navigate('/signin');
          return;
        }

        // Send POST request to create the profile
        const response = await axios.post('http://127.0.0.1:5000/employerprofile', values, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        // Redirect to the employer profile page with the details after successful creation
        navigate('/employer-profile/:id');
      } catch (err) {
        console.error('Error creating profile:', err);
        setError('Failed to create profile');
      }
    },
  });

  return (
    <div className="create-profile-container">
      <h2>Create Your Employer Profile</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Company Name</label>
          <input
            type="text"
            name="company_name"
            value={formik.values.company_name}
            onChange={formik.handleChange}
          />
          {formik.touched.company_name && formik.errors.company_name && (
            <div className="error-message">{formik.errors.company_name}</div>
          )}
        </div>

        <div>
          <label>Company Email</label>
          <input
            type="email"
            name="company_email"
            value={formik.values.company_email}
            onChange={formik.handleChange}
          />
          {formik.touched.company_email && formik.errors.company_email && (
            <div className="error-message">{formik.errors.company_email}</div>
          )}
        </div>

        <div>
          <label>Profile Picture URL</label>
          <input
            type="text"
            name="profile_pic"
            value={formik.values.profile_pic}
            onChange={formik.handleChange}
          />
          {formik.touched.profile_pic && formik.errors.profile_pic && (
            <div className="error-message">{formik.errors.profile_pic}</div>
          )}
        </div>

        <div>
          <label>What We're Looking For</label>
          <textarea
            name="what_were_looking_for"
            value={formik.values.what_were_looking_for}
            onChange={formik.handleChange}
          />
          {formik.touched.what_were_looking_for && formik.errors.what_were_looking_for && (
            <div className="error-message">{formik.errors.what_were_looking_for}</div>
          )}
        </div>

        <button type="submit" disabled={!formik.isValid || !formik.dirty}>
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default CreateEmployerProfile;
