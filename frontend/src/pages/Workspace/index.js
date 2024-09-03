import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import './styles.css';
import { fetchWithAuth } from "../../components/utils";

export default function Workspace(){

    const {workspaceId} = useParams();
    const [workspaceData, setWorkspaceData] = useState(null);
    const [boardsData, setBoardsData] = useState(null);

    useEffect(() => {

        const fetchWorkspaceData = async () => {
          try {
            const response = await fetchWithAuth(`http://localhost:8000/api/workspaces/${workspaceId}/`);
    
            if (response.ok) {
              const data = await response.json();
              setWorkspaceData(data);
            } else {
              console.error('Failed to fetch workspace data');
            }
          } catch (error) {
            console.error('Error fetching workspace data:', error);
          }
        };
    
        fetchWorkspaceData();
      }, [workspaceId]);


    useEffect(() => {

        const fetchBoardsData = async () => {
          try {
            const response = await fetchWithAuth(`http://localhost:8000/api/workspaces/${workspaceId}/boards/`);
    
            if (response.ok) {
              const data = await response.json();
              setBoardsData(data);
            } else {
              console.error('Failed to fetch workspace data');
            }
          } catch (error) {
            console.error('Error fetching workspace data:', error);
          }
        };
    
        fetchBoardsData();
      }, [workspaceId]);
    

    if(!workspaceData){
        return <h1>Whoops</h1>
    }
    
    return (
        <div className="workspace-content">
            <div className="workspace-header">
            <div style={{"display": "flex"}}>
                <div className="icon"></div>
                <div className="title-bar">
                    <div className="title">{workspaceData.title}</div>
                    <div className="visibility">
                        <div className="visibility-text">Private</div>
                    </div>
                </div>
            </div>
                <div className="invite-button">
                    <p>Invite Workspace members</p>
                </div>
            </div>
            <hr className="dividing-line"></hr>
            <div style={{
                "display": "flex",
                "justifyContent": "space-between",
                "alignItems": "center"
                }}>
                <h3 style={{"marginTop": "12px"}}>Boards</h3>
                <input type="text" placeholder="Search boards" style={{
                    "height": "35px",
                    "fontSize": "14px",
                    "border": "1.5px solid white",
                    "outline": "2px solid lightblue",
                    "padding": "6px 8px",
                    "background": "transparent"
                }}/>
            </div>
            <div className="workspace-boards-section">
                <div className="board">
                    <p>Create New Board</p>
                </div>
                {boardsData && boardsData.map((board, idx) => (
                    <div className="board">
                        <p>{board.title}</p>
                    </div>
                ))}
            </div>
            <div className="view-closed-boards-button">
                <p>View closed boards</p>
            </div>
        </div>
    )
}