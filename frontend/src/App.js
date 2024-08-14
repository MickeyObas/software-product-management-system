import logo from './logo.svg';
import './App.css';

import Dashboard from './components/Dashboard';
import Login from './pages/Login';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';

function App() {

  const isAuthenticated = () => {
    const token = localStorage.getItem('accessToken');
    return !!token;
  }

  /* const PrivateRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = !!(localStorage.getItem('accessToken'));
    
    return (
        <Route
            {...rest}
            element={isAuthenticated ? Component : <Navigate to="/login" />}
        />
    );
}; */

  return (
    <Router>
      <Routes>
        <Route path='/' element={isAuthenticated() ? <Dashboard /> : <Navigate to='/login'/>}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
      </Routes>
    </Router>
  )
}

export default App;
