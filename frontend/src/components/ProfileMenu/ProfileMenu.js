import { useState } from 'react';
import './ProfileMenu.css';
import { NavLink } from 'react-router-dom';

import AddProduct from '../../pages/AddProduct';
import { useWorkspace } from '../WorkspaceContext';

function ProfileMenu({isSideMenuOpen, setIsSideMenuOpen}) {

  const handleTabClick = () => {
    setIsSideMenuOpen(false);
  }

  const { currentWorkspace } = useWorkspace();

  return (
    <div>
      {isSideMenuOpen && (
        <div className="menu-modal">
            <div className='account-container'>
                <div className='just-flex-bruh'>
                    <div className='icon'></div>
                    <div className='name-bar'>
                        <div className='username'>MickeyGooo</div>
                        <div className='email'>mikhzobby@gmail.com</div>
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
                <a href=''>Create Workspace</a>
                <hr />
                <a href=''>Settings</a>
                <a href=''>Logout</a>
            </div>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
