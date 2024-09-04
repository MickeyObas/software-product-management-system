import React, { useState } from "react";

import Modal from "./Modal/Modal";
import CardDescription from "./CardDescription";

import member_icon from './assets/user.png';
import label_icon from './assets/price-tag.png';
import list_icon from './assets/to-do-list.png';
import attachment_icon from './assets/attach-file.png';
import cover_icon from './assets/background.png';
import share_icon from './assets/share.png';
import archive_icon from './assets/folder.png';
import delete_icon from './assets/bin.png';

export default function Card({card}){

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [isEditingComment, setIsEditingComment] = useState(false);

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsEditingComment(false);
        setIsEditingDescription(false);
    };

    const handleFakeTextAreaClick = () => {
        setIsEditingDescription(true);
    }

    const handleFakeTextBoxClick = () => {
        setIsEditingComment(true);
    }

    const handleSaveDescriptionClick = () => {
        setIsEditingDescription(false);
    }

    const handleCancelClick = () => {
        setIsEditingDescription(false);
    }

    const handleSaveCommentClick = () => {
        setIsEditingComment(false);
    }

    return (
        <div>
        <li
        className="list-card"
        onClick={handleCardClick}
        >{card.title}</li>

        <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        >
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
                            {!isEditingDescription ? (
                                <div
                                className="fake-textarea"
                                onClick={handleFakeTextAreaClick}
                                >
                                    Add a more detailed description...
                                </div>
                            ) : (
                                <textarea placeholder="Write a description"></textarea>
                            )}
                            {isEditingDescription && (
                                <div className="description-menu">
                                    <button
                                    className="save"
                                    onClick={handleSaveDescriptionClick}
                                    >Save</button>
                                    <button
                                    className="cancel"
                                    onClick={handleCancelClick}
                                    >Cancel</button>
                                </div>
                            )}
                        </div>
                        <div className="activity-section">
                            <div className="activity-header">
                                <div className="icon"></div>
                                <h5>Activity</h5>
                            </div>
                            {!isEditingComment ? (
                                <div
                                    className="fake-textbox"
                                    onClick={handleFakeTextBoxClick}
                                    >
                                    Write a comment...
                                </div>
                            ) : (
                                <textarea placeholder="Write a comment"></textarea>           
                            )}
                            {isEditingComment && (
                                <div className="activity-menu">
                                    <button
                                    className="save"
                                    onClick={handleSaveCommentClick}
                                    >Save</button>
                                    <label htmlFor="isWatching"><input name="isWatching" type="checkbox"/>Watch</label>
                                </div>     
                            )}
                        </div>
                    </div>
                    <div className="side-content">
                        <div className="side-content-add-header">Add to card</div>
                        <div className="card-sidebar">
                            <div className="card-sidebar-tab">
                                <img className="icon"
                                src={member_icon}
                                alt="member-icon"   
                                />
                                <div>Members</div>
                            </div>
                            <div className="card-sidebar-tab">
                                <img className="icon"
                                src={label_icon}
                                alt="label-icon"
                                />
                                <div>Labels</div>
                            </div>
                            <div className="card-sidebar-tab">
                                <img className="icon"
                                src={list_icon}
                                alt="list-icon"    
                                />
                                <div>Checklist</div>
                            </div>
                            <div className="card-sidebar-tab">
                                <img className="icon"
                                src={attachment_icon}
                                alt="attachment-icon"   
                                />
                                <div>Attachments</div>
                            </div>
                            <div className="card-sidebar-tab">
                                <img className="icon"
                                src={cover_icon}
                                alt="cover-icon"
                                />
                                <div>Cover</div>
                            </div>
                        </div>
                        <div className="side-content-actions-header">Actions</div>
                        <div className="card-sidebar">
                            <div className="card-sidebar-tab">
                                <img className="icon"
                                src={share_icon}
                                alt="share-icon"
                                />
                                <div>Share</div>
                            </div>
                            <div className="card-sidebar-tab">
                                <img className="icon"
                                src={archive_icon}
                                alt="archive-icon"
                                />
                                <div>Archive</div>
                            </div>
                            <div className="card-sidebar-tab">
                                <img className="icon"
                                src={delete_icon}
                                alt="delete-icon"
                                />
                                <div>Delete</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>     
        </Modal>

        </div> 
    )
}