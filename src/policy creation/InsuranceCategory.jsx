import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import "./InsuranceCategory.css";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/policy-sidebar";
import { usePolicy } from "./PolicyContext";

const InsuranceCategory = () => {
  const { policyData, setPolicyData, policyId, setPolicyId } = usePolicy(); // Destructure policyData and updatePolicyData from context
  const [selectedLicenseType, setSelectedLicenseType] = useState("");
  const [selectedDeviceType, setSelectedDeviceType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure the data is available before attempting to set the state
    if (policyData) {
      setSelectedLicenseType(policyData.license_type || "");
      setSelectedDeviceType(policyData.device_type || "");
    }
    console.log(
      policyData ? policyData.license_type : "No licenseType available"
    );
  }, [policyData]);

  const handleLicenseTypeClick = (type) => {
    setSelectedLicenseType(type);
  };

  const handleDeviceTypeClick = (type) => {
    setSelectedDeviceType(type);
  };

  const handleRedirect = () => {
    // Update the context with the selected values
    setPolicyData({
      ...policyData,
      license_type: selectedLicenseType,
      device_type: selectedDeviceType,
    });
    const token = localStorage.getItem("jwt_token");
    if (!policyId) {
      console.log("hjvhjvjh");
      const updatedData = {
        license_type: selectedLicenseType,
        device_type: selectedDeviceType,
      };

      fetch(
        `https://insurance-crm-backend-git-main-aahilashiqalis-projects.vercel.app/api/policies/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update policy data");
          }
          return response.json();
        })
        .then((data) => {
          const { policy_id } = data;
          setPolicyId(policy_id);
          console.log(policy_id);
          console.log("Policy inserted successfully:", data);
        })
        .catch((err) => {
          console.error(
            "Error inserting policy:",
            err.message || "Failed to inserting policy data"
          );
        });
    }
    navigate("customer-info");
  };
  // Navigate to the next screen

  return (
    <div className="layout">
      <Navbar />
      <SideBar />
      <div className="insurance-category-container">
        <h1 className="main-heading p-semibold">Insurance Category</h1>

        <div className="section">
          <h2 className="sub-heading">License Type</h2>
          <div className="button-group">
            <button
              className={`button ${
                selectedLicenseType === "Islamic" ? "active" : ""
              }`}
              onClick={() => handleLicenseTypeClick("Islamic")}
            >
              🕌 Islamic
            </button>
            <button
              className={`button ${
                selectedLicenseType === "Conventional" ? "active" : ""
              }`}
              onClick={() => handleLicenseTypeClick("Conventional")}
            >
              🏦 Conventional
            </button>
            <button
              className={`button ${
                selectedLicenseType === "Both" ? "active" : ""
              }`}
              onClick={() => handleLicenseTypeClick("Both")}
            >
              🔄 Both
            </button>
          </div>
        </div>

        <div className="section">
          <h2 className="sub-heading">Device Type</h2>
          <div className="button-group">
            <button
              className={`button ${
                selectedDeviceType === "Mobile" ? "active" : ""
              }`}
              onClick={() => handleDeviceTypeClick("Mobile")}
            >
              📱 Mobile
            </button>
            <button
              className={`button ${
                selectedDeviceType === "Laptop" ? "active" : ""
              }`}
              onClick={() => handleDeviceTypeClick("Laptop")}
            >
              💻 Laptop
            </button>
            <button
              className={`button ${
                selectedDeviceType === "Both" ? "active" : ""
              }`}
              onClick={() => handleDeviceTypeClick("Both")}
            >
              🖥️ Both
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="absolute bottom-10 right-10 py-4 px-8 bg-primary text-white font-psemibold rounded-md hover:bg-secondary transition duration-300"
          onClick={handleRedirect}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InsuranceCategory;
