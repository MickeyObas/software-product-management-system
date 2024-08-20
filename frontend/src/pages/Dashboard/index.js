import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

// Components
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';

import './styles.css'; // Assuming you have some styles for the dashboard

function Dashboard() {

  console.log("Dashboard reached finally")
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <Navbar /> {/* Navbar at the top */}
      <div className="main-container">
        <Sidebar /> {/* Sidebar on the left */}
        <div className="dashboard-content">
          {/* Your dashboard content goes here */}
          <h1>Welcome to the Dashboard</h1>
          <button onClick={() => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate('/login');
          }}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
