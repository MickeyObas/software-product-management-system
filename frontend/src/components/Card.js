import React, { useState } from "react";
import Modal from "./Modal/Modal";

export default function Card({card}){

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
        <li
        className="list-card"
        onClick={handleCardClick}
        >{card.title}</li>

        <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}>
            <div className="card-context-container">
                <div className="card-context-header">
                    <span className="icon"></span>
                    <div className="name-bar">
                        <span className="name">Card Name</span>
                        <span className="list-name">in List (listname)</span>
                    </div>
                    <button
                    className="card-modal-close-button"
                    onClick={handleCloseModal}
                    >X</button>
                </div>
                <div className="card-context-section">
                    <div className="main-content">
                        <div className="description-section">
                            <div className="description-header">
                                <div className="icon"></div>
                                <h5>Description</h5>
                            </div>
                        </div>
                    </div>
                    <div className="side-content">Side</div>
                </div>
            </div>     
        </Modal>

        </div> 
    )
}