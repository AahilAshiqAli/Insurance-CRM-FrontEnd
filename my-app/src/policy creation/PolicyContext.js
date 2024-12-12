import React, { createContext, useState, useEffect } from "react";

// Create the context
const PolicyContext = createContext();

// Provider component
const PolicyProvider = ({ children }) => {
  // State for storing policy data
  const [policyData, setPolicyData] = useState({
    licenseType: null,
    deviceType: null,
    firstName: null,
    lastName: null,
    contactNumber: null,
    email: null,
    cnicNumber: null,
    pocName: null,
    pocNumber: null,
    pocCnicNumber: null,
    relationshipWithCustomer: null,
    brandName: null,
    deviceModel: null,
    deviceSerialNumber: null,
    purchaseDate: null,
    deviceValue: null,
    deviceCondition: null,
    warrantyStatus: null,
    productId: null,
    productName: null,
  });

  // State for loading and error handling
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for storing policy ID
  const [policyId, setPolicyId] = useState(null);

  // Function to update policy data in the database
  const updatePolicyData = () => {
    if (!policyId) return; // If no policyId, don't update

    setLoading(true);
    setError(null);

    const token = localStorage.getItem("jwt_token");

    // Prepare the updated data
    const updatedData = {
      licenseType: policyData.licenseType,
      deviceType: policyData.deviceType,
      firstName: policyData.firstName,
      lastName: policyData.lastName,
      contactNumber: policyData.contactNumber,
      email: policyData.email,
      cnicNumber: policyData.cnicNumber,
      pocName: policyData.pocName,
      pocNumber: policyData.pocNumber,
      pocCnicNumber: policyData.pocCnicNumber,
      relationshipWithCustomer: policyData.relationshipWithCustomer,
      brandName: policyData.brandName,
      deviceModel: policyData.deviceModel,
      deviceSerialNumber: policyData.deviceSerialNumber,
      purchaseDate: policyData.purchaseDate,
      deviceValue: policyData.deviceValue,
      deviceCondition: policyData.deviceCondition,
      warrantyStatus: policyData.warrantyStatus,
      productId: policyData.productId,
      productName: policyData.productName,
    };

    fetch(`http://localhost:3000/api/policy/${policyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update policy data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Policy updated successfully:", data);
      })
      .catch((err) => {
        setError(err.message || "Failed to update policy data");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Fetch policy data when policyId changes
  useEffect(() => {
    if (!policyId) return;

    setLoading(true);
    setError(null);

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTczMzQxODM5MCwiZXhwIjoxNzM3MDE4MzkwfQ.HlLwvXxKTTZle6sk9fbzxsxzG-yqFT_R2jkGD5NsPJQ";

    fetch(`http://localhost:3000/api/policies/${policyId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch policy data");
        }
        return response.json();
      })
      .then((data) => {
        setPolicyData(data[0]);
        console.log(data);
      })
      .catch((err) => {
        setError(err.message || "Failed to load policy data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [policyId]);

  // Return the provider with its value (state and methods)
  return (
    <PolicyContext.Provider
      value={{
        policyData,
        loading,
        error,
        policyId,
        setPolicyId,
        setPolicyData,
        updatePolicyData,
      }}
    >
      {children}
    </PolicyContext.Provider>
  );
};

// Custom hook to use the PolicyContext
export const usePolicy = () => React.useContext(PolicyContext);

export default PolicyProvider;
