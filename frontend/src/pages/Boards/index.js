import React from "react";
import './styles.css';
import clock_icon from '../../components/assets/clock.png';

export default function Boards(){
    return (
        <div className="boards-content">
            <div className="recently-viewed-section">
                <div className="recently-viewed-header">
                    <img src={clock_icon} alt="Clock icon"/>
                    <h5>Recently Viewed</h5>
                </div>
                <div className="recently-viewed-row">
                    <div className="recently-viewed-tab"></div>
                    <div className="recently-viewed-tab"></div>
                    <div className="recently-viewed-tab"></div>
                    <div className="recently-viewed-tab"></div>
                </div>
            </div>
            <div className="workspaces-section">
                <h5>Your Workspaces</h5>
                <div className="workspaces-header">
                    <div className="icon"></div>
                    <h5>MickeyGooo's Workspace</h5>
                    <div className="workspaces-menu">
                        <a href="#">Boards</a>
                        <a href="#">Members</a>
                        <a href="#">Settings</a>
                    </div>
                </div>
                <div className="workspace-boards-section">
                    <div className="workspace-board-tab"></div>
                    <div className="workspace-board-tab"></div>
                    <div className="workspace-board-tab"></div>
                    <div className="workspace-board-tab"></div>
                    <div className="workspace-board-tab"></div>
                </div>
            </div>
        </div>
    )
}