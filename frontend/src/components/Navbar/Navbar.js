import React from 'react'
import './Navbar.css';
import { useState, useEffect, useContext } from 'react';
import { fetchWithAuth } from '../utils';
import { useWorkspace } from '../WorkspaceContext';

import search_icon from '../assets/searchh.png';
import toggle_icon from '../assets/toggle.png';
import profile_icon from '../assets/profile.png';
import { NavLink, useNavigate } from 'react-router-dom';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { UserContext } from '../UserContext';
import { useProduct } from '../ProductContext';
import { FavoriteBoardsContext } from '../FavoriteBoardsContext';

function Navbar() {

  const [dropdown, setDropdown] = useState({
    open: false,
    index: null
  });
  const [workspaces, setWorkspaces] = useState([]);
  // const [favoriteBoards, setFavoriteBoards] = useState([]);

  const { favoriteBoards } = useContext(FavoriteBoardsContext);

  const [products, setProducts] = useState([]);
  const [recentlyViewedBoards, setRecentlyViewedBoards] = useState([]);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const { currentWorkspace, setCurrentWorkspace } = useWorkspace();
  const { currentProduct, setCurrentProduct } = useProduct();
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  }

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

  const handleWorkspaceSelect = (workspace) => {
    setCurrentWorkspace(workspace);
    localStorage.setItem('currentWorkspace', JSON.stringify(workspace));
    handleTabClick();
  }

  const handleProductSelect = (product) => {
    setCurrentProduct(product);
    localStorage.setItem('currentProduct', JSON.stringify(product));
    handleTabClick();
  }

  useEffect(() => {
    fetchWithAuth('http://localhost:8000/api/boards/favorite-boards/')  // Endpoint to get user's favorite boards
      .then(response => response.json())
      // .then(data => setFavoriteBoards(data))
      .catch(error => console.error('Error fetching favorite boards:', error));
  }, []);

  useEffect(() => {
    // Function to fetch recently viewed boards
    const fetchRecentlyViewedBoards = async () => {
      try {
        const response = await fetchWithAuth('http://localhost:8000/api/boards/recently-viewed/', {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          setRecentlyViewedBoards(data); // Store the boards in the state
        } else {
          console.error('Failed to fetch recently viewed boards:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching recently viewed boards:', error);
      }
    };

    fetchRecentlyViewedBoards();
  }, []); // Empty dependency array to run once when component mounts
  

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

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await fetchWithAuth('http://localhost:8000/api/products/', {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    fetchProducts();
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
                      <div className='title'>{currentWorkspace ?currentWorkspace.title : 'No Workspace Selected Yet'}</div>
                    </div>
                  </div>
                  <hr className='dropdown-divider'/>
                  <div className='workspaces-dropdown-tab'>
                    <div className='title-text'>Your Workspaces</div>
                    {workspaces && workspaces.map((workspace, idx) => (
                      <div
                      className='workspaces-dropdown-sub-tab'
                      onClick={() => handleWorkspaceSelect(workspace)}
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
              <a href="/" onClick={(e) => handleDropdownClick(e, 1)}>Products</a>
              {(dropdown.open && dropdown.index === 1) && (
                <ul className='dropdown-menuu'>
                  <div className='products-dropdown-tab'>
                    <div className='title-text'>Current Product</div>
                    <div className='products-dropdown-sub-tab'>
                      <div className='icon'></div>
                      <div className='title'>{currentProduct ?currentProduct.title : 'No Product Selected Yet'}</div>
                    </div>
                  </div>
                  <hr className='dropdown-divider'/>
                  <div className='products-dropdown-tab'>
                    <div className='title-text'>Your Products</div>
                    {products && products.map((product, idx) => (
                      <div
                      className='products-dropdown-sub-tab'
                      onClick={() => handleProductSelect(product)}
                      >
                      <div className='icon'></div>
                      <div className='title'>
                        <NavLink
                        to={`/${user.email}/boards`}
                        >{product.title}</NavLink>
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
              <a href="/" onClick={(e) => handleDropdownClick(e, 2)}>Recents</a>
              {(dropdown.open && dropdown.index === 2) && (
                <ul className='dropdown-menuu'>
                  {recentlyViewedBoards && recentlyViewedBoards.map((board, idx) => (
                    <NavLink
                    className='recent-dropdown-tab'
                    to={`/boards/${board.id}/${board.title}/`}
                    onClick={handleTabClick}
                    >
                      <div className='icon'></div>
                      <div className='title-block'>
                        <div className='title'>{board.title}</div>
                        <div className='subtitle'>{board.workspace_title}</div>
                      </div>
                    </NavLink>
                  ))} 
                </ul>
              )}
            </li>
            <li className='head-link'>
              <a href="/" onClick={(e) => handleDropdownClick(e, 3)}>Starred</a>
              {(dropdown.open && dropdown.index === 3) && (
                <ul className='dropdown-menuu favorites'>
                  {!favoriteBoards.length > 0 ? (
                    <p className='starred-text'>Star important boards to access them quickly and easily.</p>
                  ) : (favoriteBoards.map((board, idx) => (
                    <NavLink
                    className='favorites-dropdown-tab'
                    to={`/boards/${board.id}/${board.title}/`}
                    onClick={handleTabClick}
                    >
                      <div className='icon'></div>
                      <div className='title-block'>
                        <div className='title'>{board.title}</div>
                        <div className='subtitle'>{board.workspace_title}</div>
                      </div>
                    </NavLink>
                  )))}
                </ul>
              )}
            </li>
        </ul>
        <div className='search-box'>
            <input type="text" placeholder='Search'/>
            <img src={search_icon} alt='search icon'/>
        </div>
        <img
        src={profile_icon}
        alt=""
        className='profile-icon'
        onClick={toggleSideMenu}
        />
        <ProfileMenu isSideMenuOpen={isSideMenuOpen} setIsSideMenuOpen={setIsSideMenuOpen} />
    </div>
  )
}

export default Navbar