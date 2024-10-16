import React, { useContext } from "react";
import './Sidebar.css';
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../utils';
import { UserContext } from "../UserContext";

import settings_icon from '../assets/settings.png';
import members_icon from '../assets/meeting.png';
import board_icon from '../assets/blackboard.png';
import board_icon_white from '../assets/blackboard-white.png';
import down_arrow from '../assets/down-arrow.png';
import down_arrow_white from '../assets/down-arrow-white.png';
import up_arrow from '../assets/upload.png';
import { useWorkspace } from "../WorkspaceContext";

function Sidebar() {

  const navigate = useNavigate();
  const {user, loading} = useContext(UserContext);
  const { currentWorkspace, setCurrentWorkspace } = useWorkspace();

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
                setWorkspaces(data);
            } catch (error) {
                console.error("Error fetching workspaces:", error);
            }
        };

        fetchWorkspaces();
    }, []);

    const handleWorkspaceClick = (id) => {
      setOpenWorkspaceId(openWorkspaceId === id ? null : id);
    }

    const handleBoardsClick = (workspace) => {
      setCurrentWorkspace(workspace);
      localStorage.setItem('currentWorkspace', JSON.stringify(workspace));
    }
  
  if(!user){
    return <h1>Loading</h1>
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
        <NavLink to={`${user.email}/boards`} className={({isActive}) => isActive ? 'active-link' : ''}>
          Boards
        </NavLink>
        <button onClick={() => {
          localStorage.clear()
          navigate('/login');
        }}>Logout</button>
        <hr />
        <div style={{"marginLeft": "4px", "marginBottom": "15px" ,"fontSize": "15px"}}>Workspaces</div>
        <div className="workspaces-list-container">
        {workspaces.map((workspace, idx) => (
          <div key={idx} className="workspace-item" onClick={() => handleWorkspaceClick(workspace.id)}>
          <div className={`title-bar ${currentWorkspace &&(currentWorkspace.id === workspace.id) ? 'current-workspace' : ''}`}>
            <div className="icon"></div>
            <div>{workspace.title}</div>
            <img src={openWorkspaceId === workspace.id ? up_arrow : down_arrow} alt="caret" />
          </div>
            {openWorkspaceId === workspace.id && (
                <ul className="workspace-dropdown-menu">
                  <li>
                  <NavLink to={`/workspaces/${workspace.id}/`} onClick={() => handleBoardsClick(workspace)}><img src={board_icon} alt="board" className="default-icon"/>Boards</NavLink></li>
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