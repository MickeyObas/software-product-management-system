import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import './styles.css';

import star_icon from '../../components/assets/star.png';
import people_icon from '../../components/assets/people.png';
import profile_icon from '../../components/assets/profile.png';
import add_member_icon from '../../components/assets/add-user.png';
import elipsis_icon from '../../components/assets/more.png';
import plus_icon from '../../components/assets/plus-white.png';
import close_icon from '../../components/assets/close.png';

import List from "../../components/List";
import { fetchWithAuth } from "../../components/utils";

export default function Board(){

    const {boardId,  boardTitle} = useParams();

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

    return (
        <div className="board-content">
            <div className="board-header">
                <h5>{boardTitle}</h5>
                <img className="favourite-button" src={star_icon} alt="star-icon"/>
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