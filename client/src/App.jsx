import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Signup from './pages/SignUp'; 
import SignIn from './pages/SignIn';
import EmployerLandingPage from './pages/EmployerLandingPage';
import PaymentPage from './pages/PaymentPage'; 
import MessagePage from './pages/MessagePage';
import AdminPage from "./pages/AdminPage";
import ViewJobseekerProfile from './pages/ViewJobseekerProfile';
import JobseekersProfile from './pages/JobseekersProfile';
import HomePage from './pages/HomePage';
import EmployerProfilePage from './pages/EmployerProfilePage';
import ResumeViewer from './pages/ResumeViewer';

import { ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  


function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
                <Route path="/signin" element={<SignIn />} />
               <Route path="/Elandingpage" element={<EmployerLandingPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/message/:profileId" element={<MessagePage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/jobseekerprofile" element={<JobseekersProfile />} />
                <Route path="/view-jobseeker-profile/:profileId" element={<ViewJobseekerProfile />} />
                <Route path="/employerprofile" element={<EmployerProfilePage />} />
                <Route path="/resume-view/:userId" element={<ResumeViewer />} />

            </Routes>
            <ToastContainer />
        </div>
    );
}

function handleSignup(newUser) {
    console.log('New user:', newUser);
}

export default App;
