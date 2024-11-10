import { Route, Routes, Link } from 'react-router-dom';
import Signup from './pages/SignUp'; 
import SignIn from './pages/SignIn';  

function App() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

function handleSignup(newUser) {
  console.log('New user:', newUser);
}

export default App;
