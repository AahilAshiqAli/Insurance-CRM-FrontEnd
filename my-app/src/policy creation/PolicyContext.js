import React, { createContext, useState, useContext } from "react";

// Create the context
const PolicyContext = createContext();

// Custom hook to use the PolicyContext
export const usePolicy = () => {
  return useContext(PolicyContext);
};

// PolicyContext Provider component
export const PolicyProvider = ({ children }) => {
  const [policyData, setPolicyData] = useState({
    licenseType: "",
    deviceType: "",
    customerInfo: {},
    deviceInfo: {},
    productSelection: {},
    quote: 0,
    preInspection: {},
    approvalMatrix: {},
    tcn: {},
    finance: {},
    issuePolicy: {},
  });

  // Function to update the policy data
  const updatePolicyData = (newData) => {
    setPolicyData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return (
    <PolicyContext.Provider value={{ policyData, updatePolicyData }}>
      {children}
    </PolicyContext.Provider>
  );
};
