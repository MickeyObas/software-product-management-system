import React from "react";
import './styles.css';
import heart_icon from '../../components/assets/heart.png';
import clock_icon from '../../components/assets/clock.png';
import ActivityFeed from "../../components/ActivityFeed/ActivityFeed";
import RecentlyViewedSidebar from '../../components/RecentlyViewedSidebar/RecentlyViewedSidebar';

export default function Home(){
    return(
        <div className="home-content">
            <ActivityFeed />
            <div className="home-sidebar">
                <RecentlyViewedSidebar />
            </div>
        </div>
    )
}