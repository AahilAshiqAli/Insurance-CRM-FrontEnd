import React from "react";
import Navbar from "../components/navbar";
import PolicySidebar from "../components/policy-sidebar";
import { useNavigate } from "react-router-dom";
import "./KYC.css";

const Kyc = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/policy-creation/approval-matrix");
  };
  return (
    <div>
      <Navbar />
      <div className="file-upload-container">
        <PolicySidebar />
        <div className="content-container">
          <h2 className="heading font-psemibold text-primary">
            Pre Inspection
          </h2>

          {/* First Section - Pre Inspection */}
          <div className="file-upload-section">
            <div className="file-grid font-pregular">
              {[
                { label: "Front Picture", placeholder: "Front.pdf" },
                { label: "Back Picture", placeholder: "Back.pdf" },
                { label: "Left Picture", placeholder: "Left.pdf" },
                { label: "Right Picture", placeholder: "Right.pdf" },
                { label: "Top Picture", placeholder: "Top.pdf" },
                { label: "360 Video", placeholder: "Video.pdf" },
              ].map((item, index) => (
                <div className="file-row" key={index}>
                  <div className="input-group">
                    <label>{item.label}</label>
                    <div className="file-input-container">
                      <input
                        type="text"
                        className="placeholder-input"
                        placeholder={item.placeholder}
                        readOnly
                      />
                      <label className="custom-file-upload">
                        Choose File
                        <input type="file" />
                      </label>
                    </div>
                  </div>
                  <div className="button-group">
                    <button className="btn upload-btn">Accept</button>
                    <button className="btn view-btn">Decline</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Separator */}
          <div className="separator"></div>

          {/* Second Section - Document Upload */}
          <h2 className="heading font-psemibold text-primary">
            Document Upload
          </h2>
          <div className="file-upload-section">
            <div className="file-grid font-pregular">
              {[
                { label: "CNIC Picture", placeholder: "CNIC.pdf" },
                {
                  label: "Receipt of purchase from retailer Picture",
                  placeholder: "Receipt.pdf",
                },
                { label: "Warranty card picture", placeholder: "Warranty.pdf" },
                { label: "User Picture", placeholder: "User.pdf" },
                { label: "Bank Statement", placeholder: "Statement.pdf" },
                { label: "NTN Number", placeholder: "NTN.pdf" },
              ].map((item, index) => (
                <div className="file-row" key={index}>
                  <div className="input-group">
                    <label>{item.label}</label>
                    <div className="file-input-container">
                      <input
                        type="text"
                        className="placeholder-input"
                        placeholder={item.placeholder}
                        readOnly
                      />
                      <label className="custom-file-upload">
                        Choose File
                        <input type="file" />
                      </label>
                    </div>
                  </div>
                  <div className="button-group">
                    <button className="btn upload-btn">Accept</button>
                    <button className="btn view-btn">Decline</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
  );
};

export default Kyc;
