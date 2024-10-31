import React from "react";
import Navbar from "../components/navbar";
import PolicySidebar from "../components/policy-sidebar";
import { useNavigate } from "react-router-dom";
import "./KYC.css";

const DocumentsUpload = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/policy-creation/kyc");
  };
  return (
    <div className="body">
      <Navbar />
      <PolicySidebar />
      <div className="file-upload-container">
        <div className="content-container">
          <h2 className="font-psemibold text-primary text-3xl text-left m-5">
            Know your Customer
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
                </div>
              ))}
            </div>
          </div>

          {/* Separator */}
          <div className="separator"></div>

          {/* Second Section - Document Upload */}
          <h2 className="font-psemibold text-primary text-3xl text-left m-5">
            Document Upload
          </h2>
          <div className="file-upload-section">
            <div className="file-grid font-pregular">
              {[
                { label: "CNIC Picture", placeholder: "CNIC.pdf" },
                {
                  label: "Receipt of purchase from retailer",
                  placeholder: "Receipt.pdf",
                },
                { label: "Warranty card picture", placeholder: "Warranty.pdf" },
                { label: "User Picture", placeholder: "User.pdf" },
                { label: "Bank Statement", placeholder: "Statement.pdf" },
                { label: "NTN Number", placeholder: "NTN.pdf" },
              ].map((item, index) => (
                <div className="file-row" key={index}>
                  <div className="input-group">
                    <label className="whitespace-nowrap">{item.label}</label>
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
                </div>
              ))}
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
    </div>
  );
};

export default DocumentsUpload;
