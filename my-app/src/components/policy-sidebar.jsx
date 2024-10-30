import React, { useState } from "react";
import {
  FiShield,
  FiUser,
  FiFileText,
  FiSettings,
  FiRefreshCw,
  FiDollarSign,
  FiCheckSquare,
  FiClipboard,
  FiLayers,
  FiThumbsUp,
} from "react-icons/fi"; // Import other icons as needed
import { useNavigate } from "react-router-dom";

const PolicySidebar = () => {
  const [activeItem, setActiveItem] = useState(""); // Track the active item
  const navigate = useNavigate();

  const pathMapping = {
    "Insurance Category": "/policy-creation/",
    CX: "/policy-creation/customer-info",
    "Risk Questionnaire": "/policy-creation/risk-questionaire",
    Addons: "/policy-creation/risk-questionaire",
    "Device Information": "/policy-creation/device-info",
    Perils: "/policy-creation/perils",
    "Generate Quote": "/policy-creation/perils",
    "Documents Upload": "/policy-creation/documents-upload",
    PreInspection: "/policy-creation/pre-inspection",
    KYC: "/policy-creation/kyc",
    "Approval Matrix": "/policy-creation/approval-matrix",
    TCN: "/policy-creation/tcn",
    Finance: "/policy-creation/tcn",
    "Issue Policy": "/policy-creation/issue-policy",
  };

  const handleClick = (item) => {
    setActiveItem(item);
    const path = pathMapping[item]; // Get the path from the dictionary
    if (path) {
      navigate(path); // Navigate to the corresponding path
    }
  };

  return (
    <div className="bg-gray-50 w-64 p-4 mt-14 rounded-lg shadow-lg h-screen overflow-y-auto">
      <div className="space-y-2">
        <h3 className="text-gray-500 text-sm">Policy Creation</h3>
        {[
          { name: "Insurance Category", icon: <FiShield /> },
          { name: "CX", icon: <FiUser /> },
          { name: "Risk Questionnaire", icon: <FiClipboard /> },
          { name: "Addons", icon: <FiLayers /> },
          { name: "Device Information", icon: <FiSettings /> },
          { name: "Perils", icon: <FiFileText /> },
          { name: "Generate Quote", icon: <FiDollarSign /> },
          { name: "Documents Upload", icon: <FiCheckSquare /> },
          { name: "PreInspection", icon: <FiThumbsUp /> },
          { name: "KYC", icon: <FiUser /> },
          { name: "Approval Matrix", icon: <FiClipboard /> },
          { name: "TCN", icon: <FiFileText /> },
          { name: "Finance", icon: <FiDollarSign /> },
          { name: "Issue Policy", icon: <FiCheckSquare /> },
        ].map((item, index) => (
          <button
            key={index}
            className={`flex items-center w-full py-3 px-4 rounded-lg ${
              activeItem === item.name
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            } transition duration-200`}
            onClick={() => handleClick(item.name)}
          >
            <span className="flex items-center">
              {item.icon} <span className="ml-2">{item.name}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PolicySidebar;
