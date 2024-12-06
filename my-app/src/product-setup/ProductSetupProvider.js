import React, { createContext, useState, useEffect } from "react";

// Creating the context
const ProductSetupContext = createContext();

// Provider component
const ProductSetupProvider = ({ children }) => {
  // State for storing product data
  const [productData, setProductData] = useState(null);

  // State for loading and error handling
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for storing product ID
  const [productId, setProductId] = useState(null);

  // Fetch product data when `productId` changes
  useEffect(() => {
    if (!productId) return; // If no productId, don't fetch

    setLoading(true);
    setError(null);

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTczMzQxODM5MCwiZXhwIjoxNzM3MDE4MzkwfQ.HlLwvXxKTTZle6sk9fbzxsxzG-yqFT_R2jkGD5NsPJQ";

    fetch(`http://localhost:3000/api/product/${productId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        return response.json();
      })
      .then((data) => {
        // Group data by common fields, combining `peril_ids` into an array
        const groupedData = data.reduce((acc, row) => {
          if (!acc) {
            acc = {
              ...row,
              peril_ids: [],
              peril_names: [],
              risk_descriptions: [],
            };
          }
          acc.peril_ids.push(row.peril_id);
          acc.peril_names.push(row.peril_name);
          acc.risk_descriptions.push(row.risk_discription);
          return acc;
        }, null);
        console.log(groupedData);

        //         accmulator initailizes itself with all properties and additional properties peril_id, peril_name and peril_Description.

        // Then reduce function runs iterations automatically accumulator groups all other data but since we have defined push operation for 3 arrays

        setProductData(groupedData);
        console.log(productData);
      })
      .catch((err) => {
        setError(err.message || "Failed to load product data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]); // Dependency array ensures this runs only when `productId` changes

  // Return the provider with its value (state and methods)
  return (
    <ProductSetupContext.Provider
      value={{
        productData,
        loading,
        error,
        productId,
        setProductId, // Function to set product ID
      }}
    >
      {children}
    </ProductSetupContext.Provider>
  );
};

// Custom hook to use the context
export const useProductSetup = () => React.useContext(ProductSetupContext);

export default ProductSetupProvider;
