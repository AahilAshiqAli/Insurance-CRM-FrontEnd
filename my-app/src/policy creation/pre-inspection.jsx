import React from "react";
import Navbar from "../components/navbar";
import PolicySidebar from "../components/policy-sidebar";
import { useNavigate } from "react-router-dom";
import "./pre-inspection.css";

const PreInspection = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/policy-creation/kyc");
  };
  return (
    <div>
      <Navbar /> {/* Navbar on top */}
      <PolicySidebar /> {/* Sidebar on the left */}
      <div className="pre-inspection-container">
        <div className="content-container">
          <h2 className="heading font-psemibold text-primary">
            Pre Inspection
          </h2>

          <div className="form-row font-pregular">
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Enter name" />
            </div>
            <div className="input-group">
              <label htmlFor="location">Location</label>
              <input type="text" id="location" placeholder="Enter location" />
            </div>
            <div className="input-group">
              <label htmlFor="phone">Cell Phone</label>
              <input type="text" id="phone" placeholder="Enter phone number" />
            </div>
          </div>

          <div className="separator"></div>

          <div className="form-section font-pregular">
            <div className="input-button-group">
              <div className="input-group">
                <label htmlFor="inspector">Inspector assigned</label>
                <input
                  type="text"
                  id="inspector"
                  placeholder="Enter inspector name"
                />
              </div>
              <div className="button-group">
                <button className="btn assign-btn font-pregular">Assign</button>
                <button className="btn view-status-btn font-pregular">
                  View Status
                </button>
              </div>
            </div>

            {[
              "Inspector Number",
              "Inspector ID",
              "POC Number",
              "Current Status",
            ].map((field, index) => (
              <div className="input-button-group" key={index}>
                <div className="input-group">
                  <label htmlFor={field}>{field}</label>
                  <input
                    type="text"
                    id={field}
                    placeholder={`Enter ${field.toLowerCase()}`}
                  />
                </div>
                <button className="btn view-btn font-pregular">View</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreInspection;
