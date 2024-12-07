import React, { useState, useEffect } from "react";
import "./RenewalRules.css";
import Navbar from "../components/navbar";
import ProductSidebar from "../components/product-sidebar";
import { useNavigate } from "react-router-dom";
import { useProductSetup } from "./ProductSetupProvider";

const RenewalRules = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { productId, productData, setProductData, updateDatabase } =
    useProductSetup();
  const [formData, setFormData] = useState({
    generateRenewal: false, // Set default to false for boolean type
    renewalPeriod: "",
    frequency: "",
    noClaimDiscount: "",
    claimLoading: "",
    insuredReduction: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      generateRenewal: value === "Yes" ? true : false, // Set boolean value based on the radio button
    });
  };

  const handleClearForm = () => {
    setFormData({
      generateRenewal: false,
      renewalPeriod: "",
      noClaimDiscount: "",
      claimLoading: "",
      insuredReduction: "",
      frequency: "",
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productId) {
      const updatedData = {
        ...productData,
        generateRenewal: formData.generateRenewal,
        renewalPeriod: formData.renewalPeriod,
        noClaimDiscount: formData.noClaimDiscount,
        claimLoading: formData.claimLoading,
        insuredReduction: formData.insuredReduction,
        frequency: formData.frequency,
      };
      setProductData(updatedData);

      updateDatabase();
    }

    navigate("/product-setup/");
  };

  useEffect(() => {
    if (productData) {
      setFormData({
        generateRenewal:
          productData.generate_renewal === 1 ? true : false || false,
        renewalPeriod: productData.renewal_generation_value || "",
        frequency: productData.renewal_generation_frequency || "",
        noClaimDiscount: productData.no_claim_discount || "",
        insuredReduction: productData.sum_insured_reduction || "",
      });
    }
  }, [productData]);

  return (
    <div className="renewal-body">
      <Navbar />
      <ProductSidebar />
      <div className="renewal-rules-container">
        <div className="renewal-form-container font-pregular">
          <h2 className="font-psemibold text-primary text-3xl text-left m-5">
            Rules for Renewal
          </h2>

          {/* Generate Renewal */}
          <div className="renewal-form-group">
            <label>Generate Renewal</label>
            <div className="renewal-radio-group">
              <label>
                <input
                  type="radio"
                  name="generateRenewal"
                  value="Yes"
                  checked={formData.generateRenewal === true}
                  onChange={handleRadioChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="generateRenewal"
                  value="No"
                  checked={formData.generateRenewal === false}
                  onChange={handleRadioChange}
                />
                No
              </label>
            </div>
          </div>

          {/* Renewal Period (Time Period) */}
          {formData.generateRenewal && (
            <div className="renewal-form-group">
              <label>Renewal Generation Date (Time Period)</label>
              <div className="flex gap-4">
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Days">Days</option>
                  <option value="Months">Months</option>
                  <option value="Years">Years</option>
                </select>
                <input
                  type="number"
                  className="text-center w-full p-2 border border-gray-300 rounded-md"
                  value={formData.renewalPeriod}
                  onChange={handleChange}
                  name="renewalPeriod"
                  disabled={!formData.generateRenewal} // Disable if generateRenewal is false
                />
              </div>
            </div>
          )}

          {/* No Claim Discount */}
          {formData.generateRenewal && (
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
          )}

          {/* Sum Insured Reduction */}
          {formData.generateRenewal && (
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
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-16">
          <button
            type="submit"
            className="py-4 px-10 bg-primary text-white font-psemibold rounded-md hover:bg-secondary transition duration-300"
            onClick={handleSubmit}
          >
            Submit Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenewalRules;
