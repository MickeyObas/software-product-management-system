import logo from './logo.svg';
import './App.css';

import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import RegistrationForm from './components/RegistrationForm';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {

  const isAuthenticated = () => {
    const token = localStorage.getItem('accessToken');
    return !!token;
  }

  const PrivateRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = !!(localStorage.getItem('accessToken'));
    
    return (
        <Route
            {...rest}
            element={isAuthenticated ? Component : <Navigate to="/login" />}
        />
    );
};

  return (
    <Router>
      <Routes>
        <Route path='/' element={isAuthenticated ? <Dashboard /> : <Navigate to='/login'/>}/>
        <Route path='/register' element={<RegistrationForm />}/>
        <Route path='/login' element={<LoginForm />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
      </Routes>
    </Router>
  )
}

export default App;
