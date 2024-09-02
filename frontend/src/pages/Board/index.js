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

import { fetchWithAuth } from "../../components/utils";

export default function Board(){

    const [isAddingCard, setIsAddingCard] = useState(false);
    const [cardTitle, setCardTitle] = useState('');

    const handleAddCardClick = () => {
        setIsAddingCard(true);
    };

    const handleAddCard = (e) => {
        e.preventDefault();
        // Logic to add the card goes here
        console.log('Card Added:', cardTitle);
        console.log(e.target.closest(".list-item").dataset.index);
        // Reset the state
        setCardTitle('');
        setIsAddingCard(false);
    };

    const handleCancel = () => {
        setIsAddingCard(false);
    };

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
                    <li className="list-item" data-index="1">
                        <div className="list-item-container">
                            <div className="list-item-header">
                                <h2>My List</h2>
                                <img src={elipsis_icon} alt="elipsis-icon" className="list-item-menu"/>
                            </div>
                            <ol className="list-cards-container">
                                <li className="list-card">My First Card</li>
                                <li className="list-card">My First Card</li>
                                <li className="list-card">My First Card</li>
                                {isAddingCard ? (
                                <li className="add-card-item">
                                    <form>
                                        <textarea placeholder="Enter a name for this card..." draggable="false"></textarea>
                                        <div className="bar">
                                            <button onClick={(e)=> handleAddCard(e)}>Add card</button>
                                            <img src={close_icon} alt="close-icon"
                                            onClick={handleCancel}
                                            />
                                        </div>
                                    </form>
                                </li> 
                                ) : (
                                <div className="list-item-footer">
                                    <button onClick={handleAddCardClick}>
                                        <img src={plus_icon} alt="plus-icon"/>
                                        <span>Add a card</span>
                                    </button>
                                </div>
                                )}
                            </ol>
                        </div>
                    </li>
                    <li className="list-item">
                        <div className="list-item-container">
                            <div className="list-item-header">
                                <h2>My List</h2>
                                <img src={elipsis_icon} alt="elipsis-icon" className="list-item-menu"/>
                            </div>
                            <ol className="list-cards-container">
                                <li className="list-card">My First Card</li>
                                <li className="add-card-item">
                                    <form>
                                        <textarea placeholder="Enter a name for this card..." draggable="false"></textarea>
                                        <div className="bar">
                                            <button>Add card</button>
                                            <img src={close_icon} alt="close-icon"/>
                                        </div>
                                    </form>
                                </li>
                            </ol>
                            <div className="list-item-footer">
                                <button>
                                    <img src={plus_icon} alt="plus-icon"/>
                                    <span>Add a card</span>
                                </button>
                            </div>
                        </div>
                    </li>
                    <li className="list-item">
                        <div className="list-item-container">
                            <div className="list-item-header">
                                <h2>My List</h2>
                                <img src={elipsis_icon} alt="elipsis-icon" className="list-item-menu"/>
                            </div>
                            <ol className="list-cards-container">
                                <li className="list-card">My First Card</li>
                                <li className="list-card">My First Card</li>
                                <li className="list-card">My First Card</li>
                                <li className="add-card-item">
                                    <form>
                                        <textarea placeholder="Enter a name for this card..." draggable="false"></textarea>
                                        <div className="bar">
                                            <button>Add card</button>
                                            <img src={close_icon} alt="close-icon"/>
                                        </div>
                                    </form>
                                </li>
                            </ol>
                            <div className="list-item-footer">
                                <button>
                                    <img src={plus_icon} alt="plus-icon"/>
                                    <span>Add a card</span>
                                </button>
                            </div>
                        </div>
                    </li>
                    <li className="list-item">
                        <div className="list-item-container">
                            <div className="list-item-header">
                                <h2>My List</h2>
                                <img src={elipsis_icon} alt="elipsis-icon" className="list-item-menu"/>
                            </div>
                            <ol className="list-cards-container">
                                <li className="list-card">My First Card</li>
                                <li className="list-card">My First Card</li>
                                <li className="list-card">My First Card</li>
                                <li className="list-card">My First Card</li>
                                <li className="list-card">My First Card</li>
                                <li className="add-card-item">
                                    <form>
                                        <textarea placeholder="Enter a name for this card..." draggable="false"></textarea>
                                        <div className="bar">
                                            <button>Add card</button>
                                            <img src={close_icon} alt="close-icon"/>
                                        </div>
                                    </form>
                                </li>
                            </ol>
                            <div className="list-item-footer">
                                <button>
                                    <img src={plus_icon} alt="plus-icon"/>
                                    <span>Add a card</span>
                                </button>
                            </div>
                        </div>
                    </li>
                    <li className="list-item">
                        <div className="list-item-container">
                            <div className="list-item-header">
                                <h2>My List</h2>
                                <img src={elipsis_icon} alt="elipsis-icon" className="list-item-menu"/>
                            </div>
                            <ol className="list-cards-container">
                                <li className="list-card">My First Card</li>
                                <li className="list-card">My First Card</li>
                                <li className="list-card">My First Card</li>
                                <li className="add-card-item">
                                    <form>
                                        <textarea placeholder="Enter a name for this card..." draggable="false"></textarea>
                                        <div className="bar">
                                            <button>Add card</button>
                                            <img src={close_icon} alt="close-icon"/>
                                        </div>
                                    </form>
                                </li>
                            </ol>
                            <div className="list-item-footer">
                                <button>
                                    <img src={plus_icon} alt="plus-icon"/>
                                    <span>Add a card</span>
                                </button>
                            </div>
                        </div>
                    </li>
                </ol>
            </div>
        </div>
    )
}