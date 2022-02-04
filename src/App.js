import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Login from './components/signup&auth/login'
import Signup from '../src/components/signup&auth/signup'
import Confirmation from '../src/components/signup&auth/confirmation'
import SignupAndAuthState from '../src/context/signup&auth/state'
import setAuthToken from '../src/utils/setAuthToken'
import Profile from '../src/components/dashboard/profile'
import PrivateRoute from '../src/components/guard'

if (localStorage.ctoken) {
  setAuthToken(localStorage.ctoken)
}

const App = () => {

  return (
    <SignupAndAuthState>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/confirmation/:confirmation" element={<Confirmation />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </SignupAndAuthState>
  )
}




export default App;
