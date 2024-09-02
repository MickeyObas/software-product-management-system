import React from 'react'
import './Navbar.css';
import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../utils';

import search_icon from '../assets/searchh.png';
import toggle_icon from '../assets/toggle.png';
import profile_icon from '../assets/profile.png';
import { NavLink } from 'react-router-dom';

function Navbar() {

  const [dropdown, setDropdown] = useState({
    open: false,
    index: null
  });
  const [workspaces, setWorkspaces] = useState([]);


  const handleDropdownClick = (e, index) => {
    e.preventDefault();
    setDropdown((d) => {
      if(d.index === index){
        return {
          open: false,
          index: null
        }
      } else{
        return {
          open: true,
          index: index
        }
      }
    })
  }

  const handleTabClick = () => {
    setDropdown({
      open: false,
      index: null
    });
  };

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


  useEffect(() => {
    document.addEventListener('click', (e) => {
      const navbar = document.querySelector('.navigation-bar');
      if(navbar){
        const isClickInsideNavbar = navbar.contains(e.target);
        if(!isClickInsideNavbar){
          setDropdown({
            open: false,
            index: null
          })
        }
      }
    });
  }, []);

  useEffect(() => {

  });

  return (
    <div className='navigation-bar'>
        <h5 className='logo'>SPM</h5>
        <ul className='navigation-bar-links'>
            <li className='head-link'>
              <a href="/" onClick={(e) => handleDropdownClick(e, 0)}>Workspaces</a>
              {(dropdown.open && dropdown.index === 0) && (
                <ul className='dropdown-menuu'>
                  <div className='workspaces-dropdown-tab'>
                    <div className='title-text'>Current Workspace</div>
                    <div className='workspaces-dropdown-sub-tab'>
                      <div className='icon'></div>
                      <div className='title'>Mickey's Workspace</div>
                    </div>
                  </div>
                  <hr className='dropdown-divider'/>
                  <div className='workspaces-dropdown-tab'>
                    <div className='title-text'>Your Workspaces</div>
                    {workspaces && workspaces.map((workspace, idx) => (
                      <div
                      className='workspaces-dropdown-sub-tab'
                      onClick={handleTabClick}
                      >
                      <div className='icon'></div>
                      <div className='title'>
                        <NavLink
                        to={`workspaces/${workspace.id}`}
                        >{workspace.title}</NavLink>
                      </div>
                    </div>
                    ))}
                  </div>          
                  {/* <li><a href='/'>My Workspaces</a></li>
                  <hr className='dropdown-divider'/>
                  <li><a href='/'>Recent Workspaces</a></li> */}
                </ul>
              )}
            </li>
            <li className='head-link'>
              <a href="/" onClick={(e) => handleDropdownClick(e, 1)}>Recents</a>
              {(dropdown.open && dropdown.index === 1) && (
                <ul className='dropdown-menuu'>
                  <div className='recent-dropdown-tab'>
                    <div className='icon'></div>
                    <div className='title-block'>
                      <div className='title'>Testing 5 Product Management</div>
                      <div className='subtitle'>MickeyGooo's Workspace</div>
                    </div>
                  </div>
                  <div className='recent-dropdown-tab'>
                    <div className='icon'></div>
                    <div className='title-block'>
                      <div className='title'>Testing 5 Product Management</div>
                      <div className='subtitle'>MickeyGooo's Workspace</div>
                    </div>
                  </div>
                  <div className='recent-dropdown-tab'>
                    <div className='icon'></div>
                    <div className='title-block'>
                      <div className='title'>Testing 5 Product Management</div>
                      <div className='subtitle'>MickeyGooo's Workspace</div>
                    </div>
                  </div>
                  <div className='recent-dropdown-tab'>
                    <div className='icon'></div>
                    <div className='title-block'>
                      <div className='title'>Testing 5 Product Management</div>
                      <div className='subtitle'>MickeyGooo's Workspace</div>
                    </div>
                  </div>
                  <div className='recent-dropdown-tab'>
                    <div className='icon'></div>
                    <div className='title-block'>
                      <div className='title'>Testing 5 Product Management</div>
                      <div className='subtitle'>MickeyGooo's Workspace</div>
                    </div>
                  </div>
                  <div className='recent-dropdown-tab'>
                    <div className='icon'></div>
                    <div className='title-block'>
                      <div className='title'>Testing 5 Product Management</div>
                      <div className='subtitle'>MickeyGooo's Workspace</div>
                    </div>
                  </div>
                </ul>
              )}
            </li>
            <li className='head-link'>
              <a href="/" onClick={(e) => handleDropdownClick(e, 2)}>Starred</a>
              {(dropdown.open && dropdown.index === 2) && (
                <ul className='dropdown-menuu'>
                  <p className='starred-text'>Star important boards to access them quickly and easily.</p>
                </ul>
              )}
            </li>
        </ul>
        <div className='search-box'>
            <input type="text" placeholder='Search'/>
            <img src={search_icon} alt='search icon'/>
        </div>
        <img src={profile_icon} alt="" className='profile-icon'/>
    </div>
  )
}

export default Navbar