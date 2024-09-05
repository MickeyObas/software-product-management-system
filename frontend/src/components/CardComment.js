import { timeAgo } from "./utils"

export default function CardComment({comment}){
    return (
    <div className="activity-feed-item">
        <div className="icon"></div>
        <div className="comment">
            <div className="user-period">
                <div className="user-name">{comment.user.email}</div>
                <div className="user-time-posted">{timeAgo(comment.created_at)}</div>
            </div>
            <div className="user-content">{comment.text}</div>
            <div className="user-menu">
                <a href="">Edit</a>
                <a href="">Delete</a>
            </div>
        </div>
    </div>
    )
}