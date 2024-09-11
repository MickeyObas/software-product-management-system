import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../utils';
import './ActivityFeed.css';
import heart_icon from '../assets/heart.png';
import profile_icon from '../assets/profile.png';
import comment_icon from '../assets/message.png';
import { timeAgo } from '../utils';

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
    const extraData = activity.extra_data ? JSON.parse(JSON.stringify(activity.extra_data)) : {};
    console.log(objectData);
    switch (activity.activity_type) {
      case 'board_created':
        return <div><strong>{activity.user}</strong> created a board: {activity.description}</div>;
      case 'product_created':
        return (
            <div className='product-created-activity'>
                <div className='activity-header'>
                    <h5>{`${activity.user.email} created a product: ` }
                    <span style={{fontWeight: "bold"}}>{objectData.title}</span>
                    </h5>
                </div>
                <div className='activity-body'>
                    <div className='user-container'>
                        <img src={profile_icon} alt='profile-icon'/>
                        <div className='user-time-bar'>
                            <div className='username'>{activity.user.first_name} {activity.user.last_name}</div>
                            <div className='time-ago'>{timeAgo(objectData.created_at)}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
      case 'workspace_created':
        return (
            <div className='workspace-created-activity'>
                <div className='activity-header'>
                    <h5>{`${activity.user.email} created a workspace: `}
                    <span style={{fontWeight: "bold"}}>{objectData.title}</span>
                    </h5>
                </div>
                <div className='activity-body'>
                    <div className='user-container'>
                        <img src={profile_icon} alt='profile-icon'/>
                        <div className='user-time-bar'>
                            <div className='username'>{activity.user.first_name} {activity.user.last_name}</div>
                            <div className='time-ago'>{timeAgo(objectData.created_at)}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
      case 'card_created':
        return (
          <div className='card-created-activity'>
                <div className='activity-header'>
                    <h5>{`${activity.user.email} added a card: `}
                    <span style={{fontWeight: "bold"}}>{objectData.title}</span>
                    </h5>
                </div>
                <div className='activity-body'>
                    <div className='user-container'>
                        <img src={profile_icon} alt='profile-icon'/>
                        <div className='user-time-bar'>
                            <div className='username'>{activity.user.first_name} {activity.user.last_name}</div>
                            <div className='time-ago'>{timeAgo(objectData.created_at)}</div>
                        </div>
                    </div>
                </div>
                <div className='activity-footer'>
                  <div className='card-bodyy'>
                    <h5>{extraData.board_title} - {extraData.list_title}</h5>
                    <h4>{extraData.workspace_title}</h4>
                  </div>
                </div>
            </div>
        );
      case 'comment_added':
        return (
          <div className='comment-created-activity'>
                <div className='activity-header'>
                    <h5>{`${activity.user.email} made a comment on `}
                    <span style={{fontWeight: "bold"}}>{extraData.card_list_title}</span>
                    </h5>
                </div>
                <div className='activity-body'>
                    <div className='user-container'>
                        <img src={profile_icon} alt='profile-icon'/>
                        <div className='user-time-bar'>
                            <div className='username'>{activity.user.first_name} {activity.user.last_name}</div>
                            <div className='time-ago'>{timeAgo(objectData.created_at)}</div>
                        </div>
                    </div>
                </div>
                <div className='activity-footer'>
                  <div className='card-bodyy'>
                    <div className='comment-container'>
                      <img src={comment_icon} alt='comment-icon' />
                      <div className='comment-body'>"{objectData.text}"</div>
                    </div>
                    <h5>{extraData.card_board_title} - {extraData.card_list_title}</h5>
                    <h4>{extraData.card_workspace_title}</h4>
                  </div>
                </div>
            </div>
        );
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
