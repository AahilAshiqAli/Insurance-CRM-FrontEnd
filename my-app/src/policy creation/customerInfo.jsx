import React, { useState, useEffect } from "react";
import "./customerInfo.css";
import SideBar from "../components/policy-sidebar";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { usePolicy } from "./PolicyContext"; // Import the context hook

const CustomerInfo = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    ntn: "",
    cnicNumber: "",
    pocName: "",
    pocNumber: "",
    pocCnicNumber: "",
    relationshipWithCustomer: "",
    currentAddress: "",
    officeAddress: "",
  });

  const [verified, setVerified] = useState({
    contactNumber: false,
    email: false,
    ntn: false,
    cnicNumber: false,
  });

  const { policyData, setPolicyData } = usePolicy(); // Get the function to update the policy data
  const navigate = useNavigate();

  useEffect(() => {
    console.log(policyData);
    // Ensure the data is available before attempting to set the state
    if (policyData) {
      setFormData({
        firstName: policyData.first_name || "",
        lastName: policyData.last_name || "",
        contactNumber: policyData.phone_number || "",
        email: policyData.email || "",
        ntn: "", // No field for `ntn` in the policyData, so leave it blank
        cnicNumber: policyData.cnic || "",
        pocName: policyData.poc_name || "",
        pocNumber: policyData.poc_number || "",
        pocCnicNumber: policyData.poc_cnic || "", // No field for `pocCnicNumber` in the policyData, so leave it blank
        relationshipWithCustomer: policyData.relationship_with_customer || "", // No field for `relationshipWithCustomer` in the policyData, so leave it blank
        currentAddress: policyData.address || "",
        officeAddress: policyData.office_address || "",
      });
    }
    console.log(policyData ? policyData : "No policy data available");
  }, [policyData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleVerification = (field) => {
    setVerified({ ...verified, [field]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setPolicyData({
      ...policyData,
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone_number: formData.contactNumber,
      email: formData.email,
      cnic: formData.cnicNumber,
      poc_name: formData.pocName,
      poc_number: formData.pocNumber,
      poc_cnic: formData.pocCnicNumber,
      relationship_with_customer: formData.relationshipWithCustomer,
      address: formData.currentAddress,
      office_address: formData.officeAddress,
    });
    navigate("/policy-creation/device-info");
    // Update the context with the customer data
  };

  return (
    <div className="policy-process-layout">
      <Navbar />
      {/* Sidebar */}
      <SideBar />

      {/* Form Container */}
      <div className="policy-process-container mt-12">
        <form onSubmit={handleSubmit}>
          {/* Customer Information Section */}
          <section>
            <h3 className="font-psemibold text-2xl text-primary mb-8">
              Customer Information
            </h3>
            <div className="form-row font-pregular">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="text-black-100"
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="text-black-100"
                />
              </div>
            </div>
            <div className="form-row font-pregular">
              <div className="form-group">
                <label>Contact Number</label>
                <div className="input-with-icon">
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                    className="text-black-100"
                  />
                  {verified.contactNumber && (
                    <span className="verified-icon">✔️</span>
                  )}
                  {!verified.contactNumber && (
                    <button
                      type="button"
                      onClick={() => handleVerification("contactNumber")}
                      className="verify-btn bg-primary hover:bg-secondary-200"
                    >
                      Verify
                    </button>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <div className="input-with-icon">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="text-black-100"
                  />
                  {verified.email && <span className="verified-icon">✔️</span>}
                  {!verified.email && (
                    <button
                      type="button"
                      onClick={() => handleVerification("email")}
                      className="verify-btn bg-primary hover:bg-secondary-200"
                    >
                      Verify
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="form-row font-pregular">
              <div className="form-group">
                <label>CNIC Number</label>
                <div className="input-with-icon">
                  <input
                    type="text"
                    name="cnicNumber"
                    value={formData.cnicNumber}
                    onChange={handleChange}
                    required
                    className="text-black-100"
                  />
                  {verified.cnicNumber && (
                    <span className="verified-icon">✔️</span>
                  )}
                  {!verified.cnicNumber && (
                    <button
                      type="button"
                      onClick={() => handleVerification("cnicNumber")}
                      className="verify-btn bg-primary hover:bg-secondary-200"
                    >
                      Verify
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* POC Information Section */}
          <section>
            <h3 className="font-psemibold text-2xl text-primary my-12">
              Point of Contact (POC)
            </h3>
            <div className="form-row">
              <div className="form-group font-pregular">
                <label>POC Name</label>
                <input
                  type="text"
                  name="pocName"
                  value={formData.pocName}
                  onChange={handleChange}
                  required
                  className="text-black-100"
                />
              </div>
              <div className="form-group">
                <label>POC Number</label>
                <input
                  type="tel"
                  name="pocNumber"
                  value={formData.pocNumber}
                  onChange={handleChange}
                  className="text-black-100"
                  required
                />
              </div>
            </div>
            <div className="form-row font-pregular">
              <div className="form-group">
                <label>POC CNIC Number</label>
                <input
                  type="text"
                  name="pocCnicNumber"
                  value={formData.pocCnicNumber}
                  onChange={handleChange}
                  className="text-black-100"
                  required
                />
              </div>
              <div className="form-group">
                <label>Relationship With Customer</label>
                <input
                  type="text"
                  name="relationshipWithCustomer"
                  value={formData.relationshipWithCustomer}
                  onChange={handleChange}
                  className="text-black-100"
                  required
                />
              </div>
            </div>
          </section>

          {/* Address Information Section */}
          <section>
            <h3 className="font-psemibold text-2xl text-primary my-12">
              Address Information
            </h3>
            <div className="form-row">
              <div className="form-group font-pregular">
                <label>Current Address</label>
                <input
                  type="text"
                  name="currentAddress"
                  value={formData.currentAddress}
                  onChange={handleChange}
                  className="text-black-100"
                  required
                />
              </div>
              <div className="form-group font-pregular">
                <label>Office Address</label>
                <input
                  type="text"
                  name="officeAddress"
                  value={formData.officeAddress}
                  onChange={handleChange}
                  className="text-black-100"
                />
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="py-4 px-10 bg-primary text-white font-psemibold rounded-md hover:bg-secondary transition duration-300"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerInfo;
