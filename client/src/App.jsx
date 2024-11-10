import { Route, Routes, Link } from 'react-router-dom';
import Signup from './pages/SignUp'; 
import SignIn from './pages/SignIn';
import EmployerLandingPage from './pages/EmployerLandingPage';
import PaymentPage from './pages/PaymentPage';  

function App() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/ELandingPage" element={<EmployerLandingPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </div>
  );
}

function handleSignup(newUser) {
  console.log('New user:', newUser);
}

export default App;