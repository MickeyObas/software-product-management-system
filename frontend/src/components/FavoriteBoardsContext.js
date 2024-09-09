import React, { createContext, useState, useEffect } from 'react';
import { fetchWithAuth } from './utils';

export const FavoriteBoardsContext = createContext();

export const FavoriteBoardsProvider = ({ children }) => {
  const [favoriteBoards, setFavoriteBoards] = useState([]);

  // Fetch favorite boards
  useEffect(() => {
    const fetchFavoriteBoards = async () => {
      try {
        const response = await fetchWithAuth('http://localhost:8000/api/boards/favorite-boards/');
        const data = await response.json();
        setFavoriteBoards(data);
      } catch (error) {
        console.error('Error fetching favorite boards:', error);
      }
    };

    fetchFavoriteBoards();
  }, []);

  // Function to update favorite boards when toggling
  const updateFavoriteBoards = async (boardId) => {
    try {
      await fetchWithAuth('http://localhost:8000/api/boards/toggle-favorite/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ board_id: boardId }),
      });

      // Re-fetch favorite boards after updating
      const response = await fetchWithAuth('http://localhost:8000/api/boards/favorite-boards/');
      const data = await response.json();
      setFavoriteBoards(data);
    } catch (error) {
      console.error('Error toggling favorite status:', error);
    }
  };

  return (
    <FavoriteBoardsContext.Provider value={{ favoriteBoards, updateFavoriteBoards }}>
      {children}
    </FavoriteBoardsContext.Provider>
  );
};
