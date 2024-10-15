import React, { useEffect, useState } from "react";
import { useDrop } from 'react-dnd';

import elipsis_icon from '../components/assets/more.png';
import plus_icon from '../components/assets/plus-white.png';
import close_icon from '../components/assets/close.png';

import { fetchWithAuth } from "./utils";
import { useParams } from "react-router-dom";

import Card from "./Card";

export default function List({
    listId,
    list,
    setIsAddingCard,
    isAddingCard,
    onCardDrop
}){

    const {boardId} = useParams();
    const [listData, setListData] = useState(null);
    const [newCardTitle, setNewCardTitle] = useState('');
    const cards = listData ? listData.cards : [];

    const [{ isOver }, drop] = useDrop({
        accept: 'CARD',
        drop: (item) => {
            if (item.listId !== listId) {
                onCardDrop(item.cardId, item.listId, listId);
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    useEffect(() => {
        const fetchListData = async () => {
            try{
                const response = await fetchWithAuth(`http://localhost:8000/api/boards/${boardId}/lists/${listId}/`); 
                if(response.ok){
                    const data = await response.json();
                    setListData(data);
                    console.log(data);
                }else{
                    console.log("Whoops, something went wrong with ListData");
                }
            } catch(err){
                console.log("Error", err);
            };
        };

        fetchListData();

    }, [listId, boardId]);

    const handleAddCardClick = () => {
        setIsAddingCard((ac) => {
            return {
                status: true,
                index: listId
            }
        })
    };

    const handleAddCard = async (e) => {
        e.preventDefault();

        try{
            const response = await fetchWithAuth(`http://localhost:8000/api/boards/${boardId}/lists/${listId}/cards/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    title: newCardTitle
                }),
            });

            if (response.ok) {
                const newCard = await response.json();
                setListData((prevListData) => ({
                    ...prevListData,
                    cards: [...prevListData.cards, newCard],
                }));
                setNewCardTitle('');
                setIsAddingCard(false);
            } else {
                console.log("Failed to add card");
            }
        } catch (err) {
            console.log("Error adding card:", err);
        }
    };

    const handleCancel = () => {
        setIsAddingCard(false);
    };

    const handleTitleChange = (e) => {
        setNewCardTitle(e.target.value);
    }

    return (
    <li ref={drop} className="list-item" data-index="1">
    <div className="list-item-container">
        <div className="list-item-header">
            <h2>{listData ? listData.title : 'Title'}</h2>
            <img src={elipsis_icon} alt="elipsis-icon" className="list-item-menu"/>
        </div>
        <ol className={`list-cards-container ${isOver ? 'hover' : ''}`}>
            {cards && cards.map((card, idx) => (
                <Card 
                card={card}
                listTitle={list.title}
                listId={list.id}    
                />
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