import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import './signin.css';

const preSeedAdmin = () => {
  const admins = JSON.parse(localStorage.getItem('admins')) || [];
  if (!admins.some(admin => admin.email === 'admin@example.com')) {
    const admin = {
      email: 'admin@example.com',
      password: '@adm1', 
    };
    admins.push(admin);
    localStorage.setItem('admins', JSON.stringify(admins));
    console.log('Admin credentials pre-seeded');
  }
};

const SignIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    preSeedAdmin();
  }, []);


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
    onSubmit: (values) => {
      // admin sign in
      const admins = JSON.parse(localStorage.getItem('admins')) || [];
      const admin = admins.find(admin => admin.email === values.email && admin.password === values.password);

      if (admin) {
        setIsLoggedIn(true);
        console.log('Admin signed in:', values);

       
        navigate('/admin');
      } else {
        
        alert('Invalid email or password');
      }
       // employer and jobseeker  sign up
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === values.email && u.password === values.password);

      if (user) {
        setIsLoggedIn(true);
        console.log('Signed in:', values);

        if (user.role === 'employer') {
          navigate('/ElandingPage'); 
        } else if (user.role === 'candidate') {
          navigate('/jobseeker-profile/:userId'); 
        } else {
          alert('Unknown role');
        }
      } else {
        alert('Invalid email or password');
      }
    },
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
