import { useState, useContext } from 'react';
import './ProfileMenu.css';
import { NavLink, useNavigate } from 'react-router-dom';

import AddProduct from '../../pages/AddProduct';
import { useWorkspace } from '../WorkspaceContext';
import { UserContext } from '../UserContext';

function ProfileMenu({isSideMenuOpen, setIsSideMenuOpen}) {

  const handleTabClick = () => {
    setIsSideMenuOpen(false);
  }

  const { currentWorkspace } = useWorkspace();
  const {user, loading} = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div>
      {isSideMenuOpen && (
        <div className="menu-modal">
            <div className='account-container'>
                <div className='just-flex-bruh'>
                    <div className='icon'></div>
                    <div className='name-bar'>
                        <div className='username'>{user.first_name} {user.last_name}</div>
                        <div className='email'>{user.email}</div>
                    </div>
                </div>
            </div>
            <div className='links-container'>
                <a href=''>Switch accounts</a>
                <a href=''>Manage account</a>
                <hr />
                <NavLink
                to={`workspaces/add-product/`}
                onClick={handleTabClick}
                >Add Product</NavLink>
                <NavLink
                to={`workspaces/add-workspace/`}
                onClick={handleTabClick}
                >Create Workspace</NavLink>
                <hr />
                <a href=''>Settings</a>
                <button onClick={() => {
                  localStorage.clear()
                  navigate('/login');
                }}>Logout</button>
            </div>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
