import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components 
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Services from './pages/Services';
import Dashboard from './pages/Dashboard';


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
  <div className="containerr">
    <Router>
      <Routes>
        <Route path='/' element={isAuthenticated() ? <Dashboard /> : <Navigate to='/login' />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<ProtectedRoute element={<Dashboard />}/>}/>
      </Routes>
    </Router>
  </div>
);
}

export default App;
