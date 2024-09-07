import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for workspaces
const WorkspaceContext = createContext();

// Create a provider component
export const WorkspaceProvider = ({ children }) => {
  const [currentWorkspace, setCurrentWorkspace] = useState(() => {
    const storedWorkspace = localStorage.getItem('currentWorkspace');
    return storedWorkspace ? JSON.parse(storedWorkspace) : null;
  });

  useEffect(() => {
    if (currentWorkspace) {
      localStorage.setItem('currentWorkspace', JSON.stringify(currentWorkspace));
    } else {
      localStorage.removeItem('currentWorkspace');  // Clean up if no workspace is selected
    }
  }, [currentWorkspace]);

  return (
    <WorkspaceContext.Provider value={{ currentWorkspace, setCurrentWorkspace }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

// Custom hook to use the WorkspaceContext
export const useWorkspace = () => {
  return useContext(WorkspaceContext);
};
