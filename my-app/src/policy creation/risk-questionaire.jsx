import React, { useState } from "react";
import Navbar from "../components/navbar"; // Ensure Navbar is correctly imported
import "./risk-questionaire.css";
import SideBar from "../components/policy-sidebar";
import { useNavigate } from "react-router-dom";

const RiskQuestionnaire = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/policy-creation/device-info");
  };

  return (
    <div className="body">
      <Navbar /> {/* Navbar on top */}
      <SideBar />
      <div className="risk-questionnaire-container mt-12">
        <h2 className="heading font-psemibold text-primary">
          Risk Questionnaire
        </h2>

        {/* Risk Questionnaire Inputs */}
        <div className="questionnaire-grid font-pregular">
          <div className="input-group">
            <label htmlFor="question1">Predefined Question 1</label>
            <input
              type="text"
              id="question1"
              placeholder="Enter details here"
            />
          </div>
          <div className="input-group">
            <label htmlFor="question2">Predefined Question 2</label>
            <input
              type="text"
              id="question2"
              placeholder="Enter details here"
            />
          </div>
          <div className="input-group">
            <label htmlFor="question3">Predefined Question 3</label>
            <input
              type="text"
              id="question3"
              placeholder="Enter details here"
            />
          </div>
        </div>

        {/* Add On Section */}
        <div className="add-on-section my-10">
          <h2 className="heading font-psemibold text-primary">Add Ons</h2>
          <div className="add-on-grid font-pregular">
            {[1, 2, 3].map((num) => (
              <div className="add-on-row" key={num}>
                <div className="add-on-group">
                  <label htmlFor={`addon${num}`}>Add On {num}</label>
                  <input
                    type="text"
                    id={`addon${num}`}
                    placeholder="Add on details"
                  />
                </div>
                <div>
                  <button className="addon-btn edit-btn font-pregular">
                    View
                  </button>
                </div>
                <div>
                  <button className="addon-btn edit-btn font-pregular">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exclusions Section */}
        <div className="exclusions-section">
          <h2 className="heading font-psemibold text-primary">Exclusions</h2>
          <div className="exclusions-grid font-pregular">
            {[1, 2, 3].map((num) => (
              <div className="exclusion-row" key={num}>
                <div className="exclusion-group">
                  <label htmlFor={`exclusion${num}`}>Exclusions {num}</label>
                  <input
                    type="text"
                    id={`exclusion${num}`}
                    placeholder="Exclusion details"
                  />
                </div>
                <div>
                  <button className="addon-btn edit-btn font-pregular">
                    View
                  </button>
                </div>
                <div>
                  <button className="addon-btn edit-btn font-pregular">
                    Edit
                  </button>
                </div>
              </div>
            ))}
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
    </div>
  );
};

export default RiskQuestionnaire;
