import React from "react";
import './Modal.css';


export default function Modal({ isOpen, onClose, isEditingDescription, iseditingComment, children }) {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className={`modal-content ${isEditingDescription && 'expand'}`} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    );
  }