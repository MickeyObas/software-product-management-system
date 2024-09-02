import logo from './logo.svg';
import './App.css';
import { UserProvider } from './components/UserContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components 

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Services from './pages/Services';
import Workspace from './pages/Workspace';
import Boards from './pages/Boards';
import Board from './pages/Board';
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout';

// Utils
import ProtectedRoutes from './components/utils';


function App() {

  const isAuthenticated = () => {
    const token = localStorage.getItem('accessToken');
    return !!token;
  }


return (
  <div className="containerr">
  <UserProvider>
  <Router>
      <Routes>
 
        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path='/boards/:boardId/:boardTitle/' element={<Board />}/>
            <Route path=':username/boards' element={<Boards />} />
            <Route path='contact' element={<Contact />} />
            <Route path='services' element={<Services />} />
            <Route path='workspaces/:workspaceId' element={<Workspace />}/>
          </Route>
        </Route>

        {/* Public Routes */}
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

      </Routes>
    </Router>
  </UserProvider>
    
  </div>
);
}

export default App;
