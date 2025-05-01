import Navbar from "../components/navbar";
import PolicySidebar from "../components/policy-sidebar";
import React from "react";
import './PremiumComputation.css';
import { useNavigate } from "react-router-dom";

const PremiumComputation = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/product-setup");
  };


  return (
    <div className="body">
      <Navbar />
      <PolicySidebar />
      <div className="content-container">
        <h2 className="font-psemibold text-primary text-3xl text-left m-5">
          Premium Computation
        </h2>

        <form>
          {/* Form rows */}
          <div className="form-row-Premium">
            <div className="input-container">
              <div className="input-group font-pregular">
                <label>Discount Name</label>
                <select className="input-large">
                  <option value="fixed">Fix Amount Policy</option>
                  <option value="variable">Variable Amount Policy</option>
                </select>
              </div>
            </div>

            <div className="input-container">
              <div className="input-group font-pregular">
                <label>Discount Duration (Start Date)</label>
                <input type="date" className="input-large" />
              </div>
            </div>
          </div>

          <div className="form-row-Premium">
            <div className="input-container">
              <div className="input-group font-pregular">
                <label>Discount Duration (End Date)</label>
                <input type="date" className="input-large" />
              </div>
            </div>

            <div className="input-container">
              <div className="input-group font-pregular">
                <label>Rate</label>
                <input type="number" placeholder="Enter rate" className="input-large" />
              </div>
            </div>
          </div>

          <div className="form-row-Premium">
            <div className="input-container">
              <div className="input-group font-pregular">
                <label>Min Sum Insured</label>
                <input type="number" placeholder="Enter minimum sum" className="input-large" />
              </div>
            </div>

            <div className="input-container">
              <div className="input-group font-pregular">
                <label>Max Limit of Premium Discount</label>
                <input type="number" placeholder="Enter maximum limit" className="input-large" />
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
        </form>
      </div>
    </div>
  );
};

export default PremiumComputation;
