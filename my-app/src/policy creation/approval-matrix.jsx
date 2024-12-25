import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ApprovalScreen.css";
import Navbar from "../components/navbar";
import PolicySidebar from "../components/policy-sidebar";
import { usePolicy } from "./PolicyContext";

export const ApprovalMatrix = () => {
  const navigate = useNavigate();
  const { policyData, setPolicyData } = usePolicy();
  const [remarks, setRemarks] = useState({
    CEO: "",
    COO: "",
  });

  useEffect(() => {
    // Ensure the data is available before attempting to set the state
    if (policyData) {
      setRemarks({
        CEO: policyData.remarks_ceo || "",
        COO: policyData.remarks_coo || "",
      });
    }
  }, [policyData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRemarks((prevRemarks) => ({
      ...prevRemarks,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPolicyData({
      ...policyData,
      remarks_ceo: remarks.CEO,
      remarks_coo: remarks.COO,
    });
    navigate("/policy-creation/tcn");
  };

  return (
    <div className="body">
      <Navbar />
      <PolicySidebar />
      <div className="file-upload-container">
        <div className="approval-container">
          <h2 className="font-psemibold text-primary text-3xl text-left m-5">
            Approval Pending
          </h2>

          {/* Approval Pending Section */}
          {["CEO", "COO"].map((title, index) => (
            <div className="approval-row" key={index}>
              <label className="font-pregular title">{title}</label>
              <input
                className="remarks-input"
                placeholder="Remarks"
                name={title} // Dynamically set the name attribute to the role title (CEO, COO)
                value={remarks[title]} // Set the value from the state
                onChange={handleChange} // Handle input change
              />
              {/* <button className="status-btn font-pregular ">Status</button>
              <button className="reminder-btn font-pregular ">Reminder</button> */}
            </div>
          ))}

          {/* Override Request Section */}
          {/* <h2 className="font-psemibold text-primary text-xl text-left m-5">
            Override Request
          </h2>
          <div className="override-row">
            <input className="override-input" placeholder="Authority" />
            <input className="override-input" placeholder="Name" />
            <button className="status-btn">Status</button>
            <button className="request-btn">Request</button>
          </div> */}

          {/* Add Picture Button */}
          {/* <div className="add-picture">
            <button className="add-picture-btn text-primary-100 font-pregular">
              + Add Picture
            </button>
          </div> */}
        </div>
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
