import React from 'react';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import './signup.css';

import { toast } from 'react-toastify';  

const Signup = ({ onSignup }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone_number: '',
      password: '',
      role: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('Please enter a valid email address')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email format')
        .required('Email is required'),
      phone_number: Yup.string()
        .matches(/^\+?[1-9]\d{0,14}$/, 'Invalid phone number format')
        .min(10, 'Phone number must be at least 10 characters')
        .max(12, 'Phone number must be at most 12 characters')
        .required('Phone number is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required('Password is required'),
      role: Yup.string().required('Role is required'),
    }),
    onSubmit: async (values) => {
      try {
        // Save user data to local storage
        const response = await axios.post(`${serverURL}/users`,{
          username: values.name,
          phone:values.phone_number,
          email:values.email,
          role:values.role,
          password_hash:values.password
        });

        toast.success('Signup successful! Please log in.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Redirect based on role
        if (values.role === 'employer') {
          navigate('/payment');  // Redirect employers to payment page
        } else {
          navigate('/signin');  // Jobseekers are redirected to sign-in page
        }
      } catch (error) {
        console.error('Signup error:', error);
        alert('There was an error during signup. Please try again.');
      }
    },
  });

  return (
    <div className="signup-container">
      <form onSubmit={formik.handleSubmit} className="signup-form">
        <input
          type="text"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter your name"
          className={formik.touched.name && formik.errors.name ? 'input-error' : ''}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="signup-error">{formik.errors.name}</div>
        )}

        <input
          type="email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter your email"
          className={formik.touched.email && formik.errors.email ? 'input-error' : ''}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="signup-error">{formik.errors.email}</div>
        )}

        <input
          type="tel"
          id="phone_number"
          value={formik.values.phone_number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter your phone number"
          className={formik.touched.phone_number && formik.errors.phone_number ? 'input-error' : ''}
        />
        {formik.touched.phone_number && formik.errors.phone_number && (
          <div className="signup-error">{formik.errors.phone_number}</div>
        )}

        <input
          type="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter your password"
          className={formik.touched.password && formik.errors.password ? 'input-error' : ''}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="signup-error">{formik.errors.password}</div>
        )}

        <select
          id="role"
          value={formik.values.role}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.role && formik.errors.role ? 'input-error' : ''}
        >
          <option value="">Select your role</option>
          <option value="Candidate">Candidate</option>
          <option value="employer">Employer</option>
        </select>
        {formik.touched.role && formik.errors.role && (
          <div className="signup-error">{formik.errors.role}</div>
        )}

        <button
          type="submit"
          style={{
            marginTop: '15px',
            backgroundColor: '#1E90FF',
            color: 'white',
            border: 'none',
            padding: '10px',
            cursor: 'pointer',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
          disabled={!(formik.isValid && formik.dirty)}
        >
          CREATE ACCOUNT
        </button>
      </form>
      <p className="signup-login-link">
        Already have an account? <Link to="/signin">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
