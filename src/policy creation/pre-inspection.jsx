import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import PolicySidebar from "../components/policy-sidebar";
import { useNavigate } from "react-router-dom";
import { usePolicy } from "./PolicyContext"; // Import the custom hook
import "./pre-inspection.css";

const PreInspection = () => {
  const navigate = useNavigate();
  const { policyData, setPolicyData, updatePolicyData } = usePolicy(); // Custom hook to manage policy data

  // State for form inputs
  const [formData, setFormData] = useState({
    location: "",
    phone: "",
    inspector: "",
  });
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    // Ensure the data is available before attempting to set the state
    if (policyData) {
      setFormData({
        location: policyData.inspector_location || "",
        phone: policyData.inspector_phone || "",
        inspector: policyData.inspector_name || "",
      });
    }
  }, [policyData]);

  // Handle input value changes
  const handleChange = (e) => {
    const { id, value } = e.target; // Extract id and value from the input field
    setFormData((prevData) => ({
      ...prevData,
      [id]: value, // Update the specific field by its id
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setPolicyData({
      ...policyData,
      inspector_location: formData.location,
      inspector_phone: formData.phone,
      inspector_name: formData.inspector, // Merge form data into the policy context
    });
    setFlag(true);
  };

  useEffect(() => {
    if (flag) {
      alert("data will be saved in backend");
      console.log("hello");
      updatePolicyData();
      setFlag(false);
      navigate("/policy-creation/documents-upload");
    }
  }, [flag]);

  return (
    <div className="body">
      <Navbar /> {/* Navbar on top */}
      <PolicySidebar /> {/* Sidebar on the left */}
      <div className="pre-inspection-container">
        <div className="content-container">
          <h2 className="font-psemibold text-primary text-3xl text-left m-5">
            Pre Inspection
          </h2>

          {/* Location input */}
          <div className="form-row font-pregular">
            <div className="input-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                placeholder="Enter location"
                value={formData.location} // Bind input to state
                onChange={handleChange} // Update state on change
              />
            </div>
          </div>

          <div className="separator"></div>

          <div className="form-section font-pregular">
            <div className="input-button-group">
              {/* Inspector assigned input */}
              <div className="input-group">
                <label htmlFor="inspector">Inspector assigned</label>
                <input
                  type="text"
                  id="inspector"
                  placeholder="Enter inspector name"
                  value={formData.inspector} // Bind input to state
                  onChange={handleChange} // Update state on change
                />
              </div>
              {/* Phone input */}
              <div className="input-group">
                <label htmlFor="phone">Cell Phone</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="Enter phone number"
                  value={formData.phone} // Bind input to state
                  onChange={handleChange} // Update state on change
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-end mt-16">
          <button
            type="submit"
            className="py-4 px-10 bg-primary text-white font-psemibold rounded-md hover:bg-secondary transition duration-300"
            onClick={handleSubmit}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreInspection;
