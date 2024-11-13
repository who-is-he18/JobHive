import { Route, Routes, Link } from 'react-router-dom';
import Signup from './pages/SignUp'; 
import SignIn from './pages/SignIn';
import EmployerLandingPage from './pages/EmployerLandingPage';
import PaymentPage from './pages/PaymentPage'; 
import MessagePage from './pages/MessagePage' 
import AdminPage from "./pages/AdminPage";
import ViewJobseekerProfile from './pages/components/JobseekerProfile/ViewJobseekerProfile.jsx';
import JobseekerProfile from './pages/components/JobseekerProfile/JobseekerProfile.jsx';
function App() {
    return (
        <div>
        <Routes>
            <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/ELandingPage" element={<EmployerLandingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/message" element={<MessagePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/jobseeker-profile" element={<JobseekerProfile />} />
            <Route path="/view-jobseeker-profile" element={<ViewJobseekerProfile />} />
        </Routes>

        </div>
    );
}

function handleSignup(newUser) {
    console.log('New user:', newUser);
}

export default App;