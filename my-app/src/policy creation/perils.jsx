import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import PolicySidebar from "../components/policy-sidebar";
import "./perils.css"; // Custom CSS for this screen
import { useState } from "react";

export const Perils = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/policy-creation/pre-inspection");
  };

  const [showTable, setShowTable] = useState(false); // State to show the table
  const [quoteAmount, setQuoteAmount] = useState(0); // State to store quote amount
  const [discount, setDiscount] = useState(0); // State to store selected discount
  const [remainingAmount, setRemainingAmount] = useState(0); // State to store remaining amount

  const handlePackageClick = () => {
    setShowTable(true); // Show the table when any package is clicked
    setQuoteAmount(0); // Reset quote when package changes
    setRemainingAmount(0); // Reset remaining amount
  };

  const handleGenerateQuoteClick = () => {
    const amount = 5000; // Fixed Rs 5000 as the generated quote
    setQuoteAmount(amount);
    calculateRemaining(amount, discount);
  };

  const handleDiscountChange = (e) => {
    const selectedDiscount = parseInt(e.target.value);
    setDiscount(selectedDiscount);
    if (quoteAmount) {
      calculateRemaining(quoteAmount, selectedDiscount);
    }
  };

  const calculateRemaining = (quote, discount) => {
    const remaining = quote - discount;
    setRemainingAmount(remaining);
  };
  return (
    <div className="body">
      <Navbar />
      <PolicySidebar />
      <div className="package-container">
        {/* Main Content */}
        <div className="content-container">
          <h2 className="heading font-psemibold text-primary ">
            Choose Your Plan
          </h2>
          <div className="package-grid">
            {/* Golden Package */}
            <div className="package-card" onClick={handlePackageClick}>
              <div className="package-icon golden-package-icon">
                <i className="fas fa-crown"></i>
              </div>
              <h3 className="package-title">Golden Plan</h3>
              <p className="package-description">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>

            {/* Silver Package */}
            <div className="package-card" onClick={handlePackageClick}>
              <div className="package-icon silver-package-icon">
                <i className="fas fa-medal"></i>
              </div>
              <h3 className="package-title">Silver Plan</h3>
              <p className="package-description">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>

          {/* Quote Table Section */}
          {showTable && (
            <div className="quote-section">
              <button
                className="generate-quote-btn"
                onClick={handleGenerateQuoteClick}
              >
                Generate Quote
              </button>
              <table className="quote-table">
                <tbody>
                  <tr>
                    <td>Generated Quote</td>
                    <td>Rs {quoteAmount || 0}</td>
                  </tr>
                  <tr>
                    <td>
                      <select
                        className="discount-dropdown"
                        onChange={handleDiscountChange}
                      >
                        <option value="0">Select Discount</option>
                        <option value="100">Azadi Discount</option>
                        <option value="100">Eid Discount</option>
                        <option value="100">New Year Discount</option>
                      </select>
                    </td>
                    <td>Rs {discount || 0}</td>
                  </tr>
                  <tr>
                    <td>Remaining</td>
                    <td>Rs {remainingAmount !== null ? remainingAmount : 0}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
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
