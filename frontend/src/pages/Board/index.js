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

    const [lists, setLists] = useState([
        {id: 1, cards:["Card 1", "Card 2", "Card 3", "Another Card"]},
        {id: 2, cards: ["Card 1"]},
        {id: 3, cards: ["Card 1", "Card 2"]},
        {id: 3, cards: ["Card 1", "Card 2", "Card 3"]},
    ]);
    const [isAddingCard, setIsAddingCard] = useState({
        status: false,
        index: null
    });

    return (
        <div className="board-content">
            <div className="board-header">
                <h5>Board Title</h5>
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
                        listId={idx}
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