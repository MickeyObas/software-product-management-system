import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import './styles.css';

import star_icon from '../../components/assets/star.png';
import filled_star_icon from '../../components/assets/star-filled.png';
import people_icon from '../../components/assets/people.png';
import profile_icon from '../../components/assets/profile.png';
import add_member_icon from '../../components/assets/add-user.png';
import elipsis_icon from '../../components/assets/more.png';
import plus_icon from '../../components/assets/plus-white.png';
import close_icon from '../../components/assets/close.png';

import List from "../../components/List";
import { fetchWithAuth } from "../../components/utils";
import { useContext } from "react";
import { FavoriteBoardsContext } from "../../components/FavoriteBoardsContext";

export default function Board(){

    const [isFavorite, setIsFavorite] = useState(false);
    const {boardId,  boardTitle} = useParams();

    const { favoriteBoards, updateFavoriteBoards } = useContext(FavoriteBoardsContext);

    const dummyLists = [
        {id: 1, cards:["Card 1", "Card 2", "Card 3", "Another Card"]},
        {id: 2, cards: ["Card 1"]},
        {id: 3, cards: ["Card 1", "Card 2"]},
        {id: 3, cards: ["Card 1", "Card 2", "Card 3"]},
    ]

    const [lists, setLists] = useState();
    const [isAddingCard, setIsAddingCard] = useState({
        status: false,
        index: null
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        console.log("Favorite boards updated: ", favoriteBoards); 
        const boardIsFavorite = favoriteBoards.some(board => String(board.id) === String(boardId));
        console.log(boardIsFavorite);
        setIsFavorite(boardIsFavorite);
      }, [favoriteBoards, boardId]);
    
      const handleToggleFavorite = () => {
        updateFavoriteBoards(boardId);
      };

    /* useEffect(() => {
        const fetchFavoriteStatus = async () => {
          try {
            const response = await fetchWithAuth(`http://localhost:8000/api/boards/${boardId}/is-favorite/`);
            const data = await response.json();
            setIsFavorite(data.is_favorite);  // Update favorite status based on API response
          } catch (error) {
            console.error('Error fetching favorite status:', error);
          }
        };
    
        fetchFavoriteStatus();
      }, [boardId]); */
      

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const response = await fetchWithAuth(`http://localhost:8000/api/boards/${boardId}/lists/`);
                if (response.ok) {
                    const data = await response.json();
                    setLists(data);
                } else {
                    setError('Failed to fetch lists.');
                }
            } catch (err) {
                setError('An error occurred while fetching lists.');
            } finally {
                setLoading(false);
            }
        };

        fetchLists();

        const updateRecentlyViewed = async () => {
            try {
              const updateResponse = await fetchWithAuth(`http://localhost:8000/api/boards/${boardId}/update-recently-viewed/`, {
                method: 'POST',
              });
      
              if (!updateResponse.ok) {
                console.error('Failed to update recently viewed boards');
              }
            } catch (error) {
              console.error('Error updating recently viewed board:', error);
            }
          };
      
          // Update recently viewed board
          updateRecentlyViewed();
    }, [boardId]);

    /* const handleToggleFavorite = () => {
        fetchWithAuth('http://localhost:8000/api/boards/toggle-favorite/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ board_id: boardId }),
        })
        .then(() => {
          setIsFavorite(!isFavorite);  // Toggle the favorite status in the UI
        })
        .catch(error => console.error('Error toggling favorite:', error));
      }; */

    return (
        <div className="board-content">
            <div className="board-header">
                <h5>{boardTitle}</h5>
                <img className="favourite-button"
                src={isFavorite ? filled_star_icon : star_icon} alt="star-icon"
                onClick={handleToggleFavorite}
                />
                <img className="members-button" src={people_icon} alt="people-icon"/>
                <img className="profile-button" src={profile_icon} alt="people-icon"/>
                <button className="add-member-button">
                    <img src={add_member_icon} alt="add-member-icon"/>
                    <span>Share</span>
                </button>
                <img className="toggleSideMenuButton" src={elipsis_icon} alt="elipsis-icon"/>
            </div>
            <div className="board-container">
                <ol className="board">
                    {lists && lists.map((list, idx) => (
                        <List key={idx}
                        listId={list.id}
                        list={list}
                        setIsAddingCard={setIsAddingCard}
                        isAddingCard={isAddingCard}
                        cards={list.cards}
                        />
                    ))}
                </ol>
            </div>
        </div>
    )
}