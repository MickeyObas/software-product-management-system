import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './DashboardLayout.css';


// Components
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';


function DashboardLayout() {

    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
            <Navbar /> {/* Navbar at the top */}
            <div className="main-container">
                <Sidebar /> {/* Sidebar on the left */}
                <div className="dashboard-content">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout;