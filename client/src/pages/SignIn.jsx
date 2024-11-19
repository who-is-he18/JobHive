import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './signin.css';
import { toast } from 'react-toastify'; 

import 'react-toastify/dist/ReactToastify.css';

// const preSeedAdmin = () => {
//   const admins = JSON.parse(localStorage.getItem('admins')) || [];
//   if (!admins.some(admin => admin.email === 'admin@example.com')) {
//     const admin = {
//       email: 'admin@example.com',
//       password: '@adm1', 
//     };
//     admins.push(admin);
//     localStorage.setItem('admins', JSON.stringify(admins));
//     console.log('Admin credentials pre-seeded');
//   }
// };

const SignIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   preSeedAdmin();
  // }, []);

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
      //Admin sign-in
      try {
      const res = await axios.post("http://127.0.0.1:5000/login",{
          email:values.email,
          password_hash:values.password
      })
      const userData = res.data;
      console.log('Response data:', userData);

      const { access_token } = userData;
      localStorage.setItem('jwt_token', access_token); 

      if(userData.user.role == 'admin'){
          console.log('Admin login successful:', userData);
          toast.success('Admin login successful!');  // Success toast
          navigate('/admin/jobseekers');
      }else if (userData.user.role == 'employer'){
        toast.success('User login successful!'); 
        return navigate('/employerprofile'); 
      }else if (userData.user.role == 'Candidate'){
        toast.success('User login successful!'); 
        return navigate(`/jobseekerprofile`); 
      }else {
        alert('Unknown role');
      }
    }catch (error) {
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
