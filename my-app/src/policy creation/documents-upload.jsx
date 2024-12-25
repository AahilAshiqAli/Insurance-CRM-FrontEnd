import React, { useState } from "react";
import Navbar from "../components/navbar";
import PolicySidebar from "../components/policy-sidebar";
import { useNavigate } from "react-router-dom";
import "./KYC.css";

const DocumentsUpload = () => {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState({ pictures: {}, documents: {} });
  const [errors, setErrors] = useState({});

  const handleFileChange = (e, section, label) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes =
      section === "pictures" ? ["image/jpeg", "image/png", "image/jpg"] : ["application/pdf"];

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [label]: `Invalid file type. Only ${allowedTypes.map((type) =>
          type.replace("image/", ".").replace("application/", ".")
        ).join(", ")} files are allowed.`,
      }));
      return;
    }

    // Reset error if file is valid
    setErrors((prevErrors) => ({
      ...prevErrors,
      [label]: null,
    }));

    // Store file in state
    setUploadedFiles((prevData) => ({
      ...prevData,
      [section]: { ...prevData[section], [label]: file },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure all required files are uploaded
    const missingFiles = Object.keys(errors).some((key) => errors[key]) ||
      Object.values(uploadedFiles.pictures).length === 0 ||
      Object.values(uploadedFiles.documents).length === 0;

    if (missingFiles) {
      alert("Please upload all required files and fix any errors before proceeding.");
      return;
    }

    navigate("/policy-creation/kyc", { state: { uploadedFiles } });
  };

  return (
    <div className="body">
      <Navbar />
      <PolicySidebar />
      <div className="file-upload-container">
        <div className="content-container">
          <h2 className="font-psemibold text-primary text-3xl text-left m-5">
            Picture Upload
          </h2>

          {/* First Section - Pre Inspection */}
          <div className="file-upload-section">
            <div className="file-grid font-pregular">
              {[
                { label: "Front Picture", key: "frontPicture" },
                { label: "Back Picture", key: "backPicture" },
                { label: "Left Picture", key: "leftPicture" },
                { label: "Right Picture", key: "rightPicture" },
              ].map((item, index) => (
                <div className="file-row" key={`pic-${index}`}>
                  <div className="input-group">
                    <label>{item.label}</label>
                    <div className="file-input-container">
                      <input
                        type="text"
                        className="placeholder-input"
                        placeholder={item.label}
                        value={
                          uploadedFiles.pictures[item.key]?.name ||
                          item.label.replace("Picture", ".pdf")
                        }
                        readOnly
                      />
                      <label className="custom-file-upload">
                        Choose File
                        <input
                          type="file"
                          accept=".jpeg,.jpg,.png"
                          onChange={(e) => handleFileChange(e, "pictures", item.key)}
                        />
                      </label>
                      {errors[item.key] && (
                        <span className="error-text">{errors[item.key]}</span>
                      )}
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
                { label: "CNIC Picture", key: "cnicPicture" },
                { label: "Receipt of purchase from retailer", key: "receipt" },
                { label: "Warranty card picture", key: "warranty" },
                { label: "User Picture", key: "userPicture" },
                { label: "Bank Statement", key: "bankStatement" },
                { label: "NTN Number", key: "ntnNumber" },
              ].map((item, index) => (
                <div className="file-row" key={`doc-${index}`}>
                  <div className="input-group">
                    <label className="whitespace-nowrap">{item.label}</label>
                    <div className="file-input-container">
                      <input
                        type="text"
                        className="placeholder-input"
                        placeholder={item.label}
                        value={
                          uploadedFiles.documents[item.key]?.name ||
                          item.label.replace("Picture", ".pdf")
                        }
                        readOnly
                      />
                      <label className="custom-file-upload">
                        Choose File
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e, "documents", item.key)}
                        />
                      </label>
                      {errors[item.key] && (
                        <span className="error-text">{errors[item.key]}</span>
                      )}
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
