import React, { useState } from "react";
import "./RenewalRules.css";
import Navbar from "../components/navbar";
import ProductSidebar from "../components/product-sidebar";
import { useNavigate } from "react-router-dom";

const RenewalRules = () => {
  const [formData, setFormData] = useState({
    generateRenewal: "",
    renewalPeriod: "",
    noClaimDiscount: "",
    claimLoading: "",
    insuredReduction: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClearForm = () => {
    setFormData({
      generateRenewal: "",
      renewalPeriod: "",
      noClaimDiscount: "",
      claimLoading: "",
      insuredReduction: "",
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/product-setup/premium-computation");
  };

  return (
    <div className="renewal-body">
      <Navbar />
      <ProductSidebar />
      <div className="renewal-rules-container">
        <div className="renewal-form-container font-pregular">
          <h2 className="font-psemibold text-primary text-3xl text-left m-5">
            Rules for Renewal
          </h2>

          <div className="renewal-form-group">
            <label>Generate Renewal</label>
            <div className="renewal-radio-group">
              <label>
                <input
                  type="radio"
                  name="generateRenewal"
                  value="Yes"
                  checked={formData.generateRenewal === "Yes"}
                  onChange={handleChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="generateRenewal"
                  value="No"
                  checked={formData.generateRenewal === "No"}
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </div>

          <div className="renewal-form-group">
            <label>Renewal Generation Date (Time Period)</label>
            <div className="flex gap-4">
              <select
                name="renewalPeriod"
                value={formData.renewalPeriod}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>
              <input
                type="number"
                className="text-center w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="renewal-form-group">
            <label>No Claim Discount</label>
            <select
              name="noClaimDiscount"
              value={formData.noClaimDiscount}
              onChange={handleChange}
            >
              <option value="">Select % of discount</option>
              <option value="5">5%</option>
              <option value="10">10%</option>
              <option value="15">15%</option>
            </select>
          </div>

          <div className="renewal-form-group">
            <label>Sum Insured Reduction</label>
            <select
              name="insuredReduction"
              value={formData.insuredReduction}
              onChange={handleChange}
            >
              <option value="">Select % of reduction</option>
              <option value="5">5%</option>
              <option value="10">10%</option>
              <option value="15">15%</option>
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
      </div>
    </div>
  );
};

export default RenewalRules;
