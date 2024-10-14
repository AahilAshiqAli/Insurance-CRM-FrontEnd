import React, { useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/policy-sidebar";

const DeviceInfo = () => {
  const [formData, setFormData] = useState({
    deviceType: "",
    brandName: "",
    deviceModel: "",
    deviceSerialNumber: "",
    purchaseDate: "",
    deviceValue: "",
    deviceCondition: "",
    warrantyStatus: "",
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

  const styles = {
    select: {
      width: "100%",
      border: "1px solid #d1d5db", // gray-300
      padding: "8px", // equivalent to p-2
      borderRadius: "0.375rem", // equivalent to rounded-md
      outline: "none",
      fontSize: "0.875rem", // small text size
      backgroundColor: "#ffffff", // white
      color: "#4a4a4a", // dark gray text
      appearance: "none", // to style the dropdown arrow, if needed
    },
    placeholderOption: {
      color: "#9e9e9e", // light gray text for placeholder
    },
    hoverOption: {
      backgroundColor: "#f0f0f0", // light gray on hover
    },
  };

  return (
    <div className="flex h-screen">
      <Navbar />
      <Sidebar />

      <div className="flex-1 p-10 relative">
        <form onSubmit={handleSubmit}>
          <h2 className="text-primary font-psemibold text-2xl mt-16 mb-8">
            Device Insurance Form
          </h2>

          <section>
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="form-group">
                <label className="block text-primary font-pregular mb-2">
                  Device Type
                </label>
                <input
                  type="text"
                  name="deviceType"
                  value={formData.deviceType}
                  onChange={handleChange}
                  placeholder="Enter Device Type"
                  className="w-full border border-gray-300 rounded-md text-black-100 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 placeholder:text-secondary placeholder:text-sm" // Adjusted placeholder styles
                  required
                />
              </div>
              <div className="form-group">
                <label className="block text-primary font-pregular mb-2">
                  Brand Name
                </label>
                <input
                  type="text"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleChange}
                  placeholder="Enter Brand Name"
                  className="w-full border border-gray-300 rounded-md text-black-100 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 placeholder:text-secondary placeholder:text-sm"
                  required
                />
              </div>
              <div className="form-group">
                <label className="block text-primary font-pregular mb-2">
                  Device Model
                </label>
                <input
                  type="text"
                  name="deviceModel"
                  value={formData.deviceModel}
                  onChange={handleChange}
                  placeholder="Enter Device Model"
                  className="w-full border border-gray-300 rounded-md text-black-100 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 placeholder:text-secondary placeholder:text-sm"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="form-group">
                <label className="block text-primary font-pregular mb-2">
                  Device Serial Number
                </label>
                <input
                  type="text"
                  name="deviceSerialNumber"
                  value={formData.deviceSerialNumber}
                  onChange={handleChange}
                  placeholder="Enter Serial Number"
                  className="w-full border border-gray-300 rounded-md text-black-100 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 placeholder:text-secondary placeholder:text-sm"
                  required
                />
              </div>
              <div className="form-group">
                <label className="block font-pregular mb-2 text-secondary-100">
                  Purchase Date
                </label>
                <input
                  type="date"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  placeholder="mm/dd"
                  className="placeholder:text-secondary-100 w-full border border-gray-300 rounded-md text-black-100 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                  required
                />
              </div>
              <div className="form-group">
                <label className="block text-primary font-pregular mb-2">
                  Device Value
                </label>
                <input
                  type="number"
                  name="deviceValue"
                  value={formData.deviceValue}
                  onChange={handleChange}
                  placeholder="Enter Device Value"
                  className="w-full border border-gray-300 rounded-md text-black-100 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 placeholder:text-secondary placeholder:text-sm"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="form-group">
                <label className="block text-primary font-pregular mb-2">
                  Device Condition
                </label>
                <select
                  name="deviceCondition"
                  value={formData.deviceCondition}
                  onChange={handleChange}
                  style={styles.select}
                  required
                >
                  <option
                    value=""
                    disabled
                    selected
                    style={styles.placeholderOption}
                  >
                    Select Condition
                  </option>
                  <option value="New" style={styles.hoverOption}>
                    New
                  </option>
                  <option value="Good" style={styles.hoverOption}>
                    Good
                  </option>
                  <option value="Fair" style={styles.hoverOption}>
                    Fair
                  </option>
                  <option value="Poor" style={styles.hoverOption}>
                    Poor
                  </option>
                </select>
              </div>
              <div className="form-group">
                <label className="block text-primary font-pregular mb-2">
                  Warranty Status
                </label>
                <select
                  name="warrantyStatus"
                  value={formData.warrantyStatus}
                  onChange={handleChange}
                  style={styles.select}
                  required
                >
                  <option
                    value=""
                    disabled
                    selected
                    style={styles.placeholderOption}
                  >
                    Select Warranty Status
                  </option>
                  <option value="New" style={styles.hoverOption}>
                    Yes
                  </option>
                  <option value="Good" style={styles.hoverOption}>
                    No
                  </option>
                </select>
              </div>
            </div>
          </section>
        </form>
        <button
          type="submit"
          className="absolute bottom-5 right-5 py-2 px-4 bg-primary text-white font-psemibold rounded-md hover:bg-secondary transition duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DeviceInfo;
