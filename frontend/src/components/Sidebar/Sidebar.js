import React from "react";
import './Sidebar.css';
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../utils';

import settings_icon from '../assets/settings.png';
import members_icon from '../assets/meeting.png';
import board_icon from '../assets/blackboard.png';
import board_icon_white from '../assets/blackboard-white.png';

function Sidebar() {

  const navigate = useNavigate();

  const [workspaces, setWorkspaces] = useState([]);
  const [openWorkspaceId, setOpenWorkspaceId] = useState(null);

    useEffect(() => {
        const fetchWorkspaces = async () => {
            try {
                const response = await fetchWithAuth('http://localhost:8000/api/workspaces/', {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                console.log(data)
                setWorkspaces(data);
            } catch (error) {
                console.error("Error fetching workspaces:", error);
            }
        };

        fetchWorkspaces();
    }, []);

    const handleWorkspaceClick = (id) => {
      console.log(id)
      setOpenWorkspaceId(openWorkspaceId === id ? null : id);
    }

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
        {workspaces.map((workspace, idx) => (
          <div className="workspace-item" onClick={() => handleWorkspaceClick(workspace.id)}>
          <div className="title-bar">
            <div className="icon"></div>
            <div>{workspace.title}</div>
          </div>
            {openWorkspaceId === workspace.id && (
                <ul className="workspace-dropdown-menu">
                  <li>
                  <NavLink to={`${workspace.id}/boards/`}><img src={board_icon} alt="board" className="default-icon"/>Boards</NavLink></li>
                  <li><NavLink to={`${workspace.id}/members/`}><img src={members_icon} alt="members"/>Members</NavLink></li>
                  <li><NavLink to={`${workspace.id}/settings/`}><img src={settings_icon} alt="settings"/>Settings</NavLink></li>
                </ul>
              )}
          </div>
        ))}
        </div>
      </nav>
    </div>
  )
}

export default Sidebar;