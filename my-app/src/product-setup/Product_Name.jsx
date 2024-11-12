import React from "react";
import Navbar from "../components/navbar";
import PolicySidebar from "../components/policy-sidebar";
import "./Product_Name.css";
import { useNavigate } from "react-router-dom";

const ProductName = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/product-setup/peril-creation");
  };
  return (
    <div className="body">
      <Navbar />
      <PolicySidebar /> {/* Sidebar inside the body */}
      <div className="content-container">
        <h2 className="font-psemibold text-primary text-3xl text-left m-5">
          Product Information
        </h2>

        {/* Form structure with rows */}
        <form className="form-style">
          <div className="form-row font-pregular">
            <div className="input-group font-pregular">
              <label>Product Name</label>
              <input type="text" placeholder="Enter product name" />
            </div>
            <div className="input-group font-pregular">
              <label>Package</label>
              <select>
                <option value="" disabled selected>
                  Select Package
                </option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="input-group font-pregular">
              <label>Package Name</label>
              <select>
                <option value="" disabled selected>
                  Select Package Name
                </option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
              </select>
            </div>
          </div>

          <div className="form-row font-pregular">
            <div className="input-group font-pregular">
              <label>Product Abbreviation/Product Prefix</label>
              <input type="text" placeholder="Enter product Abbreviation" />
            </div>
            <div className="input-group font-pregular">
              <label>Policy Type</label>
              <select>
                <option value="" disabled selected>
                  Select Policy Type
                </option>
                <option value="open">Open Policy</option>
                <option value="fixed">Fixed Policy</option>
              </select>
            </div>
            <div className="input-group font-pregular">
              <label>Policy Period</label>
              <select>
                <option value="" disabled selected>
                  Select Policy Period
                </option>
                <option value="1-year">1 Year</option>
                <option value="6-months">6 Months</option>
              </select>
            </div>
          </div>

          <div className="form-row font-pregular">
            <div className="input-group font-pregular">
              <label>Temporary CN Minimum Time</label>
              <select>
                <option value="" disabled selected>
                  Select Minimum Time
                </option>
                <option value="15-days">15 Days</option>
                <option value="30-days">30 Days</option>
              </select>
            </div>
            <div className="input-group font-pregular">
              <label>Temporary CN Maximum Time</label>
              <select>
                <option value="" disabled selected>
                  Select Maximum Time
                </option>
                <option value="60-days">60 Days</option>
                <option value="90-days">90 Days</option>
              </select>
            </div>
            <div className="input-group font-pregular">
              <label>Customer Type</label>
              <select>
                <option value="" disabled selected>
                  Select Customer Type
                </option>
                <option value="corporate">Corporate</option>
                <option value="individual">Individual</option>
              </select>
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
        </form>
      </div>
    </div>
  );
};

export default ProductName;
