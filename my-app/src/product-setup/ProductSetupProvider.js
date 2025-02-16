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

  const updateDatabase = () => {
    if (!productId) return; // If no productId, don't fetch

    setLoading(true);
    setError(null);

    // The token for authorization
    const token = localStorage.getItem("jwt_token");

    // Prepare the updated data
    const updatedData = {
      product_name: productData.product_name,
      product_abbreviation: productData.product_abbreviation,
      package_name: productData.package_name,
      policy_type: productData.policy_type,
      policy_period: productData.policy_period,
      temporary_cn_min_time: productData.temporary_cn_min_time,
      temporary_cn_max_time: productData.temporary_cn_max_time,
      customer_type: productData.customer_type,
      peril_ids: productData.peril_ids, // Array of peril IDs to associate with the product
      manufacturer: productData.manufacturer,
      model: productData.model,
      imei_serial_number: productData.imei_serial_number,
      cnic: productData.cnic,
      receipt_of_purchase: productData.receipt_of_purchase,
      warranty_card_picture: productData.warranty_card_picture,
      user_picture: productData.user_picture,
      bank_statement: productData.bank_statement,
      ntn_number: productData.ntn_number,
      generate_renewal: productData.generate_renewal,
      renewal_generation_frequency: productData.renewal_generation_frequency,
      renewal_generation_value: productData.renewal_generation_value,
      no_claim_discount: productData.no_claim_discount,
      sum_insured_reduction: productData.sum_insured_reduction,
      City: productData.City,
      Age: productData.Age,
      Profession: productData.Profession,
      IncomeCategory: productData.IncomeCategory,
      Business_Type: productData.Business_Type,
      Customer_Badge: productData.Customer_Badge,
    };

    // Make the PUT request to update product data
    fetch(`http://localhost:3000/api/product/${productId}`, {
      method: "PUT", // Use PUT method to update the product
      headers: {
        "Content-Type": "application/json", // Tell the server the body contains JSON
        Authorization: `Bearer ${token}`, // Include the authorization token
      },
      body: JSON.stringify(updatedData), // Send the updated product data in the body
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update product data");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        // Handle the updated product data (you can store it in state or display a message)
        console.log("Product updated successfully:", data);
      })
      .catch((err) => {
        // Set error state in case of failure
        setError(err.message || "Failed to update product data");
      })
      .finally(() => {
        setLoading(false); // Set loading state to false after request completion
      });
  };

  useEffect(() => {
    console.log("Hello world", productData);
  }, [productData]);

  // Fetch product data when `productId` changes
  useEffect(() => {
    if (!productId) return; // If no productId, don't fetch

    setLoading(true);
    setError(null);

    const token = localStorage.getItem("jwt_token");

    fetch(
      `https://insurance-crm-backend-git-main-aahilashiqalis-projects.vercel.app/api/product/${productId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
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
        setProductData,
        updateDatabase,
      }}
    >
      {children}
    </ProductSetupContext.Provider>
  );
};

// Custom hook to use the context
export const useProductSetup = () => React.useContext(ProductSetupContext);

export default ProductSetupProvider;
