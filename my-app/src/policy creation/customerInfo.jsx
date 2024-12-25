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

  const [errors, setErrors] = useState({});
  const { policyData, setPolicyData } = usePolicy(); // Get the function to update the policy data
  const navigate = useNavigate();

  useEffect(() => {
    if (policyData) {
      setFormData({
        firstName: policyData.first_name || "",
        lastName: policyData.last_name || "",
        contactNumber: policyData.phone_number || "",
        email: policyData.email || "",
        ntn: "",
        cnicNumber: policyData.cnic || "",
        pocName: policyData.poc_name || "",
        pocNumber: policyData.poc_number || "",
        pocCnicNumber: policyData.poc_cnic || "",
        relationshipWithCustomer: policyData.relationship_with_customer || "",
        currentAddress: policyData.address || "",
        officeAddress: policyData.office_address || "",
      });
    }
  }, [policyData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "", // Clear error when user types
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName || !/^[a-zA-Z]+$/.test(formData.firstName)) {
      newErrors.firstName = "First Name must only contain alphabets and cannot be empty.";
    }

    if (!formData.lastName || !/^[a-zA-Z]+$/.test(formData.lastName)) {
      newErrors.lastName = "Last Name must only contain alphabets and cannot be empty.";
    }

    if (!formData.contactNumber || !/^\d+$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact Number must only contain digits and cannot be empty.";
    }

    if (
      !formData.email ||
      !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(formData.email)
    ) {
      newErrors.email = "Email must be a valid format (e.g., example@domain.com).";
    }

    if (
      !formData.cnicNumber ||
      !/^\d{5}-\d{7}-\d$/.test(formData.cnicNumber)
    ) {
      newErrors.cnicNumber =
        "CNIC Number must be in the format XXXXX-XXXXXXX-X and cannot be empty.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Prevent submission if validation fails

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
  };

  return (
    <div className="policy-process-layout">
      <Navbar />
      <SideBar />
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
                {errors.firstName && (
                  <span className="error-text">{errors.firstName}</span>
                )}
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
                {errors.lastName && (
                  <span className="error-text">{errors.lastName}</span>
                )}
              </div>
            </div>
            <div className="form-row font-pregular">
              <div className="form-group">
                <label>Contact Number</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  className="text-black-100"
                />
                {errors.contactNumber && (
                  <span className="error-text">{errors.contactNumber}</span>
                )}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="text-black-100"
                />
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>
            </div>
            <div className="form-row font-pregular">
              <div className="form-group">
                <label>CNIC Number</label>
                <input
                  type="text"
                  name="cnicNumber"
                  value={formData.cnicNumber}
                  onChange={handleChange}
                  required
                  className="text-black-100"
                />
                {errors.cnicNumber && (
                  <span className="error-text">{errors.cnicNumber}</span>
                )}
              </div>
            </div>
          </section>
          {/* Other Sections Remain the Same */}
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
