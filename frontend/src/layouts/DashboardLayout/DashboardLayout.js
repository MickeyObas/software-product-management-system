import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './DashboardLayout.css';

// Components
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';


function DashboardLayout() {
    const location = useLocation();
    const isAddProductPage = location.pathname.includes('/add-product/');
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
            <Navbar /> {/* Navbar at the top */}
            <div className="main-container">
                <Sidebar /> {/* Sidebar on the left */}
                <div className="dashboard-content" style={{
                    paddingTop: isAddProductPage ? "35px" : "0px",
                    paddingBottom: isAddProductPage ? "70px" : "0px"
                }}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout;