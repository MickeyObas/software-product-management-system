import React from "react";
import './Sidebar.css';
import { NavLink } from 'react-router-dom';


function Sidebar() {
  return (
    <div className="sidebar">
      <h2>My Sidebar</h2>
      <nav>
        <NavLink exact to="/" activeClassName="active-link">
          Home
        </NavLink>
        <NavLink to="/about" activeClassName="active-link">
          About
        </NavLink>
        <NavLink to="/services" activeClassName="active-link">
          Services
        </NavLink>
        <NavLink to="/contact" activeClassName="active-link">
          Contact
        </NavLink>
      </nav>
    </div>
  )
}

export default Sidebar;