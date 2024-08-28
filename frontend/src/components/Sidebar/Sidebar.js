import React from "react";
import './Sidebar.css';
import { NavLink, useNavigate } from 'react-router-dom';


function Sidebar() {

  const navigate = useNavigate();

  return (
    <div className="sidebar">
      {/* <h3>My Sidebar</h3> */}
      <nav>
        <NavLink
        exact="true"
        to="/" 
        className={({isActive}) => isActive ? 'active-link' : ''}
        >
          Home
        </NavLink>
        <NavLink to="/boards" className={({isActive}) => isActive ? 'active=link' : ''}>
          Boards
        </NavLink>
        <button onClick={() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          navigate('/login');
        }}>Logout</button>
        <hr />
        <div style={{"marginLeft": "4px", "marginBottom": "15px"}}>Workspaces</div>
        <div className="workspaces-list-container">
          <div className="workspace-item">
            <div className="icon"></div>
            <div>MickeyGooo's Workspace</div>
          </div>
          <div className="workspace-item">
            <div className="icon"></div>
            <div>MickeyGooo's Workspace</div>
          </div>
          <div className="workspace-item">
            <div className="icon"></div>
            <div>MickeyGooo's Workspace</div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar;