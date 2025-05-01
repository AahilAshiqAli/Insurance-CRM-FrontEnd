import React, { createContext, useState, useEffect } from "react";

// Create the context
const PolicyContext = createContext();

// Provider component
const PolicyProvider = ({ children }) => {
  // State for storing policy data
  const [policyData, setPolicyData] = useState({
    license_type: "",
    device_id: "",
    customer_id: "",
    device_type: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    cnic: "",
    poc_name: "",
    poc_number: "",
    poc_cnic: "",
    relationship_with_customer: "",
    address: "",
    office_address: "",
    brand_name: "",
    device_model: "",
    device_serial_number: "",
    purchase_date: "",
    device_value: "",
    device_condition: "",
    warranty_status: "",
    product_id: "",
    quote_amount: 25000,
    inspector_name: "",
    inspector_location: "",
    inspector_phone: "",
    remarks_ceo: "",
    remarks_coo: "",
    policy_number:
      "POL" + Math.floor(100000 + Math.random() * 900000).toString(),
    created_at: new Date().toISOString().split("T")[0],
  });

  // State for loading and error handling
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [renewal, setRenewal] = useState(false);
  const [endorsement, setEndorsement] = useState(false);

  // State for storing policy ID
  const [policyId, setPolicyId] = useState(null);

  // Function to update policy data in the database
  const updatePolicyData = () => {
    if (!policyId) return; // If no policyId, don't update

    setLoading(true);
    setError(null);
    console.log(renewal);
    const token = localStorage.getItem("jwt_token");
    console.log(policyData);
    // Prepare the updated data
    const updatedData = {
      license_type: policyData.license_type,
      device_type: policyData.device_type,
      first_name: policyData.first_name,
      last_name: policyData.last_name,
      phone_number: policyData.phone_number,
      email: policyData.email,
      cnic: policyData.cnic,
      poc_name: policyData.poc_name,
      poc_number: policyData.poc_number,
      poc_cnic: policyData.poc_cnic,
      relationship_with_customer: policyData.relationship_with_customer,
      address: policyData.address,
      office_address: policyData.office_address,
      brand_name: policyData.brand_name,
      device_model: policyData.device_model,
      device_serial_number: policyData.device_serial_number,
      purchase_date: policyData.purchase_date,
      device_value: policyData.device_value,
      device_condition: policyData.device_condition,
      warranty_status: policyData.warranty_status,
      product_id: policyData.product_id,
      quote_amount: 25000,
      inspector_location: policyData.inspector_location,
      inspector_name: policyData.inspector_name,
      inspector_phone: policyData.inspector_phone,
      remarks_ceo: policyData.remarks_ceo,
      remarks_coo: policyData.remarks_coo,
      policy_number: renewal
        ? "POL" + Math.floor(100000 + Math.random() * 900000).toString()
        : policyData.policy_number,
      created_at: renewal ? "Yes" : null,
    };

    fetch(`http://localhost:3000/api/policies/${policyId}`, {
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
        setRenewal(false);
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
    console.log("hello");
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("jwt_token");
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
        renewal,
        endorsement,
        setPolicyId,
        setPolicyData,
        updatePolicyData,
        setRenewal,
        setEndorsement,
      }}
    >
      {children}
    </PolicyContext.Provider>
  );
};

// Custom hook to use the PolicyContext
export const usePolicy = () => React.useContext(PolicyContext);

export default PolicyProvider;
