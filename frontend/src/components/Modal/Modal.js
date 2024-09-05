import React, { useState, useEffect } from "react";
import './Modal.css';

import member_icon from '../assets/user.png';
import user_icon from '../assets/profile-user.png';
import label_icon from '../assets/price-tag.png';
import list_icon from '../assets/to-do-list.png';
import attachment_icon from '../assets/attach-file.png';
import cover_icon from '../assets/background.png';
import share_icon from '../assets/share.png';
import archive_icon from '../assets/folder.png';
import delete_icon from '../assets/bin.png';

import { fetchWithAuth } from "../utils";
import CardComment from "../CardComment";


export default function Modal({
  card,
  isOpen,
  onClose,
  listTitle,
  children }) {
  
      // Card Values
      const [description, setDescription] = useState(card.description ? card.description : "");
      const [newCommentContent, setNewCommentContent] = useState('');
      const [cardCommentsData, setCardCommentsData] = useState([]);

      const [isEditingDescription, setIsEditingDescription] = useState(false);
      const [isEditingComment, setIsEditingComment] = useState(false);
  
      const handleDescriptionChange = (e) => {
          setDescription(e.target.value);
      }
  
      const handleCloseModal = () => {
        setIsEditingComment(false);
        setIsEditingDescription(false);
    };


      const handleCommentChange = (e) => {
          setNewCommentContent(e.target.value);
      }
  
      const handleFakeTextAreaClick = () => {
          setIsEditingDescription(true);
      }
  
      const handleFakeTextBoxClick = () => {
          setIsEditingComment(true);
      }
  
      const handleSaveDescriptionClick = () => {
          setIsEditingDescription(false);
          handleSaveDescription();
      }


      useEffect(() => {
        const fetchCardDetails = async () => {
          try {
            const commentsResponse = await fetchWithAuth(`http://localhost:8000/api/cards/${card.id}/comments/`);
            const commentsData = await commentsResponse.json();
            setCardCommentsData(commentsData);
          } catch (error) {
            console.error('Error fetching card comments:', error);
          }
        };
    
        fetchCardDetails();
      }, [card.id]);

  
      const handleSaveDescription = async () => {
          try {
              const response = await fetchWithAuth(`http://localhost:8000/api/cards/${card.id}/description/`, {
                  method: 'PATCH',
                  body: JSON.stringify({
                      'description': description
                  })
              });
              if(response.ok){
                  const data = await response.json();
                  console.log(data);
                  // Set description?
              } else{
                  console.log("Error, failed to change description.");
              }
          } catch(err){
              console.log(err);
          }
      }
  
      const handleSaveComment = async () => {
          try {
              const response = await fetchWithAuth(`http://localhost:8000/api/cards/${card.id}/comments/`, {
                  method: 'POST',
                  body: JSON.stringify({
                      'comment': newCommentContent
                  })
              });
              if(response.ok){
                  const data = await response.json();
                  console.log(data);
                  // Set comment?
                  setNewCommentContent('');
              } else{
                  console.log("Error, failed to save comment.");
              }
          } catch(err){
              console.log(err);
          }
      }
  
  
      const handleCancelClick = () => {
          setIsEditingDescription(false);
      }
  
      const handleSaveCommentClick = () => {
          setIsEditingComment(false);
          handleSaveComment();
      }
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className={`modal-content ${isEditingDescription && 'expand'}`} onClick={(e) => e.stopPropagation()}>
        <div className="card-context-container">
                <div className="card-context-header">
                    <span className="icon"></span>
                    <div className="name-bar">
                        <span className="name">{card.title}</span>
                        <span className="list-name">in list <small>{listTitle}</small></span>
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
                            {(!isEditingDescription && !description) ? (
                                <div
                                className="fake-textarea"
                                onClick={handleFakeTextAreaClick}
                                >
                                    Add a more detailed description...
                                </div>
                            ) : (!isEditingDescription && description) ? (
                                !isEditingDescription && (
                                    <div
                                    className="description-body"
                                    onClick={() => setIsEditingDescription(true)}>
                                    {description}
                                    </div>
                                )
                            ) : (
                                <textarea
                                value={description}
                                placeholder="Write a description"
                                onChange={handleDescriptionChange}
                                ></textarea>
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
                                <div className="activity-section-feed-container">
                                    <img
                                     src={user_icon}
                                     alt="member-icon"   
                                    />
                                    {!isEditingComment ? (<div
                                        className="fake-textbox"
                                        onClick={handleFakeTextBoxClick}
                                        >
                                        Write a comment...
                                    </div>) : (
                                        <textarea
                                        placeholder="Write a comment"
                                        onChange={handleCommentChange}
                                        value={newCommentContent}
                                        ></textarea> 
                                    )}
                                </div>
                                
                            {isEditingComment && (
                                <div className="activity-menu">
                                    <button
                                    className="save"
                                    onClick={handleSaveCommentClick}
                                    >Save</button>
                                    <label htmlFor="isWatching"><input name="isWatching" type="checkbox"/>Watch</label>
                                </div>     
                            )}
                            <div className="activity-feed">
                            {(cardCommentsData && cardCommentsData.map((cardComment, idx) => (
                              <CardComment key={idx} comment={cardComment}/>
                            )))}
                            </div>
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
        </div>
      </div>
    );
  }