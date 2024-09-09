import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import clock_icon from '../assets/clock.png';
import { fetchWithAuth } from '../utils';
import './RecentlyViewedSidebar.css';


export default function RecentlyViewedSidebar(){
    const [recentlyViewedBoards, setRecentlyViewedBoards] = useState([]);

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

    return (
        <div className="recently-viewed-section">
            <div className="recently-viewed-header">
                <img src={clock_icon} alt="clock icon"/>
                <p>Recently viewed</p>
            </div>
            {recentlyViewedBoards && recentlyViewedBoards.map((board) => (
                <div className="recently-viewed-tab">
                <div className="icon"></div>
                <div className="title-block">
                    <div className="title">{board.title}</div>
                    <div className="subtitle">{board.product.title}</div>
                    <div className="subtitle">{board.workspace_title}</div>
                </div>
            </div>
            ))}
        </div>
    )
}

