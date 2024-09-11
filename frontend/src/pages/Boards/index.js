import React, {useState, useEffect} from "react";
import './styles.css';
import clock_icon from '../../components/assets/clock.png';
import { fetchWithAuth } from "../../components/utils";
import { NavLink, useParams } from "react-router-dom";
import Board from '../Board';
import { useProduct } from "../../components/ProductContext";


export default function Boards(){

    const [workspaces, setWorkspaces] = useState(null);
    const { currentProduct, setCurrentProduct } = useProduct();

    useEffect(() => {
        console.log(currentProduct);
        const fetchWorkspacesAndBoards = async () => {
            try {
                const workspacesResponse = await fetchWithAuth('http://localhost:8000/api/workspaces/');
                const workspacesData = await workspacesResponse.json();
                const workspacesWithBoards = await Promise.all(
                    workspacesData.map(async (workspace) => {
                        const boardsResponse = await fetchWithAuth(`http://localhost:8000/api/workspaces/${workspace.id}/boards/`);
                        const boardsData = await boardsResponse.json();
                        return { ...workspace, boards: boardsData };
                    })
                );
                setWorkspaces(workspacesWithBoards);
            } catch (error) {
                console.error('Failed to fetch workspaces and boards:', error);
            }
        };

        fetchWorkspacesAndBoards();
    }, []);
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
                {workspaces && workspaces.map((workspace, idx) => (
                    <div className="workspace-section">
                    <div className="workspaces-header">
                        <div className="icon"></div>
                        <h5>{workspace.title}</h5>
                        <div className="workspaces-menu">
                            <a href="#">Boards</a>
                            <a href="#">Members</a>
                            <a href="#">Settings</a>
                        </div>
                    </div>
                    <div className="workspace-boards-section">
                        {workspace.boards && workspace.boards.filter((board) => board.product.id === currentProduct?.id).map((board, idx) => (
                            <NavLink
                            className='workspace-board-tab-link'
                            to={`/boards/${board.id}/${board.title}`}
                            >
                            <div className="workspace-board-tab">{`${board.product.title} - ${board.title}`}</div>
                            </NavLink>
                        ))}
                        <NavLink className='workspace-board-tab-link create'>Create New Board</NavLink>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}