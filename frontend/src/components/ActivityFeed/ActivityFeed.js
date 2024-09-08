import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../utils';
import './ActivityFeed.css';
import heart_icon from '../assets/heart.png';
import profile_icon from '../assets/profile.png';

const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await fetchWithAuth('http://localhost:8000/api/activities/');
      const data = await response.json();
      setActivities(data);
    };

    fetchActivities();
  }, []);

  const renderActivity = (activity) => {
    const objectData = JSON.parse(activity.object_data)[0]?.fields || {};
    console.log(objectData);
    switch (activity.activity_type) {
      case 'board_created':
        return <div><strong>{activity.user}</strong> created a board: {activity.description}</div>;
      case 'product_created':
        return (
            <div className='product-created-activity'>
                <div className='activity-header'>
                    <h5>{`${activity.user.email} created a product: ${objectData.title}`}</h5>
                </div>
                <div className='activity-body'>
                    <div className='user-container'>
                        <img src={profile_icon} alt='profile-icon'/>
                        <div className='user-time-bar'>
                            <div className='username'>MickeyGooo</div>
                            <div className='time-ago'>3 hours ago</div>
                        </div>
                    </div>
                </div>
            </div>
        );
      case 'workspace_created':
        return (
            <div className='workspace-created-activity'>
                <div className='activity-header'>
                    <h5>{`${activity.user.email} created a workspace: ${objectData.title}`}</h5>
                </div>
                <div className='activity-body'>
                    <div className='user-container'>
                        <img src={profile_icon} alt='profile-icon'/>
                        <div className='user-time-bar'>
                            <div className='username'>MickeyGooo</div>
                            <div className='time-ago'>3 hours ago</div>
                        </div>
                    </div>
                </div>
            </div>
        );
      case 'card_created':
        return (
          <div className='card-created-activity'>
                <div className='activity-header'>
                    <h5>{`${activity.user.email} added a card: ${objectData.title}`}</h5>
                </div>
                <div className='activity-body'>
                    <div className='user-container'>
                        <img src={profile_icon} alt='profile-icon'/>
                        <div className='user-time-bar'>
                            <div className='username'>MickeyGooo</div>
                            <div className='time-ago'>3 hours ago</div>
                        </div>
                    </div>
                </div>
            </div>
        );
      case 'comment_added':
        return <div><strong>{activity.user}</strong> added a comment: {activity.description}</div>;
      default:
        return <div>{activity.description}</div>;
    }
  };

  return (
    <div className="activity-feed">
        <div className="highlights-header">
            <img src={heart_icon} alt="heart icon"/>
            <p>Highlights</p>
        </div>
      {activities.length > 0 ? (
        activities.map((activity) => (
            renderActivity(activity)
        ))
      ) : (
        <div>No activities yet.</div>
      )}
    </div>
  );
};

export default ActivityFeed;
