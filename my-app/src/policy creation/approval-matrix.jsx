import React from "react";
import { useNavigate } from "react-router-dom";
import "./ApprovalScreen.css";
import Navbar from "../components/navbar";
import PolicySidebar from "../components/policy-sidebar";

export const ApprovalMatrix = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
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
              <input className="remarks-input" placeholder="Remarks" />
              <button className="status-btn font-pregular ">Status</button>
              <button className="reminder-btn font-pregular ">Reminder</button>
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
