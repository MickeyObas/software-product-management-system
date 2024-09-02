import React, { useState } from "react";

import elipsis_icon from '../components/assets/more.png';
import plus_icon from '../components/assets/plus-white.png';
import close_icon from '../components/assets/close.png';

export default function List({
    listId,
    setIsAddingCard,
    isAddingCard,
    cards
}){

    const [cardTitle, setCardTitle] = useState('');

    const handleAddCardClick = () => {
        setIsAddingCard((ac) => {
            return {
                status: true,
                index: listId
            }
        })
    };

    const handleAddCard = (e) => {
        e.preventDefault();
        console.log("Added card: ", cardTitle);
        setCardTitle('');
        setIsAddingCard(false);
    };

    const handleCancel = () => {
        setIsAddingCard(false);
    };

    const handleTitleChange = (e) => {
        setCardTitle(e.target.value);
    }

    return (
    <li className="list-item" data-index="1">
    <div className="list-item-container">
        <div className="list-item-header">
            <h2>My List</h2>
            <img src={elipsis_icon} alt="elipsis-icon" className="list-item-menu"/>
        </div>
        <ol className="list-cards-container">
            {cards && cards.map((card, idx) => (
                <li className="list-card">{card}</li>
            ))}
            {(isAddingCard.status && isAddingCard.index === listId) ? (
            <li className="add-card-item">
                <form>
                    <textarea
                    placeholder="Enter a name for this card..." draggable="false"
                    onChange={handleTitleChange}
                    ></textarea>
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
    )


}