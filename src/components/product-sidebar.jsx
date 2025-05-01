import React, { useState } from "react";
import {
  FiShield,
  FiClipboard,
  FiSettings,
  FiFileText,
  FiCheckSquare,
  FiUser,
  FiDatabase,
  FiBox,
  FiLock,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// i have to make active item as global variable.

const ProductSidebar = () => {
  const [activeItem, setActiveItem] = useState(""); // Track the active item
  const navigate = useNavigate();

  const pathMapping = {
    "Product Information": "/product-setup/",
    Perils: "/product-setup/peril-creation",
    "Risk Questionnaire": "/product-setup/insurable-interest",
    "Device Information": "/product-setup/insurable-interest",
    "Documents Upload": "/product-setup/insurable-interest",
    KYC: "/policy-creation/kyc",
    "Customer Profile Rules": "/product-setup/customer-profile-rules",
    "Rules for Renewal": "/product-setup/rules-for-renewal",
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
        <h3 className="text-gray-500 text-sm">Product Setup</h3>
        {[
          { name: "Product Information", icon: <FiBox /> },
          { name: "Perils", icon: <FiShield /> },
          { name: "Device Information", icon: <FiSettings /> },
          { name: "Documents Upload", icon: <FiCheckSquare /> },
          { name: "Risk Questionnaire", icon: <FiClipboard /> },
          { name: "Customer Profile Rules", icon: <FiUser /> },
          { name: "Rules for Renewal", icon: <FiLock /> },
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
// using this package wrapper logic you can inherit a base layout in cildren as well like we inherit in django.

export default ProductSidebar;
