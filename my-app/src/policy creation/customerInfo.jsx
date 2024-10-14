import React, { useState } from "react";
import "./customerInfo.css";
import Navbar from "../components/navbar";

const CustomerInfo = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fullName: "",
    contactNumber: "",
    email: "",
    deviceBrand: "",
    deviceModel: "",
    imeiNumber: "",
    purchaseDate: "",
    purchasePrice: "",
    currentAddress: "",
    officeAddress: "",
    permanentAddress: "",
    insuranceType: "",
    coveragePeriod: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <Navbar></Navbar>
    <div className="policy-process-layout">
      <Navbar></Navbar>
      {/* Sidebar */}
      <div className="sidebar">
        <ul className="sidebar-menu">
          <li>
            <button className="sidebar-button">Policy Process</button>
          </li>
          <li>
            <button className="sidebar-button">Peril Creation</button>
          </li>
          <li>
            <button className="sidebar-button">Insurable Interest</button>
          </li>
          <li>
            <button className="sidebar-button">Documents</button>
          </li>
          <li>
            <button className="sidebar-button">Premium Calculation</button>
          </li>
          <li>
            <button className="sidebar-button">Customer Rules</button>
          </li>
          <li>
            <button className="sidebar-button">Commission</button>
          </li>
          <li>
            <button className="sidebar-button">Renewal</button>
          </li>
          <li>
            <button className="sidebar-button">Terms & Conditions</button>
          </li>
        </ul>
      </div>

      {/* Form Container */}
      <div className="policy-process-container">
        <form onSubmit={handleSubmit}>
          <h2>Mobile Device Insurance Form</h2>

          {/* Customer Information Section */}
          <section>
            <h3>Customer Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
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
                />
              </div>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Contact Number</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </section>

          {/* Device Information Section */}
          <section>
            <h3>Device Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Device Brand</label>
                <input
                  type="text"
                  name="deviceBrand"
                  value={formData.deviceBrand}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Device Model</label>
                <input
                  type="text"
                  name="deviceModel"
                  value={formData.deviceModel}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>IMEI Number</label>
                <input
                  type="text"
                  name="imeiNumber"
                  value={formData.imeiNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Purchase Date</label>
                <input
                  type="date"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Purchase Price</label>
                <input
                  type="number"
                  name="purchasePrice"
                  value={formData.purchasePrice}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </section>

          {/* Address Information Section */}
          <section>
            <h3>Address Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Current Address</label>
                <input
                  type="text"
                  name="currentAddress"
                  value={formData.currentAddress}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Office Address</label>
                <input
                  type="text"
                  name="officeAddress"
                  value={formData.officeAddress}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Permanent Address</label>
                <input
                  type="text"
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
            Submit Form
          </button>
        </form>
      </div>
    </div>
    </div>
    
  );
};

export default CustomerInfo;
