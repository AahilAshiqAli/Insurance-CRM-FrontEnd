import React, { useState } from "react";
import Navbar from "../components/navbar";
import PolicySidebar from "../components/policy-sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import "./KYC.css";

const Kyc = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { uploadedFiles } = location.state || {
    uploadedFiles: { pictures: {}, documents: {} },
  }; // Retrieve files passed from the previous screen
  const [viewFile, setViewFile] = useState(null); // File currently being viewed
  const [viewFileType, setViewFileType] = useState(null); // Type of the file (image or PDF)
  const [isAnyFileDeclined, setIsAnyFileDeclined] = useState(false);
  const [fileStatuses, setFileStatuses] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAnyFileDeclined) {
      alert("You cannot proceed as one or more files have been declined.");
      return;
    }
    navigate("/policy-creation/approval-matrix", { state: { uploadedFiles } });
  };

  const handleAccept = (index) => {
    setFileStatuses((prevStatuses) => ({
      ...prevStatuses,
      [index]: "accepted",
    }));
  };

  const handleDecline = (index) => {
    setFileStatuses((prevStatuses) => ({
      ...prevStatuses,
      [index]: "declined",
    }));
    setIsAnyFileDeclined(true);
  };

  const handleView = (file) => {
    const fileType = file.type; // Get the file type (e.g., "application/pdf" or "image/jpeg")
    setViewFileType(fileType);
    setViewFile(URL.createObjectURL(file)); // Create a URL for the file to preview
  };

  return (
    <div className="body">
      <Navbar />
      <PolicySidebar />
      <div className="file-upload-container">
        <div className="content-container">
          {/* Modal for Viewing Files */}
          {viewFile && (
            <div className="modal">
              <div className="modal-content">
                <button className="close-btn" onClick={() => setViewFile(null)}>
                  Close
                </button>
                {viewFileType === "application/pdf" ? (
                  <iframe
                    src={viewFile}
                    title="Document Viewer"
                    style={{ width: "100%", height: "500px", border: "none" }}
                  ></iframe>
                ) : (
                  <img
                    src={viewFile}
                    alt="Preview"
                    style={{ maxWidth: "100%" }}
                  />
                )}
              </div>
            </div>
          )}

          {/* Hide content when the modal is open */}
          {!viewFile && (
            <>
              <h2 className="font-psemibold text-primary text-3xl text-left m-5">
                Know your Customer
              </h2>

              {/* First Section - Pre Inspection */}
              <div className="file-upload-section">
                <div className="file-grid font-pregular">
                  {Object.entries(uploadedFiles.pictures).map(
                    ([key, file], index) => (
                      <div className="file-row" key={`pre-${index}`}>
                        <div className="input-group">
                          <label>{key.replace(/([A-Z])/g, " $1")}</label>
                          <div className="file-input-container">
                            <input
                              type="text"
                              className="placeholder-input"
                              value={file.name}
                              readOnly
                            />
                            <button
                              className="btn bg-primary-100 custom-file-upload"
                              onClick={() => handleView(file)}
                            >
                              View
                            </button>
                          </div>
                        </div>
                        <div className="button-group">
                          {fileStatuses[`pre-${index}`] === "accepted" && (
                            <span className="icon text-green-300">✔️</span>
                          )}
                          {fileStatuses[`pre-${index}`] === "declined" && (
                            <span className="icon text-red-500">❌</span>
                          )}
                          {fileStatuses[`pre-${index}`] !== "accepted" &&
                            fileStatuses[`pre-${index}`] !== "declined" && (
                              <>
                                <button
                                  className="btn upload-btn"
                                  onClick={() => handleAccept(`pre-${index}`)}
                                >
                                  Accept
                                </button>
                                <button
                                  className="btn view-btn"
                                  onClick={() => handleDecline(`pre-${index}`)}
                                >
                                  Decline
                                </button>
                              </>
                            )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Separator */}
              <div className="separator"></div>

              {/* Second Section - Document Upload */}
              <h2 className="font-psemibold text-primary text-3xl text-left m-5">
                Verify Documents
              </h2>
              <div className="file-upload-section">
                <div className="file-grid font-pregular">
                  {Object.entries(uploadedFiles.documents).map(
                    ([key, file], index) => (
                      <div className="file-row" key={`doc-${index}`}>
                        <div className="input-group">
                          <label>{key.replace(/([A-Z])/g, " $1")}</label>
                          <div className="file-input-container">
                            <input
                              type="text"
                              className="placeholder-input"
                              value={file.name}
                              readOnly
                            />
                            <button
                              className="btn bg-primary-100 custom-file-upload"
                              onClick={() => handleView(file)}
                            >
                              View
                            </button>
                          </div>
                        </div>
                        <div className="button-group">
                          {fileStatuses[`doc-${index}`] === "accepted" && (
                            <span className="icon text-green-500">✔️</span>
                          )}
                          {fileStatuses[`doc-${index}`] === "declined" && (
                            <span className="icon text-red-500">❌</span>
                          )}
                          {fileStatuses[`doc-${index}`] !== "accepted" &&
                            fileStatuses[`doc-${index}`] !== "declined" && (
                              <>
                                <button
                                  className="btn upload-btn"
                                  onClick={() => handleAccept(`doc-${index}`)}
                                >
                                  Accept
                                </button>
                                <button
                                  className="btn view-btn"
                                  onClick={() => handleDecline(`doc-${index}`)}
                                >
                                  Decline
                                </button>
                              </>
                            )}
                        </div>
                      </div>
                    )
                  )}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Kyc;
