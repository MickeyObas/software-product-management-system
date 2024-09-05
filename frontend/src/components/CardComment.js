export default function CardComment({comment}){
    return (
    <div className="activity-feed-item">
        <div className="icon"></div>
        <div className="comment">
            <div className="user-period">
                <div className="user-name">MickeyGoo</div>
                <div className="user-time-posted">20 minutes ago</div>
            </div>
            <div className="user-content">g</div>
            <div className="user-menu">
                <a href="">Edit</a>
                <a href="">Delete</a>
            </div>
        </div>
    </div>
    )
}