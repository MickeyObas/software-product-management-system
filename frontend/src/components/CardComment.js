import { useContext, useState, useEffect } from "react";
import { fetchWithAuth, timeAgo } from "./utils";
import { UserContext } from "./UserContext";


export default function CardComment({
    comment,
    cardId,
    onDelete,
    onEdit,
}){
    const { user } = useContext(UserContext);

    const [isEditingCreatedComment, setIsEditingCreatedComment] = useState(false);
    const [newCommentText, setNewCommentText] = useState(comment.text);

    const handleDelete = async (e) => {
        e.preventDefault();
    
        const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
        if (!confirmDelete) return;
    
        try {
          // Send DELETE request to the server
          const response = await fetchWithAuth(`http://localhost:8000/api/cards/${cardId}/comments/${comment.id}/`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            // Call the onDelete prop to remove the comment from the parent component
            onDelete(comment.id);
          } else {
            console.error('Failed to delete the comment.');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    const handleEditComment = async () => {
        try {
            
            const response = await fetchWithAuth(`http://localhost:8000/api/cards/${cardId}/comments/${comment.id}/`, {
              method: 'PATCH',
              body: JSON.stringify({
                'text': newCommentText
              })
            });
      
            if (response.ok) {
              const data = await response.json();
              onEdit(comment.id, data.text);
              setIsEditingCreatedComment(false);
            } else {
              console.error('Failed to edit the comment.');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };
    
    const handleEditCommentClick = () => {
        setIsEditingCreatedComment(true);
    }

    const handleCommentChange = (e) => {
        console.log(e.target.value);
        setNewCommentText(e.target.value);
    }

    useEffect(() => {
        setNewCommentText(comment.text);
    }, [comment.text]);

    return (
    <div className="activity-feed-item">
        <div className="icon"></div>
        <div className="comment">
            <div className="user-period">
                <div className="user-name">{comment.user.email}</div>
                <div className="user-time-posted">{timeAgo(comment.created_at)}</div>
            </div>
            {!isEditingCreatedComment ? (
                <div className="user-content">{newCommentText}</div>
            ) : (
                <div className="user-content-input-container">
                    <input
                    type="text"
                    className="user-content-input"
                    value={newCommentText}
                    onChange={handleCommentChange}
                    />
                    <div className="comment-edit-menu">
                        <button
                        className="save"
                        onClick={handleEditComment}
                        >Save</button>
                        <button className="discard">Discard changes</button>
                    </div>
                </div>
            )}
            {((user.email === comment.user.email) && (!isEditingCreatedComment)) && (
                <div className="user-menu">
                <button onClick={handleEditCommentClick}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
            )}
        </div>
    </div>
    )
}