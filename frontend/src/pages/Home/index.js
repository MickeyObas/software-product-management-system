import React from "react";
import './styles.css';
import heart_icon from '../../components/assets/heart.png';
import clock_icon from '../../components/assets/clock.png';

export default function Home(){
    return(
        <div className="home-content">
            <div className="activity-feed">
                <div className="highlights-section">
                    <div className="highlights-header">
                        <img src={heart_icon} alt="heart icon"/>
                        <p>Highlights</p>
                    </div>
                    <div className="highlights-tab"></div>
                    <div className="highlights-tab"></div>
                    <div className="highlights-tab"></div>
                    <div className="highlights-tab"></div>
                    <div className="highlights-tab"></div>
                </div>
            </div>
            <div className="home-sidebar">
                <div className="recently-viewed-section">
                    <div className="recently-viewed-header">
                        <img src={clock_icon} alt="clock icon"/>
                        <p>Recently viewed</p>
                    </div>
                    <div className="recently-viewed-tab">
                        <div className="icon"></div>
                        <div className="title-block">
                            <div className="title">Testing 5 Product Management</div>
                            <div className="subtitle">MickeyGooo's Workspace</div>
                        </div>
                    </div>
                    <div className="recently-viewed-tab">
                        <div className="icon"></div>
                        <div className="title-block">
                            <div className="title">Testing 5 Product Management</div>
                            <div className="subtitle">MickeyGooo's Workspace</div>
                        </div>
                    </div>
                    <div className="recently-viewed-tab">
                        <div className="icon"></div>
                        <div className="title-block">
                            <div className="title">Testing 5 Product Management</div>
                            <div className="subtitle">MickeyGooo's Workspace</div>
                        </div>
                    </div>
                    <div className="recently-viewed-tab">
                        <div className="icon"></div>
                        <div className="title-block">
                            <div className="title">Testing 5 Product Management</div>
                            <div className="subtitle">MickeyGooo's Workspace</div>
                        </div>
                    </div>
                    <div className="recently-viewed-tab">
                        <div className="icon"></div>
                        <div className="title-block">
                            <div className="title">Testing 5 Product Management</div>
                            <div className="subtitle">MickeyGooo's Workspace</div>
                        </div>
                    </div>
                    <div className="recently-viewed-tab">
                        <div className="icon"></div>
                        <div className="title-block">
                            <div className="title">Testing 5 Product Management</div>
                            <div className="subtitle">MickeyGooo's Workspace</div>
                        </div>
                    </div>
                    <div className="recently-viewed-tab">
                        <div className="icon"></div>
                        <div className="title-block">
                            <div className="title">Testing 5 Product Management</div>
                            <div className="subtitle">MickeyGooo's Workspace</div>
                        </div>
                    </div>
                    <div className="recently-viewed-tab">
                        <div className="icon"></div>
                        <div className="title-block">
                            <div className="title">Testing 5 Product Management</div>
                            <div className="subtitle">MickeyGooo's Workspace</div>
                        </div>
                    </div>
                    <div className="recently-viewed-tab">
                        <div className="icon"></div>
                        <div className="title-block">
                            <div className="title">Testing 5 Product Management</div>
                            <div className="subtitle">MickeyGooo's Workspace</div>
                        </div>
                    </div>
                    <div className="recently-viewed-tab">
                        <div className="icon"></div>
                        <div className="title-block">
                            <div className="title">Testing 5 Product Management</div>
                            <div className="subtitle">MickeyGooo's Workspace</div>
                        </div>
                    </div>
                    <div className="recently-viewed-tab">
                        <div className="icon"></div>
                        <div className="title-block">
                            <div className="title">Testing 5 Product Management</div>
                            <div className="subtitle">MickeyGooo's Workspace</div>
                        </div>
                    </div>
                    <div className="recently-viewed-tab">
                        <div className="icon"></div>
                        <div className="title-block">
                            <div className="title">Testing 5 Product Management</div>
                            <div className="subtitle">MickeyGooo's Workspace</div>
                        </div>
                    </div>
                    <div className="recently-viewed-tab">
                        <div className="icon"></div>
                        <div className="title-block">
                            <div className="title">Testing 5 Product Management</div>
                            <div className="subtitle">MickeyGooo's Workspace</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}