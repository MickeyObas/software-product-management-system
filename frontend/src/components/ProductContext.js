import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for workspaces
const ProductContext = createContext();

// Create a provider component
export const ProductProvider = ({ children }) => {
  const [currentProduct, setCurrentProduct] = useState(() => {
    const storedProduct = localStorage.getItem('currentProduct');
    return storedProduct ? JSON.parse(storedProduct) : null;
  });

  useEffect(() => {
    if (currentProduct) {
      localStorage.setItem('currentProduct', JSON.stringify(currentProduct));
    } else {
      localStorage.removeItem(currentProduct);  // Clean up if no workspace is selected
    }
  }, [currentProduct]);

  return (
    <ProductContext.Provider value={{ currentProduct, setCurrentProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the WorkspaceContext
export const useProduct = () => {
  return useContext(ProductContext);
};
