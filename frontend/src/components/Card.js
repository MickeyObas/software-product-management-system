import React, { useState } from "react";

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

export default function Card({card, listTitle}){

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    return (
        <div>
            <li className="list-card" onClick={handleCardClick}>
                {card.title}
            </li>
            <Modal card={card} isOpen={isModalOpen} onClose={handleCloseModal} setIsModalOpen={setIsModalOpen}
            listTitle={listTitle}>   
            </Modal>
        </div> 
    )
}