import React from 'react'
import './Navbar.css';

import search_icon from '../assets/searchh.png';
import toggle_icon from '../assets/toggle.png';
import profile_icon from '../assets/profile.png';

function Navbar() {
  return (
    <div className='navigation-bar'>
        {/* <img src="" alt="" className='logo'/> */}
        <h5 className='logo'>SPM</h5>
        <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Features</li>
            <li>About</li>
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