import React, { useState } from "react";
import { useDrag } from 'react-dnd';

import Modal from "./Modal/Modal";
import CardDescription from "./CardDescription";
import member_icon from './assets/user.png';
import user_icon from './assets/profile-user.png';
import label_icon from './assets/price-tag.png';
import list_icon from './assets/to-do-list.png';
import attachment_icon from './assets/attach-file.png';
import cover_icon from './assets/background.png';
import share_icon from './assets/share.png';
import archive_icon from './assets/folder.png';
import delete_icon from './assets/bin.png';
import { fetchWithAuth } from "./utils";

export default function Card({card, listTitle, listId}){

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const [{ isDragging }, drag] = useDrag({
        type: 'CARD',
        item: { cardId: card.id, listId }, // include listId to know the origin list
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });


    return (
        <div>
            <li
            className="list-card" 
            onClick={handleCardClick}
            ref={drag}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            >
            {card.title}
            </li>
            <Modal card={card} isOpen={isModalOpen} onClose={handleCloseModal} setIsModalOpen={setIsModalOpen}
            listTitle={listTitle}>   
            </Modal>
        </div> 
    )
}