import React from 'react'
import { useState } from 'react';
import './Navbar.css';

import search_icon from '../assets/searchh.png';
import toggle_icon from '../assets/toggle.png';
import profile_icon from '../assets/profile.png';

function Navbar() {

  const [dropdown, setDropdown] = useState({
    open: false,
    index: null
  });


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
                    <div className='workspaces-dropdown-sub-tab'>
                      <div className='icon'></div>
                      <div className='title'>Mickey's Workspace</div>
                    </div>
                  </div>
                  <div className='workspaces-dropdown-tab'>
                    <div className='workspaces-dropdown-sub-tab'>
                      <div className='icon'></div>
                      <div className='title'>Mickey's Workspace</div>
                    </div>
                  </div>
                  <div className='workspaces-dropdown-tab'>
                    <div className='workspaces-dropdown-sub-tab'>
                      <div className='icon'></div>
                      <div className='title'>Mickey's Workspace</div>
                    </div>
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