import React from "react";
import './Sidebar.css';
import { NavLink } from 'react-router-dom';


function Sidebar() {
  return (
    <div className="sidebar">
      <h3>My Sidebar</h3>
      <nav>
        <NavLink
        exact="true"
        to="/" 
        className={({isActive}) => isActive ? 'active-link' : ''}
        >
          Home
        </NavLink>
        <NavLink to="/about" className={({isActive}) => isActive ? 'active=link' : ''}>
          About
        </NavLink>
        <NavLink to="/services" className={({isActive}) => isActive ? 'active=link' : ''}>
          Services
        </NavLink>
        <NavLink to="/contact" className={({isActive}) => isActive ? 'active=link' : ''}>
          Contact
        </NavLink>
      </nav>
    </div>
  )
}

export default Sidebar;